---
title: Ship Prometheus metrics with the Telegraf collector
logo:
  logofile: mascot-telegraf.png #telegraf-tiger.png  #telegraf-logo-preview.svg
  orientation: vertical
data-source: Telegraf Collector for Prometheus metrics
open-source:
  - title: Telegraf Collector for Prometheus metrics
    github-repo: logz-telegraf-metrics
templates: ["docker"]
contributors:
  - fadi-khatib
  - yberlinger
shipping-tags:  # add tag attribute definition to .yaml for shipping
  - telegraf

---


{% include page-info/early-access.md type="beta" %}

This project allows you to collect Prometheus-format metrics with Telegraf, and ship them to Logz.io, also via Telegraf.

## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems, and IoT sensors.

To send your Prometheus-format metrics to Logz.io, you add the **outputs.http** plug-in to your Telegraf configuration file.
  
#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Download and install the following file**:
[Telegraf 1.17](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/) or higher



#### Create a Telegraf config file

@fadi-khatib - we need to add this information

#### Add the outputs.http plug-in
After you create a config file for telegraf, configure the output plug-in, which enables your data to be sent to Logz.io in Prometheus-format.

* add the following code to the configuration file:

{% include log-shipping/log-shipping-token-bullet.html %}
* {% include log-shipping/replace-vars.html listener=true %}

```
[[outputs.http]]
  url = "http://<ListenerUrl>:8050"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<METRICS-SHIPPING-TOKEN>>"
``` 

{% include metric-shipping/open-dashboard.md title="System Metrics" %}

</div>


