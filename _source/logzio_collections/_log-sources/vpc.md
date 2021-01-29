---
title: Ship VPC flow logs
logo:
  logofile: aws-vpc.svg
  orientation: vertical
data-source: VPC
templates: ["s3-fetcher"]
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/VPC
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
---

#### Configuration

**Before you begin, you'll need**:

* `s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket

* {% include log-shipping/s3-bucket-file-order.md %}

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your VPC Flow logs from an S3 bucket.
VPC Flow logs are not stored in S3 by default, so you'll need to set up AWS to send your Flow logs to S3.

For help with this, see [Publishing Flow Logs to Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) from AWS.

##### Add your S3 bucket information

<!-- logzio-inject:aws:vpc-flow -->


{% include log-shipping/add-s3-bucket.md shipper="[VPC log shipping page](https://app.logz.io/#/dashboard/data-sources/vpc)" %}



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
