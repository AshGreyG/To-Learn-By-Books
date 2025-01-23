# 'git rebase -i <commit_id>' can select the commits to add to the
# commit_id. Real Git world will open an UI like vim to decide 
# which commits to be added to the commit_id

echo "git rebase -i HEAD~3"
echo "git rebase bugFix main"

# ============================
# Juggling Commits
# ============================

echo "git rebase -i HEAD~2"     # order: C3 C2
echo "git rebase -i HEAD~1"     # order: C2'
echo "git rebase -i HEAD~2"     # order" C2'' C3'
echo "git rebase caption main"  # 'caption' commits -> 'main' commits