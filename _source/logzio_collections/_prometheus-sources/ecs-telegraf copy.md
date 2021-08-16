---
title: Ship Amazon ECS metrics via Telegraf
logo:
  logofile: ecs-telegraf.png
  orientation: vertical
data-source: Amazon ECS metrics over Telegraf
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

To send your Prometheus-format Amazon ECS metrics to Logz.io, you need to add the **inputs.ecs** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.ecs plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Amazon ECS data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.ecs]]
## ECS metadata url.
  ## Metadata v2 API is used if set explicitly. Otherwise,
  ## v3 metadata endpoint API is used if available.
  # endpoint_url = ""

  ## Containers to include and exclude. Globs accepted.
  ## Note that an empty array for both will include all containers
  # container_name_include = []
  # container_name_exclude = []

  ## Container states to include and exclude. Globs accepted.
  ## When empty only containers in the "RUNNING" state will be captured.
  ## Possible values are "NONE", "PULLED", "CREATED", "RUNNING",
  ## "RESOURCES_PROVISIONED", "STOPPED".
  # container_status_include = []
  # container_status_exclude = []

  ## ecs labels to include and exclude as tags.  Globs accepted.
  ## Note that an empty array for both will include all labels as tags
  ecs_label_include = [ "com.amazonaws.ecs.*" ]
  ecs_label_exclude = []

  ## Timeout for queries.
  # timeout = "5s"
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/ecs/README.md)
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in
  
{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
