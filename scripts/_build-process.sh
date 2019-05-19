SCRIPTS=$PWD/scripts
export JEKYLL_SOURCE="./_source" # `source` value in your jekyll config file, relative to where you're keeping this script
export JEKYLL_DATA="$JEKYLL_SOURCE/_data" # location of Jekyll's _data/ folder, relative to this script

echo source = $JEKYLL_SOURCE
echo jekyll data = $JEKYLL_DATA

$SCRIPTS/make-stale-list.sh

echo Installing node modules...
cd $JEKYLL_SOURCE && npm install --production
echo '  done.'