JEKYLL_JS_DEST="$JEKYLL_SOURCE/js/external_js/"

echo Moving Node files...

if [ ! -d "$JEKYLL_JS_DEST" ]; then
  mkdir $JEKYLL_JS_DEST
fi

mvJs()
{
  echo '  ' $2
  cp $1 $JEKYLL_JS_DEST
}

# To add a new js library, lines should follow this format:
# `mvJs <shortname> <path/to/node/module.min.js>`

mvJs jquery node_modules/jquery/dist/jquery.min.js
mvJs tablesorter node_modules/tablesorter/dist/js/jquery.tablesorter.min.js
mvJs clipboardjs node_modules/clipboard/dist/clipboard.min.js
mvJs smoothscroll node_modules/smooth-scroll/dist/smooth-scroll.min.js
mvJs redoc node_modules/redoc/bundles/redoc.standalone.js
mvJs anchorjs node_modules/anchor-js/anchor.min.js

echo ...done