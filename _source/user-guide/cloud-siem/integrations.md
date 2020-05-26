---
layout: article
title: Integrations available for Logz.io Cloud SIEM
permalink: /user-guide/cloud-siem/integrations
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - security-summary
  - security-threats
  - security-research
  - security-rules
contributors:
  - shalper
---

Logz.io provides security rules and dashboards for the following security products:

{% for doc in site.log-sources %}
{%- if doc.shipping-tags contains 'security' %}
* [{{doc.data-source}}]({{doc.url}})
{%- endif -%}
{%- endfor -%}
