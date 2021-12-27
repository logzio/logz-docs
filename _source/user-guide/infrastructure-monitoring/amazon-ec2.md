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

This dashboard provides an interface to view and analyze metrics from your EC2 instances.

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU utilization      | aws_ec2_cpuutilization_average | The percentage of allocated EC2 compute units that are currently in use on the instance.                               |
| Running instances    | aws_ec2_cpuutilization_average | Count of running EC2 instances                                                                                         |
| Network bytes I/O    | aws_ec2_network_in_average, aws_ec2_network_out_average | The number of bytes received and sent out by the instance on all network interfaces.                                   |
| Network packets I/O  | aws_ec2_network_packets_in_average, aws_ec2_network_packets_out_average | The number of packets received and sent out by the instance on all network interfaces.                                 |
| Disk io Read/write   | aws_ec2_disk_read_bytes_average, aws_ec2_disk_write_bytes_average | Bytes read from and written to all instance store volumes available to the instance.                                   |
| CPU credit balance   | aws_ec2_cpucredit_balance_average | The number of earned CPU credits that an instance has accrued since it was launched or started.                        |
| CPU credit usage     | aws_ec2_cpucredit_usage_average | The number of CPU credits spent by the instance for CPU utilization.                                                   |
| Status check failed  | aws_ec2_status_check_failed_sum | Reports whether the instance has passed both the instance status check and the system status check in the last minute. |
