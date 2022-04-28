---
title: Send Amazon CloudWatch metrics
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-for-product-source: Metrics
data-source: Amazon CloudWatch
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - aws
order: 800
---

## Overview

Deploy this integration to send metrics from your CloudWatch to Logz.io.

This integration creates a Kinesis Data Firehose delivery stream that links to your CloudWatch metrics stream and then sends the metrics to your Logz.io account.

This integration currently only available on Logz.io regions US-east-1 and EU-central-1.

#### Setup

**Before you begin, you'll need**:

* An active account with Logz.io

<div class="tasklist">

##### Create a Kinesis Data Firehose delivery stream

1. Login to your AWS account and navigate to **Amazon Kinesis > Delivery streams > Create delivery stream**.

2. Choose **Direct PUT** as **Source** and **HTTP Endpoint** as **Destination**.

3. Give the delivery stream a name.

4. In the **Destination settings** section, enter the **HTTP endpoint URL** depending on your region.

  | Region | URL |
  |---|---|
  | US-East-1 | listener-aws-metrics-stream-us.logz.io |
  | EU-central-1 | listener-aws-metrics-srteam-eu.logz.io |
  

5. In the **Access key** section, enter your Logz.io metrics shipping token.

6. For **Content encoding**, select **Disabled**.

7. Set the **Retry duration** to 60 seconds.

8. In the **Buffer hints** section, enter 5MB for buffer size, and 60 seconds for buffer interval.

9. If required, in the **Backup settings**, select **Failed data only** and select an S3 bucket you would like to use for backup.

10. Select **Create delivery stream**.


##### Create a CloudWatch metric stream
  
1. Navigate to **CloudWatch > Metric streams > Create a metric stream**.

2. In the **Metrics to be streamed** section, select what namespaces you want to monitor (include/exclude or all namespaces).
  
3. In the **Configuration** section, select an existing Firehose as the configuration option.

4. In the **Select your Kinesis Data** section, select the Kinesis Data Firehose delivery stream created in the previous step.

5. Select **OpenTelemetry 0.7** as the output format.

6. Give your metric stream a name.

7. Select **Create metric stream**.

  
##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
