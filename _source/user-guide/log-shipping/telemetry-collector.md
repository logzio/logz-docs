---
layout: article
title: Getting started with Telemetry Collector
permalink: /user-guide/log-shipping/telemetry-collector.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's Telemetry Collector
search: false
sitemap: false
tags:
  - log-shipping
contributors:
  - hidan
---

Logz.io Telemetry Collector lets you quickly send your data based on the configuration that fits your needs. You can use it to send logs, metrics, and tracing data back to Logz.io’s observability platform. 


Telemetry Collector is open to all regions except Japan and Asia Pacific. These regions can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** to send data. 
{:.info-box.note}

#### Why should I use Telemetry Collector?

Configuring and running Logz.io’s Telemetry Collector gives you several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Collector lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Collector collects logs, metrics, and tracing data from your end, providing a complete observability platform to monitor and improve your data.

##### Supported platforms

Currently, Logz.io's Telemetry Collector supports **Kubernetes** for logs, metrics, and traces.

Additional platforms that will soon be added to the Telemetry Collector include AWS, Docker, Filebeat, etc.

If you're interested in sending your data through a different source, you can use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** guide and choose from over 300 shipping methods.


#### Configure your Telemetry Collector:

Only account admins can configure and send data to Logz.io
{:.info-box.note}

To start sending your data thorugh the Telemetry Collector, Log into your Logz.io account and click on **Start sending**.

[image]

Select the platform through which you’d like to ship your data. Then, if necessary, select the relevant sub-type.

[image]

Next, select the data sources. Hover over each source to see the type of data it collects and processes.

[image]

Add a name and description to help identify the collector. Inside Accounts, you can review which account the data will be sent to. Click **Generate** to continue.

[image]

Next, review your collector. The Summary, located on the left side of the screen, includes all of the data included in the collector. If you want to edit or change anything, click **Back** and navigate to the relevant step.

[image]

Choose the platform on which you want to run the Telemetry Collector. You can choose between Mac, Windows, or Linux. Copy the code and run it on your end.

Some platforms might require additional details to complete the installation, such as admin privileges or passwords. These details are not sent or stored by Logz.io.

[image]

That’s it! It might take a while for the Telemetry Collector to get up and running, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system.

[image?]

If you're unable to run your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).

How to remove a Telemetry Collector:

TBD


##### Additional resources

* [View Telemetry Collector on GitHub](https://raw.githubusercontent.com/logzio/logzio-agent-manifest/mac.bash)