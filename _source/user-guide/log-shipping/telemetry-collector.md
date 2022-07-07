---
layout: article
title: Getting started with Logz.io's Telemetry Collector
permalink: /user-guide/log-shipping/telemetry-collector.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's Telemetry Collector
tags:
  - log-shipping
contributors:
  - hidan
---

Logz.io's Telemetry Collector lets you quickly send your data based on the configuration that fits your needs. You can use it to send logs, metrics, and tracing data back to Logz.io’s observability platform. 


Telemetry Collector is currently **available in all regions** except for Japan and Australia. If you're located in these regions, you can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** to send your data.
{:.info-box.note}

#### Why should you use Telemetry Collector?

Configuring and running Logz.io’s Telemetry Collector provides several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Collector lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Collector collects logs, metrics, and tracing data from your end, providing a complete observability platform to monitor and improve your data.

##### Supported platforms

Logz.io’s Telemetry Collector currently supports **Kubernetes** for logs, metrics, and traces.

The Telemetry Collector will soon support additional platforms, including **AWS**, **Azure**, **Linux**, **Windows**, **Mac**, and more.

If you're interested in sending your data through a different source, you can use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** guide, which includes over 300 shipping methods.


#### Configure your Telemetry Collector:

<!--Only account admins can configure and send data to Logz.io
{:.info-box.note} -->

To start sending your data through the Telemetry Collector, Log into your Logz.io account, navigate to [Send your data](https://app.logz.io/#/dashboard/send-your-data), and click on **Start collecting**.


![Start collecting button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/send-data-collector.png)


Select the platform through which you’d like to ship your data. Then, if required, select the relevant sub-type.

![Select platform](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-step-1.png)

Next, select the data sources. Hover over each source to see the type of data it collects and processes.

*You'll have to manually [define auto-instrumentation](https://docs.logz.io/user-guide/distributed-tracing/tracing-instrumentation) to collect your Distributed Tracing through Logz.io’s Telemetry Collector.*

![Select data source](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-step-2.png)

In the next step, you'll need to add a name and description to help identify the collector. 

Under **Accounts**, you can review the Logs, Metrics, and Tracing accounts to which the Telemetry Collector will send the data. If you don't have an existing account, you'll be able to review the account's name that will be created.

Click **Generate snippet** to continue.

![Define collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-step-3.png)

Next, review your collector. The Summary, located on the left side of the screen, includes all of the data in the collector.

Choose the platform on which you want to run the Telemetry Collector. You can choose between **Mac**, **Windows**, or **Linux**. Copy the code and run it on your end.

Some platforms might require additional details, such as admin privileges or passwords, to complete the installation. These details are not sent to or stored by Logz.io.
{:.info-box.note}

![Review collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-snippet-last-step.png)

That’s it! It might take a while for the Telemetry Collector to get up and running, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system.

If you encounter issues in installing or running your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).

#### How to remove a Telemetry Collector:

You can uninstall your Telemetry Collector from Kubernetes by running the following snippet:

`helm uninstall -n monitoring logzio-monitoring`

This snippet removes the collector from Logz.io and stops sending your data. Of course, you can always create a new collector or use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data)** to ship your data.

If you are unsuccessful in removing your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).


##### Additional resources

* [View Telemetry Collector on GitHub](https://github.com/logzio/logzio-agent-manifest)