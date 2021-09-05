---
title: Send Envoy metrics
logo:
  logofile: envoy-proxy.svg
  orientation: vertical
data-source: Envoy
contributors:
  - doron-bargo
  - shalper
shipping-tags:
  - networking
---

Envoy is a cloud-native high-performance proxy and a recognized [CNCF project](https://cncf-branding.netlify.app/projects/envoy/).

You can send Envoy metrics to Logz.io using Metricbeat.

<!-- info-box-start:info -->
Please note that the following configuration needs to be performed on all relevant Envoy client nodes.
{:.info-box.important}
<!-- info-box-end -->
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=["1m3Sqx6atnxPd7829LV2W5"] -->

#### Metricbeat setup

**Before you begin, you'll need**:

* [Metricbeat 7.6](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation-configuration.html) or higher.
* Check that Envoy's metrics are available at [http://localhost:19000/stats?format=prometheus](http://localhost:19000/stats?format=prometheus)

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Add Prometheus module configuration

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following settings:

```yml
metricbeat.modules:
- module: prometheus 
  period: 10s
  hosts: ["localhost:19000"]
  metrics_path: /stats
  query:
    format: prometheus
```

##### Add Logzio fields

Still in the same configuration file, copy and paste the code block below to set Logzio required fields:

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


The final file should look like this:

```yml
metricbeat.modules:
- module: prometheus 
  period: 10s
  hosts: ["localhost:19000"]
  metrics_path: /stats
  query:
    format: prometheus

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

{% include metric-shipping/open-dashboard.md title="Envoy" %}

</div>
