---
title: Ship NLnet Labs Name Server Daemon metrics via Telegraf
logo:
  logofile: nsd-telegraf.png
  orientation: vertical
data-source: NLnet Labs Name Server Daemon
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

To send your Prometheus-format NLnet Labs Name Server Daemon metrics to Logz.io, you need to add the **inputs.nsd** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.nsd plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the NLnet Labs Name Server Daemon data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.nsd]]
  ## Address of server to connect to, optionally ':port'. Defaults to the
  ## address in the nsd config file.
  server = "127.0.0.1:8953"

  ## If running as a restricted user you can prepend sudo for additional access:
  # use_sudo = false

  ## The default location of the nsd-control binary can be overridden with:
  # binary = "/usr/sbin/nsd-control"

  ## The default location of the nsd config file can be overridden with:
  # config_file = "/etc/nsd/nsd.conf"

  ## The default timeout of 1s can be overridden with:
  # timeout = "1s"
```


<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/nsd/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
