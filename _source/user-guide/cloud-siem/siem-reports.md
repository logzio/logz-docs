---
layout: article
title: Security reports
permalink: /user-guide/siem/reports/
flags:
  logzio-plan: enterprise
tags:
  - reports
contributors:
  - imnotashrimp
  - shalper
---

Logz.io Reports allows you to automatically generate reports
using your Kibana dashboards.
You can set up your security account to send reports on a regular schedule over Slack or by email.

To navigate to the Reports page, click **Reports** in the top menu.

![Logz.io Cloud SIEM Reports](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/siem-reports.png)

#### Configuring a report

<div class="tasklist">

##### Give your report a name and description

Your report's name will be shown as the email subject or Slack heading.

The description will be included in the message body.
It's a good idea to use the description to give some context
for why recipients are receiving the report.

##### Choose a dashboard and time range

In the field **Which dashboard to send**, select a Kibana dashboard from the list.

Use **For this time range** to select a time range for the dashboard. The time range can be anything from 1 minute to 30 days.

_For example_:
If you choose a time range of 24 hours on a report sent every Monday at 09:00,
each week's report will show a snapshot of your logs from 09:00 Sunday through 09:00 Monday (in absolute date stamps).


##### Set the schedule

Use the **Cron scheduler** to set the frequency for sending out your reports.

Logz.io uses quartz cron. You can use popular online tools to generate a cron expression, such as [www.freeformatter.com](https://www.freeformatter.com/cron-expression-generator-quartz.html#cronexpressionexamples/).

##### Select the recipients

In the field **Who to send it to**, type in email addresses and/or select endpoints. 

You can click the button **+ New endpoint** to add more endpoints (such as Slack, BigPanda, Datadog, Opsgenie, PagerDuty, VictorOps, or custom webhooks. [Learn more about endpoints](/user-guide/integrations/endpoints.html)

##### _Optional_ Include a link to the live dashboard

You can check the box to **Include a link to the live dashboard in the message**. 

When enabled, the report will be sent out with a direct link to open the dashboard in Kibana.

</div>
