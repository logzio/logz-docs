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
The Metrics interface variables are indicated with a `$`.

![Metrics interface variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/grafana-variables.png)

#### Add dashboard variables {#set-up-dashboard-variables}

**Before you begin, you'll need**:
[Metrics](https://app.logz.io/#/dashboard/metrics/) in your Logz.io metrics account.

<div class="tasklist">

##### Add a new dashboard and variable

* In the Metrics left menu, click <i class="fas fa-plus"></i>.
* Click <i class="fas fa-cog"></i> in the dashboard toolbar (upper right corner).
* Select **Variables** > **Add variable**.

![Add Metrics interface variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/add-variable.png)

##### Define the variable

Fill in the form, starting with the **General** section.

* Give a short variable **Name**. This is the placeholder value this variable will use.
* Set a human-readable **Label**. This is the filter control at the top of your dashboard.
* In the **Type** list, choose **Query**.
* We recommend leaving **Hide** empty.

![Variable general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/add-variable1.png)


Next, fill in the query options.

* For the **Data source**, select your Metrics account. (You can look it up [here](https://app.logz.io/#/dashboard/settings/manage-accounts).)
* We recommend setting **Refresh** to automatically occur **On Dashboard Load**.
* The **Query** field is where things get really fun. Your query object should start with `{"find": "terms"}`
  and contain a field from your Elasticsearch index.

![Variable query options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variable-config--query-options.png)

  Your query can reference another Metrics interface variable.
  In this example, `$cluster` references another variable.

  ```json
  {"find": "terms", "field": "kubernetes.node.name", "query": "cluster:$cluster"}
  ```
  Otherwise, the query can be set to a specific field. For example:

  ```json
  {"find": "terms", "field": "host.name"}
  ```

##### Configure the remaining options and save

The remaining options can be set
to whatever makes the most sense for your metrics.

When you're finished, scroll to the bottom of the page and click **Update**.


You're now ready to use the variable in your new dashboard.
If you're looking to configure **Explore in kibana** drilldown links, click [here](/user-guide/infrastructure-monitoring/explore-in-kibana-drilldown-links.html).
