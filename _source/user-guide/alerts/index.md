---
layout: article
title: Alerts
permalink: /user-guide/alerts/
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
  - imnotashrimp
---

You can set up Logz.io log alerts to automatically get notified about issues that demand attention. Alerts are also great building blocks for Kibana dashboards and visualizations.

Logz.io alerts use a Kibana search query to continuously scan your logs and alert you when a certain set of conditions is met. The simplest alerts can use a simple search query or a particular filter, but others can be quite complex and involve several conditions with varying thresholds.

By customizing alerts, you can ensure that you're notified of critical events.

You have the option to configure alerts to send out notification emails or messages over popular channels. Alternatively, you can create alerts that won't send out notifications or will send them out less often. This can help to reduce alert fatigue.
Either way, you can always review your triggered alerts in Kibana.

To reach this page,
select [**Alerts & Events > Alert definitions**](https://app.logz.io/#/dashboard/triggers/alert-definitions)
from the top menu.

![Alert definitions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts-index.png)

You'll see a paginated list of all alerts configured for your account.

## Order or filter the list

* You can click the column headers to sort the list by **severity** or chronologically by when alerts were **created** or **updated**.

* Filter the list of alerts by multiple criteria, including tags, severity, who created and/or updated the alert, and status (active/disabled).

  <video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/filter-alerts.mp4" type="video/mp4" />
  </video>


## Enable or disable alerts temporarily

* Toggle the **Active** button, to enable or disable an alert, as needed. You have the option to filter the list of alerts by their **Active** state.


## Edit, duplicate, or delete an alert

* You can click the **Menu button <i class="li li-ellipsis-v"></i>** to edit, duplicate, or delete an alert.

## View the latest events when the alert tiggered

* You can view the logs written by the alert over the last 3 days. Each log represents a discrete incident when the alert triggered.

  Click the **Menu button <i class="li li-ellipsis-v"></i>** and select **View last events**.

  You'll be taken to the Kibana Discover view, filtered by the alert ID over the last 36 hours. Each log document represents an event, when the alert's query and triggering conditions were met.

  You can click the **Investigate** button to drill down on the raw logs that caused the alert to trigger.
