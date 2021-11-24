---
layout: article
title: etcd
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/etcd.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics from your etcd servers.

| Metric visualization                                | Metric name                                                                                                                                                  | Description                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Etcd has a leader?                                  | etcd\_server\_has\_leader                                                                                                                                    | Whether or not a leader exists. 1 is existence, 0 is not.                                                                     |
| Total Number of Leader Changes                      | etcd\_server\_leader\_changes\_seen\_total                                                                                                                   | The number of leader changes seen.                                                                                  |
| Total Number Of Failed Proposals Seen               | etcd\_server\_proposals\_failed\_total                                                                                                                       | The total number of failed proposals seen.                                                                         |
| Leader Heartbeat Send Failures                      | etcd\_server\_heartbeat\_send\_failures\_total                                                                                                               | Total number of leader heartbeat send failures                                                                                |
| Number Of Successful And Failed Health Checks| Etcd\_server\_health\_failures, etcd\_server\_health\_success                                                                                                | Total number of successful and failed health checks                                                                           |
| Raft Proposals                                      | Etcd\_server\_proposals\_committed\_total, etcd\_server\_proposals\_applied\_total, etcd\_server\_proposals\_pending, etcd\_server\_proposals\_failed\_total | Total number of consensus proposals committed, applied and pending and failed                                                 |
| RPC Rate       | Grpc\_server\_started\_total

grpc\_server\_handled\_total                                                                                                   | Total number of RPCs started and handled on the server.                                                                       |
| RPC Cache Hit Success Rate                          | Etcd\_grpc\_proxy\_cache\_hits\_total

etcd\_grpc\_proxy\_cache\_misses\_total                                       | Total number of cache hits and misses                                                                                         |
| Peer Network                                        | Etcd\_network\_peer\_received\_bytes\_total,

etcd\_network\_peer\_sent\_bytes\_total                                                                        | The total number of bytes received from and sent by peers.                                   |
| Client Network                                      | Etcd\_network\_client\_grpc\_received\_bytes\_total,

etcd\_network\_client\_grpc\_sent\_bytes\_total                                                        | The total number of bytes received from and sent by clients.                                                                  |
| Snapshot Duration                                   | etcd\_debugging\_snap\_save\_total\_duration\_seconds\_sum                                                                                                   | The total latency distributions of save called by snapshot.                                |
| Number Of Open File Descriptors                     | Process\_open\_fds,

process\_max\_fds                                                                                                                       | Number of open file descriptors versus maximum number of file descriptions                                                    |
| Disk Operations Latency                             | Etcd\_disk\_wal\_fsync\_duration\_seconds\_sum,

etcd\_disk\_backend\_commit\_duration\_seconds\_sum                                                         | The count of latency distributions of fsync called by wal versus the latency distributions of commit called by backend. |
| Actions Rate                                        | Etcd\_debugging\_store\_writes\_total,

Etcd\_debugging\_store\_reads\_total,

etcd\_debugging\_mvcc\_put\_total                                             | Total number of reads, writes and puts actions local to this member.             |
| Number Of Watchers             | etcd\_debugging\_store\_watchers                                                                                                                             | Number of currently active watchers.                                                                                          |
| Number Of Expired Keys                              | etcd\_debugging\_store\_expires\_total                                                                                                                       | Total number of expired keys                                                                                                  |
| DB Size                                             | etcd\_debugging\_mvcc\_db\_total\_size\_in\_bytes                                                                                                            | Total size of the underlying database.                                                                                        |
| Memory                                              | process\_resident\_memory\_bytes                                                                                                                             | Resident memory size                                                                                                          |
| Heap Used Bytes                                     | go\_memstats\_heap\_inuse\_bytes                                                                                                                             | Number of heap bytes in use.                                                                      |
| Hash Table Used Bytes                               | go\_memstats\_buck\_hash\_sys\_bytes                                                                                                                         | Bytes used by the profiling bucket hash table.                                         |
