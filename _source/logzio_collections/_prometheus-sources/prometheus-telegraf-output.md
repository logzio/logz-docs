---
title: Ship Prometheus metrics with the Telegraf agent
logo:
  logofile: mascot-telegraf.png #telegraf-tiger.png  #telegraf-logo-preview.svg
  orientation: vertical
data-source: Telegraf for Prometheus metrics
templates: ["docker"]
contributors:
  - fadi-khatib
  - yberlinger
shipping-tags:  
  - prometheus
order: 800
---



This project lets you configure a Telegraf agent to send your collected Prometheus-format metrics to Logz.io.

## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems, and IoT sensors.

To send your Prometheus-format metrics to Logz.io, you add the **outputs.http** plug-in to your Telegraf configuration file.
  
#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

Follow the instructions on [Get started with Telegraf](https://docs.influxdata.com/telegraf/latest/introduction/getting-started/) to: 

1. Download and install Telegraf in the terminal. 
2. Create and configure the 'telegraf.conf' file.
3. Start the Telegraf service.

##### Add the outputs.http plug-in

After you create a config file for Telegraf, configure the output plug-in to enable your data to be sent to Logz.io in Prometheus-format and add the following code to the configuration file:

For the list of options, see the parameters below the code block.👇

``` yaml
[[outputs.http]]
  url = "https://<<LISTENER-HOST>>:8053"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>"
``` 

{% include general-shipping/replace-placeholders-prometheus.html %}


##### Check Logz.io for your metrics
Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).

To install the dashboard press here 
<!-- logzio-inject:install:grafana:dashboards ids=["6xL47YQQhGicghUPvHVwFl"] -->
 
</div>


