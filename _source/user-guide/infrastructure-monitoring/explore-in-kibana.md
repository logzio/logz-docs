---
layout: article
title: Explore in Kibana
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

**Explore in Kibana** are drilldown links that give you a direct shortcut from your Metrics' visualizations to the relevant logs in Kibana.

You'll find that many of the dashboards provided out-of-the-box by Logz.io come with **Explore in Kibana** drilldown links preconfigured. But you can also add your own to any dashboards and visualizations. (The only caveat is you'll need to have edit-permissions to the dashboard, so if you don't, duplicate the dashboard first.)

Drilldown links help you go straight to the related logs whenever you identify an issue in your Metrics graphs and see a need to investigate it further. They are a powerful observability tool that gives you context and visibility into the logs that coincided with the Metrics events.


##### Overview
{:.no_toc}

1. toc list
{:toc}

#### Add a panel with drilldown links
{:.no_toc}

**Before you begin, you'll need**:
[variables configured](/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links) in your dashboard.

<div class="tasklist">

##### Add a new panel

If you want to start fresh with a new dashboard, click <i class="fas fa-plus"></i> in the left menu to add it. Otherwise you can just add a new panel: Click the **Add panel** button in the toolbar (in the upper right corner).

Click **Add Query**.

![Grafana new panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/new-panel.png)

##### Configure the panel

Select your Infrastructure Monitoring account from the list of datasources. (This is an Elasticsearch index).

Configure the Elasticsearch **Query**.

![Panel configuration, datasource list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--query--datasource-list.png)


##### Configure the visualization

Click the _Visualization_ icon to the left to see visualization options.

If you plan to add alerts to the visualization, note that only **Graph** is supported. (This is a Grafana limitation.)
{:.info-box.tip}

![Panel configuration, visualization  options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--query--visualization.png)

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
