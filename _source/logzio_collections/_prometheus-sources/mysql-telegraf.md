---
title: Ship MySQL metrics via Telegraf
logo:
  logofile: mysql-telegraf.png
  orientation: vertical
data-source: MySQL metrics over Telegraf
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

To send your Prometheus-format MySQL metrics to Logz.io, you need to add the **inputs.mysql** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

Follow the instructions on [Get started with Telegraf](https://docs.influxdata.com/telegraf/latest/introduction/getting-started/) to:

1. Download and install Telegraf using the terminal.
2. Create the configuration file - 'telegraf.conf'.

##### Add the inputs.mysql plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the MySQL data from your hosts. To do this, add the following code to the configuration file:

``` yaml
[[inputs.mysql]]
  servers = ["<<USER-NAME>>:<<PASSWORD>>@<<PROTOCOL>>(<<HOST-NAMES>>)/?tls=false"]
  ##  e.g.
  ##    servers = ["user:passwd@tcp(127.0.0.1:3306)/?tls=false"]
  ##    servers = ["user@tcp(127.0.0.1:3306)/?tls=false"]
  metric_version = 2
  # gather metrics from INFORMATION_SCHEMA.TABLES for databases provided above list
   gather_table_schema = true

  # gather thread state counts from INFORMATION_SCHEMA.PROCESSLIST
   gather_process_list = true

  # gather user statistics from INFORMATION_SCHEMA.USER_STATISTICS
   gather_user_statistics = true

  # gather auto_increment columns and max values from information schema
   gather_info_schema_auto_inc = true

  # gather metrics from INFORMATION_SCHEMA.INNODB_METRICS
   gather_innodb_metrics = true

  # gather metrics from SHOW SLAVE STATUS command output
   gather_slave_status = true

  # gather metrics from SHOW BINARY LOGS command output
   gather_binary_logs = true

  # gather metrics from SHOW GLOBAL VARIABLES command output
   gather_global_variables = true

  # gather metrics from PERFORMANCE_SCHEMA.TABLE_IO_WAITS_SUMMARY_BY_TABLE
   gather_table_io_waits = true

  # gather metrics from PERFORMANCE_SCHEMA.TABLE_LOCK_WAITS
   gather_table_lock_waits = true

  # gather metrics from PERFORMANCE_SCHEMA.TABLE_IO_WAITS_SUMMARY_BY_INDEX_USAGE
   gather_index_io_waits = true

  # gather metrics from PERFORMANCE_SCHEMA.EVENT_WAITS
   gather_event_waits = true

  # gather metrics from PERFORMANCE_SCHEMA.FILE_SUMMARY_BY_EVENT_NAME
   gather_file_events_stats = true

  # gather metrics from PERFORMANCE_SCHEMA.EVENTS_STATEMENTS_SUMMARY_BY_DIGEST
   gather_perf_events_statements = true
  
  # gather metrics from PERFORMANCE_SCHEMA.EVENTS_STATEMENTS_SUMMARY_BY_ACCOUNT_BY_EVENT_NAME
   gather_perf_sum_per_acc_per_event = true
```

* Replace `<<USER-NAME>>` with the user name for your MySQL database.
* Replace `<<PASSWORD>>` with the password for your MySQL database.
* Replace `<<PROTOCOL>>` with the name of your shipping protocol (tcp protocol recommended).
* Replace `<<HOST-NAME>>` with the address of your MySQL database host.

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/mysql/README.md)
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

After you have created the configuration file, you need to configure the output plug-in to enable Telegraf to send your data to Logz.io in Prometheus-format. To do this, add the following code to the configuration file:

``` yaml
[[outputs.http]]
  url = "https://<<LISTENER-HOST>>:8053"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>"
```

{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
