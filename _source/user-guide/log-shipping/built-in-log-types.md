---
layout: article
title: Parsing logs  
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
### Parsing explained   

Logs - of any kind - are typically long, unstructured text documents. In this native format, they are almost impossible to query, aggregate, visualize and interpret. 

Logz.io can automatically parse your logs to break down 'messy' log documents into neat, structured, organized, and predictable fields. 

After log data is parsed, you'll be able to investigate it and visualize it in Kibana systematically, and develop methods for attacking the logging madness (to paraphrase on a well-known cliche' ;)).


of Logz.io - built on a host of open-source technologies  They are a tangled "haystack".  
Parsing is the process that converts them into 
Parsing is the process of breaking down your log message into smaller chunks of data,
placing each chunk into its own specific named field,
and enriching data with additional information such as geolocation.
Parsed logs can be more easily analyzed than raw data,
allowing you to create rich visualizations and helpful alerts.


Logz.io parses (almost all) most data sources After it's parsed, log data is more easily searched and aggregated in Kibana Discover and more readily visualized in dashboards. 


### How do I know if my logs are parsed? 

There are 2 things to check:
1. Open the app on [Kibana Discover](https://app.logz.io/#/dashboard/kibana/discover?), and look at the left column - This holds the index and the fields used in the mapping. It shows the results of the parsing. 

Look for the field `type` and click on it. The field will open and show the top 5 values for the selected indexes. If they match the types in the table below, this means they are automatically parsed. 

2. Open the app on [Kibana Discover](https://app.logz.io/#/dashboard/kibana/discover?), 
    and open a log document. It doesn't matter which one you select. 

    If the log has many fields, with a reasonable structure, than it is parsed. If you'd like to improve the mapping, or add granularity, see the 


### How do I get Logz.io to automatically parse my logs?  

Logz.io automatically parses logs from most environments. To let Logz.io "do its magic", you'll only need to configure the shipper to match one of the log types listed below. 

The details are explained in Logz.io's shipping instructions. The relevant parameter in the shipping config file is called `type`. It controls log parsing and is used by Logz.io to automatically apply standard mappings that match the environment sending the logs. If you configure the parameter `type=<<standard-log-type>>` in your shipper to match your log source - parsing should happen automatically.  

For example, if the shipping config is set to `type: apache_access`, Logz.io automatically parses the logs as Apache access logs. 

### Which log types does Logz.io automatically parse? 

Logz.io automatically parses logs of the following types:

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


If your log source doesn't appear in this list, contact support@logz.io.com for assistance.  
