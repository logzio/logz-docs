---
layout: article
title: Custom endpoints
permalink: /user-guide/integrations/custom-endpoints.html
tags:
  - alerts
  - endpoints
  - integrations
contributors:
  - shalper
---

Integrate with your favorite tools using a custom webhook. Configuring a custom endpoint will allow you to send Logz.io notifications to your preferred apps,
even if they aren't on the list of preconfigured options.

Custom endpoints offer the advantage
of allowing you to customize the message body too.

#### Adding a custom endpoint

<div class="tasklist">

##### Allow firewall access

Set up your systems to receive notifications from Logz.io.

Logz.io log alerts can only be sent on **ports 80 & 443**. If you try setting another port in your endpoint, the alert will NOT be sent.

If you need to, whitelist the relevant IPs in your firewalls. These depend on the region where your Logz.io account is hosted:


* us-east-1:
  * 54.86.133.203
  *	3.223.132.12
* eu-central-1:
  * 52.59.86.203
  * 52.59.12.246
* eu-west-2:
  * 18.132.31.199
* ca-central-1:
  * 35.182.168.208
* ap-southeast-2:
  * 3.105.7.135


##### Create a verification token (_Best practice but optional_)

The Logz.io IP range is used by all customers and should be used together with a verification token.

If you decide to open a port on your firewall for a Logz.io custom endpoint, we strongly advise that you add a verification token in the JSON payload of the custom endpoint and verify that the token exists on the receiving end.


It is best to restrict external access only to this specific endpoint.

Here's an example of a JSON payload for an alert that includes a verification token:

```json
{
"token": "<SomeSecurityToken>",
"alert_title": "<alert_title>",
"alert_description": "<alert_description>",
"alert_severity": "<alert_severity>",
"alert_event_samples": "<alert_samples>"
}
```



##### Add the endpoint

1. To add a new custom endpoint, click **Add endpoint**.
2. Specify the URL, method, and headers.
3. For POST/PUT methods, you can add a payload with a message.

Some endpoints require a particular attribute/payload. For example, [Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#office-365-connector-card).
{:.info-box.important}


![Configure a custom endpoint](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/custom-endpoint-POST.png)


##### Test the endpoint (_Optional_)

Click **Run the test** to test your endpoint.
Logz.io shows if the message was successfully sent.

Check that the message arrived at the target endpoint.

##### Save the endpoint

**Save** your endpoint.


</div>