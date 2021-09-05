---
title: Ship MySQL metrics
logo:
  logofile: mysql.svg
  orientation: horizontal
data-source: MySQL
contributors:
  - shalper
  - yotamloe
shipping-tags:
  - database
order: 280
---

You can ship MySQL metrics using Metricbeat.
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=['1m3Sqx6atnxPd7829LV2W5'] -->


#### Metricbeat setup

**Before you begin, you'll need**:

* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher.

<div class="tasklist">

{% include log-shipping/certificate.md %}

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



##### Add MySQL module configuration

Still in the same configuration file, copy and paste the code block directly below:


```yml
metricbeat.modules:
- module: mysql
  metricsets:
    - "status"
    #- "galera_status"
  period: 10s

  # Host DSN should be defined as "user:pass@tcp(127.0.0.1:3306)/"
  # or "unix(/var/lib/mysql/mysql.sock)/",
  hosts: ["<<USERNAME>>:<<PASSWORD>>@tcp(127.0.0.1:3306)/"]

processors:
  - add_host_metadata: ~
  - include_fields: # Collected metrics
      fields: ["mysql.status.bytes.received", "mysql.status.bytes.sent", "mysql.status.command.delete", "mysql.status.command.insert", "mysql.status.command.select", "mysql.status.command.update", "mysql.status.connections", "mysql.status.open.files", "mysql.status.opened", "mysql.status.threads.created", "mysql.status.threads.running", "event.module", "metricset.name", "agent.hostname", "host.name","token","logzio_codec","type","service.type"]

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

For a full list of available Metricbeat configuration options for the MySQL module, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-mysql.html).

{% include /general-shipping/replace-placeholders-metrics.html %}

* Replace the placeholders `<<USERNAME>>` and `<<PASSWORD>>` with your MySQL credentials.

* When configuring the hosts option, you'll need to use a valid MySQL data source name of the following format: `[username[:password]@][protocol[(address)]]/`

* `@tcp(127.0.0.1:3306)` is the default address for MySQL. Change it if you're runnning MySQL on a different port.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="MySQL" %}

</div>