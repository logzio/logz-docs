---
title: Ship Redis metrics
logo:
  logofile: redis.svg
  orientation: vertical
data-source: Redis
contributors:
  - daniel-tk
  - shalper
shipping-tags:
  - database
order: 1000
---

You can ship Redis metrics using Metricbeat.

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


##### Add Redis module configuration

Still in the same configuration file, copy and paste the code block below:

```yml
metricbeat.modules:
- module: redis
  metricsets: ["info", "keyspace", "key"]
  enabled: true
  key.patterns:
    - pattern: '<<KEY_NAME>>'
	period: 10s

  # Redis hosts
  hosts: ["<<REDIS-HOST>>:6379"]

processors:
  - add_host_metadata: ~
  - include_fields: # Collected metrics
      fields: ['token','logzio_codec','event.module','metricset.name','host.name','agent.hostname', 'redis.info.clients.blocked', 'redis.info.clients.connected', 'redis.info.cpu.used.sys', 'redis.info.cpu.used.user', 'redis.info.memory.fragmentation.ratio', 'redis.info.memory.used.value', 'redis.info.slowlog.count', 'redis.info.stats.keys.evicted', 'redis.info.stats.keyspace.hits', 'redis.info.stats.keyspace.misses', 'redis.info.stats.net.input.bytes', 'redis.info.stats.net.output.bytes', 'redis.key.id', 'redis.keyspace.id']

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

For a full list of available Metricbeat configuration options for the Redis module, including explanations about hosts and key pattern syntax, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-redis.html).

{% include /general-shipping/replace-placeholders-metrics.html %}

* Replace the placeholder `<<REDIS-HOST>>` with the URL that is used to connect to Redis. The typical formats are `redis://[:password@]host[:port][/db-number][?option=value]` or `redis://HOST[:PORT][?password=PASSWORD[&db=DATABASE]`.

* Replace the `<<KEY_NAME>>` patterns.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/metrics/).

</div>
