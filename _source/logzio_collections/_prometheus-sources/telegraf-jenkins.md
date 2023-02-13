---
title: Ship Jenkins metrics via Telegraf
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Jenkins metrics via Telegraf to Logz.io
logo:
  logofile: jenkins.png
  orientation: vertical
data-source: Jenkins
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
  - prebuilt-dashboards
order: 800
---


## Overview

Jenkins is an automation server for building, testing, and deploying software. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Jenkins metrics to Logz.io, you need to add the **inputs.prometheus** and **outputs.http** plug-ins to your Telegraf configuration file.

<!-- logzio-inject:install:grafana:dashboards ids=["7bmikAb2xNPTy7PESlBqXY"] -->

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Enable the metrics plugin from the Jenkins Web UI

First you need to add the metrics plug-in to your Jenkins configuration. To do this:

1. Login to the Jenkins Web UI and navigate to **Manage Jenkins > Manage Plugins > Available**.
2. Select **Prometheus metrics** and click **Install without restart**.


##### Add the inputs.prometheus plug-in

Now you need to configure the input plug-in to enable Telegraf to scrape the Jenkins data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.prometheus]]
  # An array of urls to scrape metrics from.
  urls = ["http://localhost:8080/prometheus/"]
  metric_version = 2
```

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboards to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["7bmikAb2xNPTy7PESlBqXY"] -->

{% include metric-shipping/generic-dashboard.html %} 


</div>
