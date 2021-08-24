---
title: Ship Vmware Vsphere metrics via Telegraf
logo:
  logofile: vsphere-telegraf.png
  orientation: vertical
data-source: Vmware Vsphere metrics over Telegraf
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


## Overview

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Vmware Vsphere metrics to Logz.io, you need to add the **inputs.vsphere** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.vsphere plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Vmware Vsphere data from your hosts. To do this, add the following code to the configuration file:


``` ini
# Read metrics from one or many vCenters
[[inputs.vsphere]]
    ## List of vCenter URLs to be monitored. These three lines must be uncommented and edited for the plugin to work.
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"
```


<!-- info-box-start:info -->
The above integration scrapes all Vmware Vsphere metrics available on your machine. 
If you wish to include or exclude specific metrics, add them to the inputs file as described [here](https://github.com/influxdata/telegraf/blob/release-1.19/plugins/inputs/vsphere/README.md).
{:.info-box.note}
<!-- info-box-end -->


Here is an example of the configuration file that will enable Telegraf to scrape metrics defined by `vm_metric_include` and `host_metric_include` arrays.

``` ini
# Read metrics from one or many vCenters
[[inputs.vsphere]]
    ## List of vCenter URLs to be monitored. These three lines must be uncommented and edited for the plugin to work.
  vcenters = [ "https://vcenter.local/sdk" ]
  username = "user@corp.local"
  password = "secret"

  ## VMs
  ## Typical VM metrics (if omitted or empty, all metrics are collected)
  # vm_include = [ "/*/vm/**"] # Inventory path to VMs to collect (by default all are collected)
  # vm_exclude = [] # Inventory paths to exclude
  vm_metric_include = [
    "cpu.demand.average",
    "cpu.idle.summation",
    "cpu.latency.average",
    "cpu.readiness.average",
    "cpu.ready.summation",
    "cpu.run.summation",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.wait.summation",
    "mem.active.average",
    "mem.granted.average",
    "mem.latency.average",
 ]

  ## Hosts
  ## Typical host metrics (if omitted or empty, all metrics are collected)
  # host_include = [ "/*/host/**"] # Inventory path to hosts to collect (by default all are collected)
  # host_exclude [] # Inventory paths to exclude
  host_metric_include = [
    "cpu.swapwait.summation",
    "cpu.usage.average",
    "cpu.usagemhz.average",
    "cpu.used.summation",
    "cpu.utilization.average",
    "cpu.wait.summation",
    "disk.deviceReadLatency.average",
    "disk.deviceWriteLatency.average",
    "disk.kernelReadLatency.average",
    "disk.kernelWriteLatency.average",
    "disk.numberReadAveraged.average",
    "disk.numberWriteAveraged.average",
  ]

  ## Datacenters
  # datacenter_include = [ "/*/host/**"] # Inventory path to clusters to collect (by default all are collected)
  # datacenter_exclude = [] # Inventory paths to exclude
  # datacenter_metric_include = [] ## if omitted or empty, all metrics are collected
  datacenter_metric_exclude = [ "*" ] ## Datacenters are not collected by default.
  # datacenter_instances = false ## false by default
  
```

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
