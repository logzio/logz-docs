---
title: Send Telegraf Docker metrics
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-for-product-source: Metrics
data-source: Telegraf Docker Metrics Collector
templates: ["docker"]
contributors:
  - hidan
shipping-tags:  
  - docker
order: 800
---

## Overview

To simplify shipping metrics from one or many sources, we created the Telegraf Docker Metrics Collector. Telegraf Docker Metrics Collector is a container that runs Telegraf collector.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

Follow the instructions on [Get started with Telegraf](https://docs.influxdata.com/telegraf/latest/introduction/getting-started/) to:

1. Download and install Telegraf in the terminal.
2. Create and configure the ‘telegraf.conf’ file.
3. Start the Telegraf service.

##### Pull the Docker image

After you create a config file for Telegraf, pull the Docker image:

`docker pull logzio/telegraf-docker-collector-metrics:latest`

##### Start the collector

Run the following command:

````yaml
docker run --name telegraf-docker-collector-metrics \
 --env METRICS_TOKEN="<<METRICS-SHIPPING-TOKEN>>" \
 --env LOGZIO_LISTENER="<<LOGZIO_LISTENER>>" \
 -v /var/run/docker.sock:/var/run/docker.sock \
 logzio/telegraf-docker-collector-metrics:latest
````

* Replace `<<METRICS-SHIPPING-TOKEN>>` with your Metrics shipping token.
* Replace `<<LOGZIO-LISTENER>>` with your listener.


If you prefer to store these environment variables in an `.env` file, run the following command:

`docker run -d --env-file=docker.env -v /var/run/docker.sock:/var/run/docker.sock logzio/telegraf-docker-collector-metrics:latest`

**Environment variables:**

|Name|Description|
|---|---|
|METRICS_TOKEN|Required. Your Logz.io metrics account token. Replace <> with the token of the account you want to ship to.|
|LOGZIO_LISTENER|Default: `https://listener.logz.io:8053`. Your Logz.io listener address followed by port `8053`.|
|DOCKER_ENDPOINT|Default: default: `unix:///var/run/docker.sock`. Address to reach the required Docker Daemon.|
|TIMEOUT|Default: `5s`. The request timeout for any Docker Daemon query.|
|EXCLUED_IMAGES|Default: `nil`. A list of strings, regexes, or globs whose referent container image names will not be among the queried containers. !-prefixed negations are possible for all item types to signify that only unmatched container image names should be monitored. For example: `imageNameToExclude1,imageNameToExclude2)`|

##### Check Logz.io metrics

Give your metrics a few minutes to get from your system to ours, and then open your Logz.io [Metrics](https://app.logz.io/#/dashboard/metrics) dashboard.

</div>


<!-- 
Deploy this integration to send metrics from your CloudWatch to Logz.io. 

This integration creates a Kinesis Data Firehose delivery stream that links to your CloudWatch metrics stream and then sends the metrics to your Logz.io account.

This integration currently only available on Logz.io regions US-east-1 and EU-central-1.

#### Setup

**Before you begin, you'll need**:

* An active account with Logz.io

<div class="tasklist">

##### Create a Kinesis Data Firehose delivery stream
  
1. Login to your AWS account and navigate to **Amazon Kinesis > Delivery streams > Create delivery stream**.
  
    ![Screen_1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cloudwatch/delivery-stream-update.png)

2. Choose **Direct PUT** as **Source** and **HTTP Endpoint** as **Destination**.

3. Give the delivery stream a name.

4. In the **Destination settings** section, enter the **HTTP endpoint URL** depending on your region.

  | Region | URL |
  |---|---|
  | US-East-1 | https://listener-aws-metrics-stream-us.logz.io/ |
  | EU-central-1 | https://listener-aws-metrics-srteam-eu.logz.io/ |
  

5. In the **Access key** section, enter your Logz.io metrics shipping token.

6. For **Content encoding**, select **Disabled**.

7. Set the **Retry duration** to 60 seconds.

8. In the **Buffer hints** section, enter 5MB for buffer size, and 60 seconds for buffer interval.

9. If required, in the **Backup settings**, select **Failed data only** and select an S3 bucket you would like to use for backup.

10. Select **Create delivery stream**.


##### Create a CloudWatch metric stream
    
1. Navigate to **CloudWatch > Metric streams > Create a metric stream**.
  
   ![Screen_2](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cloudwatch/metric-stream-update.png)
 
2. In the **Metrics to be streamed** section, select what namespaces you want to monitor (include/exclude or all namespaces).
  
3. In the **Configuration** section, select an existing Firehose as the configuration option.

4. In the **Select your Kinesis Data** section, select the Kinesis Data Firehose delivery stream created in the previous step.

5. Select **OpenTelemetry 0.7** as the output format.

6. Give your metric stream a name.

7. Select **Create metric stream**.

  
##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
-->