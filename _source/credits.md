---
layout: article
title: Contributors & credits
community-info: false
---

<div class="contributions">

  <h3>Here are our contributors</h3>

  <ul>
  {% for contributor in site.contributors %}
    <li><a href="{{contributor.url | prepend: site.baseurl}}">{{contributor.title}}</a></li>
  {% endfor %}
  </ul>

  <h3> And the open source stuff we used in docs </h3>

  <ul>
    <li><a href="https://fontawesome.com/">Font Awesome 5 Free</a></li>
    <li><a href="https://jquery.com/">jQuery</a></li>
    <li><a href="https://jekyllrb.com/">Jekyll</a></li>
    <li><a href="https://www.bryanbraun.com/anchorjs/">AnchorJS</a></li>
  </ul>

</div>