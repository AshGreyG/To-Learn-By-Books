# Branches in Git are incredibly lightweights as well,
# they are just simply pointers to a specific commit.

#          c0 (first commit)
#           ▲
#           ║
#           ║
#          c1  <- newBranch created when latest commit was c1
#           ▲     git branch newBranch
#           ║
#           ║
#          c2  <- main*, * means we are now on the 'main' branch
#                 git commit (c2)
#                 So the 'main' branch now changes to the c2
#                 If we use
#                 git checkout newBranch; git commit
#                 We will be on the 'newBranch' and now 'newBranch'
#                 points to the c2

echo "git branch bugFix"
echo "git checkout bugFix"  # bugFix*