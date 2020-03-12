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
  - daniel-tk
---

One of the most useful features you'll come across
in Logz.io Infrastructure Monitoring
is drilldown links.
If you see something funky,
you can click a drilldown link
and go straight to the related logs in Kibana.

Drilldown links are preconfigured on most dashboards managed by Logz.io.
If you're setting up your own dashboard,
you'll need to configure drilldown links.
This doc shows you how.

#### Set up dashboard variables {#set-up-dashboard-variables}

Dashboards and drilldown links are most useful
when they can be filtered.
To enable filtering on a dashboard,
you'll need to set up dashboard _variables_.

**Before you begin, you'll need**:
[Metrics]({{site.baseurl}}/shipping/) in your Logz.io metrics account

<div class="tasklist">

##### Start a new dashboard

In Grafana's left menu, click <i class="fas fa-plus"></i>.

Click <i class="fas fa-cog"></i> in the dashboard toolbar (upper right corner)
to go to the dashboard _Setttings_ page.

From there, click **Variables** in the left panel.
Then click the big green **Add variable** button
to continue to the _Variables > New_ page.

##### Define a new variable

###### General

![Variable general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variable-config--general.png)

Give a short variable **Name**.
This is the placeholder value this variable will use.
For example, if you set the name `hostName`,
you'll reference that variable as `$hostName`.

Set a human-readable **Label** that will be shown
as filter controls at the top of your dashboard.
If we use our `$hostName` example,
a good label would be "Host name".

In the **Type** list, choose **Query**.

We recommend leaving **Hide** empty.

###### Query options

![Variable query options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variable-config--query-options.png)

In the **Data source** list,
choose your Infrastructure Monitoring account.
This is the name of your Infrastructure Monitoring account,
which you set in the
[_Manage accounts_](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
(By default, it's the name of your main account, followed by "_metrics".)

We recommend setting **Refresh** to **On Dashboard Load**.

The **Query** field is where things get really fun.
You have two options here:

* Option 1: Configure a simple variable,
  where the query is set to a specific field.
  For example:

  ```json
  {"find": "terms", "field": "host.name"}
  ```

* Option 2: Reference another Grafana variable in the query.
  In this example, `$cluster` references another variable.

  ```json
  {"find": "terms", "field": "kubernetes.node.name", "query": "cluster:$cluster"}
  ```

Your query object should start with `{"find": "terms"}`
and contain a field from your Elasticsearch index.

##### Configure the remaining options and save

The remaining options can be set
to whatever makes the most sense for your metrics.

When you're finished, scroll to the bottom of the page and click **Update**.

</div>

Now you're ready to use the variable in your new dashboard.
Continue to _Configure Grafana drilldown links_. 👇

#### Configure Grafana drilldown links

**Before you begin, you'll need**:
[Variables configured](#set-up-dashboard-variables) for your dashboard

<div class="tasklist">

##### Make a new panel

If you're not already in a dashboard,
make a new one now by clicking <i class="fas fa-plus"></i> in the left menu.

If you don't see a new panel,
click the **Add panel** button in the toolbar (in the upper right corner).

![Grafana new panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/new-panel.png)

Click **Add Query**.

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

And now, the thing you came to this doc to do. 🤓

Click the _General_ icon to the left to see general options.

If you want to change the panel's **Title**,
you can do that here.

![Panel configuration, general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--general--add-link.png)

Scroll to the _Drilldown links_ section,
and click **+ Add link**.
You'll see the full drilldown link configuration.

![Drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-config--general--drilldown-link-config.png)

In the **Type** list, choose **absolute**.

Set **Url** to `/#/expore-kibana-from-grafana`.

Set the **Title** to "Explore in Kibana".

Set **Url params** to `query=`, followed by your Kibana query (written in Lucene).

Turn on **Include time range**, **Include variables**, and **Open in new tab**.

We recommend testing your _Url params_ query in Kibana
to make sure you're getting the intended results.
{:.info-box.tip}

##### Save and test

Save your dashboard.
(The _Save dashboard_ button is in the toolbar in the upper right corner.)

![Drilldown link](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/panel-drilldown-link.png)

Test your new drilldown link
by hovering over <i class="fas fa-external-link-alt"></i>
(upper left corner of the panel),
and then clicking **Explore in Kibana**.

</div>
