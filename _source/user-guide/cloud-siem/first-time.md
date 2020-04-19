---
layout: article
title: Getting started in Logz.io Cloud SIEM
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
  - shalper
---

Get oriented with your new account. To see your Cloud SIEM account,
click the Logz.io logo (upper left corner),
and then click **Security**.

Here's what your environment should look like when you first log into your Logz.io Cloud SIEM.

![Logz.io Cloud SIEM](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics--annotated.png)

Summary
: The first thing you see when you sign in to your security account.
  The summary dashboard shows the last 24 hours of events that Logz.io found in your log data.

Threats
: Using publicly available threat feeds,
  this dashboard shows potentially malicious activity traced back to known bad actors on the internet.

Research
: Use Kibana to drill down into your logs,
  helping you better understand specific events and threats.

Security rules
: Here's where you manage your Cloud SIEM's security rules. Your account is loaded with preconfigured security rules, continually updated and expanded by 
  Logz.io's security team. You can also create your own rules or edit the ones preconfigured by Logz.io.
  When security rules are triggered, an event log is written. Review the Summary and Threats dashboards for the security events registered in your account.
{:.letter-labels}


## Security products supported by Logz.io Cloud SIEM

Logz.io provides security rules and dashboards for the following security products:

{% for doc in site.log-sources %}
{%- if doc.shipping-tags contains 'security' %}
* [{{doc.data-source}}]({{doc.url}})
{%- endif -%}
{%- endfor -%}
