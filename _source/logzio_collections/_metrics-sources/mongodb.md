---
title: Ship MongoDB metrics
logo:
  logofile:
  orientation: vertical
data-source: MongoDB
contributors:
  - shalper
  - yotamloe
shipping-tags:
  - platform-service
---

You can ship MongoDB metrics using Metricbeat.

#### Metricbeat setup

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add Logz.io configuration

Replace the General configuration with Logz.io settings.

{% include metric-shipping/replace-metrics-token.html %}

```shell
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now. Remove all other outputs.

Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `listener.logz.io`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```shell
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```


##### Add MongoDB module configuration



```yml
- module: mongodb
  metricsets: ["dbstats", "status", "collstats", "metrics", "replstatus"]
  period: 10s
  enabled: true
  hosts: ["mongodb://<<USER>>:<<PASS>>@localhost:27017"]

processors:
  - add_host_metadata: ~
  - include_fields: # Collected metrics ⬇️
      fields: ["mongodb.dbstats.avg_obj_size.bytes", "mongodb.dbstats.collections", "mongodb.dbstats.data_size.bytes", "mongodb.dbstats.db", "mongodb.dbstats.index_size.bytes", "mongodb.dbstats.indexes", "mongodb.dbstats.num_extents", "mongodb.dbstats.objects", "mongodb.dbstats.storage_size.bytes", "mongodb.status.active_clients.total", "mongodb.status.asserts.msg", "mongodb.status.asserts.regular", "mongodb.status.asserts.rollovers", "mongodb.status.asserts.user", "mongodb.status.asserts.warning", "mongodb.status.connections.available", "mongodb.status.connections.current", "mongodb.status.connections.total_created", "mongodb.status.global_lock.active_clients.readers", "mongodb.status.global_lock.active_clients.total", "mongodb.status.global_lock.active_clients.writers", "mongodb.status.global_lock.current_queue.readers", "mongodb.status.global_lock.current_queue.total", "mongodb.status.global_lock.current_queue.writers", "mongodb.status.global_lock.total_time.us", "mongodb.status.locks.collection.acquire.count.R", "mongodb.status.locks.collection.acquire.count.W", "mongodb.status.locks.collection.acquire.count.r", "mongodb.status.locks.collection.acquire.count.w", "mongodb.status.locks.database.acquire.count.R", "mongodb.status.locks.database.acquire.count.W", "mongodb.status.locks.database.acquire.count.r", "mongodb.status.locks.database.acquire.count.w", "mongodb.status.locks.global.acquire.count.R", "mongodb.status.locks.global.acquire.count.W", "mongodb.status.locks.global.acquire.count.r", "mongodb.status.locks.global.acquire.count.w", "mongodb.status.locks.global.wait.count.R", "mongodb.status.locks.global.wait.count.W", "mongodb.status.locks.global.wait.count.r", "mongodb.status.locks.global.wait.count.w", "mongodb.status.locks.global.wait.us.R", "mongodb.status.locks.global.wait.us.W", "mongodb.status.locks.global.wait.us.r", "mongodb.status.locks.global.wait.us.w", "mongodb.status.locks.oplog.acquire.count.R", "mongodb.status.locks.oplog.acquire.count.W", "mongodb.status.locks.oplog.acquire.count.r", "mongodb.status.locks.oplog.acquire.count.w", "mongodb.status.memory.resident.mb", "mongodb.status.memory.virtual.mb", "mongodb.status.network.in.bytes", "mongodb.status.network.out.bytes", "mongodb.status.network.requests", "mongodb.status.ops.counters.command", "mongodb.status.ops.counters.delete", "mongodb.status.ops.counters.getmore", "mongodb.status.ops.counters.insert", "mongodb.status.ops.counters.query", "mongodb.status.ops.counters.update", "mongodb.status.ops.latencies.commands.count", "mongodb.status.ops.latencies.commands.latency", "mongodb.status.ops.latencies.reads.count", "mongodb.status.ops.latencies.reads.latency", "mongodb.status.ops.latencies.writes.count", "mongodb.status.ops.latencies.writes.latency", "mongodb.status.ops.replicated.command", "mongodb.status.ops.replicated.delete", "mongodb.status.ops.replicated.getmore", "mongodb.status.ops.replicated.insert", "mongodb.status.ops.replicated.query", "mongodb.status.ops.replicated.update", "mongodb.status.wired_tiger.cache.dirty.bytes", "mongodb.status.wired_tiger.cache.maximum.bytes", "mongodb.status.wired_tiger.cache.pages.evicted", "mongodb.status.wired_tiger.cache.pages.read", "mongodb.status.wired_tiger.cache.pages.write", "mongodb.status.wired_tiger.cache.used.bytes", "mongodb.status.wired_tiger.concurrent_transactions.read.available", "mongodb.status.wired_tiger.concurrent_transactions.read.out", "mongodb.status.wired_tiger.concurrent_transactions.read.total_tickets", "mongodb.status.wired_tiger.concurrent_transactions.write.available", "mongodb.status.wired_tiger.concurrent_transactions.write.out", "mongodb.status.wired_tiger.concurrent_transactions.write.total_tickets", "mongodb.status.wired_tiger.log.flushes", "mongodb.status.wired_tiger.log.max_file_size.bytes", "mongodb.status.wired_tiger.log.scans", "mongodb.status.wired_tiger.log.size.bytes", "mongodb.status.wired_tiger.log.syncs", "mongodb.status.wired_tiger.log.write.bytes", "mongodb.status.wired_tiger.log.writes", "token", "logzio_codec", "event.module", "metricset.name", "host.name", "agent.hostname", "type", "service.type"]

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

For the full Metricbeat configuration options for the Mongo DB module, including explanations about SSL oprions, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-mongodb.html).

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

* The hosts must be passed as MongoDB URLs in the format: `[mongodb://][user:pass@]host[:port]`

* Replace the placeholders `<<USER>>` and `<<PASS>>` with your Mongo DB credentials.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="MongoDB" %}

</div>