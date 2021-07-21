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
  - nshishkin
---

Logz.io automatically parses logs shipped from many platforms, services, containers, servers, and more.

The shipping configuration includes a log **type** parameter that determines which pipeline is used to parse the data. In Kibana, it is indicated by a field named `type`.

Logz.io offers many pre-built parsing pipelines for a large number of log sources, as shown below. If you need a new pipeline created or want a customized version of an existing pipeline, contact Logz.io Support. Parsing-as-a-service is included in your package and we're happy to offer it.

## Built-in log types

This table shows the log types that Logz.io parses automatically.

| Description           | Type                                       | Prebuilt parsing pipeline unless marked |
|-----------------------|--------------------------------------------|
| Alcide kAudit         | `alcide-kaudit` | &#9746; Auto-parsed as part of platform integration. |
| Apache access         | `apache`, `apache_access`, `apache-access` | :*:\check:: |
| Auditd                | `auditd`                                   | Prebuilt |
| AWS CloudFront        | `cloudfront`                               | Prebuilt |
| AWS CloudTrail        | `cloudtrail`                               | Prebuilt |
| AWS ELB               | `elb`                                      | Prebuilt |
| AWS Fargate           | `fargate`                                  | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| AWS GuardDuty             | `guardduty`                                | Prebuilt |
| AWS Route 53          | `route_53`                                 | Prebuilt |
| AWS S3 access         | `S3Access`                                 | Prebuilt |
| AWS VPC Flow           | `vpcflow`                                  | Prebuilt |
| AWS WAF         | `awswaf`                                 | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| Checkpoint            | `checkpoint`                               | Prebuilt |
| Cisco ASA             | `cisco-asa`                                | Prebuilt |
| Cisco Meraki          | `cisco-meraki`                             | Prebuilt |
| Crowdstrike           | `crowdstrike`                              | Prebuilt |
| Docker                | `docker_logs`                              | Prebuilt |
| Docker Collector Logs | `docker-collector-logs`                    | Prebuilt |
| Elasticsearch         | `elasticsearch`                            | Prebuilt |
| Fail2ban              | `fail2ban`                                 | Prebuilt |
| Falco                 | `falco`                                    | Prebuilt |
| Fargate                 | `fargate`                                | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| Fortigate             | `fortigate`                               | Prebuilt |
| GitHub                  | `github`                                     | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| GPFS                  | `gpfs`                                     | Prebuilt |
| HAProxy Load Balancer              | `haproxy`                                  | Prebuilt |
| Jenkins               | `jenkins`                                  | Prebuilt |
| Juniper                  | `juniper`                             | Prebuilt |
| Kafka                 | `kafka_server`                             | Prebuilt |
| Kubernetes                 | `k8s`                             | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| Mcafee EPO            | `mcafee_epo`                                      | Prebuilt |
| Microsoft IIS         | `iis`                                      | Prebuilt |
| ModSecurity               | `modsecurity`                                  | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| MongoDB               | `mongodb`                                  | Prebuilt |
| Monit                 | `monit`                                    | Prebuilt |
| MySQL                 | `mysql`                                    | Prebuilt |
| MySQL error           | `mysql_error`                              | Prebuilt |
| MySQL monitor         | `mysql_monitor`                            | Prebuilt |
| MySQL slow query      | `mysql_slow_query`                         | Prebuilt |
| Nagios                | `nagios`                                   | Prebuilt |
| NGINX access          | `nginx`, `nginx_access`, `nginx-access`    | Prebuilt |
| NGINX error           | `nginx-error`                              | Prebuilt |
| OpenVAS                 | `openvas`                                    | Prebuilt |
| OSSEC                 | `ossec`                                    | Prebuilt |
| Trend Micro                 | `trendmicro_deep`                    | Prebuilt |
| Palo Alto Networks    | `paloalto`                                  | Prebuilt |
| Performance-tab       | `performance-tab`                                  | Prebuilt |
| Sonicwall                | `sonicwall`                                  | Prebuilt |
| Sophos Intercept X       | `sophos-ep`                                  | No prebuilt pipeline. Auto-parsed as part of platform integration. |
| Stormshield                | `stormshield`                              | Prebuilt |
| Sysmon                | `wineventlog`                              | Prebuilt |
| Windows WinEventLog          | `wineventlog`                             | Prebuilt |
| Zeek           | `zeek`                              | Prebuilt |
| Zipkin span           | `zipkinSpan`                             | Prebuilt |
