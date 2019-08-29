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
---

Logz.io Reports allows you to automatically generate a reports using your Kibana dashboards.
You can send reports on a regular schedule to Slack or email recipients.

To navigate to the Reports page:

* In your Operations account, select **Alerts & Events > Reports** in the top menu.
* In your Security Analytics account, click **Reports** in the top menu.

###### Configuring a report

1.  Give your report a name and description

    Your report's name will be shown as the email subject or Slack heading.

    The description will be included in the message body.
    It's a good idea to use the description to give some context
    for why recipients are receiving the report.

2.  Choose a dashboard and time range

    Choose **Which dashboard to send** to your recipients.

    Use **For this time range** to set your report's time range.
    Your time range can be anything from 1 hour to 30 days.

3.  Set the schedule

    Use the **Cron schedule** to set the frequency of your reports.

    Logz.io uses quartz cron.
    If you need help generating a cron expression, see [Cron Expression Generator](https://www.freeformatter.com/cron-expression-generator-quartz.html#cronexpressionexamples/).

    Reports are scheduled using UTC.
    {:.info-box.important}

4.  Choose the recipients

    Use **Who to send it to** to choose the report's email and Slack recipients.

    If you choose **Include a link to the live dashboard in the message**,
    report recipients will have a quick link to a current view of the report's dashboard.
{:.tasklist.firstline-headline}
