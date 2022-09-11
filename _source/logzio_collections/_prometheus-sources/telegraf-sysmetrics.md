---
title: Ship system metrics via Telegraf
logo:
  logofile: telegraf-logo.png
  orientation: vertical
data-source: System metrics via Telegraf
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

{% include /general-shipping/agent-note.md %}


Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format System metrics to Logz.io, you need to add multiple system-related inputs and **outputs.http** plug-ins to your Telegraf configuration file.


<!-- logzio-inject:install:grafana:dashboards ids=["32X5zm8qW7ByLlp1YPFkrJ"] --> 

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the system metrics from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.cpu]]
  ## Whether to report per-cpu stats or not
  percpu = false
  ## Whether to report total system cpu stats or not
  totalcpu = true
  ## If true, collect raw CPU time metrics.
  collect_cpu_time = true
  ## If true, compute and report the sum of all non-idle CPU states.
  report_active = true
[[inputs.mem]]
[[inputs.system]]
    namepass = ["system"]
[[inputs.disk]]
  ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
[[inputs.diskio]]
[[inputs.net]]
[[inputs.processes]]
[[inputs.procstat]]
    pattern = ".*"
    fieldpass = ["cpu_usage", "memory_rss"] 
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://docs.influxdata.com/telegraf/v1.18/plugins/).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Start Telegraf

{% include metric-shipping/telegraf-run.md %}

##### Check Logz.io for your metrics

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["32X5zm8qW7ByLlp1YPFkrJ"] --> 

{% include metric-shipping/generic-dashboard.html %} 


</div>
