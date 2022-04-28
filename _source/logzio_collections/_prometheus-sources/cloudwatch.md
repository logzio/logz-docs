---
title: Send Amazon CloudWatch metrics
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - aws
order: 800
---

## Overview

Deploy this integration to send metrics from your CloudWatch namespace to Logz.io.

This integration creates a Kinesis Data Firehose delivery stream that links to your CloudWatch namespace and then sends the metrics to your Logz.io account.

#### Setup

**Before you begin, you'll need**:

* A CloudWatch namespace
* An active account with Logz.io

<div class="tasklist">

##### Create a Kinesis Data Firehose delivery stream

1. Login to your AWS account and navigate to **Amazon Kinesis > Delivery streams > Create delivery stream**.

2. Choose **Direct PUT** as **Source** and **HTTP Endpoint** as **Destination**.

3. Give the delivery stream a name.

4. In the **Destination settings** section, enter the **HTTP endpoint URL** for the CloudWatch namespace that you need to collect metrics from.

5. In the **Access key** section, enter your Logz.io metrics shipping token.

6. For **Content encoding**, select **GZIP**.

7. Set the **Retry duration** to 60 seconds.

8. In the **Parameters** section, select **Add parameter**.

9. Add the following two parameters:

   | Key | Value |
   |---|---|
   | LISTENER_URL | <<LISTENER-HOST>>:8053 |
   | LOGZIO_TOKEN | Your Logz.io metrics shipping token:`<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>` |

10. In the **Buffer hints** section, enter 4MB for buffer size, and 60 seconds for buffer interval.

11. If required, in the **Backup settings**, select **Failed data only** and select an S3 bucket you would like to use for backup.

12. Select **Create delivery stream**.


##### Create a CloudWatch metric stream

1. In the **Configuration** section, select an existing Firehose as the configuration option.

2. In the **Select your Kinesis Data** section, select the Kinesis Data Firehose delivery stream created in the previous step.

3. Select **OpenTelemetry 0.7** as the output format.

4. Give your metric stream a name.

5. Select **Create metric stream**.

  
##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
