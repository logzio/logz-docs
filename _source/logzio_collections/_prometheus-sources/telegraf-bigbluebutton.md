---
title: Ship Big Blue Button metrics via Telegraf
logo:
  logofile: bigbluebutton-logo.png
  orientation: vertical
data-source: Big Blue Button metrics over Telegraf
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

To send your Prometheus-format Big Blue Button metrics to Logz.io, you need to add the **inputs.bigbluebutton** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.bigbluebutton plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Big Blue Button data from your hosts. To do this, add the following code to the configuration file:

``` ini
[[inputs.bigbluebutton]]
  ## Required BigBlueButton server url
	url = "http://localhost:8090"

	## BigBlueButton path prefix. Default is "/bigbluebutton"
	# path_prefix = "/bigbluebutton"

	## Required BigBlueButton secret key
	secret_key = ""

	## Optional HTTP Basic Auth Credentials
	# username = "username"
	# password = "pa$$word

	## Optional HTTP Proxy support
	# http_proxy_url = ""

	## Optional TLS Config
	# tls_ca = "/etc/telegraf/ca.pem"
	# tls_cert = "/etc/telegraf/cert.pem"
	# tls_key = "/etc/telegraf/key.pem"

	## Use TLS but skip chain & host verification
	# insecure_skip_verify = false

    ## Server score
	#[inputs.bigbluebutton.scores]
	#  meeting_created = 0
	#  user_joined = 0
	#  user_listen = 0
	#  user_voice_enabled = 0
	#  user_video_enabled = 0
```

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/bigbluebutton/README.md)
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
