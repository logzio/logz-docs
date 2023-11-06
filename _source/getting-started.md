---
layout: article
title: Getting started with Logz.io
permalink: /getting-started.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Getting started with Logz.io
flags:
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---

Logz.io is an end-to-end cloud monitoring service built for scale. It’s the best-of-breed open source monitoring tools on a fully managed cloud service. 

One unified SaaS platform to collect and analyze logs, metrics, and traces, combined with human-powered AI/ML features to improve troubleshooting, reduce response time and help you manage costs.

**In this guide, you can find how to:**
{:.no_toc}

* toc list
{:toc}

<!--
* [Send your data to Logz.io](/getting-started.html#send-your-data-to-logzio)
  * [Parse your data](/getting-started.html#parsing-your-data)
* [Explore your data with Logz.io's Log Management platform](/getting-started.html#meet-logzios-log-management-platform)
* [Create visualizations with Logz.io's Infrastructure Monitoring](/getting-started.html#meet-logzios-infrastructure-monitoring)
  * [Watch how to build Metrics visualizations with Logz.io](/getting-started.html#build-metrics-visualizations-with-logzio)
* [Take a deep dive into your code with Logz.io's Distributed Tracing](/getting-started.html#meet-logzios-distributed-tracing)
* [Secure your environment with Logz.io's Cloud SIEM](/getting-started.html#meet-logzios-cloud-siem)
* [Manage your Logz.io account](/getting-started.html#manage-your-logzio-account) -->


Whether you are a new user or looking for a refresher on Logz.io, you are invited to join one of our engineers for a **[training session on the Logz.io platform](https://docs.logz.io/training/)**!
{:.info-box.note}

#### Send your data to Logz.io

Once you’ve set up your account, you can start sending your data.

Logz.io provides various tools, integrations, and methods to send data and monitor your Logs, Metrics, Traces, and SIEM.

The fastest and most seamless way to send your data is through our **Telemetry Collector**. It lets you easily configure your data-sending process by executing a single line of code, providing a complete observability platform to monitor and improve your logs, metrics, and traces.

[**Get started with Telemetry Collector**](https://app.logz.io/#/dashboard/integrations/collectors).

If you prefer to send your data manually, Logz.io offers numerous methods to do so, and here are some of the more popular ones based on what you’d like to monitor:

|**Logs**|**Metrics**|**Traces**|**Cloud SIEM**
|[Filebeat](https://app.logz.io/#/dashboard/send-your-data/log-sources/filebeat)|[.NET](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/dotnet-custom)|[Jaeger installation](https://app.logz.io/#/dashboard/integrations/Jaeger-data)|[Cloudflare](https://app.logz.io/#/dashboard/send-your-data/security-sources/cloudflare)
|[S3 Bucket](https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket)|[Prometheus](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/prometheus-remote-write_shipping)|[OpenTelemetry installation](https://app.logz.io/#/dashboard/integrations/OpenTelemetry-data)|[NGINX](https://app.logz.io/#/dashboard/send-your-data/security-sources/nginx)
|[cURL](https://app.logz.io/#/dashboard/send-your-data/log-sources/curl)|[Azure Kubernetes Service](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/otel-metrics-aks-helm)|[Docker](https://app.logz.io/#/dashboard/integrations/Docker)|[Active directory](https://app.logz.io/#/dashboard/send-your-data/security-sources/active-directory-winserver)
|[JSON uploads](https://app.logz.io/#/dashboard/send-your-data/log-sources/json-uploads)|[Google Kubernetes Engine over OpenTelemetry](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/otel-metrics-gke-helm)|[Kubernetes](https://app.logz.io/#/dashboard/integrations/Kubernetes)|[CloudTrail](https://app.logz.io/#/dashboard/send-your-data/security-sources/cloudtrail)
|[Docker container](https://app.logz.io/#/dashboard/send-your-data/log-sources/docker)|[Amazon EC2](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/aws-ec2-prometheus)|[Go instrumentation](https://app.logz.io/#/dashboard/integrations/GO)|[auditd](https://app.logz.io/#/dashboard/send-your-data/security-sources/auditd)

Browse the complete list of available shipping methods [here](https://docs.logz.io/shipping/).

To learn more about shipping your data, check out **Shipping Log Data to Logz.io**:

<!-- <video controls width=640 height=360 poster="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/shipping-log-data.png">
  <source src="https://logz.wistia.com/medias/oi6qydmyk6" type="video/mp4" /></video> -->

<p><a href="https://logz.wistia.com/medias/oi6qydmyk6?wvideo=oi6qydmyk6" target="_blank"><img src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/shipping-log-data.png" width="640" height="360" style="width: 640px; height: 360px;"></a></p><p><a href="https://logz.wistia.com/medias/oi6qydmyk6?wvideo=oi6qydmyk6"></a></p>
  

<!-- <iframe class="vidyard_iframe" src="https://fast.wistia.com/embed/iframe/w7lkltrofb?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe> -->


##### Parsing your data

Logz.io offers automatic parsing [for over 50 log types](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html).

If you can't find your log type, or if you're interested in sending custom logs, Logz.io will parse the logs for you. Parsing-as-a-service is included in your Logz.io subscription; just open a chat with our **Support team** with your request, you can also email us at [help@logz.io](mailto:help@logz.io).

If you prefer to parse the logs yourself, you can use our [DIY Data Parsing Editor](https://docs.logz.io/user-guide/mapping-and-parsing/sawmill-parsing.html). 

###### Additional resources
{:.no_toc}

Learn more about sending data to Logz.io:

* [Use Logz.io API](https://docs.logz.io/api/)
* [Log shipping FAQ](https://docs.logz.io/user-guide/log-shipping/faqs-logs/)
* [Log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html)
* [Troubleshooting Filebeat](https://docs.logz.io/user-guide/log-troubleshooting/filebeat-troubleshooting.html)

#### Explore your data with Logz.io's Log Management platform

Logz.io’s **[Log Management](https://app.logz.io/#/dashboard/osd)** is where you can search and query log files. You can use it to identify and analyze your code, and the platform is optimized for debugging and troubleshooting issues as quickly and effectively as possible.

![Log management overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/log-management-screenshot.png)

The following list contains some of the common abilities available in Log Management:

* **[Log Management best practices](https://docs.logz.io/user-guide/logs/best-practices.html)**
* **[Configuring an alert](https://app.logz.io/#/dashboard/alerts/v2019/new)**
* Using **[Logz.io's pattern engine](https://docs.logz.io/user-guide/logs/log-patterns.html)** to automatically group logs with similar message fields by their frequency of occurrence
* **[Reviewing your fields' mapping](https://docs.logz.io/user-guide/logs/mapping/)**
* Using **[Optimizers](https://docs.logz.io/user-guide/optimizers/)** to store logs and aggregations to a timeless account
* Predicting exceptions and critical errors with **[Insights](/user-guide/insights/ai-insights.html)**


#### Create visualizations with Logz.io's Infrastructure Monitoring

Monitor your **[Infrastructure Monitoring](https://app.logz.io/#/dashboard/metrics)** to gain a clear picture of the ongoing status of your distributed cloud services at all times. 

Logz.io's Infrastructure Monitoring lets your team curate a handy roster of dashboards to oversee continuous deployment, CI/CD pipelines, prevent outages, manage incidents, and remediate crashes in multi-microservice environments and hybrid infrastructures and complex tech stacks.

![Infrastructure Monitoring overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/infrastructure-monitoring-dashboard.png)

Once you've sent your metrics to Logz.io, you can:

##### Build Metrics visualizations with Logz.io

<!-- <video controls width=640 height=360 poster="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/build-metrics-visualizations.png">
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/build-metrics-w7lkltrofb.mp4" type="video/mp4" />
  </video> -->

<p><a href="https://logz.io/learn/build-metrics-visualizations-with-logzio/?wvideo=w7lkltrofb" target="_blank"><img src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/build-metrics-visualizations.png" width="640" height="360" style="width: 640px; height: 360px;"></a></p><p><a href="https://logz.io/learn/build-metrics-visualizations-with-logzio/?wvideo=w7lkltrofb"></a></p>


<!-- <iframe class="vidyard_iframe" src="//play.vidyard.com/JbB9wzNxqfRqDP2nyNGdvA.html?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe> -->

You can also:

* Start with a **[pre-build Metrics dashboard](https://docs.logz.io/user-guide/infrastructure-monitoring/metrics-dashboards)** to monitor data
* **[Create Metrics related alerts]()**
* Work with **[Dashboard variable](https://docs.logz.io/user-guide/infrastructure-monitoring/configure-metrics-drilldown-links.html)** to apply filters on your dashboards and drilldown links
* Mark events on your Metrics dashboard based on data from a logging account, with **[Annotations](https://docs.logz.io/user-guide/infrastructure-monitoring/annotations/)**

###### Additional resources
{:.no_toc}

* [Sending Prometheus metrics to Logz.io](https://logz.io/learn/sending-prometheus-metrics-to-logzio/)


#### Take a deep dive into your code with Logz.io's Distributed Tracing

Use Logz.io’s **[Distributed Tracing](https://app.logz.io/#/dashboard/jaeger)** to look under the hood at how your microservices behave, and access rich information to improve performance, investigate, and troubleshoot issues.

![Distributed Tracing overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/tracing-dashboard.png)

To help you understand how Distributed Tracing can enhance your data, check out the following guides:

* **[Getting started with Tracing](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/)**
* **[Sending demo traces with HOTROD](https://docs.logz.io/user-guide/distributed-tracing/trace-hotrod-demo)**
* Combine Traces and Metrics with **[Service Performance Monitoring](https://docs.logz.io/user-guide/distributed-tracing/service-performance-monitoring)**
* **[Correlate logs and traces](https://docs.logz.io/user-guide/distributed-tracing/correlate-traces/)**
<!-- * **[Visualize traces in your logs](https://docs.logz.io/user-guide/distributed-tracing/visualize-traces/)** -->


#### Secure your environment with Logz.io's Cloud SIEM

Logz.io **[Cloud SIEM](https://app.logz.io/#/dashboard/security/summary)** (Security Information and Event Management) aggregates security logs and alerts across distributed environments to allow your team to investigate security incidents from a single observability platform.

![Cloud SIEM overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/siem-dashboard.png)

Here are some popular Cloud SIEM resources to help you get started:

* **[Cloud SIEM quick start guide](https://docs.logz.io/user-guide/cloud-siem/quick-guide.html)**
* **[Investigate security events](https://docs.logz.io/user-guide/cloud-siem/security-events.html)**
* **[Threat Intelligence feeds](https://docs.logz.io/user-guide/cloud-siem/threat-intelligence.html)**
* **[Configure a security rule](https://docs.logz.io/user-guide/cloud-siem/manage-security-rules.html)**
* **[Dashboards and reports](https://docs.logz.io/user-guide/cloud-siem/dashboards/)**

#### Manage your Logz.io account

Logz.io's account admins can control and edit different elements inside their accounts. These abilities include setting up SSO access, assigning permissions per user, and sharing and managing data.

The following list explores the more common use cases for Logz.io's account admins:

* **[Setting and editing user permission levels](https://docs.logz.io/user-guide/users/)**
* **[Managing main and sub accounts](https://docs.logz.io/user-guide/accounts/)**
* **[Optimizing account volume usage](https://docs.logz.io/user-guide/accounts/manage-account-usage.html)**
* **[Setting up SSO access](https://docs.logz.io/user-guide/users/single-sign-on/)**
* **[Archiving and restoring data](https://docs.logz.io/user-guide/archive-and-restore/)**