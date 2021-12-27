---
layout: article
title: Amazon Kinesis Firehose
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-firehose.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your Amazon Kinesis Firehose.

| Metric visualization                                                                                         | Metric name                                                                                | Description                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Put To Kinesis Data Firehose Requests                                                                |
| Incoming Records         | aws\_firehose\_incoming\_records\_sum        | The number of records ingested successfully into the delivery stream over the specified time period after throttling.      |
| Incoming Bytes     | aws\_firehose\_incoming\_bytes\_sum     | The number of bytes ingested successfully into the delivery stream over the specified time period after throttling.  |
| Successful PutRecord And PutRecordBatch Requests   | aws\_firehose\_incoming\_put\_requests\_sum    | The number of successful PutRecord and PutRecordBatch requests over the specified period of time after throttling.  |
| Put Latency        | aws\_firehose\_put\_record\_batch\_latency\_sum, aws\_firehose\_put\_record\_latency\_sum | The time taken per PutRecordBatch operation, measured over the specified time period and the time taken per PutRecord operation, measured over the specified time period. |
| Read From Data Stream       |
| Records Read | aws\_firehose\_data\_read\_from\_kinesis\_stream\_records\_sum          | When the data source is a Kinesis data stream, this metric indicates the number of records read from that data stream.   |
| Bytes Read          | aws\_firehose\_data\_read\_from\_kinesis\_stream\_bytes\_sum       | When the data source is a Kinesis data stream, this metric indicates the number of bytes read from that data stream.      |
| Throttled GetRecords Requests        | aws\_firehose\_throttled\_get\_records\_sum    | The total number of times the GetRecords operation is throttled when the data source is a Kinesis data stream.    |
| Data Transformation With Lambda      |
| Succeed Processing Records         | aws\_firehose\_succeed\_processing\_records\_sum       | The number of successfully processed records over the specified time period.         |
| Succeed Processing Bytes     | aws\_firehose\_succeed\_processing\_bytes\_sum          | The number of successfully processed bytes over the specified time period.    |
| Processing Duration    | aws\_firehose\_execute\_processing\_duration\_sum         | The time it takes for each Lambda function invocation performed by Kinesis Data Firehose.  |
| Processing Success        | aws\_firehose\_execute\_processing\_success\_sum       | The sum of the successful Lambda function invocations over the sum of the total Lambda function invocations. | 
| Data Transformation With Lambda                                                  |
| Success Rate            | aws\_firehose\_delivery\_to\_s3\_success\_sum                     | The sum of successful Amazon S3 put commands over the sum of all Amazon S3 put commands.           |
| Data freshness                | aws\_firehose\_delivery\_to\_s3\_data\_freshness\_sum                                      | The age (from getting into Kinesis Data Firehose to now) of the oldest record in Kinesis Data Firehose. |
| Records Delivered     | aws\_firehose\_delivery\_to\_s3\_records\_sum        | The number of records delivered to Amazon S3 over the specified time period.    |
| Bytes Delivered    | aws\_firehose\_delivery\_to\_s3\_bytes\_sum       | The number of bytes delivered to Amazon S3 over the specified time period.   |
