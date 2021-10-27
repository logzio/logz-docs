---
title: Ship Github metrics via Telegraf
logo:
  logofile: github.png
  orientation: vertical
data-source: Github
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

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Github metrics to Logz.io, you need to add the **inputs.github** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.github plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Github data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.github]]
  ## List of repositories to monitor
  repositories = [
	  "influxdata/telegraf",
	  "influxdata/influxdb"
  ]

  ## Github API access token.  Unauthenticated requests are limited to 60 per hour.
  # access_token = ""

  ## Github API enterprise url. Github Enterprise accounts must specify their base url.
  # enterprise_base_url = ""

  ## Timeout for HTTP requests.
  # http_timeout = "5s"

  ## List of additional fields to query.
	## NOTE: Getting those fields might involve issuing additional API-calls, so please
	##       make sure you do not exceed the rate-limit of GitHub.
	##
	## Available fields are:
	## 	- pull-requests			-- number of open and closed pull requests (2 API-calls per repository)
  # additional_fields = []
```

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/github/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
