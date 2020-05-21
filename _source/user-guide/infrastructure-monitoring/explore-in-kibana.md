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

##### Configure the drilldown link

Click the _General_ icon to the left, and scroll to the **Panel links** section at the bottom. 
Click **+ Add link**.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/drill-down-link.mp4" type="video/mp4" />
</video>

* Set the **Title** to **Explore in Kibana**, unless you want to name it something else.
* Copy this endpoint to the **URL**:

  ```
  /#/explore-kibana-from-grafana?$__url_time_range&query=
  ```
* Write your Kibana query in Lucene syntax. Make sure there are no spaces before and after the `=` operator.

  It is a good idea to test your query in Kibana Discover to make sure you're getting the intended results.

##### Query syntax and tips

If you're using variables in your query, note that there is a small syntax difference depending on whether you've enabled multi-select or not. 

Here's how to check your variable settings or change them:

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/grafana-variables.mp4" type="video/mp4" />
</video>

* If **Multi-value** or **Include All option** are toggled on, write the variable name as usual - for example `$node`.
* If they are toggled off, write the variable name between double quotes - for example `“$node”`.

Suppose you have a **Node** variable filtered on a specific node. If you wish to look for Kubernetes logs related to the specific node your dashboard is currently filtered on, your URL should look like this:

`/#/explore-kibana-from-grafana?$__url_time_range&query=kubernetes AND $node`

If the node variable doesn't have either **Multi-value** or **Include All option** on, you'll write the variable between double quotes.
This way you don't specify a particular value selection:

`/#/explore-kibana-from-grafana?$__url_time_range&query=kubernetes AND “$node”`


##### Save and test

Save your dashboard.
(The _Save dashboard_ button is in the toolbar in the upper right corner.)

Test your new drilldown link
by hovering over <i class="fas fa-external-link-alt"></i>
(upper left corner of the panel),
and clicking **Explore in Kibana**.

![Drilldown link](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-drilldown-link.png)
