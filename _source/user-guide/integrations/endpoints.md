---
layout: article
title: Alert endpoints
permalink: /user-guide/integrations/endpoints.html
tags:
  - alerts
  - endpoints
  - integrations
contributors:
  - imnotashrimp
---

Alert endpoints can receive notifications when an alert is triggered,
when a user shares a Kibana object,
or when Logz.io finds new insights in your logs.
Logz.io supports sending notifications to
BigPanda, Datadog, PagerDuty, Slack, VictorOps, or your own custom endpoint.

![Alert endpoints]({{site.baseurl}}/images/alerts/alerts--alert-endpoints.png)

You can manage your endpoints
from [**Alerts > Alert endpoints**](https://app.logz.io/#/dashboard/alerts/endpoints).
You can also add new endpoints when you're configuring a new notification.

#### To manage alert endpoints

* To add a new endpoint,
  click **Add endpoint**,
  fill in the required information for your endpoint,
  and click **Save**.
  You can do this from the [Alert endpoints](https://app.logz.io/#/dashboard/alerts/endpoints) page,
  or anywhere in Logz.io where you choose the recipient of a message or notification.
* To edit or delete an endpoint,
  hover over the endpoint,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).