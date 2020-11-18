---
layout: article
title: Importing dashboards from Grafana 
permalink: /user-guide/infrastructure-monitoring/p8s-importing-dashbds.html
flags:
  logzio-plan:  pro enterprise
  Beta: yes
  Beta: yes
tags:
  - metrics integrations
contributors:
  - yberlinger
---
_draft_

You can import your existing dashboards to Logz.io either manually or via a bulk process. 

For the record, notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.  See [Notification endpoints](/user-guide/integrations/endpoints.html) and [Annotations](/user-guide/infrastructure-monitoring/annotations/)for more information. 

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

* Dashboards that include annotations, notification endpoints, and other external resources are imported without these resources during bulk import. 

* Custom selection of dashboards is not possible with bulk import. All your dashboard folders are imported to a single folder within Logz.io.

* _TBD_: Script that runs against your Grafana endpoint to collect all dashboards. Import pending.
Script name, name of grafana endpoint, API token. Needs to be tested w/listener & public endpoint...

You'll need to include the following Grafana and Logz.io parameters when prompted in the CLI: 

* Name of the new folder for your dashboards
* Listener URL 
* Logz.io metrics token
* Logz.io API token
