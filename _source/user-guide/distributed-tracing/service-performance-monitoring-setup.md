---
layout: article
title: Set up your Service Performance Monitoring dashboard
permalink: /user-guide/distributed-tracing/service-performance-monitoring-setup
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Setting up your Service Performance Monitoring dashboard
flags:
  logzio-plan: pro enterprise
tags: 
  - distributed tracing
contributors:
  - hidan
---

Logz.io Service Performance Monitoring dashboard provides an overview of your systems' health by aggregating **Request**, **Error**, and **Duration** (R.E.D) metrics from span data. The dashboard helps you to pinpoint and isolate incidents in your system quickly.


The following guide helps you configure the OpenTelemetry collector to extract metrics from spans generated from your application instrumentation, and send them to Logz.io. 

Once configured and deployed, the collector accepts the spans and processes them through two pipelines:

The first pipeline sends the spans to the Logz.io backend, where you can analyze single traces and focus on slowness and bottlenecks. 

The second pipeline extracts the metrics from the same spans, aggregates them, and sends them to Logz.io’s Prometheus-based account.

<div class="tasklist">


#### Prerequisite for Service Performance Monitoring dashboard

To get started with your very own dashboard, you'll need an active **[Metrics](https://app.logz.io/#/dashboard/metrics)** plan.

If you don't have an active Metrics plan, a trial account will be automatically created for you, **free of charge**.

Your Metrics account trial will be available for 2 weeks. Afterward, you'll need to purchase a Metrics plan to continue using your Service Performance Monitoring dashboard. 
{:.info-box.note}

If you have an active Metrics plan, the Service Performance Monitoring dashboard will try to allocate data from your existing plan. It requires a minimum of 1,000 available UTS in your Metrics plan to run and will try and allocate up to 5,000 UTS. After completing the setup process, you can change this setting and re-adjust your data allocation by navigating to the **[Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts)** page.

If you don't have enough UTS available, you'll need to **re-allocate** or **add additional UTS** to your account, which you can do on the **[Manage account](https://app.logz.io/#/dashboard/settings/manage-accounts)** page.

#### Configure and ship your data

You'll need to configure your collector to extract metrics from your data. Log into your Logz.io account and follow these steps to **[modify the OpenTelemetry collector](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics)**. 

You can configure the collector to ship data from a **[Local host](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=local-host)**, **[Docker](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=docker)**, or **[Kubernetes](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=kubernetes)**.

Before deploying, make sure the collector you're using is version **v0.44.0** and up.

Once everything is set, restart the collector to apply the configuration changes. 

#### Check Logz.io for your metrics

Give your metrics some time to reach and render from your system to Logz.io, then navigate to **[Tracing](https://app.logz.io/#/dashboard/jaeger/) > [Monitor](https://app.logz.io/#/dashboard/jaeger/monitor)** to view the aggregated metrics for your services and operations.

</div>