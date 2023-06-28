---
layout: article
title: Services
permalink: /user-guide/logs/services.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's Services
flags:
  logzio-plan: pro
  beta: false
tags:
  - insights
contributors:
  - hidan
---

The **Services** dashboard centralizes all of your running services, allowing you to detect if and when issues occur quickly. You can use the dashboard to investigate the different services and the operations and logs inside each one.

![Services](https://dytvr9ot2sszz.cloudfront.net/logz-docs/services/services-overview.png)

## Services overview

The main Services table view contains the following details:

* **Name** of each service
* **Impact** level - Determines the severity of each event, calculated based on the latency and request rate
* The **Environment** to which this service is attributed
* **Error ratio** - Both percentage and graph view
* **Request rate** - Number of requests per second, in numeral and graph view
* **Latency** - The duration it takes data to travel in the environment, presented in milliseconds and graph view


There are 2 different settings for your view. The first compares the data with a previous time frame, which can compare to data from the last day or week. You can also change the time frame itself from up to 2 hours ago and up to 24 hours ago.

## Dive deeper into your services

Click on one of the services in your list to get additional info.

This page includes a graph view of the service's current error ratio, request rate, and latency.

Next, the page includes a breakdown of the service's operations, infrastructure, and logs. Change your view between different nodes and pods, choose a different time frame to compare the data, or expand your view to a longer duration.

### Operations overview

All of the operations running inside the services include valuable information, including:

* **Operation** name
* Operation’s **Impact** level, calculated based on the latency and request rate
* **Error ratio** - Both percentage and graph view
* **Request rate** - Number of requests per second, in numeral and graph view
* **Latency** - The duration it takes data to travel in the environment, presented in milliseconds and graph view

You can search for specific operations or use the arrows at the bottom of the table to view additional operations.

### Infrastructure overview

View the CPU and memory consumption inside the service. The graphs represent a breakdown of consumption by the hour.

You can toggle your view between pods and nodes inside the service.

### Logs overview

All of the logs related to the service are shown at the bottom of the page. This view includes a graph view of the log levels and a table view with the following:

* The **timestamp** of each log
* **Log level** tag 
* The **Message** associated to this log
* Number of **exceptions** found in these logs
* Number of **insights** found in these logs

You can search for specific logs or click on Explore in OSD to open the Log analytics view of the relevant service.