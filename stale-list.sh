STALE_LIST="./_source/_data/stale-list.yml"
BASE_DIR="./_source"

printf "generated: `date`\ncontents:" > $STALE_LIST
git ls-tree -r --name-only HEAD -- $BASE_DIR --relative=$BASE_DIR | while read filename; do
  printf "$(git log -1 --format="\n  - committed: %ai\n    author: %an\n    filepath: " -- $filename)$filename"
done >> $STALE_LIST