---
title: Ship GCP metrics via Telegraf
logo:
  logofile: gcp-logo.png
  orientation: vertical
data-source: GCP metrics over Telegraf
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

To send your Prometheus-format GCP metrics to Logz.io, you need to add the **inputs.stackdriver** and **outputs.http** plug-ins to your Telegraf configuration file.

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
    "<<NAMESPACE>>",
  ]

  interval = "1m"
```

* Replace `<<YOUR-PROJECT>>` with the name of your GCP project.
* Replace `<<NAMESPACE>>` with the name of the namespace that you need to receive metrics from. You can specify multiple namespaces here.

The available namespaces are:

| **Namespace**                        | **Description**                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actions.googleapis.com               | Metrics from [Google Assistant Smart Home](https://developers.google.com/assistant/smarthome/overview).                                                                                                                                                                                                                                                                    |
| aiplatform.googleapis.com            | Metrics from [Vertex AI](https://cloud.google.com/ai-platform-unified/docs).                                                                                                                                                                                                                                                                                               |
| apigateway.googleapis.com            | Metrics from [API Gateway](https://cloud.google.com/api-gateway/docs).                                                                                                                                                                                                                                                                                                     |
| apigee.googleapis.com                | Metrics from [Apigee](https://docs.apigee.com/).                                                                                                                                                                                                                                                                                                                           |
| appengine.googleapis.com             | Metrics from [App Engine](https://cloud.google.com/appengine/docs).                                                                                                                                                                                                                                                                                                        |
| autoscaler.googleapis.com            | Metrics from [Compute Engine Autoscaler](https://cloud.google.com/compute/docs/autoscaler).                                                                                                                                                                                                                                                                                |
| bigquery.googleapis.com              | Metrics from [BigQuery](https://cloud.google.com/bigquery/docs).                                                                                                                                                                                                                                                                                                           |
| bigquerybiengine.googleapis.com      | Metrics from [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs).                                                                                                                                                                                                                                                                                                |
| bigquerydatatransfer.googleapis.com  | Metrics from the [BigQuery Data Transfer Service](https://cloud.google.com/bigquery-transfer/docs).                                                                                                                                                                                                                                                                        |
| bigtable.googleapis.com              | Metrics from [Cloud Bigtable](https://cloud.google.com/bigtable/docs).                                                                                                                                                                                                                                                                                                     |
| cloudfunctions.googleapis.com        | Metrics from [Cloud Functions](https://cloud.google.com/functions/docs).                                                                                                                                                                                                                                                                                                   |
| cloudiot.googleapis.com              | Metrics from [IoT Core](https://cloud.google.com/iot/docs)                                                                                                                                                                                                                                                                                                                 |
| cloudsql.googleapis.com              | Metrics from [Cloud SQL](https://cloud.google.com/sql/docs)                                                                                                                                                                                                                                                                                                                |
| cloudtasks.googleapis.com            | Metrics from [Cloud Tasks](https://cloud.google.com/tasks/docs) (formerly App Engine Task Queue).                                                                                                                                                                                                                                                                          |
| cloudtrace.googleapis.com            | Metrics from [Cloud Trace](https://cloud.google.com/trace/docs).                                                                                                                                                                                                                                                                                                           |
| composer.googleapis.com              | Metrics from [Cloud Composer](https://cloud.google.com/composer/docs).                                                                                                                                                                                                                                                                                                     |
| compute.googleapis.com               | Metrics from [Compute Engine](https://cloud.google.com/compute/docs).                                                                                                                                                                                                                                                                                                      |
| contactcenterinsights.googleapis.com | Metrics from [Contact Center AI Insights](https://cloud.google.com/solutions/contact-center).                                                                                                                                                                                                                                                                              |
| container.googleapis.com             | Metrics from [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs).                                                                                                                                                                                                                                                                                  |
| dataflow.googleapis.com              | Metrics from [Dataflow](https://cloud.google.com/dataflow/docs).                                                                                                                                                                                                                                                                                                           |
| dataproc.googleapis.com              | Metrics from [Dataproc](https://cloud.google.com/dataproc/docs).                                                                                                                                                                                                                                                                                                           |
| datastore.googleapis.com             | Metrics from [Datastore](https://cloud.google.com/datastore/docs).                                                                                                                                                                                                                                                                                                         |
| datastream.googleapis.com            | Metrics from [Datastream](https://cloud.google.com/datastream/docs).                                                                                                                                                                                                                                                                                                       |
| dlp.googleapis.com                   | Metrics from [Cloud Data Loss Prevention](https://cloud.google.com/dlp/docs).                                                                                                                                                                                                                                                                                              |
| dns.googleapis.com                   | Metrics from [Cloud DNS](https://cloud.google.com/dns/docs).                                                                                                                                                                                                                                                                                                               |
| file.googleapis.com                  | Metrics from [Filestore](https://cloud.google.com/filestore/docs).                                                                                                                                                                                                                                                                                                         |
| firebaseappcheck.googleapis.com      | Metrics from [Firebase](https://firebase.google.com/).                                                                                                                                                                                                                                                                                                                     |
| firebasedatabase.googleapis.com      | Metrics from [Firebase](https://firebase.google.com/).                                                                                                                                                                                                                                                                                                                     |
| firebasehosting.googleapis.com       | Metrics from [Firebase](https://firebase.google.com/).                                                                                                                                                                                                                                                                                                                     |
| firebasestorage.googleapis.com       | Metrics from [Cloud Storage for Firebase](https://firebase.google.com/docs/storage/).                                                                                                                                                                                                                                                                                      |
| firestore.googleapis.com             | Metrics from [Firestore](https://firebase.google.com/docs/firestore/).                                                                                                                                                                                                                                                                                                     |
| firewallinsights.googleapis.com      | Metrics from [Firewall Insights](https://cloud.google.com/network-intelligence-center/docs/firewall-insights).                                                                                                                                                                                                                                                             |
| healthcare.googleapis.com            | Metrics from [Cloud Healthcare API](https://cloud.google.com/healthcare/docs).                                                                                                                                                                                                                                                                                             |
| iam.googleapis.com                   | Metrics from [Identity and Access Management](https://cloud.google.com/iam/docs).                                                                                                                                                                                                                                                                                          |
| ids.googleapis.com                   | Metrics from [Cloud IDS](https://cloud.google.com/intrusion-detection-system/docs).                                                                                                                                                                                                                                                                                        |
| interconnect.googleapis.com          | Metrics from [Cloud Interconnect](https://cloud.google.com/interconnect/docs).                                                                                                                                                                                                                                                                                             |
| loadbalancing.googleapis.com         | Metrics for [Cloud Load Balancing](https://cloud.google.com/load-balancing/docs/load-balancing-overview).                                                                                                                                                                                                                                                                  |
| logging.googleapis.com               | Metrics from [Cloud Logging](https://cloud.google.com/logging/docs).                                                                                                                                                                                                                                                                                                       |
| managedidentities.googleapis.com     | Metrics from [Managed Service for Microsoft Active Directory](https://cloud.google.com/managed-microsoft-ad).                                                                                                                                                                                                                                                              |
| memcache.googleapis.com              | Metrics from [Memorystore for Memcached](https://cloud.google.com/memorystore/docs/memcached).                                                                                                                                                                                                                                                                             |
| metastore.googleapis.com             | Metrics from [Dataproc Metastore](https://cloud.google.com/dataproc-metastore/docs/monitoring).                                                                                                                                                                                                                                                                            |
| ml.googleapis.com                    | Metrics from [AI Platform](https://cloud.google.com/ai-platform/docs) (formerly Cloud Machine Learning).                                                                                                                                                                                                                                                                   |
| monitoring.googleapis.com            | Metrics from [Cloud Monitoring](https://cloud.google.com/monitoring/docs).                                                                                                                                                                                                                                                                                                 |
| networking.googleapis.com            | Metrics from [Network Topology](https://cloud.google.com/network-intelligence-center/docs/network-topology).                                                                                                                                                                                                                                                               |
| networksecurity.googleapis.com       | Metrics from [Google Cloud Armor](https://cloud.google.com/armor/docs).                                                                                                                                                                                                                                                                                                    |
| osconfig.googleapis.com              | Metrics from [VM Manager](https://cloud.google.com/compute/docs/manage-os).                                                                                                                                                                                                                                                                                                |
| privateca.googleapis.com             | Metrics from [Certificate Authority Service](https://cloud.google.com/certificate-authority-service/docs).                                                                                                                                                                                                                                                                 |
| pubsub.googleapis.com                | Metrics from [Pub/Sub](https://cloud.google.com/pubsub/docs).                                                                                                                                                                                                                                                                                                              |
| pubsublite.googleapis.com            | Metrics from [Pub/Sub Lite](https://cloud.google.com/pubsub/lite/docs).                                                                                                                                                                                                                                                                                                    |
| recaptchaenterprise.googleapis.com   | Metrics from [reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise/docs).                                                                                                                                                                                                                                                                                   |
| recommendationengine.googleapis.com  | Metrics from [Recommendations AI](https://cloud.google.com/recommendations-ai/docs).                                                                                                                                                                                                                                                                                       |
| redis.googleapis.com                 | Metrics from [Memorystore for Redis](https://cloud.google.com/memorystore/docs/redis).                                                                                                                                                                                                                                                                                     |
| router.googleapis.com                | Metrics from [Cloud Router](https://cloud.google.com/compute/docs/cloudrouter).                                                                                                                                                                                                                                                                                            |
| run.googleapis.com                   | Metrics from managed [Cloud Run](https://cloud.google.com/run/docs).                                                                                                                                                                                                                                                                                                       |
| serviceruntime.googleapis.com        | Metrics available to all [Google Cloud APIs](https://console.cloud.google.com/apis/library) (resource type [consumed\_api](https://cloud.google.com/monitoring/api/resources#tag_consumed_api)) and to your APIs created with [Cloud Endpoints](https://cloud.google.com/endpoints/docs) (resource type [api](https://cloud.google.com/monitoring/api/resources#tag_api)). |
| panner.googleapis.com                | Metrics from [Cloud Spanner](https://cloud.google.com/spanner/docs).                                                                                                                                                                                                                                                                                                       |
| storage.googleapis.com               | Metrics from [Cloud Storage](https://cloud.google.com/storage/docs).                                                                                                                                                                                                                                                                                                       |
| storagetransfer.googleapis.com       | Metrics from [Storage Transfer Service for on-premises data](https://cloud.google.com/storage-transfer/docs/on-prem-overview).                                                                                                                                                                                                                                             |
| tpu.googleapis.com                   | Metrics from [Cloud TPU](https://cloud.google.com/tpu/docs).                                                                                                                                                                                                                                                                                                               |
| vpcaccess.googleapis.com             | Metrics from [Virtual Private Cloud (VPC)](https://cloud.google.com/vpc/docs).                                                                                                                                                                                                                                                                                             |
| vpn.googleapis.com                   | Metrics from [Virtual Private Cloud (VPC)](https://cloud.google.com/vpc/docs).                                                                                                                                                                                                                                                                                             |
| workflows.googleapis.com             | Metrics from [Workflows](https://cloud.google.com/workflows/docs).                                                                                                                                                                                                                                                                                                         |

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
