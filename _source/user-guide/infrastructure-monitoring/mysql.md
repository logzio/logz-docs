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

## MySQL

This dashboard provides an interface to view and analyze metrics from your MySQL databases.

| Metric visualization                        | Description                                                                                                                                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MySQL uptime                                | The number of seconds that the server has been up. |
| Queries per second                          | The number of statements executed by the server.                                                                                                                                                           |
| Threads connected                           | The number of currently open connections.                                                                                                                                                                  |
| Failed connections attempts                 | The number of failed attempts to connect to the MySQL server.                                                                                                                                              |
| InnoDB buffer pool bytes                    | The total number of bytes in the InnoDB buffer pool containing data.                                                                                                                                       |
| InnoDB Buffer Pool Free Pages Percent | The number of free pages in the InnoDB buffer pool divided by the total size of the InnoDB buffer pool, in pages.                                                                                          |
| Command rates                               | Rates for the following commands: Select, Update, Insert, Delete |
| Connections rates                           | The maximum number of connections that have been in use simultaneously since the server started including the number of currently open connections.                                                        |
| Threads                                     | The number of threads in the thread cache including the number of currently open connections, the number of threads created to handle connections and the number of threads that are not sleeping. |
| Sorts                                       | The number of sorted rows, the number of sorts that were done using ranges, the number of sorts that were done by scanning the table and the number of merge passes that the sort algorithm has had to do. |
| Bytes sent received                         | The number of bytes sent to all clients and received from all clients                                                                                                                                      |
| Innodb reads writes                         | Number of requests to read the InnoDB buffer pool and write to it.                                                                                                                                         |