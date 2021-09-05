---
title: Ship HashiCorp Consul metrics
logo:
  logofile: consul1.png
  orientation: vertical
data-source: HashiCorp Consul
contributors:
  - doron-bargo
  - shalper
shipping-tags:
  - networking
---

You can ship HashiCorp Consul metrics using Metricbeat.

You will need to repeat the following procedure for each Consul server and client that will be sending metrics to Logz.io.

#### Metricbeat setup

**Before you begin, you'll need**:
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=["1m3Sqx6atnxPd7829LV2W5"] -->

* [Metricbeat 7.6](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation-configuration.html) or higher.

<div class="tasklist">


##### Update Consul configuration with the telemetry stanza

Go to one of the Consul servers and create a new file named prometheus.json under your Consul config library. ( It's usually under `/etc/consul.d`.)

Update the file with the following telemetry stanza:

```shell
{
  "telemetry": {
    "disable_hostname": true,
    "prometheus_retention_time": "72h"
  }
}
```

Save the file and restart the Consul on the server.

##### Test the localhost on the Consul server

Now the metrics for this Consul server will be exposed locally in Prometheus format under the following endpoint:

```
http://127.0.0.1:8500/v1/agent/metrics?format=prometheus
```

{% include metric-shipping/certificate.md %}

##### Set metricbeat modules on Consul servers

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the required module settings:

```yml
metricbeat.modules:
- module: prometheus
  period: 10s
  hosts: ["localhost:8500"]
  metrics_path: /v1/agent/metrics
  query:
    format: prometheus
  processors:
    - add_fields:
        fields:
          module: consul

- module: system
  metricsets:
    - cpu              # CPU usage
    - load             # CPU load averages
    - memory           # Memory usage
    - network          # Network IO
    - diskio
  enabled: true
  period: 10s
  cpu.metrics:  ["percentages","normalized_percentages"]  # The other available option is ticks.
  processors:
    - add_fields:
        fields:
          module: consul
```

##### Add Logz.io to your Metricbeat configuration

Still in the same configuration file, copy and paste the code block below with the following Logz.io settings:

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


The final metricbeat.yml file should look like this:


```yml
- module: prometheus
  period: 10s
  hosts: ["localhost:8500"]
  metrics_path: /v1/agent/metrics
  query:
    format: prometheus
  processors:
    - add_fields:
        fields:
          module: consul

- module: system
  metricsets:
    - cpu              # CPU usage
    - load             # CPU load averages
    - memory           # Memory usage
    - network          # Network IO
    - diskio
  enabled: true
  period: 10s
  cpu.metrics:  ["percentages","normalized_percentages"]  # The other available option is ticks.
  processors:
    - add_fields:
        fields:
          module: consul

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


##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="Consul" %}

</div>
