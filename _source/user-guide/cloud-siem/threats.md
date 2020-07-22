---
layout: article
title: Threats
permalink: /user-guide/cloud-siem/threats.html
flags:
  logzio-plan: entreprise
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

Your **Threats dashboard** shows you potential threats identified using public and private threat feeds.

The Threats dashboard summarizes occurrences of Indicators of Compromise (IOCs) across your environments to flag known bad actors on the internet acting in your environments.

Cloud SIEM searches for 3 categories of threats: IPs, URLs, Domains.
Whenever an IP, URL, or Domain, blacklisted in one or more feeds is identified in your logs, it will be flagged in this dashboard. The original log is also enriched with additional security context.


![Logz.io Cloud SIEM Threats page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/siem-threats-dashboard.png)

## Highlights of the Threats dashboard

* The most active geographic locations generating threats
* A breakdown of threats by feed confidence
* A detailed list of threats


## Threat hunting in Logz.io Cloud SIEM


... In the Threat details table (on the lower right), you can click an attacker IP address to show the IP Investigation dashboard.
This dashboard gives you a more detailed view of a specific IP address, including each log line that contains this IP address.