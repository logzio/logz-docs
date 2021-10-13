---
title: Ship Apache Solr metrics via Telegraf
logo:
  logofile: solr-logo.png
  orientation: vertical
data-source: Apache Solr
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

To send your Prometheus-format Apache Solr metrics to Logz.io, you need to add the **inputs.solr** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.solr plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Apache Solr data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.solr]]
  ## specify a list of one or more Solr servers
  servers = ["http://localhost:8983"]
  ##
  ## specify a list of one or more Solr cores (default - all)
  # cores = ["main"]
  ##
  ## Optional HTTP Basic Auth Credentials
  # username = "username"
  # password = "pa$$word"
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/solr/README.md)
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
