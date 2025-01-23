# There are two ways to reverse changes in Git:
# 
# 1. git reset: Reset current HEAD to the specified state.
#    git reset [relative_ref]
#    such as 
#      + git reset HEAD^
#      + git reset HEAD~4
#
# 2. git revert: Revert some existing commits. If I want to
#    revert HEAD~3, then Git will append a HEAD~3' to current
#    working branch.
#    git revert [relative_ref]
#    such as
#      + git revert HEAD^^
#      + git revert HEAD~3

echo "git reset HEAD^"
echo "git checkout pushed"
echo "git revert HEAD"