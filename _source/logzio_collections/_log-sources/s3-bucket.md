---
title: Configure an Amazon S3 Bucket
short-description: Logz.io can pull new logs straight from your S3 bucket every few seconds.
logo:
  logofile: aws-s3.svg
  orientation: vertical
data-source: S3 Bucket
shipping-tags:
  - aws
  - popular
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket
contributors:
  - imnotashrimp
order: 20
---

Some AWS services can be configured to ship their logs to an S3 bucket,
where Logz.io can fetch those logs directly.

## Best practices

The S3 API does not allow retrieval of object timestamps, so Logz.io must collect logs in alphabetical order.
Please keep these notes in mind when configuring logging.

* **Make the prefix as specific as possible** \\
  The prefix is the part of your log path that remains constant across all logs.
  This can include folder structure and the beginning of the filename.

* **The log path after the prefix must come in alphabetical order** \\
  We recommend starting the object name (after the prefix) with the Unix epoch time.
  The Unix epoch time is always increasing, ensuring we can always fetch your incoming logs.

## Setup

You can add your buckets directly from Logz.io by providing your S3 credentials and configuration.

#### Configure Logz.io to fetch logs from an S3 bucket

**Before you begin, you'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

<div class="tasklist">




##### Add a new S3 bucket using the dedicated Logz.io configuration wizard

Log into the app to use the dedicated Logz.io [configuration wizard](https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket) and add a new S3 bucket.


<!-- logzio-inject:aws:s3-buckets -->


{% include log-shipping/add-s3-bucket.md %}

<!--updated image in include 25-5-2021 -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
