---
layout: article
title: Configure Grafana drilldown links
permalink: /user-guide/infrastructure-monitoring/configure-grafana-drilldown-links.html
flags:
  logzio-plan: pro
tags:
  - metrics
contributors:
  - imnotashrimp
---

One of the most useful features you'll come across
in Logz.io Infrastructure Monitoring
is drilldown links.
With drilldown links,
if you see something funky,
you can click a link
and go straight to the related logs in Kibana.

Drilldown links are preconfigured on any dashboards managed by Logz.io.
If you're setting up your own dashboard,
you'll need to configure drilldown links.
This doc shows you how.

#### To configure Grafana drilldown links

**Before you begin, you'll need**:
[Metrics]({{site.baseurl}}/shipping/) in your Logz.io metrics account,
a dashboard that isn't managed by Logz.io

<div class="tasklist">

##### Make a new panel

Open a dashboard that isn't managed by Logz.io (or make a new one).

If you don't see a new panel,
click the **Add panel** button in the toolbar (in the upper right corner).

![Grafana new panel]({{site.baseurl}}/images/grafana/new-panel.png)

Click **Add Query**.

##### Configure the query and visualization

![Panel configuration, datasource list]({{site.baseurl}}/images/grafana/panel-config--query--datasource-list.png)

In the datasource list, choose the Elasticsearch datasource.
This is the name of your Infrastructure Monitoring account,
which you set in the [_Manage accounts_](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
(By default, it's the name of your main account, followed by "_metrics".)

For help configuring the query,
see [Query Editor](https://grafana.com/docs/grafana/latest/guides/basic_concepts/#query-editor)
from Grafana.
{:.info-box.read}

Click the _Visualization_ icon to the left to see visualization options.

![Panel configuration, visualization  options]({{site.baseurl}}/images/grafana/panel-config--query--visualization.png)

Configure the visualization as you normally would.

##### Configure the drilldown

Click the _General_ icon to the left to see general options.

If you want to change the panel's **Title**,
you can do that here.

![Panel configuration, general settings]({{site.baseurl}}/images/grafana/panel-config--general--add-link.png)

Scroll to the _Drilldown links_ section,
and click **+ Add link**.
You'll see the full drilldown link configuration.

![Drilldown links]({{site.baseurl}}/images/grafana/panel-config--general--drilldown-link-config.png)

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

![Drilldown link]({{site.baseurl}}/images/grafana/panel-drilldown-link.png)

Test your new drilldown link
by hovering over the upper left corner of the panel,
and then clicking **Explore in Kibana**.

</div>
