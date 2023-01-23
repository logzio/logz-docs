---
layout: article
title: Docs admin
permalink: /docs-admin/
sitemap: false 
noindex: true
additional-docs:
  - name: Shipping manifest (for this deploy only)
    permalink: /data/shipping-manifest.json
  - name: robots.txt
    permalink: /robots.txt
---

{%- assign thisCollection = site.collections
  | where: "label", page.collection
  | first -%}

This build's environment: {{jekyll.environment}}

### Admin TOC

{% for doc in thisCollection.docs %}
  {%- assign filename = doc.path | split: "/" | last | split: "." | first -%}
  {%- unless filename == "index" %}
  * [{{doc.title}}]({{doc.url}})
  {%- endunless -%}
{%- endfor -%}
{%- for doc in page.additional-docs %}
  * [{{ doc.name }}]({{ site.baseurl | append: doc.permalink }})
{%- endfor %}