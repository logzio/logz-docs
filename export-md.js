console.clear()
const readline = require("readline")
const path = require('path')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs-extra')
const gulp = require('gulp')
const replace = require('gulp-string-replace')

console.group('Getting started...')

// Set the output formats we want to use
const outputFormats = [ 'GFM' , 'CONTENTFUL' ]

// Set the folders this script runs on
const collectionsFolder
  = path.normalize(__dirname + '/_source/logzio_collections/')
const markdownFolders
  = [ '_log-sources' , '_metrics-sources' ]

let sourceFolderPaths = []
markdownFolders.forEach(folder =>
  sourceFolderPaths.push(path.normalize(collectionsFolder + folder + '/'))
)

// Set the output folder
const parentOutputFolder
  = path.normalize(__dirname + '/_export-md')
fs.emptydirSync(parentOutputFolder) // Clean or create the output folder

console.info({outputFormats, collectionsFolder, markdownFolders, sourceFolderPaths, parentOutputFolder})

console.groupEnd()

/**
 * THE STEPS
 * for each sourceFolder:
 *    collect the files in an array
 *      for each file:
 *        for each outputFormat:
 *          read all the files, copy to output folder and name original-name.CONTENTFUL.md or original-name.GFM.md
 *          run through the right regex
 */

// This will feed the output folder when it's populated
let sourceContent = {}

// Build sourceContent structure
sourceContent = addFoldersToSourceContentArr(sourceContent)

// Add source content to the array
sourceContent = buildSourceContentArr(sourceContent)

console.log({parentOutputFolder, outputFormats})

makeOutputSubfolders()


allDone() // close the program

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
    let sourceFolder = path.normalize(collectionsFolder + folder + '/')
    console.log(`Working on ${sourceFolder} ...`)
    // Collect the filenames in an array
    let filenames = fs.readdirSync(sourceFolder)
    filenames.forEach(file => {
      let filepath = path.normalize(sourceFolder + file)
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
    fs.mkdirSync(path.normalize(parentOutputFolder + '/' + subfolder))
  )
}

const getFile = () => {
  cleanDir()
  var file = copyFile()
  console.log(file)
  fs.readFileSync(srcFile, { encoding: 'utf-8' })
}

const copyFile = () => {
  var filename = srcFile.match(/(?<=^.*\/)(\w|-)+\.md$/g)[0]
  var destFile = `${__dirname}/${outputDir}/${filename}`
  fs.copyFileSync(srcFile, destFile)
  var result = destFile
  return result
}

/**
 * The fun stuff, regex
 */

const replaceText = (file, output) => {
  gulp.src([srcFile]) // Any file globs are supported
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

  // To capture a node:
  //    /(?<=^(?![\r\n])|\n{2})(.+\n{1}?)+(?=\n|$(?![\r\n]))/gm

}