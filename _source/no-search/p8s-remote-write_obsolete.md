---
layout: article
title: Remote write for Prometheus 
permalink: /user-guide/metrics/p8s-remote-write.html
flags:
  logzio-plan: community
sitemap: false
tags:
  - metrics integrations
contributors:
  - yberlinger
 
---
This topic is for Prometheus users migrating their solution to Logz.io Infrastructure Monitoring.

You can send your Prometheus metrics to your Logz.io Infrastructure Monitoring account.
To do this, you’ll need to send your application metrics to Logz.io in JSON format and stick to the formatting guidelines.

Our log scraping software service takes all your log file data, scrapes it and stores it in an archive. The log data may include messaging, calendaring, and other data types. 

Before you begin, make sure you have the following details for your Logz.io Metrics account: Listener address (URL) and Logz.io metrics account token.

Notes: 

* You can import your existing dashboards to Logz.io, either manually or in a bulk process.
* Notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.


### Configuring Prometheus metrics remote write to Logz.io

Within Prometheus:

1. Define Logz.io as a new endpoint in Prometheus, using remote write.
2. Provide the Logz.io metrics account listener address (URL) and token.

You can read more about Prometheus Remote Write Tuning [here.](https://prometheus.io/docs/practices/remote_write/) <i class="fas fa-external-link-alt"></i>


Your incoming time series data is saved with matching retention and aggregation, according to the existing solution and your account plan:

  - 3 days - raw data
  - 7 days - 1-minute downsampling
  - 30 days - 10-minute downsampling
  - 18 months- 60-minute downsampling


### Importing dashboards from Grafana
You can do this manually, or use a script to import all the dashboards in a folder to Logz.io

After your Prometheus metrics begin to arrive to Logz.io:  

1. To import dashboards from your local Grafana 
    1. Export the relevant Prometheus dashboards from your Grafana as JSON files.
    2. Log into Logz.io 

    3. Log in to Logz.io and navigate to the **Metrics** tab.

    4. In the left navigation pane, click  "**+**", select the **Import** option, and import dashboards.
  ![Import dashboards from your Grafana](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-option1.png)

    5. To import your saved Prometheus dashboards: Click **Upload json file** and select the JSON files you saved in step 1. 
        For more information see [Upload JSON logs]({{site.baseurl}}/shipping/log-sources/json-uploads.html). 

2. To import dashboards from Grafana.com    
    Enter the relevant dashboard URL or ID in the **Import via grafana.com** field and click **Load**.  ![Import dashboards from your Grafana](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-dashbd.png)

### Bulk import of dashboards with a script 
