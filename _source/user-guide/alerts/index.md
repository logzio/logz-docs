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

Log alerts can ensure that you're notified of critical events. Configuring the right alerts is the foundation of any proactive development, DevOps, and validation practice.

Logz.io alerts use a Kibana search query to continuously scan your logs and alert you when a certain set of conditions is met. The simplest alerts can use a simple search query or a particular filter, but others can be quite complex and involve several conditions with varying thresholds.

Event logs of triggered alerts are always available and searchable in Kibana. In Kibana Discover, just filter for `_exists_:logzio-alert`. But you also have the option to add notifications, and control their contents, format, and who they are sent to.

To open the **Alert definitions** page,
select [**Logs > Alerts**](https://app.logz.io/#/dashboard/triggers/alert-definitions)
from the navigation menu.

![Alert definitions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts-index_aug2021.png)

You'll see a paginated list of all alerts configured for your account.


### Order or filter the list

* You can click the column headers to sort the list by **severity** or chronologically by when alerts were **created** or **updated**.

* Filter the list of alerts by multiple criteria, including tags, severity, who created and/or updated the alert, and status (active/disabled).

  <video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/filter-alerts.mp4" type="video/mp4" />
  </video>


### Enable or disable alerts temporarily

* Toggle the **Active** button, to enable or disable an alert, as needed. You have the option to filter the list of alerts by their **Active** state.


### Edit, duplicate, delete an alert, or view last events

* You can click the **Menu button <i class="li li-ellipsis-v"></i>** to edit, duplicate, or delete an alert.

* Select **View last events** to display the alert query and number of hits in **Discover**.
