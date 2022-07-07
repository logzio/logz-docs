---
title: Ship TeamCity metrics via Telegraf
logo:
  logofile: TeamCity-logo.png
  orientation: vertical
data-source: TeamCity 
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


## Overview

TeamCity is a general-purpose CI/CD solution that allows the most flexibility for all sorts of workflows and development practices.  Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format TeamCity metrics to Logz.io, you need to add the **inputs.prometheus** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.prometheus plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the TeamCity data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.prometheus]]

  urls = ["https://<TeamCity_server_URL>/app/metrics?experimental=true"]

  ## Optional HTTP Basic Auth Credentials
  username = “<YOUR-USERNAME>”
  password = “<YOUR-PASSWORD>”
```

* Replace `<TeamCity_server_URL>` with the URL of your TeamCity server.
* Replace `<YOUR-USERNAME>` with the user name to your TeamCity server.
* Replace `<YOUR-PASSWORD>` with the password to your TeamCity server.


##### Add the outputs.http plug-in
  
{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}
  
##### Start Telegraf

{% include metric-shipping/telegraf-run.md %}

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours.

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1mdHqslZMi4gXaNCLZo9G1"] --> 

{% include metric-shipping/generic-dashboard.html %} 

</div>
