---
layout: article
title: Getting started with Service Performance Monitoring
permalink: /user-guide/distributed-tracing/service-performance-monitoring
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Getting started with Logz.io Service Performance Monitoring feature
flags:
  beta: true
  logzio-plan: pro enterprise
tags: 
  - distributed tracing
contributors:
  - hidan
---

Distributed tracing assists users by highlighting and analyzing the journey of specific requests, making it easier to track application requests across distributed platforms and microservices architecture.

However, most users have millions of traces at hand, and trying to find a bottleneck or pinpoint a specific incident is difficult and time-consuming.

That’s where Service Performance Monitoring comes in. It's a high-level monitoring dashboard that offers a better way to monitor your services and operations, providing a bird’s eye view into your systems’ health.

Service Performance Monitoring helps cut down the time to identify and resolve anomalies, spikes and issues. It does that by aggregating Request, Error and Duration (R.E.D) metrics from span data, pointing and isolating incidents in your systems.

##### Service Performance Monitoring dashboard

The Service Performance Monitoring dashboard is part of your [Tracing account](https://app.logz.io/#/dashboard/jaeger/monitoring), located under the **Monitor** tab. You can generate a dashboard view for each of your services, and adjust the time span between 1 hour to 2 days ago.

![Service Performance Monitoring](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-main-dashboard.png)

The dashboard includes the following data:

* Request rate - Number of requests made per second
* Error rate - The total percentage of errors in this service
* Latency - The duration it took to complete the operations, indicating the 95th, 75th and 50th percentile latency

You can quickly view all of the related traces by clicking the **View all traces** button at the top of the dashboard:

![View all traces](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-all-traces-button.png)

In addition, the dashboard includes a breakdown of R.E.D data based on the operations running inside the chosen service. Each one has an impact score based on an average of R.E.D data points. To sort the data, click on the arrows next to the title of your preferred data point.

![Operations metrics chart](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-chart-sort.png)

Additional Tracing resources: 

* [What is Distributed Tracing](https://docs.logz.io/user-guide/distributed-tracing/what-is-tracing)