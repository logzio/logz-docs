---
title: Ship Beanstalkd metrics via Telegraf
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Beanstalkd metrics via Telegraf to Logz.io
logo:
  logofile: beanstalk-logo.png
  orientation: vertical
data-source: Beanstalkd
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

Beanstalkd is a simple, fast work queue. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Beanstalkd metrics to Logz.io, you need to add the **inputs.beanstalkd** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on the relevant server

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.beanstalkd plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Beanstalkd data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.beanstalkd]]
  ## Server to collect data from
  server = "localhost:11300"

  ## List of tubes to gather stats about.
  ## If no tubes specified then data gathered for each tube on server reported by list-tubes command
  tubes = ["notifications"]
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/beanstalkd/README.md)
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
