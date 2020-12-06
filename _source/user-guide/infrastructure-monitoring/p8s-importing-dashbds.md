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

<!-- tabContainer:start -->
<div class="branching-container">

* [Manual upload](#manual)
* [Bulk upload](#bulk)
{:.branching-tabs}



<!-- tab:start -->
<div id="manual">
  
### Importing individual dashboards

To import individual dashboards: 

1. Log into Logz.io and navigate to the **Metrics** tab.
2. In the left navigation pane, click **+** and select **Import**.
![Import dashboards to Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8simport-dashboards.png)

  - To import your existing Prometheus dashboards, first export the relevant dashboards as JSON files, then click **Upload json file** and select the files to upload. 
    
    For more information see [Upload JSON logs]({{site.baseurl}}/user-guide/shipping/log-sources/json-uploads.html). 
  - To import dashboards from Grafana.com, enter the relevant dashboard URL or ID in **Import via grafana.com** and **Load** them. 

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="bulk">
### Bulk dashboard import via script 

For easy migration we created a python [script](https://github.com/logzio/grafana-dashboard-migration-tool) to bulk upload your dashboards to our platform

Bulk import is supported for Grafana version 6 and above.

* Dashboards that include annotations, notification endpoints, and other external resources are imported without these resources during bulk import. 

* Custom selection of dashboards is not possible with bulk import. All your dashboard folders are imported to a single folder within Logz.io.

### Instructions:

* Clone the repo:
``` bash
git clone https://github.com/logzio/grafana-dashboard-migration-tool.git
```
* Switch directory to the repo:
```bash
cd grafana-dashboard-migration-tool
```
* Set your enviroment varaiables in `configuration.py`
* Run the script with your configuration:
```bash
python main.py 
```

### Configuration:

| Enviroment variable | Description |
|---|---|
| GRAFANA_HOST | Your grafana host without protocol specification (e.g. localhost:3000). |
| GRAFANA_TOKEN | Your grafana editor/admin API key, find or create one under Configuration -> API keys. |
| LOGZIO_API_TOKEN | Your Logz.io account API token, find it under settings -> tools -> manage tokens -> API tokens. |
| REGION_CODE | Your Logz.io region code. For example if your region is US, then your region code is `us`. You can find your region code [here]( https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) for further information. |


</div>
<!-- tab:end -->
</div>
