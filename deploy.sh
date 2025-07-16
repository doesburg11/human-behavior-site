#!/bin/bash

set -e  # Exit on error

echo "🔧 Building Docusaurus site..."
npm run build

echo "🧹 Cleaning old site in ~/Projects/doesburg11.github.io..."
rsync -av --delete --exclude=".git" build/ ../doesburg11.github.io/

echo "📤 Committing and pushing to GitHub..."
cd ../doesburg11.github.io

# Only initialize if not already a git repo
if [ ! -d ".git" ]; then
  echo "🛠️ Git repo not found — initializing..."
  git init
  git checkout -b main
  git remote add origin git@github.com:doesburg11/doesburg11.github.io.git
fi

git add .
git commit -m "Manual deploy on $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit."
git push origin main --force
