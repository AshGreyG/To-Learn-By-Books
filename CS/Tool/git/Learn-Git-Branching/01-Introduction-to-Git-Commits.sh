# A commit in a git repository records a snapshot of all
# the tracked files in your directory. Git wants to keep
# commits as lightweight as possible though, so it doesn't
# just blindly copy the entire directory every time you
# commit. It can compress a commit as a set of changes,
# from one version of the repository to the next

#          c0 (first commit)
#           ▲
#           ║
#           ║
#          c1
#           ▲
#           ║
#           ║
#          c2  <- main*

git commit
git commit

