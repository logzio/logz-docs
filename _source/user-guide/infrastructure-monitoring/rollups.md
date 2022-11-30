---
layout: article
title: Data Rollups
permalink: /user-guide/infrastructure-monitoring/data-rollups.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Create and manage your data Rollups
flags:
  logzio-plan: community
tags:
contributors:
  - shalper
  - hidan
---

You can compact and discard some of your metrics as it ages to focus on the data that matters. **Rollups** let you aggregate many time series by excluding labels, optimizing your costs and performance.

###### On this page
{:.no_toc}

* toc list
{:toc}

### Create a Rollup

To create a Metric Rollup, navigate to **[Data Hub > Rollups](https://app.logz.io/#/dashboard/tools/metrics-rollups)** and click on the **Add a Rollup rule** button.

Choose the Metrics account you'd like to use. Next, select the metric. The dropdown menu includes all of the metrics inside the chosen account.

Then you'll need to select the labels inside the metrics you'd like to ignore. The dropdown will auto-generate the available labels inside the chosen metric.

Finally, choose the type of metric. Choosing **Gauge** requires an additional step of selecting the aggregation function.

Once your Rollup is ready, click on **Create Rollup**.

![Rollup table](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/rollups/rollup-dialog.png)

### View and manage your Rollups

Once you've created one or more Rollups, they'll appear in a table view.

The table includes the following details:

* **Metric name** - The name of the metric chosen for this Rollup.
* **Account name** - The account to which this metric is related.
* **Excluded labels** - The labels to which you've decided to apply the Rollup.
* **Metric type** - An indication of the chosen metric's type.
* **Rollup function** - This column indicates the selected function for gauge metric types.


![Rollup table](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/rollups/rollup-table.png)