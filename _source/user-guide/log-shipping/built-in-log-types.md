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

To configure the shipper to enable out-of-the-box parsing, set the `type` parameter in the shipping config to match the log source. 
For example, if the shipping config is set to `type: apache_access`, Logz.io automatically parses the logs as Apache access logs.  

Following is the list of log types that Logz.io will automatically parse:

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

Custom parsing is available when needed.
You've got several options:

* Build on automatic parsing
  You can further refine fields using the [data parsing wizard]({{site.baseurl}}/user-guide/mapping-and-parsing/data-parsing-wizard.html). 
  
  This is great when you want to further customize your data mappings, break up fields and GROK particulars out of longer strings. For example, extract the number from HTTP responses (200, 201, 404) so you can easily visualize and aggregate them. 

* Create a custom parsing de novo 

  If you're shipping custom application logs, or any other logs that don't match the above types, custom parsing is your best option. 
  
  You can always try one of the types listed above to check if there's a partial match. The [data parsing wizard]({{site.baseurl}}/user-guide/mapping-and-parsing/data-parsing-wizard.html).

* Parsing-as-a-Service is also offered. Reach out to support to learn more.  