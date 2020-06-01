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
  - security
  - aws
---

If you're using AWS WAF as a web application firewall, you can ship its alerts to your Logz.io Cloud SIEM.

You can review the AWS WAF resources in your Logz.io Cloud SIEM account, under the pre-configured [security rules](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC&search=waf) and [dashboards](https://app.logz.io/#/dashboard/security/research/dashboards?) to get you started.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### Step by step
{:.no_toc}


<div class="tasklist">

##### Configure AWS WAF to enrich observability

The first thing you'll need is to add a rule to your AWS WAF to send all HTTP request logs. Otherwise, the logs won't be sent from AWS WAF.

1. In your AWS WAF console, go to your web ACLs screen and choose the relevant region.
2. Select an ACL that you can add your own rules to.
3. In the ACL screen, go to the rules tab and add a rule.
    1. For the **Rule type**, select **Regular Rule**.
    2. Use the **OR** separator.
    3. Next, create a statement with the following fields:
        * **Inspect: HTTP method**
        * **Match type: Starts with string**
        * **String to match: GET OR POST**        
          We recommend monitoring both GET and POST methods. You can add additional statements, separated by OR for every HTTP method you would like to monitor.
    5. For the **Than** operator, use the **Count** action.
    6. Save the rule.
  4. Adjust the rule's hierarchy.

  If you have other rules in your ACL, we recommend that this rule be as high up as possible in the hierarchy. That way it can take the logic of the other rules into consideration as well.
  {:.info-box.tip}

##### Configure AWS WAF to send logs to an S3 Bucket

You'll first need to make sure all your logs are being written to an S3 bucket.

1. In your AWS WAF console, go to your web ACLs screen. Select the web ACL you would like to send logs from.
2. Set the web ACL to send its logs to an S3 bucket.

##### Configure Logz.io to read AWS WAF logs from an S3 Bucket

You'll want to configure the S3 Bucket to allow Logz.io to periodically read log files from the appropriate bucket.

**Before you begin, you'll need**: 

* A user with permissions to list the buckets on the relevant S3 Bucket. 
* Permission to **Get** from all the paths under the bucket name.

[Open the app and follow the wizard to configure Logz.io to read AWS WAF logs from an S3 Bucket](https://app.logz.io/#/dashboard/data-sources/S3-Bucket)

If you run into issues, you can reference the [guide for troubleshooting user permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket).
{:.info-box.tip}
