---
title: Ship Mesosphere DC/OS metrics via Telegraf
logo:
  logofile: dcos.png
  orientation: vertical
data-source: Mesosphere DC/OS
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

To send your Prometheus-format Mesosphere DC/OS metrics to Logz.io, you need to add the **inputs.dcos** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher on a dedicated server

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.dcos plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Mesosphere DC/OS data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.dcos]]
  ## The DC/OS cluster URL.
  cluster_url = "https://dcos-master-1"

  ## The ID of the service account.
  service_account_id = "telegraf"
  ## The private key file for the service account.
  service_account_private_key = "/etc/telegraf/telegraf-sa-key.pem"

  ## Path containing login token.  If set, will read on every gather.
  # token_file = "/home/dcos/.dcos/token"

  ## In all filter options if both include and exclude are empty all items
  ## will be collected.  Arrays may contain glob patterns.
  ##
  ## Node IDs to collect metrics from.  If a node is excluded, no metrics will
  ## be collected for its containers or apps.
  # node_include = []
  # node_exclude = []
  ## Container IDs to collect container metrics from.
  # container_include = []
  # container_exclude = []
  ## Container IDs to collect app metrics from.
  # app_include = []
  # app_exclude = []

  ## Maximum concurrent connections to the cluster.
  # max_connections = 10
  ## Maximum time to receive a response from cluster.
  # response_timeout = "20s"

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## If false, skip chain & host verification
  # insecure_skip_verify = true

  ## Recommended filtering to reduce series cardinality.
  # [inputs.dcos.tagdrop]
  #   path = ["/var/lib/mesos/slave/slaves/*"]
```

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/dcos/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
