**VERSION CONTROL (GIT) AND GITHUB**

1.  **Introduction to Version Control Version Control** is a system that helps developers track and manage changes to source code over time.It allows teams to collaborate efficiently, prevent data loss, and maintain a complete history of changes.Key Benefits:• Tracks every change made to the codebase.• Allows developers to revert to previous versions if necessary.• Enables multiple developers to work on the same project simultaneously.• Facilitates collaboration and code review.

**There are two types:**

1.  **Centralized Version Control System (CVCS)** – e.g., Subversion (SVN) A single central server stores all versions. Risk: If the server fails, everything may be lost.
2.  **Distributed Version Control System (DVCS)** – e.g., Git Every developer has a full copy of the repository on their machine. Safer and more flexible than CVCS.

🔹 2. What is Git?Git is an open-source Distributed Version Control System created by Linus Torvalds (creator of Linux) in 2005.It tracks changes in source code, supports non-linear workflows, and allows developers to collaborate efficiently.

**Key Git Concept****s**:

-   **Concept Description Repository (Repo):** The project folder that Git tracks. It contains all project files and history. 
-   **Commit:** A snapshot of your project’s files at a specific point in time.
-   **Branch:** A separate line of development that allows you to work independently from the main code.Merge Combines changes from one branch into another.
-   **Clone**: Creates a copy of a repository from a remote source (e.g., GitHub).Push Sends your local commits to a remote repository.
-   **Pull:** Fetches and merges updates from a remote repository into your local copy. 
-   **Staging Area:** A temporary area where you prepare changes before committing.

---

Git WorkflowThe Git workflow typically follows this sequence:

3.  Initialize a repository***git init*** (Creates a .git folder to start tracking your project.)
4.  Check the status of files***git status***
5.  Add files to staging

# Version Control (Git) and GitHub — Teaching Guide

This document is a compact, student-friendly guide covering core Git concepts, common commands, branching workflows, conflict resolution, and a short set of assignments.

## 1 — Why version control?

-   **​**Tracks every change to your codebase
-   Lets you revert to previous states
-   Enables safe collaboration between multiple developers
-   Keeps a history and context for why changes were made

## 2 — Core concepts

-   **Repository (repo):** the project folder Git tracks, including history
-   **Commit: a** snapshot of your files with a message
-   **Branch:** an independent line of development
-   **Staging area (index):** where you prepare files before committing
-   **Remote:** a hosted copy of the repo (e.g. GitHub)

## 3 — Quick reference: essential commands

-   Initialize repo: `git init`
-   Check status: `git status`
-   Stage a file: `git add <file>` (or `git add .` to stage all)
-   Commit staged changes: `git commit -m "meaningful message"`
-   Show branches: `git branch`
-   Create & switch branch: `git checkout -b feature-name`
-   Switch branch: `git checkout main`
-   Merge branch into current: `git merge feature-name`
-   Fetch remote updates: `git fetch origin`
-   Pull (fetch + merge): `git pull origin main`
-   Push branch: `git push origin feature-name`
-   Set upstream (first push): `git push -u origin feature-name`

## 4 — Branching workflow (recommended)

1.  Update your local main:
    -   `git checkout main`
    -   `git pull origin main`
2.  Create a feature branch:
    -   `git checkout -b feature/my-feature`
3.  Make small, focused commits:
    -   `git add` + `git commit -m "feat: short description"`
4.  Keep your branch up to date (merge or rebase):
    -   Merge: `git fetch origin` then `git merge origin/main`
    -   Rebase: `git fetch origin` then `git rebase origin/main`
5.  Push and create a Pull Request (PR):
    -   `git push -u origin feature/my-feature`
    -   Open PR on GitHub and request review

## 5 — Merge vs Rebase (short)

-   **Merge:** preserves commit history and adds a merge commit. Safe for shared branches.
-   **Rebase**: creates a linear history by replaying commits on top of main. Cleaner but rewrites history — avoid rebasing shared branches.

## 6 — Conflict resolution (practical steps)

1.  Git will stop and mark conflicted files with markers:
    
    ```
    <<<<<<< HEAD// your current branch version=======// the incoming branch version>>>>>>> feature-branch
    ```
    
2.  Edit the file to keep the correct code.
    
3.  Stage the resolved file: `git add <file>`
    
4.  Continue the operation:
    
    -   If merging: `git commit` (if needed)
    -   If rebasing: `git rebase --continue`

## 7 — GitHub workflow

-   Create repo on GitHub and clone: `git clone <url>`
-   Develop in feature branches and open PRs for review
-   Use protected branches for `main` and require PRs for merging
-   Use Actions for CI (run tests on PRs)

## 8 — VS Code tips

-   Built-in Source Control view shows changed files and branches
-   Use GitLens or Git Graph extensions for visual history
-   Use the terminal inside VS Code for exact commands when teaching

## 9 — Authentication

-   GitHub uses Personal Access Tokens (PATs) instead of passwords.
-   On Windows, use the Credential Manager or `git credential-manager` to store tokens.

## 10 — Classroom assignments (short)

Assignment A — Basic branch flow

1.  Clone the repository.
2.  Create branch `feature-readme`.
3.  Edit `README.md`, commit, and push the branch.
4.  Open a Pull Request and merge.

Assignment B — Branching and merging practice

1.  Create branches `feature-intro` and `feature-hobby` from `main`.
2.  Add `intro.txt` and `hobby.txt` respectively and commit.
3.  Merge both branches back into `main` (resolve any conflicts).
4.  Push all branches to GitHub.

Bonus (optional):

-   Create `bugfix-typo`, make a small typo fix, then rebase onto `main` and push.

## 11 — Quick cheat sheet (copyable)

```bash
# create & switch to branchgit checkout -b feature/example# make changesgit add .git commit -m "feat: short description"# keep updated with main (merge)git fetch origingit merge origin/main# or (rebase)git fetch origingit rebase origin/main# push branchgit push -u origin feature/example
```

---

If you want, I can:

-   Commit this updated `version control.md` for you and push it to `feature-password-reset`.
-   Produce a printable handout or a short slide deck for your students.

2.  Generate a new token with “repo” permissions.