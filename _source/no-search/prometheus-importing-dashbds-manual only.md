---
layout: article
title: Importing metrics dashboards   
permalink: /user-guide/infrastructure-monitoring/prometheus-importing-dashbds-manual-only.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Import your metrics dashboard to Logz.io
flags:
  logzio-plan: pro 
sitemap: false
tags:
  - metrics integrations
contributors:
  - yberlinger
  - yotamloe
---

You can import your existing Grafana dashboards to Logz.io via a manual process.
 
For the dashboard import to work smoothly, you'll need to change the name of the data source in your JSON file to the name of your Logz.io Metrics account. 
Your Metrics account information is located in the <a href ="https://app.logz.io/#/dashboard/settings/manage-accounts" target="_blank">Manage Accounts **(<i class="li li-gear"></i> > Settings > Manage accounts)**</a> page of your Operations workspace. ![Account settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8s-account-token00.png)

For the record, notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.  See [Notification endpoints](/user-guide/integrations/endpoints.html) and [Annotations ](/user-guide/infrastructure-monitoring/annotations/)for more information. 

#### Importing individual dashboards

<div class="tasklist">

To import individual dashboards: 

##### Navigate to the Metrics tab.

Log into Logz.io and navigate to the **Metrics** tab.

##### Select the Import option.
In the left navigation pane, click <i class="fas fa-plus"></i> and select **Import**.
![Import dashboards to Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/metrics-prometheus/import-dash-prometheus.png)

  - To import your existing Prometheus dashboards, first export the relevant dashboards as JSON files, then click **Upload JSON file** and select the files to upload. 
    
    For related information see [Upload JSON logs]({{site.baseurl}}/shipping/log-sources/json-uploads). 
  <!-- - To import dashboards from Grafana.com, enter the relevant dashboard URL or ID in **Import via grafana.com** and **Load** them. --> 
  <!-- As of 14 March, the ability to use the Import via grafana.com is not available in the product interface-->
</div>


