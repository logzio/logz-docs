# How CSS is organized in the docs

CSS is organized across multiple files and called from the `head.html` include.

These are the files you need to pay attention to:

* **_source/_includes/head.html**: The `<head>` tag, where the CSS is called
* **_source/css/logz-docs.css**: The main CSS file. Links to all the other CSS files.
* **_source/css/logz-api-ref.css**: CSS file for the API page only. Controls iframe sizing for the header and footer

## The CSS files

The CSS is split into multiple files for easier reading and maintenance.
All the CSS files are imported using the main CSS file `logz-docs.css`.

* **404.css**: styles the 404 page
* **cards.css**: styles cards on the home and the shipping page
* **code.css**: styles code and syntax highlighting
* **flags.css**: styles flags that come at the top of the page
* **header-footer.css**: styles the header and footer
* **headings.css**: styles the headings (h1 through h6)
* **info-boxes.css**: styles notes, warnings, and tips
* **lists.css**: all lists and definition lists
* **logz-api-ref.css**: styles header and footer iframes for the api doc
* **logz-docs.css**: the main file
* **logzio-icons.css**: makes usable icons from the logzio icon font, à la fontawesome before it went all svg.
* **search.css**: the search box
* **toc.css**: left toc
* **vars.css**: variables used throughout all CSS files

### To add a new CSS file

If you need to add a new css file, make a new file and import it in `logz-docs.css`.

For example:

* New file: `new-file.css`
* Import statement in logz-docs.css: `@import url('new-file.css');`

Just keep in mind it behaves as if everything is in one single css file, in the order of your import list. So you should test all new CSS to make sure it doesn't conflict with anything else.

## Logz.io icons

These are the files:

* **_source/_data/logzio-icons.yml**: Contains the character codes & class names for each character. The icons are organized in order of their unicode escape sequence.
* **_source/css/logzio-icons.css**: The css file that allows usage of the font. You won't need to touch this file.
* **_source/fonts/logzio-icon-font.ttf**: The font itself.

### Using a Logz.io icon

Use the `logzio-icon` snippet to get the html, and then get the class name from `logzio-icons.yml` or from the canary testing page.

### Managing the Logz.io icons

`logzio-icons.css` is what allows us to use the Logz.io font icons in the docs. I've imported things as I needed them, which means not all icons are usable in the docs.

**An important note on how logzio-icons.yml is organized**:
logzio-icons.yml is organized by character escape sequence, alphanumerically. This keeps us from duplicating characters that we didn't know were there.

**To add an icon to the list**:

1. Open the font in FontBook on your mac. You can't do this from Visual Studio Code. You'll need to do it from the Finder.
2. Hover over an icon. You'll see something like this:
    ```text
    Glyph 33
    U+E147
    ```
    It's the part after the `U+` you care about here, in this case `E147` — that's the part you'll use in the yaml file.
3. The yaml file is arranged in alhpanumerical order of the escape sequence. So for our `E147` example, the escape sequence is `\e147`. Find where in the file this character goes, and make a new entry. So for our example it would look something like this:
  ```yaml
  - escape-sequence: \e147
    class: plus-circle-filled
  ```
