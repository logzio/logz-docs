---
title: Ship system metrics via Telegraf
logo:
  logofile: telegraf-logo-preview.svg
  orientation: vertical
data-source: System metrics over Telegraf
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
  - yheger
shipping-tags:  
  - prometheus 
  - prebuilt-dashboards
order: 800
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Manual installation](#manual)
* [Automatic installation](#auto)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">
=======
## Overview


Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

This integration allows you to send system metrics from your machine to Logz.io. You can set up this integration manually or automatically as described in this document.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="manual">

### Manual installation

This document describes how to install Telegraf on your machine manually and enable it to collect system metrics and send them to Logz.io.

To send your Prometheus-format System metrics to Logz.io, you need to add multiple system-related inputs and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the system metrics from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.cpu]]
  # Whether to report per-cpu stats or not
  percpu = false
  
  # Whether to report total system cpu stats or not
  totalcpu = true
  
  # If true, collect raw CPU time metrics.
  collect_cpu_time = true
  
  # If true, compute and report the sum of all non-idle CPU states.
  report_active = true
  
[[inputs.mem]]
[[inputs.system]]
[[inputs.disk]]
  ignore_fs = ["tmpfs", "devtmpfs", "devfs", "iso9660", "overlay", "aufs", "squashfs"]
[[inputs.diskio]]
[[inputs.net]]
[[inputs.processes]]
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
</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="auto">

### Automatic installation

This document describes how to install Telegraf on your machine automatically using a script and enable it to collect system metrics and send them to Logz.io. All configuration happens automatically without the need to change the Telegraf configuration file. 


#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Execute the script

###### Linux and MacOS
  
```shell
curl -L https://raw.githubusercontent.com/logzio/telegraf_demo/main/script.sh -o script.sh && export LOGZIO_LISTENER="<<LISTENER-HOST>>:8053" && export LOGZIO_METRICS_TOKEN="<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>" && chmod +x ./script.sh && ./script.sh <<TYPE>>
```

{% include general-shipping/replace-placeholders-prometheus.html %}
* Replace <<TYPE>> with `system`.
  
###### Windows
  
curl -o telegraf-1.19.3._windows_amd64.zip https://dl.influxdata.com/telegraf/releases/telegraf-1.19.3_windows_amd64.zip; Expand-Archive -LiteralPath .\telegraf-1.19.3._windows_amd64.zip -DestinationPath C:\'Program Files'\InfluxData\telegraf\; curl -o telegraf.conf https://raw.githubusercontent.com/logzio/telegraf_demo/main/telegraf_win_<<TYPE>>.conf; $env:LOGZIO_LISTENER="<<LISTENER-HOST>>:8053"; $env:LOGZIO_METRICS_TOKEN="<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>"; C:\'Program Files'\InfluxData\Telegraf\telegraf-1.19.3\telegraf.exe -config telegraf.conf
```

{% include general-shipping/replace-placeholders-prometheus.html %}
* Replace <<TYPE>> with `system`.

</div>
<!-- tab:end -->
</div>
<!-- tabContainer:end -->
