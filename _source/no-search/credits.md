---
layout: article
title: Our writers
permalink: /credits.html
sitemap: false
show-date: false
community-info: false
---

{%- assign contributors = site.contributors | sort: 'title' -%}

<div class="contributions">

  <ul>
  {% for contributor in contributors %}
    <li><a href="{{contributor.url | prepend: site.baseurl}}">{{contributor.title}}</a></li>
  {% endfor %}
  </ul>

</div>

[Open source software used in the Docs](https://github.com/logzio/logz-docs#open-source-software-used-in-docs)
