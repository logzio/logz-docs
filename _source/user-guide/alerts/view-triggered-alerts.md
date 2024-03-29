---
layout: article
title: Review triggered alerts
permalink: /user-guide/alerts/view-triggered-alerts.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Review triggered alerts
sitemap: false 
noindex: true
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
  - imnotashrimp
---

The **Triggered alerts** page offers an updated list of notifications of recently triggered alerts, as long as they were not suppressed.

You can think of it as a live dashboard summary of all the triggered alert notifications sent.
So that even if you're not on the recipients list, you can still know which events occurred.

![Triggered alerts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/triggered-alerts-main.png)

To view the **alerts Event Management** page,
select [**Logs > Event Management**](https://app.logz.io/#/dashboard/event-management)
from the top menu.

* To view the raw logs for a particular event, click the button **View in OpenSearch Dashboards**.

  You'll be taken to OpenSearch Dashboards, with the logs filtered to return the exact logs that caused the alert to trigger. Using OpenSearch Dashboards, you can explore your logs and get a better idea of the conditions that led to the triggered alert.

  This is the same link that appears in the alert notification.

{% include /rules-alerts/view-latest-triggered-alerts.md %}
