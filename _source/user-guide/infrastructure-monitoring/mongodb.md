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

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Host uptime                                     | mongodb_uptime_ns | Number of seconds that the mongos or mongod process has been active.                                                                                                                            |
| Number of nodes                                 | mongodb_col_stats_ok | Number of nodes in the cluster.                                                                                                                                                                 |
| Queries per second                              | mongodb_queries_per_sec | Number of queries made per second.                                                                                                                                                              |
| Number of collections                           | mongodb_col_stats_ok | Number of database collections                                                                                                                                                                  |
| Memory usage                                    | ongodb_resident_megabytes | Amount of memory currently used by the database process.                                                                                                                                        |
| Replication lag                                 | mongodb_repl_lag | Delay between a write operation on the primary and its copy to a secondary.                                                                                                                     |
| Current connections                             | mongodb_connections_current | Number of connections to the database server from clients.                                                                                                                                      |
| Connections utilization                         | mongodb_connections_current, mongodb_connections_available | Number of connections to the database server from clients relative to the number of unused available incoming connections the database can provide.                                             |
| Average object size                             | mongodb_db_stats_avg_obj_size | The average size of each document in bytes.                                                                                                                                                     |
| Storage size                                    | mongodb_db_stats_storage_size | Total amount of space allocated to collections in this database for document storage.                                                                                                           |
| Index size                                      | mongodb_db_stats_index_size | Total size of all indexes created on this database.                                                                                                                                             |
| Data size                                       | mongodb_db_stats_data_size | Total size of the data held in this database including the padding factor.                                                                                                                      |
| Number of objects                               | mongodb_db_stats_objects | Number of objects (documents) in the database across all collections.                                                                                                                           |
| Number of extents                               | mongodb_db_stats_num_extents | Contains a count of the number of extents in the database across all collections.                                                                                                               |
| Number of indexes                               | mongodb_db_stats_indexes | Total number of indexes across all collections in the database.                                                                                                                                 |
| Number of collections                           | mongodb_db_stats_collections | Contains a count of the number of collections in that database.                                                                                                                                 |
| Number of connections                           | mongodb_connections_current, mongodb_connections_available, mongodb_connections_total_created | Number of current, available and created connections.                                                                                                                                           |
| Used memory                                     | mongodb_resident_megabytes, mongodb_vsize_megabytes | Amount of memory currently used by the database process including the virtual memory size.                                                                                                      |
| Network traffic                                 | mongodb_net_in_bytes, mongodb_net_out_bytes | The number of bytes that reflects the amount of network traffic received and sent by this database.                                                                                             |
| Operations counters (database and replications) | mongodb_repl_deletes_per_sec, mongodb_repl_inserts_per_sec, mongodb_repl_updates_per_sec, mongodb_repl_getmores_per_sec, mongodb_repl_commands_per_sec | Number of the following operations: Delete, Insert, Update, Getmore, Command                                                                         |
| Operation latencies                             | mongodb_latency_commands, mongodb_latency_reads, mongodb_latency_writes | Latency statistics for read, write and db command requests.                                                                                                                                     |
| Server assertions                               | mongodb_assert_msg, mongodb_assert_regular, mongodb_assert_rollovers, mongodb_assert_user, mongodb_assert_warning |Number per second, of: Message assertions, Regular assertions, Times that the rollover counters roll over, User assertions raised, Warnings raised |
| Bytes read/write                                | mongodb_wtcache_bytes_read_into, mongodb_wtcache_bytes_written_from | WiredTiger internal cache bytes read into and written from                                                                                                                                      |
| Pages read/write                                | mongodb_wtcache_pages_read_into, mongodb_wtcache_pages_written_from | WiredTiger internal cache pages read into and written from                                                                                                                                      |
