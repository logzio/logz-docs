---
title: Ship Apache Zookeper metrics via Telegraf
logo:
  logofile: zookeeper-logo.png
  orientation: vertical
data-source: Apache Zookeper
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

To send your Prometheus-format Apache Zookeper metrics to Logz.io, you need to add the **inputs.zookeper** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on each Zookeeper machine

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.zookeper plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Apache Zookeper data from your hosts. To do this, add the below code to the configuration file. 

``` ini
[[inputs.zookeper]]
  ## An array of address to gather stats about. Specify an ip or hostname
  ## with port. ie localhost:2181, 10.0.0.1:2181, etc.

  ## If no servers are specified, then localhost is used as the host.
  ## If no port is specified, 2181 is used
  servers = [":2181"]

  ## Timeout for metric collections from all servers.  Minimum timeout is "1s".
  # timeout = "5s"

  ## Optional TLS Config
  # enable_tls = true
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## If false, skip chain & host verification
  # insecure_skip_verify = true
```
    
<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/zookeper/README.md)
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in
  
{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Start Telegraf

{% include metric-shipping/telegraf-run.md %}  
  
##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
