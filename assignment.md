Git Rebase Assignment: "Conflict Resolution Challenge"

## Objective: Students will simulate a real-world scenario where two developers modify the same file on different branches. They’ll use git rebase to replay commits and resolve a conflict.

Instructions

1.  Setup the Repositorybashmkdir git-rebase-assignment,  cd git-rebase-assignmentgit init
2.  Create a File and Commit on mainbashecho "Welcome to Git Rebase Practice" > intro.txtgit add intro.txtgit commit -m "Initial commit on main"
3.  Create a Feature Branch and Modify the Filebashgit checkout -b featureecho "This line was added in the feature branch." > intro.txtgit add intro.txtgit commit -m "Feature branch update"
4.  Switch Back to main and Make a Conflicting Changebashgit checkout mainecho "This line was added in the main branch." > intro.txtgit add intro.txtgit commit -m "Main branch update"
5.  Rebase the Feature Branch onto Mainbashgit checkout featuregit rebase main🧠 Tasks for StudentsResolve the conflict in intro.txt manually.
6.  Use git add and git rebase --continue to finish the rebase.
    
7.  Run git log to inspect the new commit history.
    

  

## Write a short reflection:

What caused the conflict?

How did you resolve it?

What’s the difference between rebase and merge?
