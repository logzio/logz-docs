---
layout: article
title: Getting started with Metrics
permalink: /user-guide/infrastructure-monitoring/getting-started
flags:
  logzio-plan:
tags:
  - metrics
contributors:
  - shalper
  - imnotashrimp
---

Here's a quick tour to help you get started with your new infrastructure monitoring workspace.

<div class="tasklist">

##### Log into your Metrics account
Your Infrastucture Monitoring account complements your logging ELK stack. To reach it, log into your Logz.io Operations workspace and select the [Metrics tab](https://app.logz.io/#/dashboard/grafana/).

Don't see it? By default, your Metrics account can only be accessed from your main account. If you don't see the Metrics tab, the account doesn't have permissions to it. [Learn how to grant sub accounts permissions to Metrics]({{site.baseurl}}/user-guide/accounts/manage-the-infrastructure-monitoring-account.html).

![Navigate to your metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/reach-metrics.png)

##### The welcome dashboard

When you first log into Logz.io Metrics,
  you'll see a dashboard that gives you an overview of your account.
  This dashboard shows your account usage,
  metrics count,
  and any errors we encountered when indexing your metrics.


##### Pre-built dashboards

Your Logz.io Metrics account comes pre-loaded with dashboards
  that work with your data sources out-of-the-box,
  no configuration required.
  Most of these dashboards include the
  [drilldown links]({{site.baseurl}}/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links.html)
  you'll need to explore related logs in Kibana. Our team of content developers are continuously releasing new and improved dashboards so you can check back again for additional handy dashboards and tips in the future.

Select the dashboard and the data source to begin.

![Logz.io Infrastructure Monitoring](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/select-board-and-source.png)

##### Metrics left menu

The main way to get around. You might recognize the layout from Grafana.

* Click <i class="fas fa-plus"></i> to create a dashboard
* Click <i class="fas fa-th-large"></i> to manage your dashboards
* Click <i class="fas fa-compass"></i> to explore your metrics

</div>