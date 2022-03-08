---
layout: article
title: Log visualization guide
permalink: /user-guide/accounts/log-visualization.html
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---

Your account has a daily quota to help you manage and monitor your logs and usage. To better understand your logs and their volume, you can create a visualization based on your log size. Follow these steps to create your LogSize visualization:

##### Enabling LogSize

Kibana doesn’t recognize LogSize as a number right away, and you'll need to enable it by clicking on **Refresh mapping**. You’ll need to do this for each account where you enabled LogSize. 

Account utilization metrics and log size are set per individual account. You can find these settings on the [Manage accounts page](https://app.logz.io/#/dashboard/settings/manage-accounts) below Advanced options. This page is available only from your main account—you won’t be able to make this change from a sub account.

##### Creating LogSize visualization

Once LogSize is enabled, you can create your LogSize visualization. 

Navigate to **[Logs](https://app.logz.io/#/dashboard/kibana/) > [Visualize](https://app.logz.io/#/dashboard/kibana/visualize) > Create visualization > Vertical bar**. Search for `logzioCustomerIndex` and choose it as your source.

![Create visualization start here](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/start-a-visualization.gif)

Click on **Y-axis**, choose **Sum** as the aggregation, and **LogSize** as the field. 

![Add y axis](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/yaxis-visualize.png)

Click on Add under **Buckets** and choose **X-axis**. Select **Date Histogram** as the aggregation, and **@timestamp** as the field. You can change the minimum interval based on the output you'd like to view, for example, a **Daily view**. 

![Add x axis](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/xaxis-visualization.png)

Click on Add, and choose **Split series**. Select **Terms** as the sub aggregation, and **type** as field. Change the size to **100**.

![Add split series](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/splitseries-visualization.png)

Click **Apply changes** to generate  your visualization.

![Create a visualization button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/apply-changes-visualization.png)


You can modify the aggregations and intervals based on the data suitable to your visualization needs. For example, if you’re using **Kubernetes**, you can view LogSize per service, container ID, etc.
{:.info-box.note}

<!--
Visualization to show LogSize SUM of the whole marked timeframeChoose Data Table visualization.Metrics as SUM on LogSize fieldBuckets as Split rows -> Terms aggregation on the source field (such as “type”)Result would look like so: (images attached)

logziocustomerindex
-->