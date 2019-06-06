---
title: Configure the Amazon S3 fetcher
logo:
  logofile: aws-s3.svg
  orientation: vertical
shipping-summary:
  data-source: S3 fetcher
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/S3-Bucket
contributors:
  - imnotashrimp
---

Some AWS services can be configured to ship their logs to an S3 bucket,
where Logz.io can fetch those logs.

You can add your buckets in Logz.io by providing your S3 credentials and configuration.

### Best practices

The S3 API does not allow retrieval of object timestamps, so Logz.io must collect logs in alphabetical order.
Please keep these notes in mind when configuring logging.

* **Make the prefix as specific as possible** \\
  The prefix is the part of your log path that remains constant across all logs.
  This can include folder structure and the beginning of the filename.

* **The log path after the prefix must come in alphabetical order** \\
  We recommend starting the object name (after the prefix) with the Unix epoch time.
  The Unix epoch time is always increasing, ensuring we can always fetch your incoming logs.

## Setup

**You'll need**: `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

###### Configure Logz.io to fetch logs from an S3 bucket

{: .tasklist .firstline-headline }
1. Add the S3 bucket information

    <!-- logzio-inject:s3-config -->

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

2. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
