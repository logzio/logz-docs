---
title: Ship AWS WAF logs
logo:
  logofile: AWS-WAF.svg
  orientation: vertical
data-source: AWS WAF
contributors:
  - shalper
shipping-tags:
  - security
---

If you're using AWS WAF as a web application firewall you can ship its alerts to Logz.io to integrate it with your Cloud SIEM.

You can review the AWS WAF resources in your Logz.io Cloud SIEM account, under the pre-configured [security rules](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC&search=falco) and [dashboards](https://app.logz.io/#/dashboard/security/research/dashboards?) to get you started.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### Step by step
{:.no_toc}

**Before you begin, you'll need**:

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
      * **String to match: GET**
    4. You can add additional statements, separated by OR for every HTTP method you would like to monitor. We recommend using at least  GET and POST. 
    5. For the **Than** operator, use the **Count** action.
    6. Save the rule.

If this is not the only rule in your ACL, we recommend that you make this rule as high up as possible in the hierarchy, so that it takes into consideration the logic of the other rules.

##### Ship 

In your AWS WAF console, go to your web ACLs screen and choose the web ACL you would like to be sending logs from.

set the web ACL to send its logs to an s3 bucket.

Configuring S3 Bucket will allow Logz.io to periodically read log files from the appropriate bucket. First you would need to make sure all your log files are being written to S3.

Requirements:

A user with permissions to List the buckets on the relevant S3 Bucket and permission to Get from all the paths under that bucket name. Click here for a guide to troubleshoot user permissions.

Configure bucket read:
