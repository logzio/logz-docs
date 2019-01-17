---
title: Configure the Amazon S3 fetcher
logo:
  logofile: aws-s3.svg
  orientation: vertical
shipping-summary:
  data-source: Configure S3 fetcher
  hidden: true
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/S3-Bucket
contributors:
  - imnotashrimp
---

## Setup

**You'll need:** `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configuration

{: .tasklist .firstline-headline }
1. Add the S3 bucket information

    <!-- logzio:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

2. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).