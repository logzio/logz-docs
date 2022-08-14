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

Telemetry Collector is currently **available in all regions** except for Japan and Australia. If you're located in these regions, you can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=all)** to send your data.
{:.info-box.note}

* [Send Kubernetes data with Telemetry Collector](/user-guide/log-shipping/telemetry-collector.html#configure-your-telemetry-collector-with-kubernetes)
* [Send Localhost data with Telemetry Collector](/user-guide/log-shipping/telemetry-collector.html#configure-your-telemetry-collector-with-localhost)
* [Remove a Telemetry Collector](/user-guide/log-shipping/telemetry-collector.html#how-to-remove-a-telemetry-collector)


#### Why should you use Telemetry Collector?

Configuring and running Logz.io’s Telemetry Collector provides several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Collector lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Collector collects logs, metrics, and tracing data from your end, providing a complete observability platform to monitor and improve your data.

##### Supported platforms

Logz.io’s Telemetry Collector currently supports **Kubernetes** for logs, metrics, and traces. You can also use the Telemetry Collector to send **Localhost** files via your Mac. 

The Telemetry Collector will soon support additional platforms, including **AWS**, **Azure**, **Linux**, **Windows**, **Mac**, and more.

If you're interested in sending your data through a different source, you can use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=all)** guide, which includes over 300 shipping methods.


#### Configure your Telemetry Collector with Kubernetes:

<!--Only account admins can configure and send data to Logz.io
{:.info-box.note} -->

To start sending your data through the Telemetry Collector, Log into your Logz.io account, navigate to [Send your data](https://app.logz.io/#/dashboard/send-your-data), and click on **Start collecting**.


![Start collecting button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/send-data-collector.png)


<div class="tasklist">

##### Select platform


Select the platform through which you’d like to ship your data. Then, if required, select the relevant sub-type.

![Select platform](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-collector-main-aug22.png)

##### Select data sources

Next, select the data sources. Hover over each source to see the type of data it collects and processes.

*You'll have to manually [define auto-instrumentation](https://docs.logz.io/user-guide/distributed-tracing/tracing-instrumentation) to collect your **Distributed Tracing** through Logz.io’s Telemetry Collector.*

![Select data source](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-step-2.png)

##### Define your collector

Choose a name and write a description to help identify the collector. 

Under **Accounts**, you can review the Logs, Metrics, and Tracing accounts to which the Telemetry Collector will send the data. If you don't have an existing account, you'll be able to review the account's name before continuing.

Click **Generate snippet** to continue.

![Define collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-step-3.png)

Next, review your collector. The Summary, located on the left side of the screen, includes all of the data in the collector.

##### Choose a platform and run the Telemetry Collector

Choose the platform on which you want to run the Telemetry Collector. You can choose between **Mac**, **Windows**, or **Linux**. Copy the code and run it on your end.

Some platforms might require additional details, such as admin privileges or passwords, to complete the installation. These details are not sent to or stored by Logz.io.
{:.info-box.note}

![Review collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-snippet-last-step.png)

##### Collect data

That’s it! It might take a while for the Telemetry Collector to get up and running, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system.

</div>

#### Configure your Telemetry Collector with Localhost:

<div class="tasklist">

To start sending Localhost data through the Telemetry Collector, Log into your Logz.io account, navigate to [Send your data](https://app.logz.io/#/dashboard/send-your-data), and click on **Start collecting**.


![Start collecting button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/send-data-collector.png)


##### Select platform

Select the Localhost platform and the relevant sub-type through which you want to send your data.

![Localhost select platform](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/tc-select-localhost.png)

##### Select data sources

Enter the folder location of your logs. You can add multiple folders by clicking on the **Add a folder** option.

Telemetry Collector can also collect metrics as well as logs.

##### Define your collector

Choose a name and write a description to help identify the collector. 

Under **Accounts**, you can review the Logs and Metrics accounts to which the Telemetry Collector will send the data. If you don’t have an existing account, one will be created for you.

Click **Generate snippet** to continue.

![Define collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/define-collector-localhost.png)

Next, review your collector. The Summary, located on the left side of the screen, includes all of the data in the collector.

##### Run the Telemetry Collector

Open your terminal and paste the code shown on the screen.

Some platforms might require additional details, such as admin privileges or passwords, to complete the installation. These details are not sent to or stored by Logz.io.

![Review collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/collector-localhost-finish.png)

##### Collect data

That’s it! It might take a while for the Telemetry Collector to get up and running, after which you’ll be able to view your logs or metrics and get full observability into your system.

</div>

If you encounter issues in installing or running your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).


#### How to remove a Telemetry Collector:

You can uninstall your Telemetry Collector from **Kubernetes** by running the following snippet:

`helm uninstall -n monitoring logzio-monitoring`

This snippet removes the collector from Logz.io and stops sending your data. Of course, you can always create a new collector or use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data)** to ship your data.

To manage a **Localhost** Telemetry Collector on your Mac machine, you can use the following commands:

| **Collector Binary:** || `/opt/logzio-otel-collector/otelcol-logzio-darwin_amd64` |
| **Collector Config:** || `/opt/logzio-otel-collector/otel_config.yaml` |
| **Start Service Command:** || `sudo launchctl load /Library/LaunchDaemons/com.logzio.OTELCollector.plist` |
| **Stop Service Command:** || `sudo launchctl unload /Library/LaunchDaemons/com.logzio.OTELCollector.plist` |
| **Show Service Command:** || `sudo launchctl list | grep com.logzio.OTELCollector` |
| **Show Logs Command:** || `sudo tail -F /opt/logzio-otel-collector/logzio_otel_collector.log` |


If you are unsuccessful in removing your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).


##### Additional resources

* [View Telemetry Collector on GitHub](https://github.com/logzio/logzio-agent-manifest)