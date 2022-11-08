---
layout: article
title: Optimize and save your Logz.io costs
permalink: /user-guide/accounts/cost-optimization.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io's guide to optimizing your costs
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

Logz.io offers a quick and intuitive way to optimize your Metrics account with just a few clicks. You can view your unused metrics and perform bulk actions to allow an optimized account.

To get started, navigate to **[Metrics > Data optimization hub](https://app.logz.io/#/dashboard/cost)**. On this page you'll be able to see a break down of your current Metrics, including:

* Metric name and its related labels
* Amount of Unique Time Series (UTS) each metric is using
* Which accounts are using these metrics
* How the metrics are being used; as part of a dashboard or an alert
* Action you can take to optimize your metrics' usage

![Dashboard overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/)

#### Filter your view

At the top of the table you'll find the two most important filters: **Account** and **Used**. 

Use them to filter your view based on one of your accounts, or to view if and how the metrics are being used.

![Filter view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/)

For example, you can apply the **Not used** filter to view all metrics that are not assosiated with any dashboard or alerts.

![Drop all metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/)


#### Optimize your Metrics plan

You can drop individual metrics, or perform a bulk-drop action by selecting a number of metrics.

Once selected, click on the **Drop** button at the top of the table. You'll be able to review all of the metrics and filters before dropping them, to ensure you're not dropping any important data.

![Drop all metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/)



#### View dropped metrics


You can filter your view according to an account, or by viewing which metrics are currently unused. Choosing the latter allows you to perform a bulk action of dropping these metrics, since they are not in used, freeing up used UTS.

Next to each metric you have the option to drop it, which opens up a menu asking you to choose the account. The filter is already there, according to the chosen metric. You can also add the option to drop specific labels inside the metric.

Click apply the filter to drop these metrics.


===

//You can view your dropped metrics on the Dropped metrics page.




## Volume settings


### Account utilization notifications


| Notifications | Low risk  | High risk |
|---|----|---|
| Shared volume | 80% of shared volume is spent for the day. | 100% of shared volume is spent for the day. Only accounts with available reserved volume can continue to index logs. No shared capacity will be available until the index switches at 00:00 UTC tonight. |
| Account cap | Account has reached 80% of its daily cap. | Account has reached 100% of its daily cap. It will no longer accept data until the index switches at 00:00 UTC. |

#### Configure flexible capacity accounts

<div class="tasklist">

##### Enable flexible volume for your plan


##### Configure account capacity

![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/configure-flexible-volume.png)
