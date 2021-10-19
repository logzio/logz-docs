---
layout: article
title: VMware
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/vmware.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## VMware

This dashboard provides an interface to view and analyze metrics from your VMware infrastructure.

### Overview

| Metric visualization                            | Description                                                                                                                                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clusters Number  | CPU utilization as a percentage during the interval (CPU usage and CPU utilization might be different due to power management technologies or hyper-threading) for a host. |
| Datastores Number | Storage DRS datastore bytes written                                                                                                                                        |
| ESXi Number | Storage DRS datastore bytes written                                                                                                                                        |
| VMs Number | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.                                         |
| Average Cluster CPU Usage % | Percentage of CPU capacity being used for a host.                                                                                                                          |
| Average Cluster CPU Usage MHz          | Total megehertz of CPU being used for a host.                                                                                                                              |
| Average Cluster RAM Usage %  | Memory usage as percent of total configured or available memory for a host.                                                                                                |
| Average Cluster RAM Usage Bytes        | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                                    |
| Average Cluster Latency To Datastore   | Highest latency value across all datastores used by the host                                                                                                               |
| Average Cluster Disk Usage Bytes | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Average Cluster Network Usage Rate     | Network utilization (combined transmit-rates and receive-rates) during the interval                                                                                        |
| Top CPU Consuming ESXi | Percentage of CPU capacity being used for a host.                                                                                                                          |
| Top RAM Consuming ESXi   | Memory usage as percent of total configured or available memory for a host.                                                                                                |
| Top Disk Usage Rate ESXi | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Top Network Traffic Rate ESXi | Network utilization (combined transmit- and receive-rates) for a host.                                                                                                     |
| Top CPU Consuming VMs   | Percentage of CPU capacity being used for VMs.                                                                                                                             |
| Top RAM Consuming VMs | Memory usage as percent of total configured or available memory for a virtual machine.                                                                                     |
| Top Disk Usage Rate VMs | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Top Network Traffic Rate VMs | Network utilization (combined transmit-rates and receive-rates) during the interval                                                                                        |

### Hosts

| Metric visualization                                   | Description                                                                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uptime                                        | ESXi host uptime.                                                                                                                                             |
| VM Count                                      | ESXi host uptime.                                                                                                                                             |
| CPU Usage %   | Percentage of CPU capacity being used for a host.                                                                                                             |
| CPU Usage MHz                                 | Total megehertz of CPU being used for a host.                                                                                                                 |
| RAM Usage                                     | Memory usage as percent of total configured or available memory for a host.                                                                                   |
| RAM Usage                                     | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                       |
| Top CPU Consuming VMs                         | Percentage of CPU capacity being used for a host.                                                                                                             |
| Top RAM Consuming VMs                         | Memory usage as percent of total configured or available memory for a virtual machine.                                                                        |
| CPU Usage %                                   | Percentage of CPU capacity being used for a host.                                                                                                             |
| CPU MHz                                       | Total megehertz of CPU being used for a host.                                                                                                                 |
| RAM Usage %  | Memory usage as percent of total configured or available memory for a host.                                                                                   |
| RAM Usage Bytes                               | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                       |
| Disk usage %                                  | Percentage of disk capacity being used for a host.                                                                                                            |
| Disk Read/Write Rate                          | Average number of kilobytes read from and written to the disk each second for a host.                                                                         |
| Disk latency                                  | Average amount of time taken to process a SCSI read and write commands issued from the guest OS to the virtual machine for a host.                            |
| Datastore Read/Write Rate  | Number of read and write commands issued per second to the datastore.                                                                                         |
| Datastore latency                             | Average amount of time taken to process read and write commands issued from the datastore to the virtual machine for a host.                                  |
| Traffic Rx/Tx Rate    | Network utilization (combined transmit- and receive-rates) for a virtual machine.                                                                             |
| Packets Containing Errors                     | Number of packets with errors received and transmitted for a host.                                                                                            |
| Dropped Packets   | Number of received and transmitted packets dropped for a host.                                                                                                |
| Running, Host-Based Replication Protected VMs | Number of powered-on virtual machines running on this host that currently have host-based replication protection enabled.                                     |
| Replication Traffic | Average amount of data transmitted per second and Kilobytes per second of outgoing host-based replication network traffic (for this virtual machine or host). |

### VMs

| Metric visualization                  | Description                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Uptime                                | ESXi host uptime.     |
| Operating System                      | ESXi host uptime.                                                                                                                                |
| CPU Usage %   | CPU usage as a percentage during the interval, total                                                                    |
| CPU Usage MHz | Total megehertz of CPU being used for a virtual machine.                                                                                         |
| RAM Usage                             | Memory usage as percent of total configured or available memory for a virtual machine.                                                           |
| RAM Usage    | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.               |
| Disk Usage Rate    | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval. |
| Total Network Usage  | Network utilization (combined transmit-rates and receive-rates) during the interval                                                              |
| CPU Usage % | CPU usage as a percentage during the interval, per VM                                                                                            |
| CPU MHz   | Total megehertz of CPU being used for a virtual machine.                                                                                         |
| RAM Usage %                           | Memory usage as percent of total configured or available memory for a virtual machine.                                                           |
| RAM Usage Bytes                       | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.               |
| Disk Usage Bytes         | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval. |
| Disk Read/Write Rate                  | Average number of kilobytes read from and written to the disk each second during the collection interval                                         |
| Virtual Disk Read/Write Rate | Average number of kilobytes read from and written to the virtual disk each second for a virtual machine.                                         |
| Virtual Disk Read/Write Latency | Average amount of time for a read operation from and a write operation to  the virtual disk.                                                     |
| Datastore Read/Write Rate | Rate of reading data from and writing data to the datastore                                                                                      |
| Datastore Latency    | The average time a read from the datastore takes                                                                                                 |
| Traffic Rx/Tx Rate   | Average rate at which data was received and transmitted during the interval                                                                      |
| Packets Rx/Tx Rate                    | Number of packets received during the interval                                                                                                   |
| Dropped Packets   | Number of received packets dropped for a virtual machine.                                                                                        |