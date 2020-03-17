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
Opsgenie, BigPanda, Datadog, PagerDuty, Slack, VictorOps, or your own custom endpoint.

![Notification endpoints](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/notification-endpoints.png)



#### To manage notification endpoints

You can manage your endpoints
from [**Alerts & events > Alert endpoints**](https://app.logz.io/#/dashboard/alerts/endpoints).
You can also add new endpoints when you're configuring a new notification.

* To add a new endpoint, click **Add endpoint**,
  fill in the required information,
  and click **Save**.

  For example, to add an Opsgenie endpoint, you'll need to select **Opsgenie** from the dropdown list, name the endpoint, and fill in your Opsgenie API key. 
  
  ![Opsgenie endpoints](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/opsgenie-endpoint.png)


* To edit or delete an endpoint,
  hover over the endpoint,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).

Alerts are sent on ports 80 and 443 only.
Setting a custom port as part of an endpoint URL
will result in alerts not being sent to said endpoint.
{:.info-box.important}

* To test an endpoint after it is created, open it in edit mode. 
Click **Run the test** and check the recepient for the test message. 
Logz.io will notify you if the message couldn't be sent, 
but you'll need to confirm that the message was received. 

