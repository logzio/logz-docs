---
title: Customer announcements
permalink: /customer-announcements/
---

Come here to find out what's new with Logz.io.
Learn about recent updates, the most important changes, and new feature releases.

## What's new?

{% for message in site.customer-announcements -%}
{%- assign filename = message.path | split: "/" | last | split: "." | first -%}
{%- unless filename=="index" %}
  * [{{message.title}}]({{message.url}})
{%- endunless -%}
{%- endfor -%}
