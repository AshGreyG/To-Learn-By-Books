# Rebasing in Git is to add the new commits of branch working on
# to the target branch. For example:
# 
#          c0 (first commit)
#           ▲
#           ║
#           ║
#          c1
#          / \
#         /   \
#        /     \
#     |c2|      c3  <- main when executing 'git rebase main'
#       ▲        ▲
#       ║        ║
#       ║        ║
#     |c4|      c2'  I will use |commit_id| to denote this commit is deleted
#       ▲        ▲          use commit_id' to denote this commit is from
#       ║        ║          commit_id but git changes its id actually.
#       ║        ║
#     |c5|      c4'
#                ▲
#    |feature|   ║
#                ║
#               c5' <- feature* when executing 'git rebase main'
#                    \ main* when executing 'git merge feature' on the 'main' branch

echo "git checkout -b bugFix"   # bugFix*
echo "git commit"
echo "git checkout main"        # main*
echo "git commit"
echo "git checkout bugFix"      # bugFix*
echo "git rebase main"