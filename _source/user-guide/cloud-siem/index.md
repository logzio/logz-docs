---
layout: article
title: Logz.io Cloud SIEM
permalink: /user-guide/cloud-siem/
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-summary
  - security-threats
  - security-research
  - security-rules
contributors:
  - imnotashrimp
  - danielberman
---

Logz.io Cloud SIEM combines the ELK stack
with advanced security analytics tools
to help you identify and remediate threats to your system.
With Cloud SIEM, you can identify
potential indicators of compromise
by correlating your Logz.io data with lists of known threats.

![Logz.io Cloud SIEM]({{site.baseurl}}/images/security-analytics/security-analytics--annotated.png)

Summary
: The first thing you see when you sign in to your security account.
  The summary dashboard shows the last 24 hours of events that Logz.io found in your log data.

Threats
: Using publicly available threat feeds,
  this screen shows the potential threats from known bad actors on the internet.

Research
: Use Kibana to drill down into your logs,
  helping you better understand specific events and threats.

Security rules
: This page contains preconfigured security rules.
  When security rules are triggered,
  you’ll see the results on the Summary and Threats dashboards.
  You can also create your own custom rules.
{:.letter-labels}

To see your Cloud SIEM account,
click the Logz.io logo (upper left corner),
and then click **Security**.

## Utilities supported by Cloud SIEM

{% for doc in site.log-sources %}
{%- if doc.shipping-tags contains 'security' %}
* [{{doc.data-source}}]({{doc.url}})
{%- endif -%}
{%- endfor -%}