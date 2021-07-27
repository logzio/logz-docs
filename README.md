<img width="200" src="_source/images/logo/logz-logo.svg">

# Logz.io Docs &nbsp; &nbsp; [![Netlify Status](https://api.netlify.com/api/v1/badges/3a2c5e61-7e63-4058-8825-619c89323f95/deploy-status)](https://app.netlify.com/sites/logz-docs/deploys)

Welcome to the source repo for Logz.io Docs!

Our site is built on Jekyll.
Docs are continuously deployed to docs.logz.io from `master`.

#### Contents

* [Contributions](#contributions)
  * [What pull requests we can't merge](#what-pull-requests-we-cant-merge)
  * [Community guidelines](#community-guidelines)
* [Setup](#setup)
* [Changes and pull requests](#changes-and-pull-requests)
  * [Syncing your fork](#syncing-your-fork)
  * [Previewing locally](#previewing-locally)
  * [Making your first pull request](#making-your-first-pull-request)
* [Working in Markdown](#working-in-markdown)
  * [The basics](#the-basics)
  * [Headings](#headings)
  * [Procedures](#procedures)
  * [Info boxes](#info-boxes)
  * [Code highlighting](#code-highlighting)
* [Credits and contributors](#credits-and-contributors)
  * [Open source software used in Docs](#open-source-software-used-in-docs)

## Contributions

Please follow the [Setup](#setup) instructions so you can start.

Make all pull requests to the `master` branch.

If you just want to submit a quick edit suggestion, you can [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md).

Please [preview](#previewing-locally) your changes locally before submitting pull requests.

### What pull requests we can't merge

We need to reject any pull requests that include these changes:

* Changes to our OpenAPI file
* Changes to our config file
* Changes to another contributor's information

If you want to suggest a change or report an error in any of these files, please [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md).

We might decline a pull request for another reason,
but usually we just ask some follow-up questions and request small changes.

### Community guidelines

Please review the [Logz.io Community Code of Conduct](CODE_OF_CONDUCT.md)

## Setup

If you haven't contributed to the Logz.io Docs before, follow these steps to get started.

[Join GitHub](https://github.com/join) if you don't already have an account.

**Install dependencies**:

1. [Git](https://help.github.com/articles/set-up-git/)

2. macOS: [Xcode](https://apps.apple.com/il/app/xcode/id497799835?mt=12)

3. macOS: Xcode command line tools: `xcode-select --install`.

4. macOS: [Homebrew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

5. [RVM with Ruby](https://rvm.io/rvm/install): `curl -sSL https://get.rvm.io | bash -s stable --ruby`

6. [Bundler](https://bundler.io/): `sudo gem install bundler`

7. [Node and npm](https://www.npmjs.com/get-npm):
  Check that they're installed (`node -v`, `npm -v`).
  If not, [download Node.js](https://nodejs.org/en/).
  (npm is installed as part of Node.js).

8. [Fork](https://github.com/logzio/logz-docs/fork) the logz-docs repository

9. Clone your fork and add logzio/logz-docs as your upstream repo:

    ```shell
    git clone https://github.com/<your_github>/logz-docs.git
    cd logz-docs
    git remote add upstream https://github.com/logzio/logz-docs.git
    git fetch upstream
    ```

11. Install Jekyll and logz-docs dependencies:
  `sudo bundle install`,
  `npm install`

## Changes and pull requests

We use `master` as the main branch.
Our site deploys every time we merge to `master`.

For you, this means that you should create new branches and make your changes there.
You should also regularly sync your fork with the upstream repo (logzio/logz-docs) so that we can merge your changes without any problems.

So the ideal process looks a little like this:

[Sync](#syncing-your-fork) ➜ New branch ➜ Changes ➜ [Preview](#previewing-locally) ➜ Push ➜ [Pull request](#making-your-first-pull-request)

### Syncing your fork

Keeping your fork up to date allows us to easily merge your changes.
This is a pretty simple process.

**To sync your fork**:

1. Open a terminal window and `cd` into your logz-docs folder.

2. Checkout your local `master` branch, pull the logzio/logz-docs `master` branch, and push the updates to your fork:

    ```shell
    git checkout master
    git pull upstream master
    git push
    ```

### Previewing locally

Before submitting pull requests, preview your changes locally.
This does a few things to help you catch mistakes:

* Seeing the formatted text, outside of a text editor and without all the markup, gives you a fresh look at your content.
* You can be sure that your Markdown is formatted correctly and converts to HTML just as you meant it to.

Please check your work for errors and readability.

**To preview locally**:

1. Run `./preview.sh`.

2. Point your browser to [http://localhost:4000/](http://localhost:4000/).
  (Don't worry about the ducks.
  They're just there to tell you this is a local preview and not on the web.)

### Making your first pull request

We like to give contributors credit for their work, so go ahead and add yourself as a contributor in your first pull request.

**To add yourself as a contributor**:

1. Find the contributors folder on your machine at `logz-docs/_source/logzio_collections/_contributors`.
  Add a new Markdown file, named `<your-github-username>.md`. \
  So if your GitHub username is agrant, your file is named `agrant.md`. This is your identifier when you contribute to docs.

2. Copy this YAML content to the file, and add your information.
  If something doesn't apply to you, delete the line that doesn't apply:

    ```yaml
    ---
    title: <your name>
    website: <your website url>
    linkedin: <your linkedin username>
    twitter: <your twitter handle>
    github: <your github username>
    ---
    ```

    Don't add any other content to the file.

3. Save and commit.

4. Include this file in your first pull request.
  If you're authoring a file, add your identifier (GitHub username) to the `contributors` list. \
  So if your username is chaostheory, you'll add `- chaostheory` to the file's `contributors` list.

## Working in Markdown

Logz.io Docs use kramdown-flavored Markdown. Where possible, avoid HTML tags.

Some notes:

* Leave a blank line between text blocks.
* Indents are two spaces (not tabs).
  To nest blocks in a list, indent twice (four spaces). This keeps nested items from breaking a list.
* You _can_ put Markdown formatting in an HTML container, but please preview your code locally to make sure nothing unexpected is happening with the HTML conversion.

### The basics

````markdown
**bold**

_italic_

`inline code`

```
fenced
code
block
```

<!-- For a link that opens in the same tab -->
[Link placeholder](https://url.com/)

<!-- For alink to open in a new tab -->
<a href="https://url.com/" target="_blank">Link placeholder</a>

![Image alt text](/url/of/image.png)

[![Linked image](/url/of/image.png)](https://target.link/page.html)

* unordered list
* list item 2
* list item 3

<!-- This is Kramdown-specific and probably won't work with other Markdown flavors -->
Term 1
: Definition 1

Term 2
: Definition 2


| Table heading | Table heading 2 |
|---|---|
| Table body 1 | Table body 2 |
| Table body 3 | Table body 4 |
````

### Headings

* Our template reserves `#` (h1) for page titles.
* Use `##` and `###` (h2 and h3) for normal headings.
* Use `####` through `######` (h4 through h6) are reserved for procedures.

### Procedures

* We don't have a strict style for procedures,
  except to make them as simple as possible.
* Avoid long procedures.
  If your procedure has more than 10 high-level steps,
  shorten it, or break it apart into multiple procedures.



````md
#### Procedure title

**Before you begin, you'll need**:
A list of prerequisites,
Some of them with [links](#) to external docs,
If applicable

<!-- 👇 This gives the necessary CSS -->
<div class="tasklist">

##### Step 1 headline

Body text.

Keep it short.

##### Step 2 headline

You don't need to add numbers to the steps.
The CSS will take care of all that.

Include code blocks in fenced backticks...

```py
...like this one
```

###### Parameters

☝ H6 are used for subheads within the procedure.
Parameter lists are always introduced with a subhead.

| Parameter | Description |
|---|---|
| param1 <span class="required-param"></span> | Include this span if parameter is required. Required params are always at the top of the list, with rare exception. |
| param2 <span class="default-param">`"default value"`</span> | If there's a default, include it here. <br> If you need a line break, hard code it. |
{:.paramlist}

☝ Add `{:.paramlist}` to the end of parameter tables so they're formatted properly.
Use the `<br>` tag for a hard line break.

`.paramlist` tables must always be two columns.

</div>

````

### Info boxes

Info boxes need to live in their own text blocks and are followed by a kramdown attribute string: `{:.info-box.<kind_of_note>}`

Info boxes come in these CSS classes: `note`, `tip`, `important`, `warning`, `read`.
CSS handles the styling and adds a header.

**Notes**

```
Notes are generally non-actionable. They’re more important
than the surrounding text but less important than
warnings. Could something bad happen if the user ignores
this? If no, then it’s a note. Otherwise, it’s an important note.
{:.info-box.note}
```

**Tips**

```
Pro tips convey best practices and good actions to ensure success.
Think of these as more proactive than important notes.
{:.info-box.tip}
```

**Important notes**

```
Important notes help the user work through common trip-up points.
If the user could cause damage by ignoring the important note,
consider a warning instead.
{:.info-box.important}
```

**Warnings**

```
Use warnings when the user could cause damage that’s
difficult or impossible to recover from. If you need
something less severe than a warning, consider an important note
or a note.
{:.info-box.warning}
```

### Code highlighting

Surround inline code samples with a single backtick: `` `code sample` ``

Jekyll supports syntax highlighting for code blocks if you say what the code actually is.

For example, for HTML:

````html
```html
<i class="fas fa-dove"></i>
```
````

## Git branch groups

_For the Logz.io docs team_:
Here's a list of branch groups that we should use
to clarify what we're working on.

* api
* shipping
* ui
* docs-tooling
* docs-misc
* integrations

## Credits and contributors

We invite contributions to docs, and we maintain a [list of contributors](https://docs.logz.io/credits.html) at the Logz.io Docs site.

### Open source software used in Docs

* [clipboard.js](https://clipboardjs.com/)
* [Easytabs](https://os.alfajango.com/easytabs/)
* [Font Awesome 5 Free](https://fontawesome.com/)
* [GitHub Octicons](https://github.com/primer/octicons/)
* [Jekyll](https://jekyllrb.com/)
* [jQuery](https://jquery.com/) and [jQuery UI](https://jqueryui.com/)
* [Lunr](https://lunrjs.com/)
* [tablesorter](http://tablesorter.com/docs/)
