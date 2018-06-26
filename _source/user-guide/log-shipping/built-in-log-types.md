---
layout: article
title: Built-in log types
contributors:
  - jschnitzer
  - sboroda
---

The `type` field identifies the data contained in logs. Logz.io uses this field to figure out data parsing. For example, if a log type is `apache_access`, Logz.io automatically parses these logs as Apache access logs.

This table shows the built-in log types that Logz.io supports. If you don't see your log type here, you can create custom data parsing using the [data parsing wizard](https://app.logz.io/#/dashboard/data-parsing/step1).

| Description           | Type                                       |
|-----------------------|--------------------------------------------|
| Apache access logs    | `apache`, `apache_access`, `apache-access` |
| AWS CloudFront        | `cloudfront`                               |
| AWS CloudTrail        | `cloudtrail`                               |
| AWS ELB               | `elb`                                      |
| AWS VPCFlow           | `vpcflow`                                  |
| AWS Route 53          | `route_53`                                 |
| AWS S3 Access         | `S3Access`                                 |
| Elasticsearch         | `elasticsearch`                            |
| GPFS                  | `gpfs`                                     |
| HAProxy               | `haproxy`                                  |
| Jenkins               | `jenkins`                                  |
| Microsoft IIS         | `iis`                                      |
| MongoDB               | `mongodb`                                  |
| Monit                 | `monit`                                    |
| Mysql                 | `mysql`                                    |
| Mysql Error logs      | `mysql_error`                              |
| Mysql Slow Query logs | `mysql_slow_query`                         |
| Mysql Monitor logs    | `mysql_monitor`                            |
| Nagios                | `nagios`                                   |
| Nginx access logs     | `nginx`, `nginx_access`, `nginx-access`    |
| Nginx error logs      | `nginx-error`                              |
| OSSEC                 | `ossec`                                    |
