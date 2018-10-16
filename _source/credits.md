---
layout: article
title: Our contributors
permalink: /credits.html
community-info: false
search: false
---

{%- assign contributors = site.contributors | sort: "title" %}
<div class="contributions">

  <ul>
  {% for contributor in contributors %}
    <li><a href="{{contributor.url | prepend: site.baseurl}}">{{contributor.title}}</a></li>
  {% endfor %}
  </ul>

</div>

[Open source software used in the Docs](https://github.com/logzio/logz-docs#open-source-software-used-in-docs)
