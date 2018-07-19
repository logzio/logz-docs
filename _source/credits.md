---
layout: article
title: Our contributors
permalink: /credits.html
community-info: false
search: false
---

<div class="contributions">

  <ul>
  {% for contributor in site.contributors %}
    <li><a href="{{contributor.url | prepend: site.baseurl}}">{{contributor.title}}</a></li>
  {% endfor %}
  </ul>

<!-- ### Open source stuff we used in docs

  * [Font Awesome 5 Free](https://fontawesome.com/)
  * [jQuery](https://jquery.com/)
  * [Jekyll](https://jekyllrb.com/)
  * [Lunr](https://lunrjs.com/)
  * [tablesorter](https://github.com/mottie/tablesorter) -->

</div>