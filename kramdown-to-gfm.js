var gulp = require('gulp');
var replace = require('gulp-string-replace');
var sourceFile = process.env.SOURCE;
var taskStepNum = 0;

gulp.task('kramdown-to-gfm', function() {
  gulp.src([sourceFile]) // Any file globs are supported
    .pipe(replace(/(---[\s\S]+?---(\n){1})/, (replacement) => {
      var result = replacement
        .match(/(?<=^title: ).+$/m);
      return '# ' + result + '\n';
    })) // remove frontmatter
    .pipe(replace(/{:.override.btn-img}(\n?)/g, '')) // remove

    // clean up the tasklist
    .pipe(replace(/((?<=^#{5} ).+$|^<div class="tasklist">$)/gm, (source) => {
      switch (source) {
        case '<div class="tasklist">':
          taskStepNum = 0;
          return source;
        default:
          taskStepNum++;
          return taskStepNum + '. ' + source;
        }
    }))

    // convert deflists to table
    .pipe(replace(/{:.paramlist}\n/g, ''))

    // reformat info-boxes
    .pipe(replace(/(?<=\n\n).*\n\s*{:.info-box.*}/g, function(replacement) {
      var className = replacement.match(/(?<=:\.info-box\.).*(?=})/g).toString();
      var bodyText = replacement.replace(/\n\s*{:.*}/, '');

      switch (className) {
        case 'note':
          title = "Note";
          break;
        case 'important':
          title = "Important";
          break;
        case 'warning':
          title = "Warning";
          break;
        case 'tip':
          title = "Pro tip";
          break;
        case 'read':
          title = "Read more";
          break;
      };

      result = '**' + title + '**:\n' + bodyText;

      return result;
    }))

    .pipe(replace(/<span.*required-param.*\/span>/g, '(Required)'))
    .pipe(replace(/<span.*default-param.*\/span>/g, function(replacement){
      var stripped = replacement.replace(/<(\/*)span.*?>/g, '');

      var result = '(Default: ' + stripped + ')'
      return result;
    }))

    // replace jekyll includes
    .pipe(replace(/{%.*replace-vars.*token=true.*%}( \\\\)?/g, 'Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.'))
    .pipe(replace(/{%.*replace-vars.*listener=true.*%}( \\\\)?/g, 'Replace `<<LISTENER-HOST>>` with your region\'s listener host (for example, `listener.logz.io`). For more information on finding your account\'s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).'))

    .pipe(replace(/\\{2}/g, '<br>'))
    .pipe(replace(/{{site.baseurl}}/g, 'https://docs.logz.io'))

    .pipe(gulp.dest('./convert-md'))
});

// To capture a node:
//    /(?<=^(?![\r\n])|\n{2})(.+\n{1}?)+(?=\n|$(?![\r\n]))/gm
