---
title: Ship Redis metrics via Telegraf
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Redis metrics via Telegraf to Logz.io
logo:
  logofile: redis-logo.png
  orientation: vertical
data-source: Redis
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

Redis is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Redis metrics to Logz.io, you need to add the **inputs.redis** and **outputs.http** plug-ins to your Telegraf configuration file.

<!-- logzio-inject:install:grafana:dashboards ids=["1sS7i6SyMz35RIay8NRYGp"] --> 

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.redis plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Redis data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.redis]]
  ##  specify servers via a url matching:
     servers = [<<PROTOCOL>>://][:<<PASSWORD>>]@<<ADDRESS>>[:<<PORT>>]
  ##  e.g.
  ##    tcp://localhost:6379
  ##    tcp://:password@192.168.99.100
  ##    servers = ["tcp://20.77.110.14:6379","tcp://20.77.110.32:6379"]
```

* Replace `<<PROTOCOL>>` with the name of your shipping protocol (tcp protocol recommended).
* Replace `<<PASSWORD>>` with the password for your Redis database.
* Replace `<<ADDRESS>>` with the address of your Redis database host. This is `localhost` if installed locally.
* Replace `<<PORT>>` with the address of your host port allocated to Redis database.

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/redis/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Start Telegraf

{% include metric-shipping/telegraf-run.md %}

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours.


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1sS7i6SyMz35RIay8NRYGp"] --> 

{% include metric-shipping/generic-dashboard.html %} 



</div>
