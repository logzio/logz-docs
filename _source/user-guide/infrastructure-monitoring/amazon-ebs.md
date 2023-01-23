---
layout: article
title: Amazon EBS
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-ebs.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with Amazon EBS
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics from your Amazon EBS.

| Metric visualization           | Metric name                                   | Description                                                                                                                               |
| ------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Max Read Bytes    | aws\_ebs\_volume\_read\_bytes\_maximum        | Provides information on the read operations in a specified period of time.                                                                |
| Max Write Bytes                | aws\_ebs\_volume\_write\_bytes\_maximum       | Provides information on the write operations in a specified period of time.                                                               |
| Read Ops          | aws\_ebs\_volume\_read\_ops\_average          | The total number of read operations in a specified period of time.                                                                        |
| Write Ops                      | aws\_ebs\_volume\_write\_ops\_average         | The total number of write operations in a specified period of time.                                                                       |
| Total Read Time Per Operation  | aws\_ebs\_volume\_total\_read\_time\_average  | The total number of seconds spent by all read operations that completed in a specified period of time.                                    |
| Total Write Time Per Operation | aws\_ebs\_volume\_total\_write\_time\_average | The total number of seconds spent by all write operations that completed in a specified period of time.                                   |
| Top Queue Lengths | aws\_ebs\_volume\_queue\_length\_average      | The number of read and write operation requests waiting to be completed in a specified period of time.     |
| Bottom Burst Balances          | aws\_ebs\_burst\_balance\_average             | Provides information about the percentage of I/O credits (for gp2) or throughput credits (for st1 and sc1) remaining in the burst bucket. |
| Top Periods Spent Idle         | aws\_ebs\_volume\_idle\_time\_sum             | The total number of seconds in a specified period of time when no read or write operations were submitted.     |
| Top Read Operations            | aws\_ebs\_volume\_read\_ops\_average          | The total number of read operations in a specified period of time.                                                                        |
| Top Write Operations           | aws\_ebs\_volume\_write\_ops\_average         | The total number of write operations in a specified period of time.                                                                       |
| Top Read Bytes                 | aws\_ebs\_volume\_read\_bytes\_average        | Provides information on the top read operations in a specified period of time.                                                            |
| Top Write Bytes                | aws\_ebs\_volume\_read\_bytes\_average        | Provides information on the top write  operations in a specified period of time.                                                          |
| Total Read Time Per Operation  | aws\_ebs\_volume\_total\_read\_time\_average  | The total number of seconds spent by all read operations that completed in a specified period of time.                                    |
| Total Write TimePer Operation  | aws\_ebs\_volume\_total\_write\_time\_average | The total number of seconds spent by all write operations that completed in a specified period of time.                                   |
