---
layout: article
title: Notification endpoints
permalink: /user-guide/integrations/endpoints.html
tags:
  - alerts
  - endpoints
  - integrations
contributors:
  - shalper
  - imnotashrimp
---

Configure Logz.io to send notifications to your preferred endpoints.
Notifications are typically sent when alerts are triggered,
when a user shares a Kibana object,
or when Logz.io
[Insights]({{site.baseurl}}/user-guide/insights/exploring-insights.html)
identifies new exceptions in your logs.

![Notification endpoints](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/notification-endpoints-11.png)

You can manage your endpoints
from [**Alerts & events > Alert endpoints**](https://app.logz.io/#/dashboard/alerts/endpoints)
or from [**<i class="li li-gear"></i> > Settings > Notification endpoints**](https://app.logz.io/#/dashboard/alerts/endpoints).

## Preconfigured vs. custom endpoints

There are two types of endpoints.

* **Preconfigured endpoints**:
  For these, the body, method, and headers are preconfigured.
  You'll need to specify authentication information,
  such as your API key, service key, or token.

  Supported apps include Opsgenie (only if hosted by the US data center), BigPanda, PagerDuty, Slack, VictorOps, and Datadog.

* **Custom endpoints**:
  You'll need to specify the URL, method, and headers,
  and optionally the message body.

  Click for [detailed instructions]({{site.baseurl}}/user-guide/integrations/custom-endpoints.html).

#### To manage notification endpoints

* To add a new endpoint, click **Add endpoint**,
  fill in the required information, and click **Save**.

* To test an endpoint after it's created, open it in edit mode.
  Click **Run the test** and make sure the test message was received.

  Logz.io will notify you if the message couldn't be sent,
  but you'll need to confirm that the message was received.

* To edit or delete an endpoint,
  hover over the endpoint,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).

Alerts can only be sent on ports 80 & 443.
If you accidently set a custom port for an alert endpoint, the alert will not be sent.
{:.info-box.important}

## Example - Adding an Opsgenie endpoint

Opsgenie is a typical example for a preconfigured endpoint.
To add it, select **Opsgenie** from the dropdown list,
name the endpoint,
and fill in your Opsgenie API key.

Note that currently only Opsgenie accounts hosted by the US data center are supported. You'll know you're in the US region if you log into your Opsgenie account at https://app.opsgenie.com. If you're hosted in another region, you can configure a [custom endpoint]({{site.baseurl}}/user-guide/integrations/custom-endpoints.html).
{:.info-box.important}

![Opsgenie endpoints](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/opsgenie-endpoint.png)

## Typical use case

If your team is using Slack, you likely have multiple Slack channels to organize different projects.

You can configure your Logz.io alerts to reach the right Slack channel by configuring a Slack endpoint for each channel.

The example below shows different Slack channels dedicated to production and security alerts, application updates, and account overage.

![Multiple Slack endpoints](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/slack-endpoints.png)
