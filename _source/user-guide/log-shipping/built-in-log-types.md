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
  - shalper
---
#### What is parsing 

Logs are typically long, unstructured text documents. 
Parsing is the process that converts unstructured logs into structured, organized, and predictable data. After it's parsed, log data is more easily searched and aggregated in Kibana Discover and dashboards. 

#### How do I enable parsing in Logz.io? 

Logz.io automatically parses logs from most environments. You'll only need to configure the shipper to match one of the log types listed below. 

The parameter `type` in the shipping config file controls parsing. Configure it to match your log source. 
For example, if the shipping config is set to `type: apache_access`, Logz.io automatically parses the logs as Apache access logs.  

#### Which logs does Logz.io automatically parse? 

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



