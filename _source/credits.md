---
layout: article
title: Contributors & credits
community-info: false
search: false
---

<div class="contributions">

### Here are our contributors

  <ul>
  {% for contributor in site.contributors %}
    <li><a href="{{contributor.url | prepend: site.baseurl}}">{{contributor.title}}</a></li>
  {% endfor %}
  </ul>

### And the open source stuff we used in docs

  * [Font Awesome 5 Free](https://fontawesome.com/)
  * [jQuery](https://jquery.com/)
  * [Jekyll](https://jekyllrb.com/)
  * [tablesorter](https://github.com/mottie/tablesorter)

</div>