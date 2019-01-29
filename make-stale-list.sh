# Don't forget to chmod this bad boy

# Change these outputs to match your Jekyll configuration
JEKYLL_SOURCE="./_source" # `source` value in your jekyll config file, relative to where you're keeping this script
JEKYLL_DATA="./_source/_data" # location of Jekyll's _data/ folder, relative to this script

STALE_LIST_OUTPUT="$JEKYLL_DATA/stale-list.yml"

printf "generated: `date`\ncontents:" > $STALE_LIST_OUTPUT
git ls-tree -r --name-only HEAD -- $JEKYLL_SOURCE --relative=$JEKYLL_SOURCE | while read filename; do
  printf "$(git log -1 --format="\n  - committed: %ai\n    author: %an\n    filepath: " -- $filename)$filename"
done >> $STALE_LIST_OUTPUT