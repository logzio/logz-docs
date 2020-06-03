---
title: Ship CloudTrail logs
logo:
  logofile: aws-cloudtrail.svg
  orientation: vertical
data-source: CloudTrail
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/CloudTrail
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
  - security
---

{% include log-shipping/s3-bucket.html service="CloudTrail" %}

#### Configuration

**Before you begin, you'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your CloudTrail logs from an S3 bucket.

For help with setting up a new trail, see [Overview for Creating a Trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) from AWS.

##### Add the S3 bucket information

{% include log-shipping/in-app-configuration.html toolId="s3-config" %}

<!-- logzio-inject:s3-config -->

When creating a bucket, you'll only need to fill in 2 parameters which you can get from your CloudTrail AWS path. The AWS path structure for cloudtrail looks like this:

{BUCKET_NAME}/{PREFIX}/AWSLogs/{AWS_ACCOUNT_ID}/elasticloadbalancing/{REGION}/

* {BUCKET_NAME} is your **S3 bucket name**
* {PREFIX} is your **Prefix**. If you don't have a prefix, leave it blank.

Logz.io fetches logs that are generated after configuring an S3 bucket.
Past logs are not sent to Logz.io.
{:.info-box.important}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>