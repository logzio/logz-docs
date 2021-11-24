---
layout: article
title: MySQL
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/mysql.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics from your MySQL databases.

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MySQL uptime                                | mysql_uptime | The number of seconds that the server has been up. |
| Queries per second                          | mysql_queries | The number of statements executed by the server.                                                                                                                                                           |
| Open connections                          | mysql_threads_connected | The number of currently open connections.                                                                                                                                                                  |
| Failed connections attempts                 | mysql_aborted_connects | The number of failed attempts to connect to the MySQL server.                                                                                                                                              |
| InnoDB buffer pool bytes                    | mysql_innodb_buffer_pool_bytes_data | The total number of bytes in the InnoDB buffer pool containing data.                                                                                                                                       |
| InnoDB Buffer Pool Free Pages Percent | mysql_innodb_buffer_pool_pages_free, mysql_innodb_buffer_pool_pages_total | The number of free pages in the InnoDB buffer pool divided by the total size of the InnoDB buffer pool, in pages.                                                                                          |
| Command rates                               | mysql_com_select, mysql_com_update, mysql_com_insert, mysql_com_delete | Rates for the following commands: Select, Update, Insert, Delete |
| Connections rates                           | mysql_max_used_connections, mysql_threads_connected | The maximum number of connections that have been in use simultaneously since the server started including the number of currently open connections.                                                        |
| Threads                                     | mysql_threads_cached, mysql_threads_connected, mysql_threads_created, mysql_threads_running | The number of threads in the thread cache including the number of currently open connections, the number of threads created to handle connections and the number of threads that are not sleeping. |
| Sorts                                       | mysql_sort_rows, mysql_sort_range, mysql_sort_merge_passes, mysql_sort_scan | The number of sorted rows, the number of sorts that were done using ranges, the number of sorts that were done by scanning the table and the number of merge passes that the sort algorithm has had to do. |
| Bytes sent received                         | mysql_bytes_sent, mysql_bytes_received | The number of bytes sent to all clients and received from all clients                                                                                                                                      |
| Innodb reads writes                         | mysql_innodb_data_reads, mysql_innodb_data_writes | Number of requests to read the InnoDB buffer pool and write to it.                                                                                                                                         |
