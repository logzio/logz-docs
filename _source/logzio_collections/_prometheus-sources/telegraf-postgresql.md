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

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.postgresql plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the PostgreSQL data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.postgresql]]
  address = "host=<<ADDRESS>> user=<<USER-NAME>> password=<<PASSWORD>> sslmode=disable dbname=<<DB-NAME>>"
```
* Replace `<<ADDRESS>>` with the address of your PostgreSQL database host. This is `localhost` if installed locally.
* Replace `<<USER-NAME>>` with the user name for your PostgreSQL database.
* Replace `<<PASSWORD>>` with the password for your PostgreSQL database.
* Replace `<<DB-NAME>>` with the name of your PostgreSQL database.

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/postgresql/README.md).
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

<!-- logzio-inject:install:grafana:dashboards ids=["3L7cjHptO2CFcrvpqGCNI0"] --> 

{% include metric-shipping/generic-dashboard.html %} 


</div>
