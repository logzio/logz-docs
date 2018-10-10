---
layout: article
title: Ship VPC Flow logs
logo:
  logofile: aws-vpc.svg
  orientation: vertical
shipping-summary:
  data-source: VPC Flow logs
  log-shippers:
    - Logz.io S3 Fetcher
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/VPC
contributors:
  - imnotashrimp
---

## Setup

**You'll need:** `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configuration

{: .tasklist }
1. <span class="firstline">Send your logs to an S3 bucket</span>

    Logz.io fetches your VPC Flow logs from an S3 bucket.
    VPC Flow logs are not stored in S3 by default, so you'll need to set up AWS to send your Flow logs to S3.

    For help with this, see [Publishing Flow Logs to Amazon S3
](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) from AWS.

2. <span class="firstline">Add the S3 bucket information</span>

    <!-- logzio:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" -%}
