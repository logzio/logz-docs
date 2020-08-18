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
---

You can ship PostgreSQL metrics using Metricbeat.

#### Metricbeat setup

**Before you begin, you'll need**:

* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add Logz.io to your Metricbeat configuration

Open the Metricbeat configuration file (<<PATH_TO_METRICBEAT>>/metricbeat.yml) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following Logz.io settings:


```shell
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
```

{% include metric-shipping/replace-metrics-token.html %}

##### Set Logz.io as the output

If Logz.io is not an output, add it now. Remove all other outputs.

Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `listener.logz.io`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```shell
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```


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
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For the full Metricbeat configuration options for the PostgreSQL module, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-postgresql.html).

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

* When configuring the hosts option, you must use a valid Postgresql URI (example: `postgresql://localhost:5432/postgres?sslmode=disable`). Replace the placeholder `<<URI>>` using the following format: `[postgresql://[user[:password]@][netloc][:port][,...][/dbname][?param1=value1&...]`

For more inforamtion about postgres URI and connection string parmeters, please see [PostgreSQL documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="PostgrSQL" %}

</div>