# Git & GitHub — Quick Handout

This one-page handout summarizes the essential commands and workflows you'll use in class.

## Setup

-   Clone: `git clone https://github.com/<owner>/<repo>.git`
-   Set name/email: `git config --global user.name "Your Name"` and `git config --global user.email you@example.com`

## Daily commands

-   Check branch/status: `git status`, `git branch`
-   Stage changes: `git add <file>` or `git add .`
-   Commit: `git commit -m "short, clear message"`
-   Push: `git push origin <branch>`
-   Pull updates: `git pull origin main`

## Branching (recommended flow)

1.  Update main: `git checkout main && git pull origin main`
2.  Create feature branch: `git checkout -b feature/short-name`
3.  Work: `git add` → `git commit -m "feat: description"`
4.  Keep up to date: `git fetch origin && git merge origin/main` (or `git rebase origin/main`)
5.  Push & open PR: `git push -u origin feature/short-name`

## Conflicts (quick)

1.  Edit files with markers `<<<<<<<`, `=======`, `>>>>>>>`
2.  Keep desired code, delete markers
3.  `git add <file>` then `git commit` (or `git rebase --continue`)

## Best practices

-   Make small, focused commits
-   Use descriptive branch names (feature/, fix/, chore/)
-   Use PullRequests for code review and CI runs
-   Keep `main` deployable

---

Handout created from `version control.md` — expand in class as needed.