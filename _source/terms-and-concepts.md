---
layout: article
title: Terms and concepts
permalink: /terms-and-concepts.html
contributors:
  - imnotashrimp
---

{%- assign glossary = site.data.logzio-terms | sort -%}

{: .glossary-list}
{%- for term in glossary %}
{{term[0]}}
: {{term[1]}}
{% endfor %}