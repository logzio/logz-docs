---
layout: article
title: Send Kubernetes data with Telemetry Collector
permalink: /user-guide/log-shipping/telemetry-collector-k8s.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Send your Kubernetes data with Logz.io's Telemetry Collector
tags:
  - log-shipping
contributors:
  - hidan
---

Telemetry Collector is currently **available in all regions** except for Japan and Australia. If you're located in these regions, you can use **[Logz.io’s data shippers](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=all)** to send your data.
{:.info-box.note}

To start sending your Kubernetes data through the Telemetry Collector, Log into your Logz.io account, navigate to [Send your data](https://app.logz.io/#/dashboard/send-your-data), and click on **Start collecting**.


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

Choose the platform on which you want to run the Telemetry Collector. You can choose between **Mac**, **Windows**, or **Linux**. 

* **Mac** users - Copy the snippet and run it in your terminal.
* **Windows** users - Copy the snippet and run it in your PowerShell x64 **as Administrator** (Note that PowerShell x86 and PowerShell ISE are currently not supported).
* **Linux** users - Copy the snippet and run it in your command line.

Some platforms might require additional details, such as admin privileges or passwords to complete the installation. These details are not sent to or stored by Logz.io.
{:.info-box.note}

![Review collector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/telemetry-agent/telemetry-snippet-last-step.png)

##### Collect data

That’s it! It might take a while for the Telemetry Collector to get up and running, after which you’ll be able to view your logs, metrics, or traces and get full observability into your system.

</div>

#### Manage and remove a Telemetry Collector:


To manage a Localhost Telemetry Collector on your **Windows** machine, you can use the following commands:

| **Logz.io Helm:** | `C:\Users\<<USERNAME>>\AppData\Roaming\LogzioAgent\LogzioKubernetes\logzio_helm.txt` |
| **Logz.io Agent Logs:** | `C:\Users\<<USERNAME>>\AppData\Roaming\LogzioAgent\logzio_agent.log` |
| **Install Logz.io Helm::** | `Invoke-Expression -Command (Get-Content -Path C:\Users\<<USERNAME>>\AppData\Roaming\LogzioAgent\LogzioKubernetes\logzio_helm.txt)` |
| **Uninstall Logz.io Helm:** | `helm uninstall -n monitoring logzio-monitoring` |
| **Show Helm Status:** | `helm status -n monitoring logzio-monitoring` |
| **Get Pods:** | `kubectl get pods -n monitoring` |
| **Show Pod's Logs:** | `kubectl logs <<POD_NAME>> -n monitoring` |
| **Show Pod's Info:** | `kubectl describe pod <<POD_NAME>> -n monitoring` |


Replace `<<USERNAME>>` with your Windows user name and `<<POD_NAME>>` with the pod name. If you have additional questions about managing your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).

#### How to remove a Telemetry Collector:

You can uninstall your Telemetry Collector from **Kubernetes** by running the following snippet in the same platform you've used to install it:

`helm uninstall -n monitoring logzio-monitoring`

* **Mac** - Run the snippet in your terminal.
* **Windows** - Run the snippet in your PowerShell x64 **as Administrator**.
* **Linux** - Run the snippet in your command line.


This snippet removes the collector from Logz.io and stops sending your data. Of course, you can always create a new collector or use Logz.io's **[Send your data](https://app.logz.io/#/dashboard/send-your-data)** to ship your data.

If you have additional questions about managing your Telemetry Collector, [contact Logz.io's Support team](mailto:help@logz.io).


##### Additional resources

* [View Telemetry Collector on GitHub](https://github.com/logzio/logzio-agent-manifest)