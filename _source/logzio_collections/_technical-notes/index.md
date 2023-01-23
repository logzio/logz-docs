---
title: Technical notes
permalink: /technical-notes/
show-date: false
description: Learn about recent updates, important changes, and new feature releases for Logz.io.
sitemap: false 
noindex: true
---

Come here to find out what's new with Logz.io.
Learn about recent updates, the most important changes, and new feature releases.

## What's new?

{% for message in site.technical-notes -%}
{%- assign filename = message.path | split: "/" | last | split: "." | first -%}
{%- unless filename=="index" %}
  * [{{message.title}}]({{message.url}})
{%- endunless -%}
{%- endfor -%}
