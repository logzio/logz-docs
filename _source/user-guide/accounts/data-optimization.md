---
layout: article
title: Optimizing your data and usage in Logz.io
permalink: /user-guide/accounts/data-optimization.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Optimize your Logz.io data; the complete guide
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - refaelmi
  - hidan
---

![Data Volume Dashboard ELK app](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/utilization--elk-apps-data-volume-dashboard.png)

After setting up your account and having your data flowing into Logz.io, it’s time to utilize features and strategies to filter out the noise and analyze the data that is most valuable to you.

The following guide will help you understand how to do just that through Logz.io’s capabilities and products. 

* [Manage your workspace with Sub accounts and Flexible volume](/user-guide/accounts/data-optimization.html#manage-your-workspaces---divide-and-conquer-your-quota)
* [Optimize log data with Drop filters & Archive and restore](/user-guide/accounts/data-optimization.html#optimize-log-data-with-drop-filters--archive-and-restore)
* [Optimize metrics data](/user-guide/accounts/data-optimization.html#optimize-metrics-data)
* [Utilize data analytics with:](/user-guide/accounts/data-optimization.html#data-analytics---find-the-needle-in-the-haystack)
  * [Alerts](/user-guide/accounts/data-optimization.html#alerting)
  * [Pattern engine](/user-guide/accounts/data-optimization.html#patterns-engine)
  * [Usage calculation](/user-guide/accounts/data-optimization.html#usage-calculation)

#### Manage your workspaces - Divide and conquer your quota

Logz.io offers a centralized solution, including all the tools and elements needed to gain observability into your data. You can create a **[Sub account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#main-vs-sub-account)** to help manage usage, volume, and access to the data.

If your account has **[Flexible volume](/user-guide/accounts/flexible-volume.html)**, you can use it to control how to allocate GB between your main and sub accounts, ensuring you don’t exceed your volume quota.

For example, you can rely on shared volume to cover your indexing needs across accounts instead of reserving capacity in advance. Shared volume can help to optimize distribution and minimize the risk of running out of space.

To manage access and permissions, you can define which data is accessible through the sub account, limiting or granting access to logs, dashboards, visualizations, and saved searches.

#### Optimize log data with Drop filters & Archive and restore

**[Drop filters](https://docs.logz.io/user-guide/accounts/drop-filters/)** offer a great and easy way to filter out logs you don’t regularly need from your account, which can help reduce the account’s volume and costs.

Once you set up your drop filters, incoming logs that match your account’s active drop filters will not be indexed and will not appear in your OpenSource Dashboards account. 

Dropped logs are not searchable, cannot trigger alerts, and will not appear in dashboards, reports, or anything else. However, if the Archive and restore option is enabled on your account, it will also include the dropped logs.

That’s why we recommend pairing Drop filters with the **[Archive and restore](/user-guide/archive-and-restore/)** feature. Once you set up [Archiving](/user-guide/archive-and-restore/configure-archiving.html) on an S3 or Azure storage container, a carbon copy that holds all of your logs will be sent to the storage of your choice. This copy also includes dropped logs, allowing you to restore all of your logs to easily investigate when issues occur.

Reasons to love Archive and restore:

* Compliance. Archiving to cold storage ensures you have a copy of all logs for years to come.
* If you want to look back at logs outside your retention period with Logz.io, you can [reingest that data](/user-guide/archive-and-restore/restore-archived-logs.html) into the platform for deeper analysis. 
* Cost-effective, data you reingest to Logz.io from your archive does not count against your daily quota. 

We know that sometimes you just need to have logs searchable for more extended periods of time, which is why we created **[Smart tiering](/user-guide/accounts/smart-tier/)**, which allows you to reduce storage costs as data ages. 

[Learn how to set up your Drop filters](/user-guide/accounts/drop-filters/).
[Learn how to set up your Archive and restore](/user-guide/archive-and-restore/).

#### Optimize metrics data 

Your Infrastructure Monitoring (metrics) account can help you visualize the status of your services and operations.

To gain quick insights into your metrics account, use the following query to view the total unique metrics in the query’s timeframe:

`sum(count by (__name__) ({__name__ != ""}))`

Use the following query to view the top cardinality contributors:

`topk(10, count by (__name__) ({__name__ != ""}))`

If you have a flexible account, you can apply **[Utilization metrics](/user-guide/accounts/manage-account-usage.html#what-are-account-utilization-metrics)** to optimize it. This lets you save utilization metrics on a set schedule (every 10, 30, or 60 mins). These metrics include the used data volume for the account and the expected data volume for the current indexing rate.

You can use these metrics to create an alert when a certain threshold is exceeded, create a dashboard monitoring your data volumes, and more. For example, you can import and use our [pre-built dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/data-volume-dashboard.ndjson) to monitor your metric data volume.

To import the dashboard to your account, navigate to [Logs](https://app.logz.io/#/dashboard/kibana/discover/) > [Stack Management > Saved objects](https://app.logz.io/#/dashboard/kibana/visualize/) and click on the Import button. Next, import the data-volume-dashboard.ndjson file you've downloaded.

If you're asked to choose a new index pattern, select **logzioCustomerIndex**.

Once imported, you’ll get a visual dashboard of your metric data volume and usage across your accounts.

#### Data analytics - Find the needle in the haystack

Once your Logz.io account is up and running, you can focus on getting the data that matters most. Logz.io offers several features and capabilities that you can use to filter through the noise, including:

##### Alerting

**[Log alerts](/user-guide/alerts/)** can ensure that you’re notified of critical events. Configuring the right alerts is the foundation of any proactive development, DevOps, and validation practice.

Logz.io alerts use an OpenSearch Dashboard search query to continuously scan your logs and alert you when certain conditions are met. The simplest alerts can use a simple search query or a particular filter, but others can be quite complex and involve several conditions with varying thresholds.

For example, you can get an alert when an error occurs, when a particular action is being performed, or even when your account usage crosses a threshold set by yourself.

[Configure an alert](https://docs.logz.io/user-guide/alerts/configure-an-alert.html).


Some incidents are best detected by a sequence of logs, which may involve different log types, log fields, or even accounts.

For example, deployment on a particular microservice coincides with an error in another environment. In this case, the alert can correlate 2 separate events as the trigger.

For those cases, you can create a [**Correlated alert**](https://docs.logz.io/user-guide/alerts/correlated-alert/). These alerts are instrumental in reducing false positives. By defining a more specific use case that contains 2 scenarios, the trigger can be more sensitive and reduce unwanted noise.

[Configure a correlated alert](https://docs.logz.io/user-guide/alerts/correlated-alert/#configuring-a-correlated-alert).

##### Patterns Engine

To help declutter the noise, Logz.io [**Patterns Engine**](https://docs.logz.io/user-guide/kibana/log-patterns.html) runs advanced clustering algorithms to automatically group logs with similar message fields by their frequency of occurrence.

As you’re troubleshooting in OpenSearch Dashboards, you can easily see the number of Patterns identified in your log results for every query you run. The list is always in-context and specific to the log results returned by your search.

Patterns can help you isolate unusual events from a mass of repetitive events, identify frequent errors, and spot bulky uninteresting logs that can be dropped.

##### Usage Calculation

There are several ways to monitor your account usage:

Navigate to your Logz.io [account > Settings > Plan and Usage](https://app.logz.io/#/dashboard/settings/plan-and-billing/usage) and click on the **Usage & Info** tab. The dashboards represent each one of the products you’re using, and you can view your account’s daily data plan, how much you’ve used, and your overall usage pattern.

In addition, you can create a visualization showing the log usage across all your accounts. The visualization will show log usage across accounts and services, allowing you to identify the logs you can optimize quickly. 

###### Create a log usage visualization:

Navigate to [Logs > Visualize > Create visualization](https://app.logz.io/#/dashboard/kibana/visualize/) and choose Line. Next, search for **logzioCustomerIndex** and select it as your source.

Click on the Y-axis option. Select **Sum** as the aggregation and **LogSize** as the field. 

Click on **Add in Buckets** to add an X-axis. Next, select **Date Histogram** as the aggregation, **@timestamp** as the field, and set the **Minimum Interval** to **Auto**. 

Click on **Add in Buckets** again and add a **Split Series**. Select **Terms** as the aggregation set the Field to **Type**, and **Order by Metric: Sum of LogSize**. Set the order to **descending**, and set the size to **20**.

Click on the **Update** button to visualize your data.

You’ll receive a visual representation of data usage across your accounts, separated by the different services running. This can help you better understand which services are heavy-duty and where you can optimize them through alerts, drop filters, and more.

If you have additional questions about optimize your Logz.io data, [contact the Support team](mailto:help@logz.io).

