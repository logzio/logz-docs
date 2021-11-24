---
layout: article
title: Amazon Kinesis 
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-kinesis.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon Kinesis 

This dashboard provides an interface to view and analyze metrics from your Amazon Kinesis.

| Metric visualization                    | Metric name                                                                                | Description                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Avg Incoming Bytes    | aws\_kinesis\_incoming\_bytes\_sum                                                         | The number of bytes ingested successfully into the delivery stream over the specified time period after throttling. |
| Avg Put Latency                         | aws\_kinesis\_put\_record\_latency\_average                                                | The time taken per PutRecord operation, measured over the specified time period.       |
| Avg Get Latency                         | aws\_kinesis\_get\_records\_latency\_average                                               | The time taken per GetRecord operation, measured over the specified time period.        |
| Avg Iterator Age                        | aws\_kinesis\_get\_records\_iterator\_age\_milliseconds\_average                           | Difference between the age of the last record consumed and the latest record put to the stream.                                 |
| Put Requests     |
| Incoming Records                        | aws\_kinesis\_incoming\_records\_sum                                                       | The number of records ingested successfully into the delivery stream over the specified time period after throttling. |
| Incoming Bytes                          | aws\_kinesis\_incoming\_bytes\_sum                                                         | The number of bytes ingested successfully into the delivery stream over the specified time period after throttling.  |
| Throttled PutRecords/PutRecord Requests | aws\_kinesis\_write\_provisioned\_throughput\_exceeded\_average                            | The number of records rejected due to throttling for the stream over the specified time period.                                 |
| Get Requests    |
| Outgoing Records                        | aws\_kinesis\_get\_records\_records\_sum                                                   | 

The number of records retrieved from the shard, measured over the specified time period.                                  |
| Outgoing Bytes                          | aws\_kinesis\_get\_records\_bytes\_sum                                                     | The number of bytes retrieved from the Kinesis stream, measured over the specified time period.                                 |
| Throttled GetRecords Requests           | aws\_kinesis\_read\_provisioned\_throughput\_exceeded\_average                             | 

The number of GetRecords calls throttled for the stream over the specified time period.                                   |
| Latency     |
| Average Get Latency                     | aws\_kinesis\_get\_records\_latency\_average                                               | 

The time taken per GetRecords operation, measured over the specified time period.                                         |
| Average Put Latency                     | Aws\_kinesis\_put\_record\_latency\_average,

aws\_kinesis\_put\_records\_latency\_average | The time taken per PutRecord operation, measured over the specified time period.                                                |