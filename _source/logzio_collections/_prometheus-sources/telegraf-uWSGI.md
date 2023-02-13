---
title: Ship uWSGI metrics via Telegraf
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship uWSGI metrics via Telegraf to Logz.io
logo:
  logofile: uwsgi-logo1.png
  orientation: vertical
data-source: uWSGI 
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

uWSGI is a software application that aims at developing a full stack for building hosting services. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format uWSGI metrics to Logz.io, you need to add the **inputs.uwsgi** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on the same maching as uWSGI

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.uwsgi plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the uWSGI data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.uwsgi]]
  ## List with urls of uWSGI Stats servers. Url must match pattern:
  ## scheme://address[:port]
  ##
  ## For example:
  ## servers = ["tcp://localhost:5050", "http://localhost:1717", "unix:///tmp/statsock"]
  servers = ["tcp://127.0.0.1:1717"]

  ## General connection timeout
  # timeout = "5s"
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/uwsgi/README.md)
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
