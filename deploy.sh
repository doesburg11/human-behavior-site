#!/bin/bash
set -e

# -------- CONFIG --------
SOURCE_DIR=~/Projects/human-behavior-site
DEPLOY_DIR=~/Projects/doesburg11.github.io
BRANCH=main
COMMIT_MSG="Deploy Docusaurus site"
# ------------------------

echo "🔧 Building Docusaurus site..."
cd "$SOURCE_DIR"
npm run build

echo "🧹 Cleaning old site in $DEPLOY_DIR..."
cd "$DEPLOY_DIR"
find . -maxdepth 1 ! -name '.' ! -name '.git' -exec rm -rf {} +

echo "📦 Copying new build files..."
cp -r "$SOURCE_DIR/build/"* "$DEPLOY_DIR"

echo "📤 Committing and pushing to GitHub..."
git add .
git commit -m "$COMMIT_MSG" || echo "⚠️ Nothing to commit"
git push origin $BRANCH

echo "✅ Deployment complete!"
