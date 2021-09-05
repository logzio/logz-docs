---
title: Ship etcd metrics
logo:
  logofile: etcd-logo.png
  orientation: vertical
data-source: etcd
contributors:
  - yotamloe
shipping-tags:
  - database
---

You can ship etcd metrics using Metricbeat.

#### Metricbeat setup

**Before you begin, you'll need**:

* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher
* etcd v3.2 or v3.3
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=["1m3Sqx6atnxPd7829LV2W5"] -->

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

##### Add etcd module configuration

Still in the same configuration file, copy and paste the code block below:

```yml
metricbeat.modules:
- module: etcd
  metricsets: ["metrics","store"]
  period: 10s
  hosts: ["localhost:2379"]

processors:
  - add_host_metadata: ~
  - include_fields: # Collected metrics ⬇️
      fields: ["etcd.disk.backend_commit_duration.ns.sum", "etcd.disk.mvcc_db_total_size.bytes", "etcd.disk.wal_fsync_duration.ns.sum", "etcd.network.client_grpc_received.bytes", "etcd.network.client_grpc_sent.bytes", "etcd.server.grpc_handled.count", "etcd.server.grpc_started.count", "etcd.server.has_leader", "etcd.server.leader_changes.count", "etcd.server.proposals_committed.count", "etcd.server.proposals_failed.count", "etcd.server.proposals_pending.count", "etcd.store.compareanddelete.fail", "etcd.store.compareanddelete.success", "etcd.store.compareandswap.fail", "etcd.store.compareandswap.success", "etcd.store.create.fail", "etcd.store.create.success", "etcd.store.delete.fail", "etcd.store.delete.success", "etcd.store.expire.count", "etcd.store.gets.fail", "etcd.store.gets.success", "etcd.store.sets.fail", "etcd.store.sets.success", "etcd.store.update.fail", "etcd.store.update.success", "etcd.store.watchers", "token", "logzio_codec", "event.module", "metricset.name", "host.name", "agent.hostname", "type", "service.type"]


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

For a full list of available Metricbeat configuration options for the etcd module, including explanations about TLS connections, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-etcd.html).


{% include /general-shipping/replace-placeholders-metrics.html %}

* `localhost:2379` is the default address for etcd, change it if you're runnning etcd from a different address.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="Etcd" %}

</div>

