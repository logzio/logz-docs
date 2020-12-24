---
title: Ship CloudFront logs
logo:
  logofile: aws-cloudfront.svg
  orientation: vertical
data-source: CloudFront
templates: ["s3-fetcher"]
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/CloudFront
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
---

When you set Logz.io to fetch CloudFront logs, Logz.io will periodically read logs from the configured S3 bucket.
CloudFront logs are useful for auditing/security monitoring and business intelligence.

{% include log-shipping/s3-bucket.md service="CloudFront" %}

#### Configuration

**Before you begin, you'll need**:

* `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

* {% include log-shipping/s3-bucket-file-order.html %}

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your CloudFront logs from an S3 bucket.
CloudFront access logs are not enabled by default, so you'll need to set this up.

For help with this, see [Configuring and Using CloudFront Access Logs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html) from AWS.

##### Add the S3 bucket information

{% include log-shipping/in-app-configuration.html toolId="s3-config" %}

<!-- logzio-inject:s3-config -->

Logz.io fetches logs that are generated after configuring an S3 bucket.
Logz.io cannot fetch past logs retroactively.
{:.info-box.important}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
