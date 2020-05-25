JEKYLL_JS_DEST="$JEKYLL_SOURCE/js/external_js/"

echo Moving Node files...

if [ ! -d "$JEKYLL_JS_DEST" ]; then
  mkdir $JEKYLL_JS_DEST
fi

echo '  jquery'
cp 'node_modules/jquery/dist/jquery.min.js' $JEKYLL_JS_DEST

echo '  tablesorter'
cp 'node_modules/tablesorter/dist/js/jquery.tablesorter.min.js' $JEKYLL_JS_DEST

echo '  clipboardjs'
cp 'node_modules/clipboard/dist/clipboard.min.js' $JEKYLL_JS_DEST

echo '  smoothscroll'
cp 'node_modules/smooth-scroll/dist/smooth-scroll.min.js' $JEKYLL_JS_DEST

echo '  redoc'
cp 'node_modules/redoc/bundles/redoc.standalone.js' $JEKYLL_JS_DEST

echo '  anchorjs'
cp 'node_modules/anchor-js/anchor.min.js' $JEKYLL_JS_DEST

echo ...done