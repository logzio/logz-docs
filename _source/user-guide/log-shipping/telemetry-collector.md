---
layout: article
title: Getting started with Logz.io's Telemetry Collector
permalink: /user-guide/log-shipping/telemetry-collector.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Send your data with Logz.io's Telemetry Collector
tags:
  - log-shipping
contributors:
  - hidan
---

Logz.io’s Telemetry Collector lets you quickly send your data based on the configuration that fits your needs. For example, you can use it to send logs, metrics, and tracing data back to Logz.io’s observability platform.

{% include /general-shipping/agent-note.md %}


Telemetry Collector is currently **available in all regions** except for Japan and Australia. If you're located in these regions, you can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=all)** to send your data.
{:.info-box.note}

{% include /general-shipping/agent-note.md %}


#### Why should you use Telemetry Collector?

Configuring and running Logz.io’s Telemetry Collector provides several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Collector lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Collector collects logs, metrics, and tracing data from your end, providing a complete observability platform to monitor and improve your data.

##### Supported platforms

Logz.io’s Telemetry Collector currently supports **Kubernetes** for logs, metrics, and traces. You can also use the Telemetry Collector to send **Localhost** files via your Mac or Windows machines. 

The Telemetry Collector will soon support additional platforms, including **AWS**, **Azure**, **Linux**, **Windows**, **Mac**, and more.

If you're interested in sending your data through a different source, you can use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=all)** guide, which includes over 300 shipping methods.


##### Getting started with the Telemetry Collector:


* [Send **Kubernetes** data with Telemetry Collector](/user-guide/log-shipping/telemetry-collector-k8s.html)
  * [Manage a Kubernetes Telemetry Collector](/user-guide/log-shipping/telemetry-collector-k8s.html#how-to-remove-a-telemetry-collector)
* [Send **Localhost** data with Telemetry Collector](/user-guide/log-shipping/telemetry-collector-localhost.html)
  * [Manage a Localhost Telemetry Collector](/user-guide/log-shipping/telemetry-collector-localhost.html#manage-and-remove-a-telemetry-collector)


##### Additional resources

* [View Telemetry Collector on GitHub](https://github.com/logzio/logzio-agent-manifest)