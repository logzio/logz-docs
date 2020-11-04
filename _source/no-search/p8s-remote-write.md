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

Export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.    

### Configuring Remote Write to Logz.io


Within Prometheus:

1. Define Logz.io as a new endpoint, using remote write.
2. Provide the Logz.io metrics account token and listener address (URL).

  - To find the default token in the [General Settings](https://app.logz.io/#/dashboard/settings/general) page , click **<i class="li li-gear"></i> > Settings > General** in the top menu.

<video autoplay loop>
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/p8sgo-to-acct_settings2.mp4" type="video/mp4"/>
</video>

  - To find the correct listener URL for your region, look [here](/user-guide/log-shipping/listener-ip-addresses.html). 

You can read more about Prometheus Remote Write Tuning <a href ="https://prometheus.io/docs/practices/remote_write/" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

Your incoming time series data is saved with matching retention and aggregation, according to the existing solution and your account plan:

  - 3 days - raw data
  - 7 days - 1-minute downsampling
  - 30 days - 10-minute downsampling
  - 18 months- 60-minute downsampling

### Importing dashboards from Grafana
You can import your existing dashboards to Logz.io either manually or via a bulk process. 
Notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.

After your Prometheus metrics begin to arrive to Logz.io:  

To import dashboards:

1. Log into Logz.io and navigate to the **Metrics** tab.
2. In the left navigation pane, click **+** and select **Import**.
![Import dashboards to Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-dashboards.png)

  - To import your existing Prometheus dashboards, first export the relevant dashboards as JSON files, then click **Upload json file** and select the files to upload. 
    
    For more information see [Upload JSON logs]({{site.baseurl}}/user-guide/shipping/log-sources/json-uploads.html). 
  - To import dashboards from Grafana.com, enter the relevant dashboard URL or ID in **Import via grafana.com** and **Load** them. 

### Bulk import of dashboards via script 

All your dashboard folders are imported into a single folder within Logz.io. 

You'll need to include the following Grafana and Logz.io paramaters: 

* Name of the new folder for your dashboards
* Location of the logz.io API token
* Address
* Account number
