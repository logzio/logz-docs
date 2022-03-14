---
layout: article
title: LogSize visualization guide
permalink: /user-guide/accounts/log-visualization.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: The Logz.io guide to visualizing your LogSize
flags:
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---


Your **Logs** account has a daily quota to help you manage and monitor your logs and usage. To better understand your logs and their volume, you can create a visualization based on your log size. Follow these steps to create your LogSize visualization:

##### Enabling LogSize


Only account admins can enable saving log size. However, once enabled, all account users can use LogSize.
{:.info-box.note}


Kibana doesn’t recognize LogSize as a number right away, and you'll need to enable it to create your visualization. 

Navigate to **[Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts)** and click on your main logs account. Then, click on **Advanced options** and tick the Save log size option.

![Enable log size](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/utilization--save-account-utilization-metrics.png)

Account utilization metrics and log size are set per individual account. This page is available only from your main account — you won’t be able to make this change from a sub account.

Navigate to your main **[Kibana dashboard](https://app.logz.io/#/dashboard/kibana/)**. Next, click on **Refresh mapping** to view the added field called LogSize. This field contains the size of the log line in bytes, taken as a single string.


##### Creating LogSize visualization

Once LogSize is enabled, you can create your LogSize visualization. 

Navigate to **[Logs](https://app.logz.io/#/dashboard/kibana/) > [Visualize](https://app.logz.io/#/dashboard/kibana/visualize) > Create visualization > Vertical bar**. Search for `logzioCustomerIndex` and choose it as your source.

![Create visualization start here](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/start-a-visualization.gif)

Click on **Y-axis**.

1. Choose **Sum** as the aggregation
2. Choose **LogSize** as the field. 

![Add y axis](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/yaxis-visualize-focus.png)

Click on Add under **Buckets** and choose **X-axis**. 

1. Select **Date Histogram** as the aggregation
2. Select **@timestamp** as the field
3. Change the minimum interval based on the output you'd like to view. In this example, we used the **Auto** interval. 

![Add x axis](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/xaxis-updated-view.png)

Click on Add, and choose **Split series**. 

1. Select **Terms** as the sub aggregation
2. Select **type** as field 
3. Change the size based on your preferences. In this example, we changed it to **100**.

You can modify the aggregations, intervals, and types based on the data suitable to your visualization needs. For example, if you’re using **Kubernetes**, you can view LogSize per service, container ID, etc.
{:.info-box.note}

![Add split series](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/splitseries-visualization-focus.png)

Click **Apply changes** to generate  your visualization.

![Create a visualization button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/apply-changes-visualization-focus.png)

Your LogSize visualization is ready. It includes the different logs and their sizes based on the date range you've chosen. 

You can edit the fields to investigate further, and **Save** or **Share** it with your teammates. 


![Create a visualization button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/logsize-output.png)



<!--
Visualization to show LogSize SUM of the whole marked timeframeChoose Data Table visualization.Metrics as SUM on LogSize fieldBuckets as Split rows -> Terms aggregation on the source field (such as “type”)Result would look like so: (images attached)

logziocustomerindex
-->