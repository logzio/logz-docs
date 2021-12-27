---
title: Ship S3 access logs
logo:
  logofile: aws-s3.svg
  orientation: vertical
short-description: Logz.io connects to your S3 bucket and fetches your access logs.
data-source: S3 access logs
data-for-product-source: Logs
templates: ["s3-fetcher"]
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-access
contributors:
  - idohalevi
  - imnotashrimp
  - shalper
shipping-tags:
  - aws
order: 160
---
Amazon S3 Access Logs provide detailed records about requests that are made to your S3 bucket. This integration allows you to send these logs to your Logz.io account.

#### Configuration

**Before you begin, you'll need**:

* `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

* {% include log-shipping/s3-bucket-file-order.md %}

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your S3 access logs from a separate S3 bucket.
By default, S3 access logs are not enabled, so you'll need to set this up.

For help with this, see [Amazon S3 Server Access Logging](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html) from AWS.


##### Add a new S3 bucket using the dedicated Logz.io configuration wizard

{% include log-shipping/app_login.html %}


<!-- logzio-inject:aws:s3-access -->


{% include log-shipping/add-s3-bucket.md %}


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
