---
title: Convert InfluxQL metrics into PromQL
logo:
  logofile: telegraf-logo.png
  orientation: vertical
data-source: InfluxQL to PromQL
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---

## Overview

This tool allows you to migrate Grafana dashboards based on InfluxDB source to Prometheus source (e.g., Prometheus, M3DB, Cortex).

The tool functions in two ways:

1. Translate the query language from InfluxQL to PromQL.
2. Search and replace metrics names.


The conversion process is comprised of the two steps:

1. Converting the “templating” element of the dashboard, which contains an array of template variables with their saved values along with some other metadata.
2. Creating the InfluxQL query string and converting it to PromQL.


#### Convert Grafana Dashboards from InfluxQL to PromQL

**Before you begin, you'll need**:
 InfluxQL metrics

<div class="tasklist">

##### Clone the converter repository

```shell
Git clone https://github.com/logzio/influxql-to-m3-dashboard-converter.git
```

##### Install the tool requirements

Navigate to the project folder and install the requirements by running: 

```shell
pip install -r requirements.txt
```

##### Configure the requirements

Open the `requirements.txt` and add the following content to it:

```yaml
log_level: # optional default is INFO
datasource: # optional - will be used as the new datasource
importer:      # required - at least 1. 
  grafana:  # grafana api url i.e: https://<<username>>.grafana.net for grafana cloud url
    endpoint:
    api_token:
  folder:
    path:  # relative or full path
processor:
  replace_metrics_names:
    - name: # metric to be replaced
      value: # new metric name
  find_metrics_names:
    metrics_auth: # Currently only prometheus is supported
      metrics_db_endpoint: https://api.logz.io/v1/metrics/prometheus/api/v1
      metrics_basic_auth: 
        username:
        password:
      metrics_oauth_header:
        key: X-API-TOKEN
        value: <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>
    replace_strategy:
      strategies: [ 'statistic_combination' , 'permutation' ] # optional
      min_match_percent:  # min percent for result match 1-100
      min_filter_percent:  # threshold for combination matching 1-100 
exporter:
  grafana:
    endpoint: https://api.logz.io/v1/grafana/api
    auth_header:
      key:
      value:
  folder:
    path: # relative or full path
```

Configure the parmeters as per the table below and save the changes.

| Parameter | Description |
|---|---|
| log_level | **Optional**. Log level to be used during the run of the program. Default: INFO | 
| datasource | **Optional**. Replaces the existing datasource in the dashboard |
| importer | **Required**. At least one input element |
| importer.grafana | **Optional**. Import influxql dashboards from grafana API |
| importer.grafana.endpoint | **Required**. Grafana API URL |
| importer.grafana.token | **Required**. Grafana API token |
| importer.folder | **Optional**: Import influxql dashboards from a folder |
| importer.folder.path | **Required**. Path to the folder which contains influxql dashboards. (Relative or absolute) |
| processor | **Optional**. Processor modules that can transform output |
| processor.replace_metrics_names | **Optional**. A processor that will replace a metric name |
| processor.replace_metrics_names.name | **Required**. The name of the original metric to be replaced |
| processor.replace_metrics_names.value | **Required**. The new metric name |
| processor.find_metrics_names | **Optional**. Processor to find a match between existing and available metrics |
| processor.find_metrics_names.metrics_auth.metrics_db_endpoint | **Required**. API endpoint of the metrics db. Currently only prometheus is supported. |
| processor.find_metrics_names.metrics_auth.metrics_basic_auth.username | **Optional**. Metrics db username to be used when querying the db API. |
| processor.find_metrics_names.metrics_auth.metrics_basic_auth.password | **Optional**. Metrics db password to be used when querying the db API. |
| processor.find_metrics_names.metrics_auth.metrics_oauth_header.key | **Optional**. Metrics db oauth header key to be used when querying the db API. Must be a full header key |
| processor.find_metrics_names.metrics_auth.metrics_oauth_header.value | **Optional**. Metrics db oauth header value to be used when querying the db API. Must be a full header value, including your token for shipping metrics to your Logz.io account. Find it under Settings > Manage accounts. [_How do I look up my Metrics account token?_](/user-guide/accounts/finding-your-metrics-account-token/) |
| processor.find_metrics_names.replace_strategy.strategies | **Required**. Strategies to be used in the processor. Available strategies: permutation,statistic_match |
| processor.find_metrics_names.replace_strategy.min_match_percent | **Required** (for statistic_match strategy). The percent threshold for considering a match between two metrics. |
| processor.find_metrics_names.replace_strategy.min_filter_percent | **Required** (for statistic_match strategy). The percent threshold for performing combination match between two metrics. |
| exporter | **Required**. Exporter module that will export the converted dashboards. | 
| exporter.grafana | **Optional**. Export dashboards using grafana API. |
| exporter.grafana.endpoint | **Required**. grafana API URL. |
| exporter.grafana.auth_header.key | **Required**. Authentication header key. |
| exporter.grafana.auth_header.value | **Required**. Authentication header value. |
| exporter.folder | **Optional**. Export dashboard to a folder. |
| exporter.folder.path | **Required**. Path to the folder in which the dashboards will be exported. (Relative or absolute)|




##### Run the script

```shell
pip install -r requirements.txt && python3 main.py
```
  
##### Check Logz.io for your metrics

Once the conversion has been completed, log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
