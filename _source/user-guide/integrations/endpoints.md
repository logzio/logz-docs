---
layout: article
title: Notification endpoints
permalink: /user-guide/integrations/endpoints.html
tags:
  - alerts
  - endpoints
  - integrations
contributors:
  - imnotashrimp
---

Notification endpoints can receive notifications when an alert is triggered,
when a user shares a Kibana object,
or when Logz.io finds new insights in your logs.
Logz.io supports sending notifications to
BigPanda, Datadog, PagerDuty, Slack, VictorOps, or your own custom endpoint.

Alerts are sent on ports 80 and 443 only; setting a custom port as part of endpoint URL will result in alerts not being sent to said endpoint.
{:.info-box.important}

![Notification endpoints]({{site.baseurl}}/images/alerts/alerts--alert-endpoints.png)

You can manage your endpoints
from [**Alerts & events > Notification endpoints**](https://app.logz.io/#/dashboard/alerts/endpoints).
You can also add new endpoints when you're configuring a new notification.

#### To manage notification endpoints

* To add a new endpoint,
  click **Add endpoint**,
  fill in the required information for your endpoint,
  and click **Save**.
  You can do this from the [_Notification endpoints_](https://app.logz.io/#/dashboard/alerts/endpoints) page,
  or anywhere in Logz.io where you choose the recipient of a message or notification.
* To edit or delete an endpoint,
  hover over the endpoint,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).
