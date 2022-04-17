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

**Table of contents**

* [Send your data](/getting-started.html#send-your-data)
* [Meet Logz.io's Logs](/getting-started.html#meet-logzios-logs)
* [Meet Logz.io's Metrics](/getting-started.html#meet-logzios-metrics)
* [Meet Logz.io's Traces](/getting-started.html#meet-logzios-tracing)
* [Meet Logz.io's Cloud SIEM](/getting-started.html#meet-logzios-cloud-siem)

#### Send your data

Once you’ve set up your account, you are ready to start sending your data.

Logz.io provides various tools, integrations, and methods to send your data and monitor your Logs, Metrics, Traces, and SIEM.

There are numerous methods to send your data, and here are some of the more popular ones, based on what you'd like to monitor:

|**Logs**|**Metrics**|**Traces**|**Cloud SIEM**
|[Filebeat](https://app.logz.io/#/dashboard/send-your-data/log-sources/filebeat)|[.NET](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/dotnet-custom)|[Jaeger installation](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/jaeger_collector)|[Cloudflare](https://app.logz.io/#/dashboard/send-your-data/security-sources/cloudflare)
|[S3 Bucket](https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket)|[Prometheus](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/prometheus-remote-write_shipping)|[OpenTelemetry installation](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/opentelemetry)|[NGINX](https://app.logz.io/#/dashboard/send-your-data/security-sources/nginx)
|[cURL](https://app.logz.io/#/dashboard/send-your-data/log-sources/curl)|[Azure Kubernetes Service](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/otel-metrics-aks-helm)|[Docker](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/docker-otel)|[Active directory](https://app.logz.io/#/dashboard/send-your-data/security-sources/active-directory-winserver)
|[JSON uploads](https://app.logz.io/#/dashboard/send-your-data/log-sources/json-uploads)|[Google Kubernetes Engine over OpenTelemetry](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/otel-metrics-gke-helm)|[Kubernetes](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/otel-traces-helm)|[CloudTrail](https://app.logz.io/#/dashboard/send-your-data/security-sources/cloudtrail)
|[Docker container](https://app.logz.io/#/dashboard/send-your-data/log-sources/docker)|[Amazon EC2](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/aws-ec2-prometheus)|[Go instrumentation](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/go-otel)|[auditd](https://app.logz.io/#/dashboard/send-your-data/security-sources/auditd)

Browse the complete list of available shipping methods [here](https://docs.logz.io/shipping/).

To learn more about shipping your data, check out **Shipping Log Data to Logz.io**:

<iframe class="vidyard_iframe" src="//play.vidyard.com/73rC8a2eWGzarBuUrSmuqu.html?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe>


##### Parsing

You can also use automatic parsing [for over 50 log types](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html). 

If you can't find your log type, or if you're interested in sending custom logs, Logz.io will parse the logs for you. Parsing-as-a-service is included in your Logz.io subscription; just open a chat with our **Support team** with your request, you can also email us at [help@logz.io](mailto:help@logz.io).

If you prefer to parse the logs yourself, you can use our [DIY Data Parsing Editor](https://docs.logz.io/user-guide/mapping-and-parsing/sawmill-parsing.html). 

###### Additional resources


Here are some more helpful resources on shipping your logs:

* [Log shipping FAQ](https://docs.logz.io/user-guide/log-shipping/faqs-logs/)
* [Log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html)
* [Troubleshooting Filebeat](https://docs.logz.io/user-guide/log-shipping/filebeat-troubleshooting/)

#### Meet Logz.io’s Logs

Logz.io’s **[Logs](https://app.logz.io/#/dashboard/kibana)** is where you can search and query log files. Logs help you identify and analyze issues in your code, and is optimized for debugging and troubleshooting issues as quickly and effectively as possible.

A few of the more popular Logs features include:

* **[Configuring an alert](https://app.logz.io/#/dashboard/alerts/v2019/new)**
* Using **[Logz.io's pattern engine](https://docs.logz.io/user-guide/kibana/log-patterns.html)** to automatically group logs with similar message fields by their frequency of occurrence
* **[Reviewing your fields' mapping](https://docs.logz.io/user-guide/kibana/mapping/)**
* Using **[Optimizers](https://docs.logz.io/user-guide/optimizers/)** to store logs and aggregations to a timeless account
* Predicting exceptions and critical errors with **[Insights](https://docs.logz.io/user-guide/insights/)**


#### Meet Logz.io’s Metrics

Monitor your **[Infrastructure metrics](https://app.logz.io/#/dashboard/metrics)** to gain a clear picture of the ongoing status of your distributed cloud services at all times. 

Logz.io Metrics lets your team curate a handy roster of dashboards to oversee continuous deployment, CI/CD pipelines, prevent outages, manage incidents, and remediate crashes in multi-microservice environments and hybrid infrastructures and complex tech stacks.

Once you've sent your metrics to Logz.io, you can:

##### Build Metrics Visualizations with Logz.io

<iframe class="vidyard_iframe" src="//play.vidyard.com/JbB9wzNxqfRqDP2nyNGdvA.html?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe>

You can also:

* Start with a **[pre-build Metrics dashboard](https://docs.logz.io/user-guide/infrastructure-monitoring/metrics-dashboards)** to monitor data
* **[Create Metrics related alerts]()**
* Work with **[Dashboard variable](https://docs.logz.io/user-guide/infrastructure-monitoring/configure-metrics-drilldown-links.html)** to apply filters on your dashboards and drilldown links
* Mark events on your Metrics dashboard based on data from a logging account, with **[Annotations]**(https://docs.logz.io/user-guide/infrastructure-monitoring/annotations/)

###### Additional resources

* [Sending Prometheus metrics to Logz.io](https://logz.io/learn/sending-prometheus-metrics-to-logzio/)


#### Meet Logz.io’s Tracing

Use Logz.io’s **[Tracing](https://app.logz.io/#/dashboard/jaeger)** to look under the hood at how your microservices behave, and access rich information to improve performance, investigate, and troubleshoot issues.

Here are some popular Tracing resources:

* **[Getting started with Tracing](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/)**
* **[Sending demo traces with HOTROD](https://docs.logz.io/user-guide/distributed-tracing/trace-hotrod-demo)**
* Combine Traces and Metrics with **[Service Performance Monitoring](https://docs.logz.io/user-guide/distributed-tracing/service-performance-monitoring)**
* **[Correlate logs and traces](https://docs.logz.io/user-guide/distributed-tracing/correlate-traces/)**
* **[Visualize traces in your logs](https://docs.logz.io/user-guide/distributed-tracing/visualize-traces/)**


#### Meet Logz.io’s Cloud SIEM 

Logz.io **[Cloud SIEM](https://app.logz.io/#/dashboard/security/summary)** (Security Information and Event Management) aggregates security logs and alerts across distributed environments to allow your team to investigate security incidents from a single observability platform.

Here are some popular Cloud SIEM resources:

* **[Cloud SIEM quick start guide](https://docs.logz.io/user-guide/cloud-siem/quick-guide.html)**
* **[Investigate security events](https://docs.logz.io/user-guide/cloud-siem/security-events.html)**
* **[Threat Intelligence feeds](https://docs.logz.io/user-guide/cloud-siem/threat-intelligence.html)**
* **[Configure a security rule](https://docs.logz.io/user-guide/cloud-siem/manage-security-rules.html)**
* **[Dashboards and reports](https://docs.logz.io/user-guide/cloud-siem/dashboards/)**