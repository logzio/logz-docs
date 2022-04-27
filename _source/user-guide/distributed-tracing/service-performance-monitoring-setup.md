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

Logz.io Service Performance Monitoring dashboard (SPM) provides an overview of your systems' health by aggregating **Request**, **Error**, and **Duration** (R.E.D) metrics from span data. The dashboard helps you to pinpoint and isolate incidents in your system quickly.


The following guide helps you configure the OpenTelemetry collector to extract metrics from spans generated from your application instrumentation, and send them to Logz.io. 

Once configured and deployed, the collector accepts the spans and processes them through two pipelines:

The first pipeline sends the spans to the Logz.io backend, where you can analyze single traces and focus on slowness and bottlenecks. 

The second pipeline extracts the metrics from the same spans, aggregates them, and sends them to Logz.io’s Prometheus-based account.



#### Activate the Service Performance Monitoring dashboard

Only account admins can activate the Service Performance Monitoring dashboard.
{:.info-box.note}

To get started with Service Performance Monitoring, you'll need to log into your **[Tracing](https://app.logz.io/#/dashboard/jaeger)**, switch to the Monitor tab located at the top of the screen, and click on the **Start now** button.

![Get started screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/monitor-onboarding-screen.png)

You'll then be given a heads up that SPM requires an active **[Metrics](https://app.logz.io/#/dashboard/metrics)** plan. If you don't have an active Metrics plan, a trial account will be automatically created for you, **free of charge**.

> _The Metrics account trial will be available for **2 weeks**. Afterward, you'll need to **purchase a Metrics plan** to continue using your Service Performance Monitoring dashboard._

If you have an active Metrics plan, the Service Performance Monitoring dashboard will try to allocate data from your existing plan. It requires a **minimum of 1,000 available UTS** in your Metrics plan to run and will try and allocate **up to 5,000 UTS**.

Once setup is complete, you can change and re-adjust your data allocation by navigating to the **[Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts)** page.

If you don't have enough UTS available in your existing Metrics account, you'll need to **re-allocate** or **purchase additional UTS** to your account, which you can do on the **[Manage account](https://app.logz.io/#/dashboard/settings/manage-accounts)** page.


##### Logz.io sub account users

If you're using a Logz.io sub account, you'll need to ask your account admin to add data viewing permissions before activating the Service Performance Monitoring dashboard.

The account's admin will need to log into Logz.io's main account > navigate to **[Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts)**, and find the Distributed Tracing Account plan.

![Manage account overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/account-plan-sock-shop.png)

Click on the main tracing account, and add the sub account to allow it to view data from the main tracing source account.

![Add permissions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/add-permissions-tracing.gif)

This process is only needed to activate the SPM. Once activated, the admin can remove the sub account's permissions - as they are no longer necessary to use the Service Performance Monitoring dashboard. 

#### Configure and ship your data

You'll need to configure your collector to extract metrics from your data. Log into your Logz.io account and follow these steps to **[modify the OpenTelemetry collector](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics)**. 

You can configure the collector to ship data from a **[Local host](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=local-host)**, **[Docker](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=docker)**, or **[Kubernetes](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/span-metrics?type=kubernetes)**.

Before deploying, make sure the collector you're using is version **v0.44.0** and up.

Once everything is set, restart the collector to apply the configuration changes. 

#### Check Logz.io for your metrics

Give your metrics some time to reach and render from your system to Logz.io, then navigate to **[Tracing](https://app.logz.io/#/dashboard/jaeger/) > [Monitor](https://app.logz.io/#/dashboard/jaeger/monitor)** to view the aggregated metrics for your services and operations.