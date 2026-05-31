# Get set up on the catalyst repo

You need: Homebrew + Claude Code (you have these), GitHub account (you don't).

---

## 1. Make a GitHub account

Go to **github.com → Sign up**. Pick any username. DM me what you picked.

**Stop here** until I confirm I've added you as a collaborator. Otherwise step 5 will fail.

---

## 2. Install GitHub CLI

Open **Terminal**, paste:

```
brew install gh
gh auth login
```

When `gh auth login` asks:
- Where? → **GitHub.com**
- Protocol? → **HTTPS**
- Authenticate Git? → **Yes**
- How? → **Login with a web browser**

Copy the code it shows you, paste into the browser tab that opens, click Authorize.

---

## 3. Tell git who you are

In Terminal:

```
git config --global user.name "Your Name"
git config --global user.email "your.email@hiflylabs.com"
```

---

## 4. Clone the project

In Terminal:

```
cd ~/Documents
git clone https://github.com/bernadettcserti-hetzer-pixel/catalyst.git
cd catalyst
git checkout ai_day/ui_demo
```

Done. You're on our shared branch.

---

## Daily flow

**Before you start working:**
```
git pull
```

**When you're done:**
```
git add .
git commit -m "short message about what you did"
git push
```

---

## When something breaks

Open **Claude Code** in the `catalyst` folder. Paste the error. Don't fight it.
