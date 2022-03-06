---
layout: article
title: Finding your way around Logz.io
permalink: /user-guide/a-front_matter/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Finding your way around Logz.io
flags:
  logzio-plan: community
tags:
contributors:
  - yberlinger
---

This is a placeholder topic to direct users on how to get started

NOTE: Consider using branching tabs to help users navigate to overview sections - or single source

1. Overview of Logz.io & the basics that must happen before you can send data -
    a. Strategy: Single source the content or Switchboard link to existing parent/child topic
    b. Logzio overview of each data domain (single source this to each Parent topic for Logs, Security, Metrics, Tracing.
    c. Account and user setups
1. SYD
1. APIs
1. Do stuff in each product data domain
1. Admin zone
1. Integrations


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
