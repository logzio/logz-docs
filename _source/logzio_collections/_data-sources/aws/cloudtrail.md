---
title: Ship CloudTrail logs
logo:
  logofile: aws-cloudtrail.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon CloudTrail
  log-shippers:
    - S3 fetcher
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/CloudTrail
contributors:
  - idohalevi
  - imnotashrimp
---

## Setup

**You'll need:** `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configuration

{: .tasklist .firstline-headline }
1. Send your logs to an S3 bucket

    Logz.io fetches your CloudTrail logs from an S3 bucket.

    For help with setting up a new trail, see [Overview for Creating a Trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) from AWS.

2. Add the S3 bucket information

    <!-- logzio:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

3. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
