---
layout: article
title: Product announcements
published: false
community-info: false
---

{% assign this_year = site.data.product-announcements.this_year %}
{% assign previous_years = site.data.product-announcements.previous_years %}
{% assign blog_baseurl = site.data.product-announcements.settings.blog_baseurl %}

## Updates this year

{% for feature in this_year %}

#### {{ feature.title }}

{{ feature.date }}

{{ feature.description }}

  {% if feature.blog %}
  [Read more on our blog]({{ feature.blog | prepend: blog_baseurl }})
  {% endif %}

{% endfor %}


{% if previous_years %}

## Previous years

{% for year in previous_years %}

### {{ year[0] | remove_first: "y" }}


  {% for feature in year[1] %}

##### {{ feature.title }}

{{ feature.date }}

{{ feature.description }}

  {% if feature.blog %}
  [Read more on our blog]({{ feature.blog | prepend: blog_baseurl }})
  {% endif %}


  {% endfor %}

{% endfor %}

{% endif %}