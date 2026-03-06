#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const buildRoot = path.join(repoRoot, "build");
const archiveRoot = path.join(buildRoot, "archive");

function walk(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, acc);
    } else if (entry.isFile() && entry.name === "index.html") {
      acc.push(fullPath);
    }
  }
}

function redirectHtml(targetPath) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${targetPath}" />
    <script>
      (function () {
        var target = "${targetPath}" + window.location.search + window.location.hash;
        window.location.replace(target);
      })();
    </script>
    <link rel="canonical" href="${targetPath}" />
  </head>
  <body>
    <p>Redirecting to <a href="${targetPath}">${targetPath}</a>.</p>
  </body>
</html>
`;
}

if (!fs.existsSync(buildRoot)) {
  console.error("[archive-redirects] build/ not found. Run docusaurus build first.");
  process.exit(1);
}

if (!fs.existsSync(archiveRoot)) {
  console.log("[archive-redirects] No /archive routes found in build/. Skipping.");
  process.exit(0);
}

const archiveIndexes = [];
walk(archiveRoot, archiveIndexes);

let created = 0;
let skippedExisting = 0;
let skippedInvalid = 0;

for (const archiveIndex of archiveIndexes) {
  const relDir = path.relative(buildRoot, path.dirname(archiveIndex)).replace(/\\/g, "/");
  const archivePath = `/${relDir}/`;
  if (!archivePath.startsWith("/archive/")) {
    skippedInvalid += 1;
    continue;
  }

  const oldPath = archivePath.replace(/^\/archive\//, "/");
  if (oldPath === "/") {
    skippedInvalid += 1;
    continue;
  }

  const oldPathDir = path.join(buildRoot, oldPath.slice(1));
  const oldPathIndex = path.join(oldPathDir, "index.html");

  if (fs.existsSync(oldPathIndex)) {
    skippedExisting += 1;
    continue;
  }

  fs.mkdirSync(oldPathDir, { recursive: true });
  fs.writeFileSync(oldPathIndex, redirectHtml(archivePath), "utf8");
  created += 1;
}

console.log(
  `[archive-redirects] Created ${created} redirects (skipped existing: ${skippedExisting}, skipped invalid: ${skippedInvalid}).`
);
