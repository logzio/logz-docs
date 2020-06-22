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

###### Add the endpoint

To add a new custom endpoint, click **Add endpoint**.
Specify the URL, method, and headers.
For POST/PUT methods, you can configure the message body, if relevant.

###### Ports & security considerations

It is best to avoid opening a port in your firewall to allow access for custom endpoints.

The Logz.io IP range is used by all customers, so it should be used with caution.
If you do open a port for a Logz.io custom endpoint, follow these best practices:

* Make sure that you add a token in your custom payload and verify that the token exists in the endpoint.
* Allow external access only to this specific endpoint.

Alerts can only be sent on ports 80 & 443.
If you accidently set a custom port for an alert endpoint, the alert will not be sent.
{:.info-box.important}

##### Test the endpoint

Click **Run the test** to test your endpoint.
Logz.io shows if the message was successfully sent.

Check that the endpoint received the message.

This is not required, but highly recommended.

##### Save the endpoint

Click **Save** to save your endpoint.

![Configure a custom endpoint](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/custom-endpoint-POST.png)

</div>
