---
title: Ship PostgreSQL metrics
logo:
  logofile: postgresql.svg
  orientation: vertical
data-source: PostgreSQL
contributors:
  - shalper
  - yotamloe
shipping-tags:
  - database
order: 700
---

You can ship PostgreSQL metrics using Metricbeat.

#### NEW BUTTON
123
<!-- logzio-inject:grafana:dashboards-installation ids=['1m3Sqx6atnxPd7829LV2W5'] -->


#### Metricbeat setup

**Before you begin, you'll need**:

* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher

<div class="tasklist">

{% include metric-shipping/certificate.md %}

##### Add Logz.io to your Metricbeat configuration

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following Logz.io settings:


```shell
# ===== General =====
fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
```

{% include metric-shipping/replace-metrics-token.html %}

##### Set Logz.io as the output

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.

```shell
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include log-shipping/listener-var.html %} 

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Add PostgreSQL module configuration

```yml
metricbeat.modules:
- module: postgresql
  enabled: true
  metricsets:
    - database
    - bgwriter
    - activity
  period: 10s
  # connenction URI format: postgresql://[user[:password]@][netloc][:port][,...][/dbname][?param1=value1&...]
  # Replace with your postgres connection URI 👇
  hosts: ["<<URI>>"]
  # Logz.io prebuild dashboard for PostgreSQl also uses metrics from the system module
- module: system
  metricsets:
    - cpu
    - network
    - memory
  enabled: true
  period: 10s

processors:
  - add_host_metadata: ~
  - include_fields: # Collected metrics ⬇️
      fields: ["postgresql.activity.database.name", "postgresql.activity.state", "postgresql.bgwriter.buffers.allocated", "postgresql.bgwriter.checkpoints.scheduled", "postgresql.database.blocks.hit", "postgresql.database.blocks.time.read.ms", "postgresql.database.blocks.time.write.ms", "postgresql.database.conflicts", "postgresql.database.deadlocks", "postgresql.database.name", "postgresql.database.rows.deleted", "postgresql.database.rows.fetched", "postgresql.database.rows.inserted", "postgresql.database.rows.returned", "postgresql.database.rows.updated", "postgresql.database.temporary.bytes", "postgresql.database.transactions.commit", "postgresql.database.transactions.rollback", "system.cpu.idle.pct", "system.memory.used.pct", "system.network.in.bytes", "system.network.out.bytes", "token", "logzio_codec", "event.module", "metricset.name", "host.name", "agent.hostname", "type", "service.type"]

fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For the full Metricbeat configuration options for the PostgreSQL module, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-postgresql.html).

{% include /general-shipping/replace-placeholders-metrics.html %}

* When configuring the hosts option, you must use a valid PostgreSQL URI (example: `postgresql://localhost:5432/postgres?sslmode=disable`). 

  Replace the placeholder `<<URI>>` using the following format: `[postgresql://[user[:password]@][netloc][:port][,...][/dbname][?param1=value1&...]`

  For more information about PostgreSQL URI and connection string parmeters, please see [PostgreSQL's documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="PostgrSQL" %}

</div>