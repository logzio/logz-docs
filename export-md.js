console.clear()
const path = require('path')
const fs = require('fs-extra')
const gulp = require('gulp')
const replace = require('gulp-string-replace')

console.group('Getting started...')

// Set the output formats we want to use
const outputFormats = [ 'GFM' , 'CONTENTFUL' ]

// Set the folders this script runs on
const collectionsFolder
  = path.join(__dirname, '_source/logzio_collections')
const markdownFolders
  = [ '_log-sources' , '_metrics-sources' ]

let sourceFolderPaths = []
markdownFolders.forEach(folder =>
  sourceFolderPaths.push(path.join(collectionsFolder, folder))
)

// Set the output folder
const parentOutputFolder
  = path.join(__dirname, '_export-md')
fs.emptydirSync(parentOutputFolder) // Clean or create the output folder

console.info({outputFormats, collectionsFolder, markdownFolders, sourceFolderPaths, parentOutputFolder})

console.groupEnd()

// This will feed the output folder when it's populated
let sourceContent = {}

// Build sourceContent structure
sourceContent = addFoldersToSourceContentArr(sourceContent)

// Add source content to the array
sourceContent = buildSourceContentArr(sourceContent)

console.log({parentOutputFolder, outputFormats})

makeOutputSubfolders()

Object.keys(sourceContent).forEach(folder =>
  generateMdOutput(folder)
)

allDone() // close the program

/**
 * Splitting everything into functions, making the code readable
 */

// When it's time to end
function allDone() {
  console.log('Done.')
  process.exit(0)
}

function addFoldersToSourceContentArr(sourceContent) {
  markdownFolders.forEach(folder => {
    sourceContent[folder] = []
  })
  return sourceContent
}

// Build the sourceContent array for each collection
function buildSourceContentArr(sourceContent) {
  markdownFolders.forEach(folder => {
    console.group()
    let sourceFolder = path.join(collectionsFolder, folder)
    console.log(`Working on ${sourceFolder} ...`)
    // Collect the filenames in an array
    let filenames = fs.readdirSync(sourceFolder)
    filenames.forEach(file => {
      let filepath = path.join(sourceFolder, file)
      let contents = fs.readFileSync(filepath, {encoding: 'utf-8'})
      sourceContent[folder].push({filename: file, contents: contents})
    })
    console.groupEnd()
  })

  return sourceContent
}

// Make the output subfolders under the main output folder
function makeOutputSubfolders() {
  markdownFolders.forEach(subfolder =>
    fs.mkdirSync(path.join(parentOutputFolder, subfolder))
  )
}

function generateMdOutput(folder) {
  outputFormats.forEach(format => {
    let thisFolder = ''.concat(parentOutputFolder, '/', folder)
    console.log({format, thisFolder})
    sourceContent[folder].forEach(file => {
      // Get filename, sans extension
      let base = path.parse(file.filename).name

      // Append format to filename
      let newFilename = ''.concat(base, '__', format, '.md')

      // Set vars for creating the files
      let filepath = path.join(thisFolder, newFilename)
      let data = file.contents

      // Create the file in the output subfolder, populate with data
      fs.writeFileSync(filepath, data)

      // Run the regex
      replaceText(filepath, format)
    })
  })
}


/**
 * The fun stuff, regex
 */

function replaceText (file, mdFormat) {
  console.log('Replacing file contents...')
  console.info({file, mdFormat})
  gulp.src([file]) // Any file globs are supported
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

    .pipe(gulp.dest(file))

  // To capture a node:
  //    /(?<=^(?![\r\n])|\n{2})(.+\n{1}?)+(?=\n|$(?![\r\n]))/gm

}