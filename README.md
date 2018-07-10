<img width="200" src="_source/images/logo/logz-logo.svg">


# Logz.io Docs

Welcome to the source repo for Logz.io Docs!

Our site is built on Jekyll. We merge the `develop` branch as needed. Docs are released to docs.logz.io from `master`.

#### Contents

* [Contributions](#contributions)
  * [What pull requests we can't merge](#what-pull-requests-we-cant-merge)
  * [Community guidelines](#community-guidelines)
* [Setup](#setup)
  * [Making your first pull request](#making-your-first-pull-request)
* [Previewing locally](#previewing-locally)
* [Keeping your fork synchronized](#keeping-your-fork-synchronized)
* [Working in Markdown](#working-in-markdown)
  * [Headings](#headings)
  * [Procedures](#procedures)
  * [Info boxes](#info-boxes)
  * [Code highlighting](#code-highlighting)

## Contributions

Please follow the [Setup](#setup) instructions so you can start.

Submit all pull requests to the `develop` branch.

If you just want to submit a quick edit suggestion, you can [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md).

Please [preview](#previewing-locally) your changes locally before submitting pull requests.

### What pull requests we can't merge

We need to reject any pull requests that include these changes:

  * Changes to our OpenAPI file
  * Changes to our config file
  * Changes to contributor information, other than your own

If you want to suggest a change or report an error in any of these files, please [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md).

Please note we reserve the right to decline or change a pull request for any reason.

### Community guidelines

Please review the [Logz.io Community Code of Conduct](CODE_OF_CONDUCT.md)

## Setup

If you haven't contributed to logz-docs before, follow these steps to get started.

[Join GitHub](https://github.com/join) if you don't already have an account.

**Install dependencies:**

1. [Git](https://help.github.com/articles/set-up-git/)

2. [Xcode](https://developer.apple.com/xcode/)

3. Xcode command line tools: `xcode-select --install`.

4. [RVM with Ruby](https://rvm.io/rvm/install): `curl -sSL https://get.rvm.io | bash -s stable --ruby`

5. [Homebrew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

6. [Fork](https://github.com/logzio/logz-docs/fork) the logz-docs repository

7. [Bundler](https://bundler.io/): `sudo gem install bundler`

8. Clone the logz-docs fork, switch to the logz-docs folder on your machine, and checkout the `develop` branch:

    ```shell
    git clone https://github.com/<your_github>/logz-docs.git
    cd logz-docs
    git checkout develop
    ```

9. [Jekyll](https://jekyllrb.com/): `sudo gem install bundler jekyll`

10. Install logz-docs Ruby gems: `sudo bundle install`

### Making your first pull request

We like to give contributors credit for their work, so go ahead and add yourself as a contributor in your first pull request.

1. Find the contributors folder on your machine at `logz-docs/_source/logzio_collections/_contributors`. Add a new Markdown file named with your GitHub username and the `.md` extension.

    So if your GitHub username is agrant, your file is named `agrant.md`. This is your identifier when you contribute to docs.

2. Copy this YAML content to the file, and add your information. If something doesn't apply to you, delete the line:

    ```yaml
    ---
    title: <your name>
    website: <your website url>
    linkedin: <your linkedin username>
    twitter: <your twitter handle>
    github: <your github username>
    ---
    ```

3. Save and commit.

4. Include this file when you make your first pull request. If you're authoring a file, add your identifier (GitHub username) to the `contributors` list.

    So if your username is chaostheory, you'll add `- chaostheory` to the `contributors` list.

## Previewing locally

Before submitting pull requests, preview your changes locally. This does a few things to help you catch mistakes:

* Seeing the formatted text, outside of a text editor and without all the markup, gives you a fresh look at your content.
* You can be sure that your Markdown is formatted correctly and converts to HTML just as you meant it to.

We ask that you check your work for errors and readability.

**To preview locally:**

1. Run `jekyll serve`

2. Point your browser to [http://localhost:4000/](http://localhost:4000/)

## Keeping your fork synchronized

If you want to continue contributing, you'll need to keep your fork up to date with the logz-docs repo. This is a pretty simple process.

**To set logz-docs as a remote upstream repo:**

You'll only need to do this once. After this, you can simply pull remote changes into your local fork.

1. Open a terminal window, and `cd` into your logz-docs folder.
2. Make sure you haven't already set your remote upstream: `git remote -v`

    If you see two `origin` and two `upstream` lines, you already have an upstream repo. You can skip ahead 👇👇👇 and pull changes from logz-docs into your fork.

3. Add logzio/logz-docs as a remote upstream repo:
    ```shell
    git remote add upstream https://github.com/logzio/logz-docs.git
    git fetch upstream
    ```

**To pull changes from logz-docs into your fork:**

1. Open a terminal window, and `cd` into your logz-docs folder.
2. Checkout your local develop branch, pull the logzio/logz-docs develop branch, and push the updates to your fork:
    ```shell
    git checkout develop
    git pull upstream develop
    git push
    ```

## Working in Markdown

Logz.io docs use kramdown-flavored Markdown. Where possible, avoid HTML tags.

Some notes:

* Leave a blank line between text blocks.
* Indents are two spaces (not tabs). To nest blocks in a list, indent twice (four spaces). This keeps nested items from breaking a list.
* You _can_ put Markdown formatting in an HTML container, but please preview your code locally to make sure nothing unexpected is happening with the HTML conversion.

### Headings

* Use `##` through `#####` (h2 through h5) for normal headings.
* Use `######` (h6) to introduce procedures and how-tos.
* Our template reserves `#` (h1) for page titles. Don't use.

### Procedures

* There isn't a strict style for procedures, except to make them as simple as possible.
* Avoid long procedures. If your procedure has more than 10 steps, shorten it, or break it apart into multiple procedures.
* You can use ordered and unordered lists in procedures. Lists can be nested two levels deep.
* Nest other blocks in the second level by indenting the block another level. This keeps nested blocks from breaking lists.

### Info boxes

Info boxes need a `<div class="info-box">` container.

Info boxes come in three CSS classes: `note`, `tip`, `gotcha`, `warning`. CSS handles the styling and adds a header.

Indent content on its own lines between the `<div>` tags.

**Notes**

```html
<div class="info-box note">
  Notes are generally non-actionable. They’re more important
  than the surrounding text but less important than
  warnings. Could something bad happen if the user ignores
  this? If no, then it’s a note. Otherwise, it’s a gotcha.
</div>
```

**Tips**

```html
<div class="info-box tip">
  Pro tips convey best practices and good actions to ensure
  success. Think of these as more proactive than gotchas.
</div>
```

**Gotchas**

```html
<div class="info-box gotcha">
  Gotchas help the user work through common trip-up points.
  If the user could cause damage by ignoring the gotcha,
  consider a warning instead.
</div>
```

**Warnings**

```html
<div class="info-box warning">
  Use warnings when the user could cause damage that’s
  difficult or impossible to recover from. If you need
  something less severe than a warning, consider a gotcha
  or a note.
</div>
```

### Code highlighting

Surround inline code samples with a single backtick: `` `code sample` ``

Jekyll supports syntax highlighting for code blocks if you say what the code actually is.

For example, for HTML:

````html
```html
<i class="fas fa-dove"></i>

<div class="info-box note">
  This is a note.
</div>
```
````
