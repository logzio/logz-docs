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
order: 1300

---

Ship alerts from VMware Carbon Black to your Logz.io Cloud SIEM.

#### Configuration
#### NEW BUTTON
789

<!-- logzio-inject:install:grafana:dashboards ids=['7GOPHucWSajA5pptILGV8G'] -->


<div class="tasklist">

##### Configure VMware Carbon Black to send logs to an S3 Bucket

Follow the [guidelines provided by VMware Carbon Black](https://developer.carbonblack.com/reference/carbon-black-cloud/platform/integrations/) to forward logs to an S3 bucket.

##### Configure Logz.io to read VMware Carbon Black logs from an S3 Bucket

**Required permissions**:

* A user with permissions to list the buckets on the relevant S3 Bucket.
* Permission to **Get** from all the paths under the bucket name.
* If you run into issues, please reference our guide for [troubleshooting S3 user permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket).


<!-- logzio-inject:aws:s3-buckets -->


{% include general-shipping/forward-logs-s3-bucket.html %}



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) and search for `type: carbon_black`.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

