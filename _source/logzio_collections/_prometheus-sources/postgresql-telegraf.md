---
title: Ship PostgreSQL metrics via Telegraf
logo:
  logofile: postgresql-telegraf.png
  orientation: vertical
data-source: PostgreSQL metrics over Telegraf
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

To send your Prometheus-format PostgreSQL metrics to Logz.io, you need to add the **inputs.postgresql** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

Follow the instructions on [Get started with Telegraf](https://docs.influxdata.com/telegraf/latest/introduction/getting-started/) to:

1. Download and install Telegraf using the terminal.
2. Create the configuration file - 'telegraf.conf'.

##### Add the inputs.postgresql plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the PostgreSQL data from your hosts. To do this, add the following code to the configuration file:


``` yaml
[[inputs.postgresql]]
  address = "host=<<ADDRESS>> user=<<USER-NAME>> password=<<PASSWORD>> sslmode=disable dbname=<<DB-NAME>>"
```
* Replace `<<ADDRESS>>` with the address of your PostgreSQL database host.
* Replace `<<USER-NAME>>` with the user name for your PostgreSQL database.
* Replace `<<PASSWORD>>` with the password for your PostgreSQL database.
* Replace `<<DB-NAME>>` with the name of your PostgreSQL database.

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/postgresql/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

After you have created the configuration file, you need to configure the output plug-in to enable Telegraf to send your data to Logz.io in Prometheus-format. To do this, add the following code to the configuration file:

``` yaml
[[outputs.http]]
  url = "https://<<LISTENER-HOST>>:8053"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>"
```

{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
