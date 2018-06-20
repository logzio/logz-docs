---
layout: article
title: Built-in log types
contributors:
  - jschnitzer
  - sboroda
---

The `type` field identifies the data contained in logs. This allows Logz.io to  and provide you with a richer logging experience. For example, if your "type" is apache_access, we will assume that the logs that we receive are Apache access logs, parse them accordingly, and then give you customised GROKing and enrichment out of the box.

This table shows the built-in log types that Logz.io supports. If you don't see your log type here, you can create custom data parsing using the [data parsing wizard](https://app.logz.io/#/dashboard/data-parsing/step1).

| Description           | Type                                       |
|-----------------------|--------------------------------------------|
| Nginx access logs     | `nginx`, `nginx_access`, `nginx-access`    |
| Nginx error logs      | `nginx-error`                              |
| Apache access logs    | `apache`, `apache_access`, `apache-access` |
| Elasticsearch         | `elasticsearch`                            |
| Nagios                | `nagios`                                   |
| HAProxy               | `haproxy`                                  |
| Monit                 | `monit`                                    |
| Mysql                 | `mysql`                                    |
| Mysql Error logs      | `mysql_error`                              |
| Mysql Slow Query logs | `mysql_slow_query`                         |
| Mysql Monitor logs    | `mysql_monitor`                            |
| GPFS                  | `gpfs`                                     |
| MongoDB               | `mongodb`                                  |
| Microsoft IIS         | `iis`                                      |
| AWS CloudFront        | `cloudfront`                               |
| AWS VPCFlow           | `vpcflow`                                  |
| AWS CloudTrail        | `cloudtrail`                               |
| AWS ELB               | `elb`                                      |
| AWS S3 Access         | `S3Access`                                 |
| AWS Route 53          | `route_53`                                 |
| OSSEC                 | `ossec`                                    |
| Jenkins               | `jenkins`                                  |
