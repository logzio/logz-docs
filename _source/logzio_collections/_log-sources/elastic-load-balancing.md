---
title: Ship Elastic Load Balancing logs
logo:
  logofile: aws-elb.svg
  orientation: vertical
data-source: Elastic Load Balancing
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/ELB
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
---

## Setup

When you set Logz.io to fetch Elastic Load Balancing logs, Logz.io will periodically read logs from the configured S3 bucket. Elastic Load Balancing logs are useful for application usage intelligence and monitoring.

**You'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://support.logz.io/hc/en-us/articles/209486129-Troubleshooting-AWS-IAM-Configuration-for-retrieving-logs-from-a-S3-Bucket) for the required S3 bucket (one bucket per region)

###### Configuration

1.  Send your logs to an S3 bucket

    Logz.io fetches your Elastic Load Balancing logs from an S3 bucket.

    For help with setting this up, see these docs from AWS:

    * For Application Load Balancer, see [Access Logs for Your Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html).
    * For Network Load Balancer, see [Monitor Your Network Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-monitoring.html).
    * For Classic Load Balancer, see [Enable Access Logs for Your Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html).

2.  Add the S3 bucket information

    {% include log-shipping/in-app-configuration.html toolId="s3-config" %}

    * **S3 bucket**: Name of the bucket
    * **Prefix**: The directory where the logs are stored
    * **S3 access key** and **S3 secret key**: Your S3 bucket credentials
    * **Region**: AWS region of the bucket

    <!-- logzio-inject:s3-config -->

      Logz.io fetches logs that are generated after configuring an S3 bucket.
      Past logs are not sent to Logz.io.
      {:.info-box.important}

3.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}