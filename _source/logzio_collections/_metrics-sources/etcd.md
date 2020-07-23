---
title: Ship Etcd V3 metrics
logo:
  logofile:
  orientation: vertical
data-source: Etcd V3
contributors:
  - shalper
  - yotamloe
shipping-tags:
  - platform-service
---

You can ship Etcd metrics using Metricbeat.

#### Metricbeat setup

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher, Etcd 3.2 or 3.3

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


##### Add Etcd module configuration



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
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For the full Metricbeat configuration options for the Etcd module, including explanations about TLS connections, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-etcd.html).

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

* `localhost:2379` is the default address for Etcd, change it if youre runnning Etcd in a different address.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="Etcd" %}

</div>

