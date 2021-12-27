---
layout: article
title: Integrations available for Logz.io Cloud SIEM
permalink: /user-guide/cloud-siem/integrations
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Cloud SIEM security rules and dashboards
flags:
  logzio-plan: pro
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

{% for doc in site.security-sources %}
* [{{doc.data-source}}]({{doc.url}})
{%- endfor -%}
