JEKYLL_JS_DEST="$JEKYLL_SOURCE/js/external_js/"

echo Moving Node files...

cp 'node_modules/jquery/dist/jquery.min.js' $JEKYLL_JS_DEST
cp 'node_modules/tablesorter/dist/js/jquery.tablesorter.min.js' $JEKYLL_JS_DEST
cp 'node_modules/clipboard/dist/clipboard.min.js' $JEKYLL_JS_DEST
cp 'node_modules/smooth-scroll/dist/smooth-scroll.min.js' $JEKYLL_JS_DEST
cp 'node_modules/redoc/bundles/redoc.standalone.js' $JEKYLL_JS_DEST

echo '  done.'