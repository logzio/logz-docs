---
layout: article
title: Configuring remote write for Prometheus
permalink: /user-guide/infrastructure-monitoring/p8s-remote-write.html
flags:
  logzio-plan: community
  Beta: yes
tags:
  - metrics integrations
contributors:
  - yberlinger
---
Manage your metrics with Logz.io open source Infrastructure Monitoring, powered by Prometheus and Grafana.  Using a hosted solution lets you and your team focus on the bigger picture, with a handy roster of dashboards to oversee continuous deployment, CI/CD pipelines, and prevent outages, manage incidents, and remediate crashes in multi-microservice environments, hybrid infrastructures, and complex tech stacks.

Integrate your Prometheus toolkit with the Logz.io Metrics platform to continuously monitor your system’s health and help you maintain system performance, speed, and resilience, and address problematic trends when they first appear - and before they become critical and threaten crashes or system outages.

![Showcased Metrics dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/metrics-intro.png)

To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents by the Logz.io listener. 

If you have multiple Prometheus server instances, you'll have to add Logz.io as an endpoint for each instance. 

By default, all metrics in your Prometheus server(s) will be sent to Logz.io. To drop or send specific metrics, add Prometheus labeling before enabling the remote write, or as part of the remote write configuration. You can read more about Prometheus relabeling tricks <a href ="https://medium.com/quiq-blog/prometheus-relabeling-tricks-6ae62c56cbda" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

* TBD: Set parallelism level for sending data - how many connections to open to the remote write listener. While the default is 1000, but we recommend configuring much fewer connections. 

* TBD: This is set in the configuration file. Parameter for # of connections (more data --o--> more channels)
  Sending data - best practice in configuring connection channels: 

* TBD: If you have both Prometheus & Grafana, you can activate a dashboard as part of the remote write configuration that will show you the queue size and how many metrics you're sending. If your queue size increases, it might be necessary to open an additional channel. 

You can read more about Prometheus Remote Write Tuning <a href ="https://prometheus.io/docs/practices/remote_write/" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

Once your metrics are flowing, export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  


### Configuring Remote Write to Logz.io


Within Prometheus:

1. Define Logz.io as a new endpoint, using remote write.
2. Provide the Logz.io metrics account token and listener address (URL).

  - To find the default token in the <a href ="https://app.logz.io/#/dashboard/settings/general" target="_blank">General Settings</a> page, click **<i class="li li-gear"></i> > Settings > General** in the top menu.

![General settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/general-settings1.png)

<!-- <video autoplay loop>
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/p8sgo-to-acct_settings2.mp4" type="video/mp4"/>
</video>  -->

  - To find the correct listener URL for your region, look in the <a href ="/user-guide/log-shipping/listener-ip-addresses.html" target="_blank">_Listener IP Addresses_</a> topic. 

Your incoming time series data is saved with matching retention and aggregation, according to the existing solution and your account plan:

<!-->  - 3 days - raw data
  - 7 days - 1-minute downsampling
  - 30 days - 10-minute downsampling
  - 18 months- 60-minute downsampling -->

## Importing dashboards from Grafana
You can import your existing dashboards to Logz.io either manually or via a bulk process. 
Notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.

### Importing individual dashboards

To import individual dashboards: 

1. Log into Logz.io and navigate to the **Metrics** tab.
2. In the left navigation pane, click **+** and select **Import**.
![Import dashboards to Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-dashboards.png)

  - To import your existing Prometheus dashboards, first export the relevant dashboards as JSON files, then click **Upload json file** and select the files to upload. 
    
    For more information see [Upload JSON logs]({{site.baseurl}}/user-guide/shipping/log-sources/json-uploads.html). 
  - To import dashboards from Grafana.com, enter the relevant dashboard URL or ID in **Import via grafana.com** and **Load** them. 

### Bulk dashboard import via script 

Bulk import is supported for Grafana version 6 and above.

As noted earlier, annotations and notification endpoints cannot be imported, thus dashboards that include these (and other) external resources will break during bulk import.

Custom selection of dashboards is not possible with bulk import. All your dashboard folders are imported to a single folder within Logz.io.

*TBD: Script that runs against your Grafana endpoint to collect all dashboards. Import pending.
Script name, name of grafana endpoint, API token. Needs to be tested w/listener & public endpoint...

You'll need to include the following Grafana and Logz.io parameters when prompted in the CLI: 

* Name of the new folder for your dashboards
* URL ? 
* Logz.io metrics token
* Logz.io API token
