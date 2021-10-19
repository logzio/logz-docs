---
layout: article
title: MongoDB
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/mongodb.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## MongoDB

This dashboard provides an interface to view and analyze metrics from your Mongo databases.


| Metric visualization                            | Description                                                                                                                                                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Host uptime                                     | Number of seconds that the mongos or mongod process has been active.                                                                                                                            |
| Number of nodes                                 | Number of nodes in the cluster.                                                                                                                                                                 |
| Queries per second                              | Number of queries made per second.                                                                                                                                                              |
| Number of collections                           | Number of database collections                                                                                                                                                                  |
| Memory usage                                    | Amount of memory currently used by the database process.                                                                                                                                        |
| Replication lag                                 | Delay between a write operation on the primary and its copy to a secondary.                                                                                                                     |
| Current connections                             | Number of connections to the database server from clients.                                                                                                                                      |
| Connections utilization                         | Number of connections to the database server from clients relative to the number of unused available incoming connections the database can provide.                                             |
| Average object size                             | The average size of each document in bytes.                                                                                                                                                     |
| Storage size                                    | Total amount of space allocated to collections in this database for document storage.                                                                                                           |
| Index size                                      | Total size of all indexes created on this database.                                                                                                                                             |
| Data size                                       | Total size of the data held in this database including the padding factor.                                                                                                                      |
| Number of objects                               | Number of objects (documents) in the database across all collections.                                                                                                                           |
| Number of extents                               | Contains a count of the number of extents in the database across all collections.                                                                                                               |
| Number of indexes                               | Total number of indexes across all collections in the database.                                                                                                                                 |
| Number of collections                           | Contains a count of the number of collections in that database.                                                                                                                                 |
| Number of collections                           | Number of current, available and created connections.                                                                                                                                           |
| Used memory                                     | Amount of memory currently used by the database process including the virtual memory size.                                                                                                      |
| Network traffic                                 | The number of bytes that reflects the amount of network traffic received and sent by this database.                                                                                             |
| Operations counters (database and replications) | Number of the following operations: Delete, Insert, Update, Getmore, Command                                                                         |
| Operation latencies                             | Latency statistics for read, write and db command requests.                                                                                                                                     |
| Server assertions                               | Number per second, of: Message assertions, Regular assertions, Times that the rollover counters roll over, User assertions raised, Warnings raised |
| Bytes read/write                                | WiredTiger internal cache bytes read into and written from                                                                                                                                      |
| Pages read/write                                | WiredTiger internal cache pages read into and written from                                                                                                                                      |