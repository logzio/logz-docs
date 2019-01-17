---
title: Ship VPC flow logs
logo:
  logofile: aws-vpc.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon VPC
  log-shippers:
    - Logz.io S3 Fetcher
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/VPC
contributors:
  - idohalevi
  - imnotashrimp
---

## Setup

**You'll need:** `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configuration

{: .tasklist .firstline-headline }
1. Send your logs to an S3 bucket

    Logz.io fetches your VPC Flow logs from an S3 bucket.
    VPC Flow logs are not stored in S3 by default, so you'll need to set up AWS to send your Flow logs to S3.

    For help with this, see [Publishing Flow Logs to Amazon S3
](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) from AWS.

2. Add the S3 bucket information

    <!-- logzio:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

3. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).