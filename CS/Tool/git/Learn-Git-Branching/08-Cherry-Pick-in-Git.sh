# 'git cherry-pick' takes the following form
# 
# git cherry-pick <Commit1> <Commit2> <...>
#
# It's a very straightforward way of saying that you would like
# to copy a series of commits below your current location.

# git cherry-pick c2 c5 c7
#
#        HEAD
#          ▲
#          ║
#          ║
#         c2'
#          ▲
#          ║
#          ║
#         c5'
#          ▲
#          ║
#          ║
#         c7'

echo "git cherry-pick c3 c4 c7"

