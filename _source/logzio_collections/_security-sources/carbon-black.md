---
title: Ship VMware Carbon Black logs
logo:
  logofile: carbon-black.jpeg
  orientation: vertical
data-source: VMware Carbon Black
contributors:
  - shalper
shipping-tags:
  - web-firewalls
---

Ship alerts from VMware Carbon Black to your Logz.io Cloud SIEM.

#### Configuration


<div class="tasklist">

##### Configure VMware Carbon Black to send logs to an S3 Bucket

Follow the [guidelines provided by VMware Carbon Black](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/integrations/) to forward logs to an S3 bucket.

##### Configure Logz.io to read VMware Carbon Black logs from the S3 Bucket


<!-- logzio-inject:aws:s3-buckets -->


In your Logz.io account, use the [Logz.io S3 Bucket wizard]((https://app.logz.io/#/dashboard/data-sources/S3-Bucket)) to configure Logz.io to read AWS WAF logs from the S3 Bucket.


**Before you begin, you'll need**:

* A user with permissions to list the buckets on the relevant S3 Bucket.
* Permission to **Get** from all the paths under the bucket name.


<!-- info-box-start:info -->
If you run into issues, you can reference the [guide for troubleshooting S3 user permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket).
{:.info-box.tip}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) and search for `type: carbon_black`.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

