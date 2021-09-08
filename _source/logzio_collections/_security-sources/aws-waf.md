---
title: Ship AWS WAF logs
logo:
  logofile: AWS-WAF.svg
  orientation: vertical
data-source: AWS WAF
templates: ["no-template"]
contributors:
  - shalper
shipping-tags:
  - aws
  - web-firewalls
order: 360
---

If you're using AWS WAF as a web application firewall, you can ship its alerts to your Logz.io Cloud SIEM.

#### Configuration


<div class="tasklist">

##### Configure AWS WAF to enrich observability

Add an ACL rule to your AWS WAF to log all HTTP requests. In your **AWS WAF admin console**:

1. Go to your web **ACLs** screen and select the relevant **Region**.
2. Select an **ACL** and go to the **Rules** tab.
3. Add a new rule. Make the following selections:
    1. **Rule type**: Select **Regular Rule**.
    2. Use the **OR** separator.
    3. Create a statement with the following fields:
        * **Inspect: HTTP method**
        * **Match type: Starts with string**
        * **String to match: GET**
    4. Add additional statements, separated by **OR** for every HTTP method you would like to monitor. At the very least, we recommend monitoring **GET** and **POST** methods.
    5. **Then**: Select the **Count** action.
4. Save the rule.
5. Adjust the rule's hierarchy, if relevant.

    If there are several ACL rules, we recommend that the rule created for Logz.io be as high in the hierarchy as possible.


##### Configure AWS WAF to send logs to an S3 Bucket

You'll first need to make sure all your logs are being written to an S3 bucket.

1. In your AWS WAF console, go to your web ACL screen. Select the web ACL you would like to send logs from.
2. Set the web ACL to forward the logs to an S3 bucket.

##### Configure Logz.io to read AWS WAF logs from an S3 Bucket

**Before you begin, you'll need**:

* A user with permissions to list the buckets on the relevant S3 Bucket.
* Permission to **Get** from all the paths under the bucket name.

1. In your Logz.io account, use the [Logz.io S3 Bucket wizard](https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket) to configure Logz.io to read AWS WAF logs from the S3 Bucket.

2. In the log type section menu of Logz.io configuration wizard, select `other` and type in `awswaf`. The log type section menu is located beside the hosting region selection menu.

<!-- info-box-start:info -->
If you run into issues, you can reference the [guide for troubleshooting user permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket).
{:.info-box.tip}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) and search for `type: awswaf`.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

