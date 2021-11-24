---
layout: article
title: Amazon DynamoDV
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-dynamodb.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon DynamoDB

This dashboard provides an interface to view and analyze metrics from your Amazon DynamoDB.

| Metric visualization                                | Metric name                                                                | Description                                                                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Successful Request Latency Per Table | aws\_dynamodb\_successful\_request\_latency\_average                       | 

The successful requests to DynamoDB or Amazon DynamoDB Streams during the specified time period.                                       |
| Throttled Requests Per Table                        | aws\_dynamodb\_throttled\_requests\_average                                | Average of requests to DynamoDB that exceed the provisioned throughput limits on a resource (such as a table or an index).                   |
| Successful Request Latency By Table | aws\_dynamodb\_successful\_request\_latency\_average                       | The successful requests to DynamoDB or Amazon DynamoDB Streams during the specified time period.                                             |
| User Errors                                         | aws\_dynamodb\_user\_errors\_sum                                           | 

Requests to DynamoDB or Amazon DynamoDB Streams that generate an HTTP 400 status code during the specified time period.                |
| System Errors                        | aws\_dynamodb\_system\_errors\_sum                                         | The requests to DynamoDB or Amazon DynamoDB Streams that generate an HTTP 500 status code during the specified time period.                  |
| Successful Request Latency By Operation             | aws\_dynamodb\_successful\_request\_latency\_average                       | Average of successful requests to DynamoDB or Amazon DynamoDB Streams during the specified time period.                                      |
| Consumed Read Capacity  | aws\_dynamodb\_consumed\_read\_capacity\_units\_average                    | The number of read capacity units consumed over the specified time period, so you can track how much of your provisioned throughput is used. |
| Provisioned Read Capacity                           | aws\_dynamodb\_provisioned\_read\_capacity\_units\_average                 | The number of provisioned read capacity units for a table or a global secondary index.      |
| Account Provisioned Read Capacity Utilization| aws\_dynamodb\_account\_provisioned\_read\_capacity\_utilization\_average  | The percentage of provisioned read capacity units utilized by an account.       |
| Account Provisioned Write Capacity Utilization      | aws\_dynamodb\_account\_provisioned\_write\_capacity\_utilization\_average | The percentage of provisioned write capacity units utilized by an account.   |