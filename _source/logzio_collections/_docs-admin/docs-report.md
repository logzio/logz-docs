---
layout: article
title: Docs report
sitemap: false 
noindex: true
---
{%- include tags/capture-site-pages.html -%}

**Site build time**: {{site.time}}

### Page flags

| Page | Admin | Beta | Logz.io plan |
|---|---|---|---|
{%- for p in allPages %}
| [{{p.title | default: p.url | split: "/" | last }}]({{p.url}}) | {{p.flags.admin}} | {{p.flags.beta}} | {{p.flags.logzio-plan}} |
{%- endfor -%}