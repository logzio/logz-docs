---
title: Ship Prometheus metrics with the Telegraf collector
logo:
  logofile: #get log
  orientation: vertical
data-source: Telegraf Collector for Prometheus metrics
open-source:
  - title: Telegraf Collector for Prometheus metrics
    github-repo: logz-aws-metrics
templates: ["docker"]
contributors:
  - fadi-khatib
  - yberlinger
shipping-tags:  # add tag attribute definition to .yaml for shipping
  - telegraf
---


{% include page-info/early-access.md type="beta" %}

This project allows you to collect Prometheus-format metrics with Telegraf, and ship them to Logz.io, via Telegraf.

### Telegraf: 
* Telegraf is a plugin-driven server agent for collecting & reporting metrics.
* We will add outputs.http plug in to telegraf configuration file, so metrics will be Shipped to logz.io.
  
**Before you begin, you'll need**:
[Telegraf 1.17](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/) or higher


<div class="tasklist">

### Add outputs.http plug in.
After creating a config file for telegraf we want to configure the output plugin,
witch will allow our data to be sent to logz.io as prometheus format.
* add this configuration to the configuration file:

{% include log-shipping/log-shipping-token-bullet.html %}
* {% include log-shipping/replace-vars.html listener=true %}

```
[[outputs.http]]
  url = "http://<ListenerUrl>:8050"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<METRICS-SHIPPING-TOKEN>>"
``` 

{% include metric-shipping/open-dashboard.md title="System Metrics" %}

</div>


