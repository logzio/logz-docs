---
layout: article
title: Dashboard variables
permalink: /user-guide/infrastructure-monitoring/configure-metrics-drilldown-links.html
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

![Metrics interface variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/metrics-source-query.png)


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

Fill in the form, starting with the **General** section.

* Give a short variable **Name**. This is the placeholder value this variable will use.
* Set a human-readable **Label**. This is the filter control at the top of your dashboard.
* In the **Type** list, choose **Query**.
* We recommend leaving **Hide** empty.

![Variable general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variables-edit-general.png)


Next, fill in the query options.

* For the **Data source**, select your Metrics account. (You can look it up [here](https://app.logz.io/#/dashboard/settings/manage-accounts).)
* We recommend setting **Refresh** to automatically occur **On Dashboard Load**.
* The **Query** field is where things get really fun. Once you enter your query, you'll be able to see a preview of the values that match it.

![Variable query options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variables-value-preview.png)

<!--
   Your query can reference another Metrics interface variable.
  In this example, `$cluster` references another variable.

  ```json
  {"find": "terms", "field": "kubernetes.node.name", "query": "cluster:$cluster"}
  ```
  Otherwise, the query can be set to a specific field. For example:

  ```json
  {"find": "terms", "field": "host.name"}
  ```
-->

##### Configure the remaining options and save

You can set the remaining options to whatever makes the most sense for your metrics.

When finished, scroll to the bottom of the page and click **Update**.

You're now ready to use the variable in your new dashboard.

#### Additional resources

* To learn more about Prometheus and PromQL, check out our [examples and best practices guide](https://docs.logz.io/user-guide/infrastructure-monitoring/prometheus-promql-queries.html). 

* If you're looking to configure **Explore in kibana** drilldown links, click [here](/user-guide/infrastructure-monitoring/explore-in-kibana-drilldown-links.html).
