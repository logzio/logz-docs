---
layout: article
title: Automatic parsing 
permalink: /user-guide/log-shipping/built-in-log-types.html
tags:
  - log-shipping
  - log-types
  - built-in log types 
  - parsing 
  - auto-parsing 
  - parsing service
  - custom parsing 
contributors:
  - schwin007
  - imnotashrimp
---

Logz.io can automatically parse your logs from most environments. 

How? You'll need to configure the shipper to match one of the log types listed below. 

Set the `type` parameter in the shipping config to match the log source. For example, if the shipping config is set to `type: apache_access`, Logz.io automatically parses the logs as Apache access logs.  

Here's the list of log types that Logz.io automatically parses:

| Description           | Type                                       |
|-----------------------|--------------------------------------------|
| Apache access         | `apache`, `apache_access`, `apache-access` |
| AWS CloudFront        | `cloudfront`                               |
| AWS CloudTrail        | `cloudtrail`                               |
| AWS ELB               | `elb`                                      |
| AWS VPCFlow           | `vpcflow`                                  |
| AWS Route 53          | `route_53`                                 |
| AWS S3 access         | `S3Access`                                 |
| Elasticsearch         | `elasticsearch`                            |
| GPFS                  | `gpfs`                                     |
| HAProxy               | `haproxy`                                  |
| Jenkins               | `jenkins`                                  |
| Kafka                 | `kafka_server`                             |
| Microsoft IIS         | `iis`                                      |
| MongoDB               | `mongodb`                                  |
| Monit                 | `monit`                                    |
| MySQL                 | `mysql`                                    |
| MySQL error           | `mysql_error`                              |
| MySQL slow query      | `mysql_slow_query`                         |
| MySQL monitor         | `mysql_monitor`                            |
| Nagios                | `nagios`                                   |
| nginx access          | `nginx`, `nginx_access`, `nginx-access`    |
| nginx error           | `nginx-error`                              |
| OSSEC                 | `ossec`                                    |
| Zipkin span           | `zipkinSpan`                               |



#### Custom parsing

When out-of-the-box parsing is not enough, you'll need custom parsing solutions. See the [_data parsing wizard_]({{site.baseurl}}/user-guide/mapping-and-parsing/data-parsing-wizard.html).