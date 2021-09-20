---
title: Ship Google Dataproc Metastore metrics
logo:
  logofile: gcp-logo.png
  orientation: vertical
data-source: Google Dataproc Metastore
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
  - gcp
order: 800
---

## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Google Dataproc Metastore metrics to Logz.io, you need to add the **inputs.stackdriver** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

**Before you begin, you'll need**:
 GCP project

<div class="tasklist">

##### Set relevant credentials in GCP

1. Navigate to the [Project selector](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts/create) and choose the project to send metrics from.
2. In the **Service account details** screen, give the service account a unique name and select **Create and continue**.
3. In the **Grant this service account access to project** screen, add the following roles: Compute Viewer, Monitoring Viewer, and Cloud Asset Viewer.
4. Select **Done**.
5. Select your project in the **Service accounts for project** list.
6. Select **KEYS**.
7. Select **Keys > Add Key > Create new key** and choose JSON as the type.
8. Select **Create and Save**.

<!-- info-box-start:info -->
You must be a Service Account Key Admin to select Compute Engine and Cloud Asset roles.
{:.info-box.note}
<!-- info-box-end -->

##### Add an environment variable for the key

On your machine, run:

```shell
export GOOGLE_APPLICATION_CREDENTIALS=<<PATH-TO-YOUR-GCP-KEY>>
```

Replace `<<PATH-TO-YOUR-GCP-KEY>>` with the path to the JSON file created in the previous step.


##### Set up Telegraf v1.17 on a dedicated machine

{% include metric-shipping/telegraf-setup.md %}

##### Add the inputs.stackdriver plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the GCP data from your hosts. To do this, add the below code to the configuration file. 

``` ini
[[inputs.stackdriver]]

  project = "<<YOUR-PROJECT>>"

  metric_type_prefix_include = [
    "metastore.googleapis.com",
  ]

  interval = "1m"
```

* Replace `<<YOUR-PROJECT>>` with the name of your GCP project.

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/stackdriver/README.md)
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
