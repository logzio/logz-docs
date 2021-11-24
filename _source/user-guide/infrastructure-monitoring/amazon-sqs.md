---
layout: article
title: Amazon SQS
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-sqs.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics from your Amazon SQS.

| Metric visualization         | Metric name                                                                                                                                                                                      | Description                                                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Messages Received            | aws\_sqs\_number\_of\_messages\_received\_average                                                                                                                                                | 

The number of messages returned by calls to the ReceiveMessage action.                                                                                                                             |
| Messages Sent                | aws\_sqs\_number\_of\_messages\_sent\_average                                                                                                                                                    | The number of messages added to a queue.                                                                                                                                                                 |
| Messages Deleted             | aws\_sqs\_number\_of\_messages\_deleted\_average                                                                                                                                                 |

The number of messages deleted from the queue.                                                                                                                                                     |
| Empty Messages Received      | aws\_sqs\_number\_of\_empty\_receives\_average                                                                                                                                                   | The number of ReceiveMessage API calls that did not return a message.                                                                                                                                    |
| Messages State               | Aws\_sqs\_approximate\_number\_of\_messages\_delayed\_average, aws\_sqs\_approximate\_number\_of\_messages\_visible\_average, aws\_sqs\_approximate\_number\_of\_messages\_not\_visible\_average | The number of messages in the queue that are delayed and not available for reading immediately, The number of messages available for retrieval from the queue, the number of messages that are in flight |
| Messages Received Per Queue  | aws\_sqs\_number\_of\_messages\_received\_average                                                                                                                                                | 

The number of messages returned by calls to the ReceiveMessage action.                                                                                                                             |
| Messages Sent Per Queue      | aws\_sqs\_number\_of\_messages\_sent\_average                                                                                                                                                    | 

The number of messages added to a queue.                                                                                                                                                           |
| Message Size Per Queue       | aws\_sqs\_sent\_message\_size\_average                                                                                                                                                           | The size of messages added to a queue.                                                                                                                                                         |
| Oldest Meesage Age Per Queue | aws\_sqs\_approximate\_age\_of\_oldest\_message\_average                                                                                                                                         | The approximate age of the oldest non-deleted message in the queue.                                                                                                          |
