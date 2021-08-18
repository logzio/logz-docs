---
title: Ship Neptune Apex metrics via Telegraf
logo:
  logofile: neptune-telegraf.png
  orientation: vertical
data-source: Neptune Apex metrics over Telegraf
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

To send your Prometheus-format Neptune Apex metrics to Logz.io, you need to add the **inputs.neptune_apex** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.neptune_apex plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Neptune Apex data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.neptune_apex]]
  ## The Neptune Apex plugin reads the publicly available status.xml data from a local Apex.
  ## Measurements will be logged under "apex".

  ## The base URL of the local Apex(es). If you specify more than one server, they will
  ## be differentiated by the "source" tag.
  servers = [
    "http://apex.local",
  ]

  ## The response_timeout specifies how long to wait for a reply from the Apex.
  #response_timeout = "5s"
```


<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/neptune_apex/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
