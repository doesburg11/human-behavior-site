#!/bin/bash
set -euo pipefail

# --- Paths ---
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
SRC="$SCRIPT_DIR"                             # repo root of human-behavior-site
BUILD="$SRC/build"
TARGET="${TARGET:-$HOME/Projects/doesburg11.github.io}"  # override with env var if needed
DOMAIN="${DOMAIN:-humanbehaviorpatterns.org}"
BRANCH="${BRANCH:-main}"
REMOTE_URL="${REMOTE_URL:-https://github.com/doesburg11/doesburg11.github.io.git}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Manual deploy}"

echo "Building Docusaurus site..."
npm --prefix "$SRC" run build

# --- Guard: make sure CNAME made it into build/ ---
if [[ ! -f "$BUILD/CNAME" ]]; then
  echo "❌ ERROR: CNAME missing from build/. Did you place static/CNAME in your repo?"
  exit 1
fi
if ! grep -qx "$DOMAIN" "$BUILD/CNAME"; then
  echo "❌ ERROR: CNAME in build/ does not match expected domain: $DOMAIN"
  exit 1
fi
echo "✅ Verified CNAME in build/"

# --- Sync build → doesburg11.github.io ---
echo "Syncing into doesburg11.github.io..."
mkdir -p "$TARGET"
# Preserve the target repo metadata; only replace the generated site contents.
rsync -av --delete --exclude '.git/' "$BUILD/" "$TARGET/"

# --- Commit and push ---
echo "Committing and pushing to GitHub..."
cd "$TARGET"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init
  git checkout -b "$BRANCH" || git checkout -B "$BRANCH"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git add -A
if git diff --cached --quiet; then
  echo "Nothing to commit."
  echo "Skipping push."
else
  git commit -m "$COMMIT_MESSAGE"
  git push origin "$BRANCH"
fi

# --- Local sanity check ---
echo "Deployed with CNAME:"
cat "$TARGET/CNAME"
