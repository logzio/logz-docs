---
title: Ship Prometheus metrics with the Telegraf agent
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Prometheus metrics with the Telegraf agent to Logz.io
logo:
  logofile: mascot-telegraf.png #telegraf-tiger.png  #telegraf-logo-preview.svg
  orientation: vertical
data-source: Telegraf for Prometheus metrics
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - fadi-khatib
  - yberlinger
shipping-tags:  
  - prometheus
  - prebuilt-dashboards
order: 800
---


This project lets you configure a Telegraf agent to send your collected Prometheus-format metrics to Logz.io.

## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems, and IoT sensors.

To send your Prometheus-format metrics to Logz.io, you add the **outputs.http** plug-in to your Telegraf configuration file.

<!-- logzio-inject:install:grafana:dashboards ids=["32X5zm8qW7ByLlp1YPFkrJ"] --> 
  
#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

**Ubuntu & Debian**

```shell
sudo apt-get update && sudo apt-get install telegraf
```

The configuration file is located at `/etc/telegraf/telegraf.conf`.

**RedHat and CentOS**

```shell
sudo yum install telegraf
```

The configuration file is located at `/etc/telegraf/telegraf.conf`.

**SLES & openSUSE**

```shell
# add go repository
zypper ar -f obs://devel:languages:go/ go
# install latest telegraf
zypper in telegraf
```

The configuration file is located at `/etc/telegraf/telegraf.conf`.

**FreeBSD/PC-BSD**

```shell
sudo pkg install telegraf
```

The configuration file is located at `/etc/telegraf/telegraf.conf`.
##### Add the outputs.http plug-in

After you create a config file for Telegraf, configure the output plug-in to enable your data to be sent to Logz.io in Prometheus-format and add the following code to the configuration file:


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

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://docs.influxdata.com/telegraf/v1.18/plugins/).
{:.info-box.note}
<!-- info-box-end -->


##### Check Logz.io for your metrics

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["32X5zm8qW7ByLlp1YPFkrJ"] --> 

{% include metric-shipping/generic-dashboard.html %} 

</div>


