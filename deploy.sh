#!/bin/bash

echo "Building Docusaurus site..."
npm run build

echo "Cleaning old site in ~/Projects/doesburg11.github.io..."
rsync -av --delete ~/Projects/human-behavior-site/build/ ~/Projects/doesburg11.github.io/


echo "Committing and pushing to GitHub..."
cd ~/Projects/doesburg11.github.io

# Ensure it's a git repo
git status || git init && git checkout -b main && git remote add origin git@github.com:doesburg11/doesburg11.github.io.git

# Add and push
git add .
git commit -m "Manual deploy"
git push origin main --force
