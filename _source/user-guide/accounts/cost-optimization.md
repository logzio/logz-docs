---
layout: article
title: Optimize your Logz.io data
permalink: /user-guide/accounts/cost-optimization.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: The complete guide to optimizing your Logz.io data
flags:
  admin: true
  logzio-plan: pro
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - hidan
---

Logz.io Data Optimization helps you manage and optimize your Logz.io products, by offering tailored recommendations and a quick and easy way to drop or rollup your logs and metrics. 


To get started, navigate to **[Data hub](https://app.logz.io/#/dashboard/cost)**.

#### Explore Metrics and Logs

You can switch between your **Logs** and **Metrics** overview.


The **Metrics** table includes the following details:

* **Name** - The name of the main metric and its related labels. Click on the labels to view the complete list included in this metric.
* **UTS** - Amount of unique time series used by this metric, and a percentage representation of how much it's using.



The **Logs** table includes the following details:




Both views include the total number of logs or metrics, and a table with the following details:


* Metric or log name and its related labels.
* Amount of Unique Time Series (UTS) or Volume in use.
* The accounts that are using the data.
* The context in which the data is being used; in an alert or as part of a dashboard.
* The actions you can take to optimize your usage.

<!-- ![Dashboard overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/) -->

#### Filter your view

You have two primary filters that you can apply to your view: **Account** and **Used**.

The Account filter includes all of the accounts associated with your user, and the Used filter allows you to get a quick view of how the data is being used.

You can also click on the account's name or one of the used options inside the table to apply them to your filters.

<!-- ![Filter view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/) -->

For example, you can apply the **Not used** filter to view all data not being used by any alerts or dashboards.

<!-- ![Drop all metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/) -->

In addition, you can filter your view by clicking on the titles of the table to view by ascending or descending data.


#### Actions and abilities

After filtering your view and analyzing how much data you’re using, you can optimize your usage by dropping unnecessary data.

You can drop individual metrics or logs or perform a bulk-drop action by selecting several metrics or logs.

By selecting multiple lines from the table, a new **Drop** button will appear at the top of the table. Click on it to review all of the filters included in this process and estimate how much data you’ll save. Then, click **Drop** to drop these metrics or logs.

<!-- ![Drop all metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/) -->


<!-- #### View dropped metrics -->
