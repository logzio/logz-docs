---
layout: article
title: Built-in log types
contributors:
  - schwin007
  - imnotashrimp
---

The `type` field identifies your log type. Logz.io parses logs based on `type`. For example, if a log type is `apache_access`, Logz.io automatically parses these logs as Apache access logs.

This table shows the built-in log types that Logz.io supports. If you don't see your log type here, you can create custom data parsing using the [data parsing wizard]({{site.baseurl}}/user-guide/mapping-and-parsing/data-parsing-wizard.html).

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
| Microsoft IIS         | `iis`                                      |
| MongoDB               | `mongodb`                                  |
| Monit                 | `monit`                                    |
| Mysql                 | `mysql`                                    |
| Mysql error           | `mysql_error`                              |
| Mysql slow query      | `mysql_slow_query`                         |
| Mysql monitor         | `mysql_monitor`                            |
| Nagios                | `nagios`                                   |
| Nginx access          | `nginx`, `nginx_access`, `nginx-access`    |
| Nginx error           | `nginx-error`                              |
| OSSEC                 | `ossec`                                    |
