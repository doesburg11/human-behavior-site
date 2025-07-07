# 🧠 Docusaurus Workflow for HBP Desktop & Laptop

This checklist explains how to work on your `human-behavior-site` from both your desktop and laptop, with GitHub and Docusaurus.

---

## ✅ One-Time Setup (per device)

Do this once on **each computer**:

```bash
# 1. Go to your workspace folder
cd ~/Projects

# 2. Clone the GitHub repo (only once per device)
git clone https://github.com/doesburg11/human-behavior-site.git

# 3. Go into the project
cd human-behavior-site

# 4. Install dependencies
npm install
```

---

## 🔁 Regular Workflow (per session)

Do this every time you start working on the project:

```bash
# 1. Go to your site folder
cd ~/Projects/human-behavior-site

# 2. Pull the latest changes
git pull
```

✅ `git pull` is enough if your local `main` is tracking `origin/main`.

---

## 🛠️ Work on Your Site

Make edits to:

- Markdown files in `docs/`
- Sidebar structure in `sidebars.js`
- Images in `static/` or `public/`

To preview the site locally:

```bash
npm start
```

---

## 🚀 Deploy to GitHub Pages

When you're ready to publish your changes:

```bash
npm run deploy
```

This runs the `deploy.sh` script, which:
- Builds the site
- Copies it into your GitHub Pages repo
- Commits and pushes it to https://doesburg11.github.io/

---

🧩 Happy documenting!
