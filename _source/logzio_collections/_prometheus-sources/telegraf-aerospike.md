---
title: Ship Aerospike metrics via Telegraf
logo:
  logofile: aerospike-logo.png
  orientation: vertical
data-source: Aerospike 
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

To send your Prometheus-format Aerospike metrics to Logz.io, you need to add the **inputs.aerospike** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.aerospike plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Aerospike data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.aerospike]]
  ## Aerospike servers to connect to (with port)
  ## This plugin will query all namespaces the aerospike
  ## server has configured and get stats for them.
  servers = ["localhost:3000"]

  # username = "telegraf"
  # password = "pa$$word"

  ## Optional TLS Config
  # enable_tls = false
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## If false, skip chain & host verification
  # insecure_skip_verify = true

  # Feature Options
  # Add namespace variable to limit the namespaces executed on
  # Leave blank to do all
  # disable_query_namespaces = true # default false
  # namespaces = ["namespace1", "namespace2"]

  # Enable set level telemetry
  # query_sets = true # default: false
  # Add namespace set combinations to limit sets executed on
  # Leave blank to do all sets
  # sets = ["namespace1/set1", "namespace1/set2", "namespace3"]

  # Histograms
  # enable_ttl_histogram = true # default: false
  # enable_object_size_linear_histogram = true # default: false

  # by default, aerospike produces a 100 bucket histogram
  # this is not great for most graphing tools, this will allow
  # the ability to squash this to a smaller number of buckets
  # To have a balanced histogram, the number of buckets chosen 
  # should divide evenly into 100.
  # num_histogram_buckets = 100 # default: 10
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/aerospike/README.md)
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
