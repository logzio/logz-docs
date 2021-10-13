---
title: Ship Ravendb metrics via Telegraf
logo:
  logofile: ravendb-logo.png
  orientation: vertical
data-source: Ravendb
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

To send your Prometheus-format Ravendb metrics to Logz.io, you need to add the **inputs.ravendb** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on the Ravendb server

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.Ravendb plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Ravendb data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.ravendb]]
  ## Node URL and port that RavenDB is listening on
  url = "https://localhost:8080"

  ## RavenDB X509 client certificate setup
  tls_cert = "/etc/telegraf/raven.crt"
  tls_key = "/etc/telegraf/raven.key"

  ## Optional request timeout
  ##
  ## Timeout, specifies the amount of time to wait
  ## for a server's response headers after fully writing the request and 
  ## time limit for requests made by this client
  # timeout = "5s"

  ## List of statistics which are collected
  # At least one is required
  # Allowed values: server, databases, indexes, collections
  #  
  # stats_include = ["server", "databases", "indexes", "collections"]

  ## List of db where database stats are collected
  ## If empty, all db are concerned
  # db_stats_dbs = []

  ## List of db where index status are collected
  ## If empty, all indexes from all db are concerned
  # index_stats_dbs = []
  
  ## List of db where collection status are collected
  ## If empty, all collections from all db are concerned
  # collection_stats_dbs = []
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/ravendb/README.md)
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
