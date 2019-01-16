---
title: Customer announcements
permalink: /customer-announcements/
---

{% for message in site.customer-announcements -%}
{%- assign filename = message.path | split: "/" | last | split: "." | first -%}
{%- unless filename=="index" %}
  * [{{message.title}}]({{message.url}})
{%- endunless -%}
{%- endfor -%}