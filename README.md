![Logz.io](https://logz.io/wp-content/themes/Avada-Child-Theme/images/logz-logo.svg)

# Logz.io Docs

Welcome to the source repo for Logz.io Docs! Our site is built on Jekyll. 

We merge the `develop` branch as needed. Docs are released to docs.logz.io from `master`.

#### Contents

* [Contributions](#contributions)
  * [What pull requests we can't merge](#what-pull-requests-we-cant-merge)
* [Setup](#setup)
  * [Making your first pull request](#making-your-first-pull-request)
* [Previewing locally](#previewing-locally)
* [Working in Markdown](#working-in-markdown)
  * [Headings](#headings)
  * [Procedures](#procedures)
  * [Info boxes](#info-boxes)
  * [Code highlighting](#code-highlighting)

## Contributions

Please folow the [Setup](#setup) instructions so you can start

Submit all pull requests to the `develop` branch.

If you just want to submit a quick edit suggestion, you can [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md) or submit a pull request.

Please preview your changes locally before submitting pull requests.

### What pull requests we can't merge

We need to reject any pull requests that include these changes:

  * Changes to our OpenAPI file
  * Changes to our config file
  * Changes to contributors information other than your own

If you want to suggest a change or report an error in any of these files, please [open an issue](https://github.com/logzio/logz-docs/issues/new?template=docs-issue.md).

Please note we reserve the right to decline a pull request for any reason.

## Setup

If you haven't contributed to logz-docs before, follow these steps to get started.

[Join GitHub](https://github.com/join) if you don't already have an account.

**Install dependencies:**

1. [Git](https://help.github.com/articles/set-up-git/)

2. [Xcode](https://developer.apple.com/xcode/)

3. Xcode command line tools: **Xcode > Preferences > Downloads** (These are bundled in Xcode as of OS X 10.9). You may need to run `xcode-select --install`.

4. [RVM with Ruby](https://rvm.io/rvm/install): `\curl -sSL https://get.rvm.io | bash -s stable --ruby`

5. [Homebrew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

6. [Fork](https://github.com/logzio/logz-docs/fork) the logz-docs repository

7. [Bundler](https://bundler.io/): `sudo gem install bundler`

8. Clone the logz-docs fork, switch to the logz-docs folder on your machine, and checkout the `develop` branch:

    ```
    git clone https://github.com/<your_github>/logz-docs.git
    cd logz-docs
    git checkout develop
    ```

9. [Jekyll](https://jekyllrb.com/): `gem install bundler jekyll`

10. Install logz-docs Ruby gems: `bundle install`

### Making your first pull request

We like to give contributors credit for their work, so go ahead and add yourself as a contributor in your first pull request.

1. In the logz-docs folder on your machine, find the contributors folder (`logz-docs/_source/logzio_collections/_contributors`). Add a new Markdown file with your first initial and last name, and the `.md` extension. 

    So if your name is Allen Grant, your file is named `agrant.md`. This is your identifier.

2. Copy this YAML content to the file, and add your information. If something doesn't apply to you, delete the line:

    ```
    ---
    title: <your name>
    website: <your website url>
    linkedin: <your linkedin username>
    twitter: <your twitter handle>
    github: <your github username>
    ---
    ```

3. Save and commit.

4. Include this file when you make your first pull request. If you're authoring a file, add your identifier to the `contributors` list (first name, last initial). 

    So if your name is Ian Malcolm, you'll add `- imalcolm` to the `contributors` list.

## Previewing locally

Before submitting pull requests, we ask that you preview your changes locally. This does a few things to help you catch mistakes:

* Seeing the formatted text, outside of a text editor and without all the markup, gives you a fresh look at your content.
* You can be sure that your Markdown is formatted correctly and converts to HTML just as you meant it to.

We also ask that you check your work for errors and readability.

**To preview locally:**

1. Run `jekyll serve`

2. Point your browser to [http://localhost:4000/](http://localhost:4000/)

## Working in Markdown

Logz.io docs use kramdown-flavored Markdown. Where possible, avoid HTML tags.

Some notes:

* Leave a blank line between blocks.
* Indents are two spaces (not tabs). To nest blocks in a list, add another indent. This keeps nested items from breaking a list.
* You _can_ put Markdown formatting in an HTML container, but please preview your code locally to make sure nothing unexpected is happening with the HTML conversion.

### Headings

* Our template reserves `#` (h1) for page titles. Don't use.
* Use `##` through `#####` (h2 through h5) for normal headings.
* Use `######` (h6) to introduce procedures and how-tos.

### Procedures

* There isn't a strict style for procedures, except to make them as simple as possible.
* Avoid long procedures. If your procedure has more than 10 steps, shorten it, or break it apart into multiple procedures.
* You can use ordered and unordered lists in procedures. Lists can be nested two levels deep.
* Nest other blocks in the second level by indenting the block another level. This keeps nested blocks from breaking lists.

### Info boxes

Info boxes need a `<div class="info-box">` container.

Info boxes come in 3 CSS classes: `note`, `tip`, `gotcha`, `warning`. CSS handles the styling and adds a header.

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

```
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


_Copyright 2018 Logz.io_

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0