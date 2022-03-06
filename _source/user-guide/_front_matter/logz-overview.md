---
layout: article
title: Getting started
permalink: /user-guide/_front_matter/logz-overview.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Finding your way around Logz.io
flags:
  logzio-plan: community
tags:
contributors:
  - yberlinger
---

This is a placeholder topic

## Tabs

Tabs come in 3 parts:

* A container (uses `.branching-container` class)
* The list of tabs (uses `.branching-tabs` class). Each list item is a link to a tab's `div`.
* Each tab is a separate `div` with an id from the tab list.

### Some regex that works

`^(\*.+\n)+{:.branching-tabs}` captures the tab list.

### Sample

```html
<!-- tabContainer:start -->
<div class="branching-container">

* [Tab 1 config <span class="sm ital">(recommended)</span>](#tab-1-config)
* [Tab 2 config](#tab-2-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="tab-1-config">

## Tab 1 content

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="tab-2-config">

## Tab 2 content

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
```

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="paramlists">
