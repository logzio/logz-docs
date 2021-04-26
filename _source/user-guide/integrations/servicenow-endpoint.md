---
layout: article
title: Configure an endpoint for ServiceNow
permalink: /user-guide/integrations/servicenow.html
tags:
  - alerts
  - endpoints
  - integrations
  - servicenow
contributors:
  - shalper
---

Integrate with ServiceNow to receive Logz.io notifications in your ServiceNow workspace.



#### Adding a ServiceNow notification endpoint

<div class="tasklist">


##### Add a dedicated user in your ServiceNow workspace

Open your ServiceNow instance and create a new user. See [ServiceNow docs for details](https://docs.servicenow.com/bundle/paris-platform-administration/page/administer/users-and-groups/task/t_CreateAUser.html).

Special requirements:

1. Check off **Web service access only**.
2. Assign the user the role **incident_manager**.

![Logz.io - ServiceNow integration requires the user role: incident_manager](https://dytvr9ot2sszz.cloudfront.net/logz-docs/notification-endpoints/servicenow-role.png)



##### Add the endpoint

Go to the [Notification endpoints](https://app.logz.io/#/dashboard/alerts/endpoints) page, and click **Add endpoint**. Fill in the form:


2. **Type**: Select the option **ServiceNow**.
3. **Instance URL**: Enter the URL for your ServiceNow instance.
4. **Username**: Enter a ServiceNow username that has been assigned the role **incident_manager**.
5. **Password**: Provide the password for the above ServiceNow username.



##### Test the endpoint (_Optional_)

Click **Run the test** to test your endpoint. Logz.io shows if the message was successfully sent.

Check that the message arrived at the target endpoint.

##### Save the endpoint

**Save** your endpoint.

</div>


## Logz.io ServiceNow Notification template


The ServiceNow endpoint comes pre-configured with the following notification template.
The double-brackets indicate variables that will be auto-populated by Logz.io with data specific to the triggered alert.

{% raw %}

```
{
"short_description": "{{alert_severity}}: {{alert_title}}",
"correlation_id": "logzio_{{alert_definition_id}}",
"state": "1",
"description": "Severity: {{alert_severity}}\nAlert Description: {{alert_description}}\n\nURL to investigate the alert:\n{{alert_app_url}}/#/view-triggered-alert?&from={{alert_timeframe_start_epoch_millis}}&to={{alert_timeframe_end_epoch_millis}}&definitionId={{alert_definition_id}}&switchToAccountId={{account_id}}\n\nLog samples:\n{{alert_samples}}"
"work_notes":"Investigate the alert:\n[code]<a href="{{alert_app_url}}/#/view-triggered-alert?&from={{alert_timeframe_start_epoch_millis}}&to={{alert_timeframe_end_epoch_millis}}&definitionId={{alert_definition_id}}&switchToAccountId={{account_id}}">View in Kibana</a>[/code]"
}
```
{% endraw %}


ServiceNow endpoints do not support Logz.io resolved alerts.
{:.info-box.important}

