SCRIPTS=$PWD/scripts
export JEKYLL_SOURCE=$PWD/_source # `source` value in your jekyll config file, relative to where you're keeping this script
export JEKYLL_DATA="$JEKYLL_SOURCE/_data" # location of Jekyll's _data/ folder, relative to this script

echo source = $JEKYLL_SOURCE
echo jekyll data = $JEKYLL_DATA

$SCRIPTS/make-stale-list.sh

echo Installing node modules...
NODE_ENV=production npm install --production

$SCRIPTS/move-js-files.sh