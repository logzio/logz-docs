---
layout: article
title: Built-in log types
permalink: /user-guide/log-shipping/built-in-log-types.html
tags:
  - log-shipping
  - log-types
contributors:
  - schwin007
  - imnotashrimp
  - shalper
  - boofinka
---

Logz.io automatically parses logs shipped from many platforms, services, containers, servers, and more.

In Kibana, you'll notice a field named `type`. This log type is a parameter in the shipping configuration that determines which pre-built pipeline is used to parse the data.

This table shows the built-in log types that Logz.io supports out-of-the-box. If you don't see your log type here, contact support to request a new pipeline. Parsing-as-a-service is included in your package and we're happy to offer it.



| Description           | Type                                       |
|-----------------------|--------------------------------------------|
| Apache access         | `apache`, `apache_access`, `apache-access` |
| Auditd                | `auditd`                                   |
| AWS CloudFront        | `cloudfront`                               |
| AWS CloudTrail        | `cloudtrail`                               |
| AWS ELB               | `elb`                                      |
| AWS Fargate           | `fargate`                                  |
| AWS GuardDuty             | `guardduty`                                |
| AWS VPCFlow           | `vpcflow`                                  |
| AWS Route 53          | `route_53`                                 |
| AWS S3 access         | `S3Access`                                 |
| AWS WAF         | `awswaf`                                 |
| Checkpoint            | `checkpoint`                               |
| Cisco ASA             | `cisco-asa`                                |
| Cisco Meraki          | `cisco-meraki`                             |
| Docker                | `docker_logs`                              |
| Docker Collector Logs | `docker-collector-logs`                    |
| Elasticsearch         | `elasticsearch`                            |
| Fail2ban              | `fail2ban`                                 |
| Falco                 | `falco`                                    |
| Fortigate             | `fortigate`                               |
| GPFS                  | `gpfs`                                     |
| HAProxy Load Balancer              | `haproxy`                                  |
| Jenkins               | `jenkins`                                  |
| Juniper                  | `juniper`                             |
| Kafka                 | `kafka_server`                             |
| Mcafee EPO            | `mcafee_epo`                                      |
| Microsoft IIS         | `iis`                                      |
| MongoDB               | `mongodb`                                  |
| Monit                 | `monit`                                    |
| MySQL                 | `mysql`                                    |
| MySQL error           | `mysql_error`                              |
| MySQL monitor         | `mysql_monitor`                            |
| MySQL slow query      | `mysql_slow_query`                         |
| Nagios                | `nagios`                                   |
| NGINX access          | `nginx`, `nginx_access`, `nginx-access`    |
| NGINX error           | `nginx-error`                              |
| OSSEC                 | `ossec`                                    |
| Palo Alto Networks    | `paloalto`                                  |
| Performance-tab       | `performance-tab`                                  |
| Sonicwall                | `sonicwall`                                  |
| VPC Flow           | `vpcflow`                             |
| Windows WinEventLog          | `wineventlog`                             |
| Zeek           | `zeek`                              |
| Zipkin span           | `zipkinSpan`                             |

