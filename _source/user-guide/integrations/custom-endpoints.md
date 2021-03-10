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

| Region slug | Whitelisted IP  |
|---|---|
| us-east-1 | 3.223.132.12 |
| eu-central-1 | 52.59.86.203 |
| ca-central-1 | 35.182.168.208 |
| eu-west-2 | 18.132.31.199 |
| ap-southeast-2 | 3.105.7.135 |


##### Create a verification token (_Best practice but optional_)

The Logz.io IP range is used by all customers and should be used together with a verification token.

If you decide to open a port on your firewall for a Logz.io custom endpoint, we strongly advise that you add a verification token in the JSON payload of the custom endpoint and verify that the token exists on the receiving end.


It is best to restrict external access only to this specific endpoint.

Here's an example of a JSON payload for an alert that includes a verification token:

{% raw %}

```json
{
"token": "<SomeSecurityToken>",
"alert_title": "{{alert_title}}",
"alert_description": "{{alert_description}}",
"alert_severity": "{{alert_severity}}",
"alert_event_samples": "{{alert_samples}}"
}
```
{% endraw %}


##### Add the endpoint

1. To add a new custom endpoint, click **Add endpoint**.
2. Specify the URL, method, and headers.
3. For POST/PUT methods, you can add a payload with a message.

Some endpoints require a particular attribute/payload. For example, [Microsoft Teams](/user-guide/integrations/ms-teams.html#add-your-payload).
{:.info-box.important}


![Configure a custom endpoint](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/custom-endpoint-POST.png)


###### Parameters

Logz.io notifications use [Mustache templating](https://mustache.github.io/).
You can add the following parameters to your notification payload.

Test your payload. Some parameters may not be supported by the service receiving the alerts from Logz.io.
{:.info-box.important}

{% raw %}

| Parameter | Description |
|---|---|---|
| {{alert_severity}} | Severity of the alert that triggered  |
| {{alert_samples}} |   |
| {{alert_severity_img}} | Colored icon indicating the alert severity  |
| {{alert_title}} | Title of the alert that triggered  |
| {{alert_app_url}} |   |
| {{account_id}} | ID of the affected Logz.io account  |
| {{account_name}} |  Name of the affected Logz.io account |
| {{alert_description}} |  Description of the alert|
| {{alert_timeframe_start}} | Start time for the triggered alert event.   |
| {{alert_timeframe_end}} | End time for the triggered alert event  |
| {{alert_event_image}} |   |
| {{alert_event_samples}} |  Sample of raw logs that caused the alert to trigger. (Max. of 10) |
| {{alert_event_html}} |   |
| {{alert_timeframe_start_epoch_millis}} |  Start time for the triggered alert event in UNIX milliseconds |
| {{alert_timeframe_end_epoch_millis}} |  End time for the triggered alert event in UNIX milliseconds |
| {{alert_definition_id}} |   |



##### Test the endpoint (_Optional_)

Click **Run the test** to test your endpoint.
Logz.io shows if the message was successfully sent.

Check that the message arrived at the target endpoint.

##### Save the endpoint

**Save** your endpoint.


</div>


## List of available alert variables

The following list is provided for convenience, to make it easy to copy & paste the parameters.



```
{{alert_samples}}
{{alert_severity}}
{{alert_severity_img}}
{{alert_title}}
{{alert_app_url}}
{{account_id}}
{{account_name}}
{{alert_description}}
{{alert_timeframe_start}}
{{alert_timeframe_end}}
{{alert_event_image}}
{{alert_event_samples}}
{{#alert_event_html}}
{{alert_event_html}}
{{alert_timeframe_start_epoch_millis}}
{{alert_timeframe_end_epoch_millis}}
{{alert_definition_id}}
```


To add a **View in Kibana** drilldown link:

```
"alert_view_link": "{{&alert_app_url}}#/view-triggered-alert?from={{&alert_timeframe_start_epoch_millis}}&to={{&alert_timeframe_end_epoch_millis}}&definitionId={{&alert_definition_id}}&switchToAccountId={{&account_id}}"
```

{% endraw %}
