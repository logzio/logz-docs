# Don't forget to chmod this bad boy
echo Making stale list...

# Add this file to your .gitignore
STALE_LIST_OUTPUT="$JEKYLL_DATA/stale-list.yml"

printf "generated: `date`\ncontents:" > $STALE_LIST_OUTPUT
git ls-tree -r --name-only HEAD -- $JEKYLL_SOURCE --relative=$JEKYLL_SOURCE | while read filename; do
  printf "$(git log -1 --format="\n  - committed: %ai\n    author: %an\n    filepath: " -- $filename)$filename"
done >> $STALE_LIST_OUTPUT

echo '  done.'