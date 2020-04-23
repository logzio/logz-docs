---
layout: article
title: Drilldown links
permalink: /user-guide/infrastructure-monitoring/explore-in-kibana-drilldown-links
flags:
  logzio-plan: pro
tags:
  - metrics
contributors:
  - shalper
  - imnotashrimp
  - daniel-tk
---

Drilldown links are shortcuts that take you directly to the relevant Kibana results in your logs.
When you identify an issue in your graph and want to investigate it further,
you can click a drilldown link
and go straight to the related logs.

Many of the dashboards managed by Logz.io come with the drilldown links preconfigured.
When you're setting up your own dashboard,
you can configure your own drilldown links.

#### Configure Grafana drilldown links

**Before you begin, you'll need**:
[variables configured](/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links) for your dashboard.

<div class="tasklist">

##### Add a new panel

If you're not already in a dashboard,
make a new one now by clicking <i class="fas fa-plus"></i> in the left menu.

If you don't see a new panel,
click the **Add panel** button in the toolbar (in the upper right corner).

Click **Add Query**.

![Grafana new panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/new-panel.png)

##### Configure the query and visualization

![Panel configuration, datasource list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--query--datasource-list.png)

In the datasource list, choose your Infrastructure Monitoring account
(Elasticsearch datasource).

Configure the Elasticsearch **Query**.

For help configuring the query,
see [Query Editor](https://grafana.com/docs/grafana/latest/guides/basic_concepts/#query-editor)
from Grafana.
{:.info-box.read}


##### Configure the visualization

Click the _Visualization_ icon to the left to see visualization options.

![Panel configuration, visualization  options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--query--visualization.png)

The visualization doesn't require anything special
for Logz.io—configure it as you normally would.

##### Configure the drilldown

Click the _General_ icon to the left to see general options.

If you want to change the panel's **Title**,
you can do that here.

![Panel configuration, general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--general--add-link.png)

Scroll to the _Drilldown links_ section,
and click **+ Add link**.
You'll see the full drilldown link configuration.

![Drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--general--drilldown-link-config.png)

* In the **Type** list, choose **absolute**.
* Set **Url** to `/#/expore-kibana-from-grafana`.
* Set the **Title** to "Explore in Kibana".
* Set **Url params** to `query=`, followed by your Kibana query (written in Lucene).
* Turn on **Include time range**, **Include variables**, and **Open in new tab**.

We recommend testing your _Url params_ query in Kibana
to make sure you're getting the intended results.
{:.info-box.tip}

##### Save and test

Save your dashboard.
(The _Save dashboard_ button is in the toolbar in the upper right corner.)

Test your new drilldown link
by hovering over <i class="fas fa-external-link-alt"></i>
(upper left corner of the panel),
and then clicking **Explore in Kibana**.

![Drilldown link](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-drilldown-link.png)
