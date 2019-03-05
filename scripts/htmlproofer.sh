OUTPUT=$PWD/_site

echo Testing output with HTMLProofer...
htmlproofer $OUTPUT \
  --extension .html \
  --url_ignore "/\/api#operation\/.+/" \
  --http_status_ignore "999"
echo '  HTMLProofer done'