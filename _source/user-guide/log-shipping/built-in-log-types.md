---
layout: article
title: Default parsing
permalink: /user-guide/log-shipping/built-in-log-types.html
tags:
  - log-shipping
  - log-types
  - parsing
contributors:
  - shalper
  - schwin007
  - imnotashrimp
---

Logz.io automatically parses logs shipped from many platforms, services, containers, servers, and more.

The shipping configuration includes a log **type** parameter that determines which pipeline is used to parse the data. In Kibana, it is indicated by a field named `type`.

Logz.io offers many pre-built parsing pipelines for a large number of log sources, as shown below. If you need a new pipeline created or want a customized version of an existing pipeline, contact Logz.io Support. Parsing-as-a-service is included in your package and we're happy to offer it.

## Built-in log types

This table shows the log types that Logz.io parses automatically using pre-built pipelines.

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
| OpenVAS                 | `openvas`                                    |
| OSSEC                 | `ossec`                                    |
| Zipkin span           | `zipkinSpan`                               |
| Palo Alto Networks    | `paloalto`                                  |
| Performance-tab       | `performance-tab`                                  |
| Sonicwall                | `sonicwall`                                  |
| VPC Flow           | `vpcflow`                             |
| Windows WinEventLog          | `wineventlog`                             |
| Zeek           | `zeek`                              |
| Zipkin span           | `zipkinSpan`                             |
