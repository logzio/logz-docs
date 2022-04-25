---
layout: article
title: Getting started with the Telemetry Agent
permalink: /user-guide/log-shipping/telemetry-collector.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's Telemetry Agent
search: false
sitemap: false
tags:
  - log-shipping
contributors:
  - hidan
---

Logz.io Telemetry Agent lets you quickly send your data based on the configuration that fits your needs. You can use it to send logs, metrics, and tracing data back to Logz.io’s observability platform. 


Telemetry Agent is currently available for Canada based users. If you're located in a different region, you can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** to send your data.
{:.info-box.note}

#### Why should I use Telemetry Agent?

Configuring and running Logz.io’s Telemetry Agent gives you several advantages, including:

* **Easy installation process** - Logz.io’s Telemetry Agent lets you easily configure your data sending process by executing a single line of code.
* **Full coverage** - The Telemetry Agent collects logs, metrics, and tracing data from your end, providing a complete observability platform to monitor and improve your data.

##### Supported platforms

Currently, Logz.io's Telemetry Agent supports **Kubernetes** for logs, metrics, and traces.

Additional platforms that will soon be added to the Telemetry Agent include AWS, Azure, Linux, Windows, Mac, etc.

If you're interested in sending your data through a different source, you can use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=all)** guide and choose from over 300 shipping methods.


#### Configure your Telemetry Agent:

<!--Only account admins can configure and send data to Logz.io
{:.info-box.note} -->

To start sending your data thorugh the Telemetry Agent, Log into your Logz.io account and click on **Start sending**.

[image]

Select the platform through which you’d like to ship your data. Then, if necessary, select the relevant sub-type.

[image]

Next, select the data sources. Hover over each source to see the type of data it collects and processes.

[image]

Add a name and description to help identify the agent. Inside Accounts, you can review which account the data will be sent to. Click **Generate** to continue.

[image]

Next, review your agent. The Summary, located on the left side of the screen, includes all of the data included in the agent. If you want to edit or change anything, click **Back** and navigate to the relevant step.

[image]

Choose the platform on which you want to run the Telemetry Agent. You can choose between Mac, Windows, or Linux. Copy the code and run it on your end.

Some platforms might require additional details to complete the installation, such as admin privileges or passwords. These details are not sent or stored by Logz.io.

[image]

That’s it! It might take a while for the Telemetry Agent to get up and running, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system.

[image?]

If you're unable to run your Telemetry Agent, [contact Logz.io's Support team](mailto:help@logz.io).

#### How to remove a Telemetry Agent:

You can uninstall your Telemetry Agent from Kubernetes by running the query below:

`helm uninstall -n monitoring logzio-monitoring`

If you are unsuccessful in removing your Telemetry Agent, [contact Logz.io's Support team](mailto:help@logz.io).


##### Additional resources

* [View Telemetry Agent on GitHub](https://github.com/logzio/logzio-agent-manifest)