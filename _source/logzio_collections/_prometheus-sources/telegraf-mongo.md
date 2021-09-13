---
title: Ship MongoDB metrics via Telegraf
logo:
  logofile: mongo-logo.png
  orientation: vertical
data-source: MongoDB metrics over Telegraf
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

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format MongoDB metrics to Logz.io, you need to add the **inputs.mongodb** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.mongodb plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the MongoDB data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.mongodb]]
  servers = ["mongodb://<<USER-NAME>>:<<PASSWORD>>@<<ADDRESS>>:<<PORT>>"]
  ## An array of URLs of the form:
  ##   "mongodb://" [user ":" pass "@"] host [ ":" port]
  ## For example:
  ##   mongodb://user:auth_key@10.10.3.30:27017,
  ##   mongodb://10.10.3.33:18832,
  ##   servers = ["mongodb://127.0.0.1:27017,10.10.3.33:18832,10.10.5.55:6565"]
​
  gather_cluster_status = true
  gather_perdb_stats = true
  gather_col_stats = true
```

* Replace `<<USER-NAME>>` with the user name for your MongoDB database.
* Replace `<<PASSWORD>>` with the password for your MongoDB database.
* Replace `<<ADDRESS>>` with the address of your MongoDB database host. This is `localhost` if installed locally.
* Replace `<<PORT>>` with the address of your host port allocated to MongoDB database.

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/mongodb/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Start Telegraf

{% include metric-shipping/telegraf-run.md %}

##### Check Logz.io for your metrics

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["13q1IECY8zfnnDXvUq7vvH"] --> 

{% include metric-shipping/generic-dashboard.html %} 

</div>
