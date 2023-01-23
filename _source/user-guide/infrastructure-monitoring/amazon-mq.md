---
layout: article
title: Amazon MQ
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-mq.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with Amazon MQ
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics for your ActiveMQ broker and its destinations (queues and topics).

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total producers                                              | aws_amazonmq_total_producer_count_maximum | The number of message producers that are active on destinations on all current brokers.                      |
| Total consumers                                              | aws_amazonmq_total_consumer_count_maximum | The number of message consumers that are subscribed to destinations on all current brokers.                  |
| Unclean shutdown                                             | aws_amazonmq_journal_files_for_fast_recovery_maximum | The number of journal files that will be replayed after an unclean shutdown.                                 |
| Clean shutdown | aws_amazonmq_journal_files_for_fast_recovery_maximum | The number of journal files that will be replayed after a clean shutdown.                                    |
| CPU utilization                                              | aws_amazonmq_cpu_utilization_maximum | The percentage of allocated Amazon EC2 compute units that the broker currently uses.                         |
| Consumers over time                                          | aws_amazonmq_total_consumer_count_maximum | The number of message consumers subscribed to destinations on a given broker.                                |
| Percentage of heap usage out of limit                        | aws_amazonmq_heap_usage_maximum | The percentage of the ActiveMQ JVM memory limit that the broker currently uses.                              |
| Percentage of storage usage out of limit                     | aws_amazonmq_store_percent_usage_maximum | The percent used by the storage limit. If this reaches 100 the broker will refuse messages. |
| Network traffic                     | aws_amazonmq_network_in_maximum, aws_amazonmq_network_out_maximum | The volume of incoming and outgoing traffic for the broker. |
| Producers per destination                                    | aws_amazonmq_producer_count_maximum | The number of message producers active on destinations on the current broker.                                |
| Subscribed consumers per destination                         | aws_amazonmq_consumer_count_maximum | The number of message consumers subscribed to destinations on the current broker.                            |
| Average destination memory usage | aws_amazonmq_memory_usage_maximum | The percentage of the memory limit that the destination currently uses.                                      |
| Queue size                                                   | aws_amazonmq_queue_size_maximum | The number of messages in the queue.                                                                         |
| Average message latency from broker to destination | aws_amazonmq_enqueue_time_maximum | The amount of time it takes the broker to accept a message from the producer and send it to the destination. |
| Messages received per destination                            | aws_amazonmq_enqueue_count_maximum | The number of messages acknowledged by consumers, per minute.                                                |
| Messages sent per destination                                | ws_amazonmq_dequeue_count_maximum | The number of messages sent to the destination. |
| Messages sent to consumers                               | aws_amazonmq_dispatch_count_maximum | The number of messages acknowledged by consumers. |
| Expired messages                                             | aws_amazonmq_expired_count_maximum | The number of messages that could not be delivered because they expired. |
