#!/bin/bash
set -euo pipefail

# --- Paths ---
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
SRC="$SCRIPT_DIR"                             # repo root of human-behavior-site
BUILD="$SRC/build"
TARGET="$HOME/Projects/doesburg11.github.io"  # adjust if needed
DOMAIN="humanbehaviorpatterns.org"

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
rsync -av --delete "$BUILD/" "$TARGET/"

# --- Commit and push ---
echo "Committing and pushing to GitHub..."
cd "$TARGET"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init
  git checkout -b main || git checkout -B main
  git remote add origin git@github.com:doesburg11/doesburg11.github.io.git
fi

git add .
git commit -m "Manual deploy" || echo "Nothing to commit."
git push origin main --force

# --- Local sanity check ---
echo "Deployed with CNAME:"
cat "$TARGET/CNAME"
