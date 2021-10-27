---
title: Ship CloudTrail logs
logo:
  logofile: aws-cloudtrail.svg
  orientation: vertical
data-source: CloudTrail
data-for-product-source: Cloud SIEM
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/security-sources/cloudtrail
templates: ["s3-fetcher"]
contributors:
  - idohalevi
  - imnotashrimp
  - shalper
shipping-tags:
  - aws
order: 210
---

{% include log-shipping/s3-bucket.md service="CloudTrail" %}

#### Configuration

**Before you begin**:

* If you plan on using an access key to authenticate your connection, you'll need to set the `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket.

* If you plan on using an IAM role to authenticate your connection, you can get the role policy by filling out the bucket information and clicking the "Get the role policy" button.

* {% include log-shipping/s3-bucket-file-order.md %}

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your CloudTrail logs from an S3 bucket.

For help with setting up a new trail, see [Overview for Creating a Trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) from AWS.


##### Add your S3 bucket information

<!-- logzio-inject:aws:cloudtrail -->

{% include log-shipping/S3-fetcher.html %}

1. Click **+ Add a bucket**
2. Select your preferred method of authentication - an IAM role or access keys.

The configuration wizard will open.

3. Provide the **S3 bucket name**
4. Provide your **Prefix**. That is your CloudTrail path. See further details below.
5. There is no **Region** selection box because it is not needed. Logz.io will pull data from all regions in AWS for the specified bucket and account.
6. **Save** your information.

![S3 bucket configuration wizard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/s3-configuration-wizard-no-region.png)


###### Getting the information from your CloudTrail AWS path

When creating a bucket, you'll only need to fill in 2 parameters which you can get from your CloudTrail AWS path. The AWS path structure for CloudTrail looks like this:

```
{BUCKET_NAME}/{PREFIX_IF_EXISTS}/cloudtrail/AWSLogs/{AWS_ACCOUNT_ID}/CloudTrail/
```

* {BUCKET_NAME} is your **S3 bucket name**.

* {PREFIX} is your CloudTrail path. You may or may not have a prefix.
   If you don't have a prefix, put down:

  ```
  /cloudtrail/AWSLogs/{AWS_ACCOUNT_ID}/CloudTrail/
  ```

  If you do have a prefix, put down:

  ```
  {PREFIX}/cloudtrail/AWSLogs/{AWS_ACCOUNT_ID}/CloudTrail/
  ```


<!-- info-box-start:info -->
Logz.io fetches logs that are generated after configuring an S3 bucket.
Logz.io cannot fetch past logs retroactively.
{:.info-box.important}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
