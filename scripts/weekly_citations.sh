#!/bin/bash
# Weekly job (run by launchd on this Mac, see scripts/io.github.moeinmohsenimofidi.citations.plist):
# read Google Scholar, update content.js and llms.txt, then commit and push if anything changed.
# Google Scholar blocks cloud servers such as GitHub Actions, so this runs locally.
set -euo pipefail
export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")/.."

echo "== $(date '+%Y-%m-%d %H:%M:%S') citation update"
git pull --rebase --quiet
/usr/bin/python3 -I scripts/update_citations.py
node build.js

if git diff --quiet; then
  echo "No changes."
  exit 0
fi
git commit --quiet -am "Update citations from Google Scholar"
git push --quiet
echo "Pushed: $(git log --oneline -1)"
