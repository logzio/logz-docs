---
layout: article
title: Amazon EC2
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-ec2.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon EC2

This dashboard provides an interface to view and analyze metrics from your EC2 instances.

| Metric visualization               | Description                                                                                                            |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| CPU utilization      | The percentage of allocated EC2 compute units that are currently in use on the instance.                               |
| Running instances    | Count of running EC2 instances                                                                                         |
| Network bytes I/O    | The number of bytes received and sent out by the instance on all network interfaces.                                   |
| Network packets I/O  | The number of packets received and sent out by the instance on all network interfaces.                                 |
| Disk io Read/write   | Bytes read from and written to all instance store volumes available to the instance.                                   |
| CPU credit balance   | The number of earned CPU credits that an instance has accrued since it was launched or started.                        |
| CPU credit usage     | The number of CPU credits spent by the instance for CPU utilization.                                                   |
| Status check failed  | Reports whether the instance has passed both the instance status check and the system status check in the last minute. |