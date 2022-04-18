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


Telemetry Collector is open to all regions except Japan and Asia Pacific. If your region in these regions, you can use Logz.io’s data shippers to send your data. 
{:.info-box.note}

#### Why should I use Telemetry Collector?

Configuring and running Logz.io’s Telemetry Collector gives you several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Collector lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Collector collects logs, metrics, and tracing data from your various platforms, providing you with a complete observability platform to monitor and improve your data. .

##### Supported platforms

Currently, Logz.io's Telemetry Collector supports **Kubernetes** for logs, metrics, and traces.

Soon 

If you're interested in sending your data through a different source, you can use **[Send your data](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** to choose from over 300 different shipping methods. 


#### Configure your Telemetry Collector:

Only account admins can configure and send data to Logz.io
{:.info-box.note}

Log into your Logz.io account and click on Telemetry Collector.

[image]

Choose a platform to configure your collector.

[image]

Next, choose the type of data sources you’d like to use. Hover over each source to see the type of data it processes.

[image]

Add a name and description to identify your collector. Then, review the data on the left side of the screen to make sure it fits your needs. If you need to change anything, click “Back” and edit it.

[image]

Choose the platform on which you want to run the code snippet. Copy the code and run it on your machine.

Static url - if you need to change anything at this point you’ll need to create a new collector

[image]

That’s it! It might take a while for the Telemetry Collector to get and send all of your data, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system. (Ask Doron)

[image?]

How to remove a Telemetry Collector:

TBD


Contact support / troubleshooting / other (password on snippet)

Additional resources:

Github link
