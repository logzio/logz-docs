---
layout: article
title: Alerts
permalink: /user-guide/alerts/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn how Logz.io's alerts ensure you're notified of critical events
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
  - imnotashrimp
  - hidan
---


Log alerts can ensure that you're notified of critical events. Configuring the right alerts is the foundation of any proactive development, DevOps, and validation practice.

Logz.io alerts use a Kibana search query to continuously scan your logs and alert you when certain conditions are met. The simplest alerts can use a simple search query or a particular filter, but others can be quite complex and involve several conditions with varying thresholds.

Event logs of triggered alerts are always available and searchable in Kibana. In Kibana Discover, just filter for `_exists_:logzio-alert`. But you also have the option to add notifications, and control their contents, format, and who they are sent to.

To open the **Alert definitions** page,
select [**Logs > Alerts**](https://app.logz.io/#/dashboard/triggers/alert-definitions)
from the navigation menu.

![Alert definitions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts-main-march-2022.png)

You'll see a paginated list of all alerts configured for your account.


### Order or filter the list

* You can click the column headers to sort the list by **severity**, by the user who **created the alert**, by **tags**, or by the **state** of each alert. 

* To filter chronologically by when alerts were **created** or **updated**, click on the column you'd like to filter:

![Alert definitions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts-updated-by-screenshot.png)

### Enable or disable alerts temporarily

* Toggle the **State** button to enable or disable an alert, as needed. You have the option to filter the list of alerts by their **Active** state.


### Edit, duplicate, delete an alert, or view last events

* Hover over each alert to reveal the **Delete** and **Edit** buttons.

* You can click the **Menu button <i class="li li-ellipsis-v"></i>** to duplicate, or select **View last events** to display the alert query and number of hits in **Discover**.
