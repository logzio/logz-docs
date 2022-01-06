---
title: Configure an Amazon S3 Bucket
short-description: Logz.io can pull new logs straight from your S3 bucket every few seconds.
logo:
  logofile: aws-s3.svg
  orientation: vertical
data-source: S3 Bucket
data-for-product-source: Logs
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

* **The size of each log file should not exceed 50 MB** \\
  To guarantee successful file upload, make sure that the size of each log file does not exceed 50 MB.

## Setup

You can add your buckets directly from Logz.io by providing your S3 credentials and configuration.

#### Configure Logz.io to fetch logs from an S3 bucket

**Before you begin, you'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

<div class="tasklist">
 


##### Add a new S3 bucket using the dedicated Logz.io configuration wizard

{% include log-shipping/s3-bucket-snippet.html %}


<!-- logzio-inject:aws:s3-buckets -->


{% include log-shipping/add-s3-bucket.md %}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

#### Configure Logz.io to archive logs to an S3 bucket

**Before you begin, you'll need**:
`s3:ListBucket`, `s3:PutObject` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

<div class="tasklist">
 


##### Navigate to the Archive and Restore section

Login to your Logz.io account and go to **Logs > Archive and restore**.
  
##### Enter your bucket information and S3 credentials

1. Enter the name of the S3 bucket into the **S3 bucket name** field.
2. Enter the Amazon Resource Name (ARN) of your IAM role into the **Role ARN** field.
3. Click **Start archiving**.

![Archive and restore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/archive-restore.png)

<!-- info-box-start:info -->
Refer to our [User Guide](https://docs.logz.io/user-guide/archive-and-restore/configure-archiving.html) for more on archiving logs.
{:.info-box.note}
<!-- info-box-end -->
  

</div>
