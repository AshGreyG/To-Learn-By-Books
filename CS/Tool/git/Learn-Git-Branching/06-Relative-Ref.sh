# The relative reference in git is to checkout the relative
# commit to some commit. There are two ways to take the relative
# commit:
#
# [commit_id]^: The last commit to commit_id
# 
#        c3 (commit_id^)
#         ▲
#         ║
#         ║
#        c4 (commit_id)
#
# [commit_id]~[num]: To ascend [num] of parents.

echo "git branch -f main c6"
echo "git branch -f bugFix HEAD~2"
echo "git checkout HEAD~1"