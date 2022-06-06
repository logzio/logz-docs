---
title: Ship VPC flow logs
logo:
  logofile: aws-vpc.svg
  orientation: vertical
data-source: VPC
data-for-product-source: Logs
templates: ["s3-fetcher"]
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/vpc
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
order: 580
---
VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. This integration allows you to send these logs to your Logz.io account. 

#### Configuration

**Before you begin, you'll need**:

* `s3:ListBucket` and `s3:GetObject` [permissions](https://docs.logz.io/user-guide/give-aws-access-with-iam-roles/) for the required S3 bucket

* {% include log-shipping/s3-bucket-file-order.md %}

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your VPC Flow logs from an S3 bucket.
VPC Flow logs are not stored in S3 by default, so you'll need to set up AWS to send your Flow logs to S3.

For help with this, see [Publishing Flow Logs to Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) from AWS.

##### Add a new S3 bucket using the dedicated Logz.io configuration wizard

Log into the app to use the dedicated Logz.io [configuration wizard](https://app.logz.io/#/dashboard/send-your-data/log-sources/vpc) and add a new S3 bucket.


<!-- logzio-inject:aws:vpc-flow -->


{% include log-shipping/add-s3-bucket.md %}



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
