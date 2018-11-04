---
layout: article
title: Ship CloudFront logs
logo:
  logofile: aws-cloudfront.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon CloudFront
  log-shippers:
    - S3 fetcher
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/CloudFront
contributors:
  - imnotashrimp
---

## Setup

**You'll need:** `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configuration

{: .tasklist .firstline-headline }
1. Send your logs to an S3 bucket

    Logz.io fetches your CloudFront logs from an S3 bucket.
    CloudFront access logs are not enabled by default, so you'll need to set this up.

    For help with this, see [Configuring and Using CloudFront Access Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html) from AWS.

2. Add the S3 bucket information

    <!-- logzio:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

3. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
