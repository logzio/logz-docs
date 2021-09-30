---
title: Ship NSQ Consumer metrics via Telegraf
logo:
  logofile: nsq.png
  orientation: vertical
data-source: NSQ Consumer
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

To send your Prometheus-format NSQ Consumer metrics to Logz.io, you need to add the **inputs.nsq_consumer** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on the same machine as NSQ Consumer

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.nsq_consumer plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the NSQ Consumer data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.nsq_consumer]]
  ## Server option still works but is deprecated, we just prepend it to the nsqd array.
  # server = "localhost:4150"

  ## An array representing the NSQD TCP HTTP Endpoints
  nsqd = ["localhost:4150"]

  ## An array representing the NSQLookupd HTTP Endpoints
  nsqlookupd = ["localhost:4161"]
  topic = "telegraf"
  channel = "consumer"
  max_in_flight = 100

  ## Maximum messages to read from the broker that have not been written by an
  ## output.  For best throughput set based on the number of metrics within
  ## each message and the size of the output's metric_batch_size.
  ##
  ## For example, if each message from the queue contains 10 metrics and the
  ## output metric_batch_size is 1000, setting this to 100 will ensure that a
  ## full batch is collected and the write is triggered immediately without
  ## waiting until the next flush_interval.
  # max_undelivered_messages = 1000

  ## Data format to consume.
  ## Each data format has its own unique set of configuration options, read
  ## more about them here:
  ## https://github.com/influxdata/telegraf/blob/master/docs/DATA_FORMATS_INPUT.md
  data_format = "influx"
```


<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/nsq_consumer/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
