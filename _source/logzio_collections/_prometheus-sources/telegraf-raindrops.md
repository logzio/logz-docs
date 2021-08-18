---
title: Ship Raindrops Middleware metrics via Telegraf
logo:
  logofile: raindrops-telegraf.png
  orientation: vertical
data-source: Raindrops Middleware metrics over Telegraf
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Raindrops Middleware metrics to Logz.io, you need to add the **inputs.raindrops** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.Raindrops Middleware plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Raindrops Middleware data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.raindrops]]
  urls = ["http://localhost:8080/_raindrops"]
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/raindrops/README.md)
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in
  
{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
