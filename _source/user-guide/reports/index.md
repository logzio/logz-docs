---
layout: article
title: Reports
permalink: /user-guide/reports/
flags:
  logzio-plan: community
tags:
  - reports
contributors:
  - imnotashrimp
  - shalper
---

Logz.io reports allow you to automatically generate reports
using your Kibana dashboards.
You can send reports on a regular schedule to Slack and email recipients.

To open a report scheduling form:

* Open a dashboard in Kibana, and click **Create report** from the top menu.
* Select **Alerts & Events > Reports** in the top menu, and click **+ New report**.

![Logz.io report scheduling form](https://dytvr9ot2sszz.cloudfront.net/logz-docs/dashboards/report-form.png)

#### Configuring a report

<div class="tasklist">

##### Give your report a name and description

Your report's name will be shown as the email subject or Slack heading.

The description will be included in the message body.
It's a good idea to use the description to give some context
for why recipients are receiving the report.

##### Select a dashboard and time range

In the form, under **Which dashboard to send**, select a dashboard from the list.

Next, select the time range for the dashboard. Under **For this time range**, select the time frame in minutes/hours/days. Your time range can be anything from 1 minute to 30 days.

##### Set the schedule

Use the **Cron scheduler** to set the schedule for your reports to be sent automatically. 

You can use an online tool such as the
[Quartz Cron Expression Generator](https://www.freeformatter.com/cron-expression-generator-quartz.html#cronexpressionexamples/) to easily translate your requirements to a cron expression. The scheduler can be used to set up advanced schedules, like the last day of every month, or the last Thursday of the month at a specific hour.

##### Select your recipients

Use **Who to send it to** to choose the report's email and Slack recipients.

##### Other options

Custom logo
: You can enable the option to include your account's **Custom logo** in the report.

  When the report is sent over email, the custom logo will be included in the email body and PDF header. Admins can upload and update a custom logo from the [General Settings](https://app.logz.io/#/dashboard/settings/general) page.

View in Kibana link
: You can enable the option to **Include a link to the live dashboard in the message**.

  If enabled, the report will include a direct link to the dashboard in Logz.io. Your recipients will need to log in to Logz.io to see it.
{:.letter-labels}

![Example of Logz.io report email](https://dytvr9ot2sszz.cloudfront.net/logz-docs/dashboards/logo-for-report.png)

</div>
