var gulp = require('gulp');
var replace = require('gulp-string-replace');
var sourceFile = process.env.SOURCE;

gulp.task('kramdown-to-gfm', function() {
  gulp.src([sourceFile]) // Any file globs are supported
    .pipe(replace(/(---[\s\S]+?---(\n){1,})/, '')) // remove frontmatter
    .pipe(replace(/^#{5}(?= \b)/gm, '###')) // replace h5 with h3
    .pipe(replace(/^#{6}(?= \b)/gm, '###')) // replace h6 with h3
    .pipe(replace(/{:.override.btn-img}(\n?)/g, '')) // remove

    // clean up the tasklist
    .pipe(replace(/^1\.(.+\n+)+{:.*tasklist.*}/gm, function(replacement) {
      var result = replacement
        .replace(/\n{:.tasklist.firstline-headline}/, '') // remove
        .replace(/^(?=\d+.)/gm, '#### ') // convert to h4
        .replace(/^( )+/gm, '') // outdent the indents

      return result;
    }))

    // convert deflists to table
    .pipe(replace(/(.*)\n: ((?:.+(?:\n|$))*?)+(?=\n|.*\n:|$)/gm, function(replacement) {
      result = '<!-- definition:start -->\n' + replacement + '<!-- definition:end -->';
      result = result
        .replace(/(?<=<!-- definition:start -->\n)^/gm, '| ')
        .replace(/$(?=\n<!-- definition:end -->)/gm, ' |')
        .replace(/^:( )?/gm, ' | ')
        .replace(/(?<!<!-- definition:(start|end) -->)\n(?!<!-- definition:(start|end) -->)/g, '');
      return result;
    }))

    // combine deflists into a single table, add header
    .pipe(replace(/<!-- definition:start -->\n(.*\n)+?<!-- definition:end -->(?!\n<!-- definition:start -->)/g, function(replacement) {
      var result = replacement
        .replace(/<!-- definition:end -->/g, '')
        .replace(/<!-- definition:start -->/, '| Parameter | Description |\n|---|---|\n')
        .replace(/<!-- definition:start -->\n/g, '')
        .replace(/\n{2}/g, '\n');

      return result;
    }))

    // reformat inline headings
    .pipe(replace(/.+\n{:( )?.inline-header( )?}/g, function(replacement) {
      var result = replacement
        .replace(/\n{:( )?.inline-header( )?}/, '')
        .replace(/^.+$/m, '**$&**');

      return result;
    }))

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

    // move required & default params to the other side of the pipe
    .pipe(replace(/<span.*?>.*<\/span> \|/g, function(replacement) {
      result = replacement
        .replace(/(.+) \|/g, '| $1');

      return result;
    }))
    .pipe(replace(/<span.*required-param.*\/span>/g, '**Required**.'))
    .pipe(replace(/<span.*default-param.*\/span>/g, function(replacement){
      var stripped = replacement.replace(/<(\/*)span.*?>/g, '');

      var result = '**Default**: ' + stripped + ' <br> '
      return result;
    }))

    // replace jekyll includes
    .pipe(replace(/{%.*replace-vars.*token=true.*%}( \\\\)?/g, 'Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.'))
    .pipe(replace(/{%.*replace-vars.*listener=true.*%}( \\\\)?/g, 'Replace `<<LISTENER-HOST>>` with your region\'s listener host (for example, `listener.logz.io`). For more information on finding your account\'s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).'))

    .pipe(replace(/\\{2}/g, '<br>'))

    .pipe(gulp.dest('./convert-md'))
});

// To capture a node:
//    /(?<=^(?![\r\n])|\n{2})(.+\n{1}?)+(?=\n|$(?![\r\n]))/gm