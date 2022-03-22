---
layout: article
title: Dashboard variables
permalink: /user-guide/infrastructure-monitoring/configure-metrics-drilldown-links.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Configuring Metrics drilldown links
flags:
  logzio-plan: pro
tags:
  - metrics
contributors:
  - shalper
  - imnotashrimp
  - daniel-tk
---

Variables will allow you to apply filters on your dashboards and drilldown links.

Follow these steps to add your dashboard variables: 

#### Add dashboard variables {#set-up-dashboard-variables}

**Before you begin, you'll need**:
[Metrics](https://app.logz.io/#/dashboard/metrics/) in your Logz.io metrics account.

<div class="tasklist">

##### Add a new dashboard and variable

* In the Metrics left menu, click <i class="fas fa-plus"></i>.
* Click <i class="fas fa-cog"></i> in the dashboard toolbar (upper right corner).
* Select **Variables** > **Add variable**.

![Add Metrics interface variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/metrics-variables.png)

##### Define the variable

In this example, we will be focusing on the most common variable type - `query` variable. However, there are other variable types - you can see the complete list in the [official documentation](https://grafana.com/docs/grafana/latest/variables/variable-types/).


Fill in the form, starting with the **General** section.

* Give a short variable **Name**. This is the placeholder value this variable will use.
* Set a human-readable **Label**. This is the filter control at the top of your dashboard.
* In the **Type** list, choose **Query**.
* We recommend leaving **Hide** empty.

![Variable general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variables-edit-general.png)


Next, fill in the query options.

For the **Data source**, select your Metrics account. (You can look it up [here](https://app.logz.io/#/dashboard/settings/manage-accounts).)

We recommend setting **Refresh** to automatically occur **On Time Range change**.

The **Query** field is where things get really fun. There are several options here, we will be focusing on the main ones (you can see the full list in the [official documentation](https://grafana.com/docs/grafana/latest/datasources/prometheus/#query-variable)):

* Getting a label name with no specified conditions. For example: `label_values(container)`.
* Getting a label name specified to a metric. The metric will come first, then the label name, separated by a comma. For example: `label_values(container_cpu_usage_total,container)`.
* Getting a label name specified to a metric and a previous variable. The metric will come first, followed by the previous variable in curly brackets, then the label name, separated by a comma. For example: `label_values(container_cpu_usage_total{cluster_name=~”$cluster”},container)`.

![Query field preview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/preview-of-variables-metrics.png)


##### Configure the remaining options and save

You can set the remaining options to whatever makes the most sense for your metrics.

When finished, scroll to the bottom of the page and click **Update**.

You're now ready to use the variable in your new dashboard.

###### Additional resources

* To learn more about Prometheus and PromQL, check out our [examples and best practices guide](https://docs.logz.io/user-guide/infrastructure-monitoring/prometheus-promql-queries.html). 
* If you're looking to configure **Explore in kibana** drilldown links, click [here](/user-guide/infrastructure-monitoring/explore-in-kibana-drilldown-links.html).
