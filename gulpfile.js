// const gulp = require('gulp');
const { src, dest } = require('gulp');

exports.default = function() {
  return src('node_modules/jquery/dist/jquery.min.js')
    .pipe(src('node_modules/tablesorter/dist/js/jquery.tablesorter.min.js'))
    .pipe(src('node_modules/clipboard/dist/clipboard.min.js'))
    .pipe(src('node_modules/smooth-scroll/dist/smooth-scroll.min.js'))
    .pipe(src('node_modules/redoc/bundles/redoc.standalone.js'))
    .pipe(dest('_source/js/external_js/'));
}