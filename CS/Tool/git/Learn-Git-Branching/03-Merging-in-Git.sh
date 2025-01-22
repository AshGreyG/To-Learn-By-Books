# Merging in git creates a special commit that has two unique parents.
# A commit with two parents essentially means "I want to include all
# the work from this parent over here and this one over here, and the
# set of all their parents."

#          c0 (first commit)
#           ▲
#           ║
#           ║
#          c1
#          / \
#         /   \
#        /     \
#      c2       c3
#     bugFix     ║
#           \    ║
#            \==c4 <- main* 
#
# git merge bugFix
# Fist 'main' branch points to c3, executing the command above,
# 'main' branch will point to a commit (c4) that has two parents,
# and it will contain all the work in the repository now. But
# 'bugFix' branch hasn't all the work. To let 'bugFix' branch
# to also have all the work of this repository, we can use
#
# git checkout bugFix
# git merge main

echo "git branch bugFix"
echo "git checkout bugFix"

# It can be replaced by 'git checkout -b bugFix'

echo "git commit"
echo "git checkout main"
echo "git commit"
echo "git merge bugFix"