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


This dashboard provides an interface to view and analyze metrics from your VMware infrastructure.

### Overview

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clusters Number  | vsphere_host_cpu_utilization_average | CPU utilization as a percentage during the interval (CPU usage and CPU utilization might be different due to power management technologies or hyper-threading) for a host. |
| Datastores Number | vsphere_host_datastore_datastoreWriteBytes_latest | Storage DRS datastore bytes written                                                                                                                                        |
| ESXi Number | vsphere_host_datastore_datastoreWriteBytes_latest | Storage DRS datastore bytes written                                                                                                                                        |
| VMs Number | vsphere_vm_mem_active_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.                                         |
| Average Cluster CPU Usage % | vsphere_host_cpu_usage_average | Percentage of CPU capacity being used for a host.                                                                                                                          |
| Average Cluster CPU Usage MHz          | vsphere_host_cpu_usagemhz_average | Total megehertz of CPU being used for a host.                                                                                                                              |
| Average Cluster RAM Usage %  | vsphere_host_mem_usage_average | Memory usage as percent of total configured or available memory for a host.                                                                                                |
| Average Cluster RAM Usage Bytes        | vsphere_host_mem_active_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                                    |
| Average Cluster Latency To Datastore   | vsphere_host_datastore_maxTotalLatency_latest | Highest latency value across all datastores used by the host                                                                                                               |
| Average Cluster Disk Usage Bytes | vsphere_host_disk_usage_average | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Average Cluster Network Usage Rate     | vsphere_host_net_usage_average | Network utilization (combined transmit-rates and receive-rates) during the interval                                                                                        |
| Top CPU Consuming ESXi | vsphere_host_cpu_usage_average | Percentage of CPU capacity being used for a host.                                                                                                                          |
| Top RAM Consuming ESXi   | vsphere_host_mem_usage_average | Memory usage as percent of total configured or available memory for a host.                                                                                                |
| Top Disk Usage Rate ESXi | vsphere_host_disk_usage_average | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Top Network Traffic Rate ESXi | vsphere_host_net_usage_average | Network utilization (combined transmit- and receive-rates) for a host.                                                                                                     |
| Top CPU Consuming VMs   | vsphere_vm_cpu_usage_average | Percentage of CPU capacity being used for VMs.                                                                                                                             |
| Top RAM Consuming VMs | vsphere_vm_mem_usage_average | Memory usage as percent of total configured or available memory for a virtual machine.                                                                                     |
| Top Disk Usage Rate VMs | vsphere_vm_disk_usage_average | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval.                           |
| Top Network Traffic Rate VMs | vsphere_vm_net_usage_average | Network utilization (combined transmit-rates and receive-rates) during the interval                                                                                        |

### Hosts

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uptime                                        | vsphere_host_sys_uptime_latest | ESXi host uptime.                                                                                                                                             |
| VM Count                                      | vsphere_vm_sys_uptime_latest | ESXi host uptime.                                                                                                                                             |
| CPU Usage %   | vsphere_host_cpu_usage_average | Percentage of CPU capacity being used for a host.                                                                                                             |
| CPU Usage MHz                                 | vsphere_host_cpu_usagemhz_average | Total megehertz of CPU being used for a host.                                                                                                                 |
| RAM Usage                                     | vsphere_host_mem_usage_average | Memory usage as percent of total configured or available memory for a host.                                                                                   |
| RAM Usage                                     | vsphere_host_mem_active_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                       |
| Top CPU Consuming VMs                         | vsphere_vm_cpu_usage_average | Percentage of CPU capacity being used for a host.                                                                                                             |
| Top RAM Consuming VMs                         | vsphere_vm_mem_usage_average | Memory usage as percent of total configured or available memory for a virtual machine.                                                                        |
| CPU Usage %                                   | vsphere_host_cpu_usage_average | Percentage of CPU capacity being used for a host.                                                                                                             |
| CPU MHz                                       | vsphere_host_cpu_usagemhz_average | Total megehertz of CPU being used for a host.                                                                                                                 |
| RAM Usage %  | vsphere_host_mem_usage_average | Memory usage as percent of total configured or available memory for a host.                                                                                   |
| RAM Usage Bytes                               | vsphere_host_mem_active_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a host.                                       |
| Disk usage %                                  | vsphere_host_disk_usage_average | Percentage of disk capacity being used for a host.                                                                                                            |
| Disk Read/Write Rate                          | vsphere_host_disk_read_average, vsphere_host_disk_write_average | Average number of kilobytes read from and written to the disk each second for a host.                                                                         |
| Disk latency                                  | vsphere_host_disk_read_average | Average amount of time taken to process a SCSI read and write commands issued from the guest OS to the virtual machine for a host.                            |
| Datastore Read/Write Rate  | vsphere_host_datastore_read_average, vsphere_host_datastore_write_average | Number of read and write commands issued per second to the datastore.                                                                                         |
| Datastore latency                             | vsphere_host_datastore_totalReadLatency_average, vsphere_host_datastore_totalWriteLatency_average | Average amount of time taken to process read and write commands issued from the datastore to the virtual machine for a host.                                  |
| Traffic Rx/Tx Rate    | vsphere_host_net_received_average, vsphere_host_net_transmitted_average | Network utilization (combined transmit- and receive-rates) for a virtual machine.                                                                             |
| Packets Containing Errors                     | vsphere_host_net_errorsRx_summation, vsphere_host_net_errorsTx_summation | Number of packets with errors received and transmitted for a host.                                                                                            |
| Dropped Packets   | vsphere_host_net_droppedRx_summation, vsphere_host_net_droppedTx_summation | Number of received and transmitted packets dropped for a host.                                                                                                |
| Running, Host-Based Replication Protected VMs | vsphere_host_hbr_hbrNumVms_average | Number of powered-on virtual machines running on this host that currently have host-based replication protection enabled.                                     |
| Replication Traffic | vsphere_host_hbr_hbrNetRx_average, vsphere_host_hbr_hbrNetTx_average | Average amount of data transmitted per second and Kilobytes per second of outgoing host-based replication network traffic (for this virtual machine or host). |

### VMs

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uptime                                | vsphere_vm_sys_uptime_latest | ESXi host uptime.     |
| Operating System                      | vsphere_vm_sys_uptime_latest | ESXi host uptime.                                                                                                                                |
| CPU Usage %   | vsphere_vm_cpu_usage_average | CPU usage as a percentage during the interval, total                                                                    |
| CPU Usage MHz | vsphere_vm_cpu_usagemhz_average | Total megehertz of CPU being used for a virtual machine.                                                                                         |
| RAM Usage                             | vsphere_vm_mem_usage_average | Memory usage as percent of total configured or available memory for a virtual machine.                                                           |
| RAM Usage    | vsphere_vm_mem_usage_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.               |
| Disk Usage Rate    | vsphere_vm_disk_usage_average | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval. |
| Total Network Usage  | vsphere_vm_net_usage_average | Network utilization (combined transmit-rates and receive-rates) during the interval                                                              |
| CPU Usage % | vsphere_vm_cpu_usage_average | CPU usage as a percentage during the interval, per VM                                                                                            |
| CPU MHz   | vsphere_vm_cpu_usagemhz_average | Total megehertz of CPU being used for a virtual machine.                                                                                         |
| RAM Usage %                           | vsphere_vm_mem_usage_average | Memory usage as percent of total configured or available memory for a virtual machine.                                                           |
| RAM Usage Bytes                       | vsphere_vm_mem_active_average | Amount of memory that is actively used, as estimated by the VMkernel based on recently touched memory pages for a virtual machine.               |
| Disk Usage Bytes         | vsphere_vm_disk_usage_average | Aggregated disk I/O rate. For hosts, this metric includes the rates for all virtual machines running on the host during the collection interval. |
| Disk Read/Write Rate                  | vsphere_vm_disk_read_average, vsphere_vm_disk_write_average | Average number of kilobytes read from and written to the disk each second during the collection interval                                         |
| Virtual Disk Read/Write Rate | vsphere_vm_virtualDisk_read_average, vsphere_vm_virtualDisk_wrire_average | Average number of kilobytes read from and written to the virtual disk each second for a virtual machine.                                         |
| Virtual Disk Read/Write Latency | vsphere_vm_virtualDisk_totalReadLatency_average, vsphere_vm_virtualDisk_totalWriteLatency_average | Average amount of time for a read operation from and a write operation to  the virtual disk.                                                     |
| Datastore Read/Write Rate | vsphere_vm_datastore_read_average, vsphere_vm_datastore_write_average | Rate of reading data from and writing data to the datastore                                                                                      |
| Datastore Latency    | vsphere_vm_datastore_totalReadLatency_average, vsphere_vm_datastore_totalWriteLatency_average | The average time a read from the datastore takes                                                                                                 |
| Traffic Rx/Tx Rate   | vsphere_vm_net_received_average, vsphere_vm_net_transmitted_average | Average rate at which data was received and transmitted during the interval                                                                      |
| Packets Rx/Tx Rate                    | vsphere_vm_net_packetsRx_summation, vsphere_vm_net_packetsTx_summation |Number of packets received during the interval                                                                                                   |
| Dropped Packets   | vsphere_vm_net_droppedRx_summation, vsphere_vm_net_droppedTx_summation | Number of received packets dropped for a virtual machine.                                                                                        |
