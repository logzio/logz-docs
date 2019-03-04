OUTPUT=$PWD/_site

echo Testing output with HTMLProofer...
htmlproofer --extension .html --url_ignore "/\/api#operation\/.+/" --http_status_ignore "999" $OUTPUT
echo '  HTMLProofer done'