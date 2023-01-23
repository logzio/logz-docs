---
layout: article
title: Getting started with Logz.io Metrics
permalink: /user-guide/infrastructure-monitoring/getting-started
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's Infrastructure Monitoring solution
flags:
  logzio-plan: community
tags:
  - metrics
contributors:
  - shalper
  - imnotashrimp
---

This quick tour will help you get started with your new infrastructure monitoring workspace.


###### Overview
{:.no_toc}

1. toc list
{:toc}


#### The tour
{:.no_toc}

<div class="tasklist">

##### Log into your Metrics account
Your Infrastucture Monitoring account complements your logging ELK stack. To reach it, log into your Logz.io Operations workspace and select the [Metrics tab](https://app.logz.io/#/dashboard/metrics/).

Don't see it? By default, your Metrics account can only be accessed from your main account. If you don't see the Metrics tab, the account doesn't have permissions to it. [Learn how to grant sub accounts permissions to Metrics]({{site.baseurl}}/user-guide/accounts/manage-the-infrastructure-monitoring-account.html).

![Navigate to your metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/reach-metrics.png)

##### The welcome dashboard

  When you first log into Logz.io Metrics,
  you'll see a dashboard that gives you an overview of your account.
  This dashboard shows your account usage,
  metrics count,
  and any errors we encountered when indexing your metrics.


##### Select a relevant dashboard

  Your Logz.io Metrics account comes pre-loaded with pre-configured dashboards
  that work with your data sources, out-of-the-box,
  no configuration required.

  You'll need to select the dashboard and the data source to begin.

  Some dashboards come in multiple flavors, depending on the shipping method. If the dashboard is empty, but you're shipping the data, try selecting another dashboard for the environment. That should do it :)
  {:.info-box.tip}

![Logz.io Infrastructure Monitoring](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/select-board-and-source.png)


##### Drill down from metrics to logs

  Most pre-configured dashboards include the drilldown links you'll need to explore related logs in Kibana. Our team of content developers are continuously releasing new and improved dashboards so you can check back again for additional handy dashboards and tips in the future.


##### Create an alert

Once you're ready, create your first alert. You'll need to be working on a dashboard you have permissions to edit. You'll also need to work on a graph panel that doesn't contain variables. See how [here]({{site.baseurl}}/user-guide/infrastructure-monitoring/alerts.html).


##### Metrics left menu

The main way to get around. You might recognize the layout from Grafana.

* Click <i class="fas fa-plus"></i> to create a dashboard
* Click <i class="fas fa-th-large"></i> to manage your dashboards
* Click <i class="fas fa-compass"></i> to explore your metrics

</div>