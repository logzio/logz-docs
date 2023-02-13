---
title: Ship Wireguard metrics via Telegraf
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Wireguard metrics via Telegraf to Logz.io
logo:
  logofile: wireguard-logo.png
  orientation: vertical
data-source: Wireguard
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

WireGuard is a communication protocol and free and open-source software that implements encrypted virtual private networks, and was designed with the goals of ease of use, high speed performance, and low attack surface. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Wireguard metrics to Logz.io, you need to add the **inputs.wireguard** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on the same machine as Wireguard

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.wireguard plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Wireguard data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.wireguard]]
  ## Optional list of Wireguard device/interface names to query.
  ## If omitted, all Wireguard interfaces are queried.
  # devices = ["wg0"]
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/wireguard/README.md)
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
