---
layout: article
title: Integrations available for Logz.io Infrastructure Monitoring
permalink: /user-guide/metrics/integrations
flags:
  logzio-plan: community
tags:
  - metrics integrations
contributors:
  - shalper
---
Logz.io provides pre-configured metrics dashboards for the following:

{% for doc in site.metrics-sources | sort %}
* [{{doc.data-source}}]({{doc.url}})
{%- endfor -%}
