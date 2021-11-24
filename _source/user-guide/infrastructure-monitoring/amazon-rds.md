---
layout: article
title: Amazon RDS
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-rds.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---



This dashboard provides an interface to view and analyze metrics from your Amazon RDS.

| Metric visualization        | Metric name                                                                                       | Description                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Database Connections        | aws\_rds\_database\_connections\_maximum                                                          | The number of database connections in use.                                                                                                  |
| Free Storage Space          | aws\_rds\_free\_storage\_space\_average                                                           | The amount of available storage space.                                                                                                                                                                                                                                                                                                |
| Freeable Memory (Over Time) | aws\_rds\_freeable\_memory\_average                                                               | The amount of available random access memory.                                                                                                                                                                                                                                                                |
| CPU Utilization             | aws\_rds\_cpuutilization\_average                                                                 | The percentage of CPU utilization.                                                                                                                                                                                                                                                                                    |
| CPU Credit Usage            | aws\_rds\_cpucredit\_usage\_average                                                               | The number of CPU credits spent by the instance for CPU utilization.                                                                                                                                                                                                                                                                  |
| CPU Credit Balance          | aws\_rds\_cpucredit\_balance\_average                                                             | The number of earned CPU credits that an instance has accrued since it was launched or started.                                                                                                                                                                                                                                       |
| Network Bytes I/O           | aws\_rds\_network\_receive\_throughput\_average, aws\_rds\_network\_transmit\_throughput\_average | The incoming (receive) network traffic on the DB instance (including both customer database traffic and Amazon RDS traffic used for monitoring and replication) and the outgoing (transmit) network traffic on the DB instance (including both customer database traffic and Amazon RDS traffic used for monitoring and replication). |
| Disk Read/Write Latency     | aws\_rds\_read\_latency\_average, aws\_rds\_write\_latency\_average                               | The average amount of time taken per disk I/O operation.                                                                                                                                                                                                                                                                              |
