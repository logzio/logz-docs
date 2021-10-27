---
title: Ship Mcrouter metrics via Telegraf
logo:
  logofile: mcrouter-logo.png
  orientation: vertical
data-source: Mcrouter 
data-for-product-source: Metrics
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

To send your Prometheus-format Mcrouter metrics to Logz.io, you need to add the **inputs.mcrouter** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.mcrouter plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Mcrouter data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.mcrouter]]
  ## An array of address to gather stats about. Specify an ip or hostname
  ## with port. ie tcp://localhost:11211, tcp://10.0.0.1:11211, etc.
  servers = ["tcp://localhost:11211", "unix:///var/run/mcrouter.sock"]

  ## Timeout for metric collections from all servers.  Minimum timeout is "1s".
  # timeout = "5s"
```

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/mcrouter/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
