---
title: Technical notes
permalink: /technical-notes/
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
