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

Configure a custom endpoint to send Logz.io notifications to your preferred apps,
even if they aren't on the list of preconfigured options.

Custom endpoints offer the advantage
of allowing you to customize the message body too.

#### To add a custom endpoint

<div class="tasklist">

##### Add the endpoint

To add a new custom endpoint, click **Add endpoint**.
Specify the URL, method, and headers.
For POST/PUT methods, you can configure the message body, if relevant.

###### Ports & security considerations

Alerts can only be sent on ports 80 & 443.
If you accidently set a custom port for an alert endpoint, the alert will not be sent.

It is best to avoid opening a port in your firewall to allow access for Logz.io custom endpoints.
This is because the Logz.io IP range is used by all customers and should be treated with caution.
\\
\\
The Logz.io IP range is used by all customers and should be treated with caution.
{:.info-box.important}

If you decide to open a port on your firewall for a Logz.io custom endpoint, follow these best practices:

* Make sure to add a verification token in the JSON payload of the custom endpoint
 and verify that the token exists on the receiving end.
* Allow external access only to this specific endpoint.

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


##### Test the endpoint

Click **Run the test** to test your endpoint.
Logz.io shows if the message was successfully sent.

Check that the endpoint received the message.

This is not required, but highly recommended.

##### Save the endpoint

Click **Save** to save your endpoint.

![Configure a custom endpoint](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/custom-endpoint-POST.png)

</div>
