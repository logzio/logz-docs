---
title: Ship SQL Server metrics via Telegraf
logo:
  logofile: sqlserver.png
  orientation: vertical
data-source: SQL Server 
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


## Overview

Microsoft SQL Server is a relational database management system developed by Microsoft. Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format SQL Server metrics to Logz.io, you need to add the **inputs.sqlserver** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.sqlserver plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the SQL Server data from your hosts. To do this, add the following code to the configuration file:


``` ini
[agent]
  ## Default data collection interval for all inputs, can be changed as per collection interval needs
  interval = "10s"

# Read metrics from Microsoft SQL Server
[[inputs.sqlserver]]
  ## Specify instances to monitor with a list of connection strings.
  ## All connection parameters are optional.
  ## By default, the host is localhost, listening on default port, TCP 1433.
  ##   for Windows, the user is the currently running AD user (SSO).
  ##   See https://github.com/denisenkom/go-mssqldb for detailed connection
  ##   parameters, in particular, tls connections can be created like so:
  ##   "encrypt=true;certificate=<cert>;hostNameInCertificate=<SqlServer host fqdn>"
  servers = [
    "Server=192.168.1.10;Port=1433;User Id=<<USER-NAME>>;Password=<<PASSWORD>>;app name=telegraf;log=1;",
  ]

  ## Authentication method
  ## valid methods: "connection_string", "AAD"
  # auth_method = "connection_string"

  ## "database_type" enables a specific set of queries depending on the database type. If specified, it replaces azuredb = true/false and query_version = 2
  ## In the config file, the sql server plugin section should be repeated each with a set of servers for a specific database_type.
  ## Possible values for database_type are - "AzureSQLDB" or "AzureSQLManagedInstance" or "SQLServer"

  ## Queries enabled by default for database_type = "AzureSQLDB" are - 
  ## AzureSQLDBResourceStats, AzureSQLDBResourceGovernance, AzureSQLDBWaitStats, AzureSQLDBDatabaseIO, AzureSQLDBServerProperties, 
  ## AzureSQLDBOsWaitstats, AzureSQLDBMemoryClerks, AzureSQLDBPerformanceCounters, AzureSQLDBRequests, AzureSQLDBSchedulers

  # database_type = "AzureSQLDB"

  ## A list of queries to include. If not specified, all the above listed queries are used.
  # include_query = []

  ## A list of queries to explicitly ignore.
  # exclude_query = []

  ## Queries enabled by default for database_type = "AzureSQLManagedInstance" are - 
  ## AzureSQLMIResourceStats, AzureSQLMIResourceGovernance, AzureSQLMIDatabaseIO, AzureSQLMIServerProperties, AzureSQLMIOsWaitstats, 
  ## AzureSQLMIMemoryClerks, AzureSQLMIPerformanceCounters, AzureSQLMIRequests, AzureSQLMISchedulers

  # database_type = "AzureSQLManagedInstance"

  # include_query = []

  # exclude_query = []

  ## Queries enabled by default for database_type = "SQLServer" are - 
  ## SQLServerPerformanceCounters, SQLServerWaitStatsCategorized, SQLServerDatabaseIO, SQLServerProperties, SQLServerMemoryClerks, 
  ## SQLServerSchedulers, SQLServerRequests, SQLServerVolumeSpace, SQLServerCpu

  database_type = "SQLServer"

  include_query = []

  ## SQLServerAvailabilityReplicaStates and SQLServerDatabaseReplicaStates are optional queries and hence excluded here as default
  exclude_query = ["SQLServerAvailabilityReplicaStates", "SQLServerDatabaseReplicaStates"]

  ## Following are old config settings, you may use them only if you are using the earlier flavor of queries, however it is recommended to use 
  ## the new mechanism of identifying the database_type there by use it's corresponding queries

  ## Optional parameter, setting this to 2 will use a new version
  ## of the collection queries that break compatibility with the original
  ## dashboards.
  ## Version 2 - is compatible from SQL Server 2012 and later versions and also for SQL Azure DB
  # query_version = 2

  ## If you are using AzureDB, setting this to true will gather resource utilization metrics
  # azuredb = false

  ## Toggling this to true will emit an additional metric called "sqlserver_telegraf_health". 
  ## This metric tracks the count of attempted queries and successful queries for each SQL instance specified in "servers". 
  ## The purpose of this metric is to assist with identifying and diagnosing any connectivity or query issues. 
  ## This setting/metric is optional and is disabled by default.
  # health_metric = false

  ## Possible queries accross different versions of the collectors
  ## Queries enabled by default for specific Database Type
  
  ## database_type =  AzureSQLDB  by default collects the following queries
  ## - AzureSQLDBWaitStats
  ## - AzureSQLDBResourceStats 
  ## - AzureSQLDBResourceGovernance
  ## - AzureSQLDBDatabaseIO
  ## - AzureSQLDBServerProperties
  ## - AzureSQLDBOsWaitstats
  ## - AzureSQLDBMemoryClerks
  ## - AzureSQLDBPerformanceCounters
  ## - AzureSQLDBRequests
  ## - AzureSQLDBSchedulers

   ## database_type =  AzureSQLManagedInstance by default collects the following queries
   ## - AzureSQLMIResourceStats 
   ## - AzureSQLMIResourceGovernance 
   ## - AzureSQLMIDatabaseIO 
   ## - AzureSQLMIServerProperties 
   ## - AzureSQLMIOsWaitstats 
   ## - AzureSQLMIMemoryClerks
   ## - AzureSQLMIPerformanceCounters
   ## - AzureSQLMIRequests
   ## - AzureSQLMISchedulers

   ## database_type =  SQLServer by default collects the following queries
   ## - SQLServerPerformanceCounters 
   ## - SQLServerWaitStatsCategorized 
   ## - SQLServerDatabaseIO 
   ## - SQLServerProperties 
   ## - SQLServerMemoryClerks 
   ## - SQLServerSchedulers
   ## - SQLServerRequests
   ## - SQLServerVolumeSpace
   ## - SQLServerCpu
   ## and following as optional (if mentioned in the include_query list)
   ## - SQLServerAvailabilityReplicaStates
   ## - SQLServerDatabaseReplicaStates

  ## Version 2 by default collects the following queries
  ## Version 2 is being deprecated, please consider using database_type.
  ## - PerformanceCounters
  ## - WaitStatsCategorized
  ## - DatabaseIO
  ## - ServerProperties
  ## - MemoryClerk
  ## - Schedulers
  ## - SqlRequests
  ## - VolumeSpace
  ## - Cpu

  ## Version 1 by default collects the following queries
  ## Version 1 is deprecated, please consider using database_type.
  ## - PerformanceCounters
  ## - WaitStatsCategorized
  ## - CPUHistory
  ## - DatabaseIO
  ## - DatabaseSize
  ## - DatabaseStats
  ## - DatabaseProperties
  ## - MemoryClerk
  ## - VolumeSpace
  ## - PerformanceMetrics


```
* Replace `<<USER-NAME>>` with the user name for your SQL database.
* Replace `<<PASSWORD>>` with the password for your SQL database.

<!-- info-box-start:info -->
The database name is only required for instantiating a connection with the server and does not restrict the databases that we collect metrics from. The full list of data scraping and configuring options can be found [here](https://github.com/influxdata/telegraf/blob/release-1.18/plugins/inputs/sqlserver/README.md).
{:.info-box.note}
<!-- info-box-end -->

##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
