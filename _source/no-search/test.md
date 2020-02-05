---
layout: article
title: TEST PAGE
permalink: /test/
# community-info: false
---

<P>Was this page helpful?</p>

<form name="docs-feedback" method="POST" data-netlify="true">

<div>

  <input type="hidden" id="page-title" name="page-title" value="{{page.title}}">
  <input type="hidden" id="page-url" name="page-url" value='{{site.baseurl | append: "/" | append: page.url}}'>

  <button id="feedback-positive" type="button" value="feedback-positive">Yes</button>
  <button id="feedback-negative" type="button" value="feedback-negative">No</button>

  <button type="submit">Send feedback</button>

</div>

</form>
