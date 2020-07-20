---
layout: article
title: Summary dashboard
permalink: /user-guide/cloud-siem/summary-dashboard.html
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - cloud-siem
contributors:
  - shalper
---

The Summary dashboard aggregates all security events identified by Cloud SIEM in the past 24 hours. It is the best place to begin any investigation and asses the scope of response that will be necessary.

![Logz.io Cloud SIEM Summary page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics-summary-annotated.png)

Notable events
: Tallies up security events involving network and endpoint security. This is a count of events triggered by rules tagged as **access**, **threat**, **audit**, and **endpoint**, respectively.

Events over time
: The graph indicates the number of events that registered over the past 24 hours. It can give you an immediate sense of when activity peaked and warn of an orchastrated attack. 

  The graph makes it simple to observe significant changes in the frequency and number of events and to spot unusual activity.

Summary of events
: A list of all security rules that triggered and how many times they triggered.

Origin of attacks
: An interactive map shows the origin of attacks across the world and clusters them by the country of origin.

Breakdown of log types
: Gain an understanding of the volume of data being scanned by your Cloud SIEM account and its breakdown by type.
{:.letter-labels}


### Sanity checks

Take advantage of the breakdown of logs by service, to perform a sanity check and ensure that all security servers and services are actively sending logs to your Logz.io account.

![Logz.io Cloud SIEM Summary page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/log-sanity-check.png)

You can click on the **<i class="fas fa-ellipsis-h"></i> menu (top right) > Inspect** to download the list as a CSV file. Or, you can click on any of the categories to filter down the dashboard instantly.
