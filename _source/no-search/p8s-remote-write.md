---
layout: article
title: Configuring remote write for Prometheus
permalink: /user-guide/metrics/p8s-remote-write.html
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

To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents


Export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.    <!---  AI-provide a link to guidelines --->

### Configuring Remote Write to Logz.io



### Configuring Prometheus metrics remote write to Logz.io


Within Prometheus:

1. Define Logz.io as a new endpoint in Prometheus, using remote write.
2. Provide the Logz.io metrics account listener address (URL) and token.

You can read more about Prometheus Remote Write Tuning [here.](https://prometheus.io/docs/practices/remote_write/) <i class="fas fa-external-link-alt"></i>  <!--external link open in new tab>


Your incoming time series data is saved with matching retention and aggregation, according to the existing solution and your account plan:

  - 3 days - raw data
  - 7 days - 1-minute downsampling
  - 30 days - 10-minute downsampling
  - 18 months- 60-minute downsampling


### Importing dashboards from Grafana
You can import your existing dashboards to Logz.io either manually or in a bulk process. 
Notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.

After your Prometheus metrics begin to arrive to Logz.io:  

1. To import dashboards from your local Grafana 
    1. Export the relevant Prometheus dashboards from your Grafana as JSON files.
    2. Log into Logz.io 

    3. Log in to Logz.io and navigate to the **Metrics** tab.

    4. In the left navigation pane, click  "**+**", select the **Import** option, and import dashboards.
  ![Import dashboards from your Grafana](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-option1.png)

    5. To import your saved Prometheus dashboards: Click **Upload json file** and select the JSON files you saved in step 1. 
        For more information see [Upload JSON logs]({{site.baseurl}}/user-guide/shipping/log-sources/json-uploads.html). 

2. To import dashboards from Grafana.com    
    Enter the relevant dashboard URL or ID in the **Import via grafana.com** field and click **Load**.  ![Import dashboards from your Grafana](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-dashbd.png)

### Bulk import of dashboards with a script 
