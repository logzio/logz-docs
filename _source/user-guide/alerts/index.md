---
layout: article
title: Alerts
permalink: /user-guide/alerts/
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - imnotashrimp
---

You can set up Logz.io log alerts to automatically get notified about issues that demand attention. Alerts are also great building blocks for Kibana dashboards and visualizations.

Logz.io alerts use a Kibana search query to continuously scan your logs. The simplest alerts may be similar to a simple Kibana Discover query, but others can be quite complex and involve more advanced features.

An alert can include any of these components, in any combination:

* A Lucene search query (with or without wildcards)
* 3 group-by fields (or less)
* Filters

By customizing alerts and setting threshold levels,
you can ensure that you're notified of critical events.
You can configure alerts to see non-urgent events in Kibana,
reducing alert fatigue while still having a complete view of noteworthy events.

![Alert definitions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts-index.png)

To reach this page,
select [**Alerts & Events > Alert definitions**](https://app.logz.io/#/dashboard/triggers/alert-definitions)
from the top menu.

* You'll be able to enable/disable alerts as needed.
* You can Alert options
: Use the switch to enable or disable an alert, or click the menu to see more options
{:.letter-labels}