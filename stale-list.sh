STALE_LIST="stale-list.csv"
BASE_DIR="./_source"

echo "date,author,filepath" > $STALE_LIST
git ls-tree -r --name-only HEAD -- $BASE_DIR --relative=$BASE_DIR | while read filename; do
  echo "$(git log -1 --format="%ai,%an" -- $filename),$filename"
done >> $STALE_LIST