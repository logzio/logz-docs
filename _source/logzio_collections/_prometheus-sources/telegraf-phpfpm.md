---
title: Ship PHP-FPM metrics via Telegraf
logo:
  logofile: phpfpm-logo.png
  orientation: vertical
data-source: PHP-FPM metrics over Telegraf
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

To send your Prometheus-format PHP-FPM metrics to Logz.io, you need to add the **inputs.phpfpm** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.PHP-FPM plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the PHP-FPM data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.phpfpm]]
  ## An array of addresses to gather stats about. Specify an ip or hostname
  ## with optional port and path
  ##
  ## Plugin can be configured in three modes (either can be used):
  ##   - http: the URL must start with http:// or https://, ie:
  ##       "http://localhost/status"
  ##       "http://192.168.130.1/status?full"
  ##
  ##   - unixsocket: path to fpm socket, ie:
  ##       "/var/run/php5-fpm.sock"
  ##      or using a custom fpm status path:
  ##       "/var/run/php5-fpm.sock:fpm-custom-status-path"
  ##      glob patterns are also supported:
  ##       "/var/run/php*.sock"
  ##
  ##   - fcgi: the URL must start with fcgi:// or cgi://, and port must be present, ie:
  ##       "fcgi://10.0.0.12:9000/status"
  ##       "cgi://10.0.10.12:9001/status"
  ##
  ## Example of multiple gathering from local socket and remote host
  ## urls = ["http://192.168.1.20/status", "/tmp/fpm.sock"]
  urls = ["http://localhost/status"]

  ## Duration allowed to complete HTTP requests.
  # timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/phpfpm/README.md)
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
