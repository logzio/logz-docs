---
title: Ship MongoDB metrics
logo:
  logofile: mongodb.svg
  orientation: vertical
data-source: MongoDB
contributors:
  - yotamloe
  - shalper
shipping-tags:
  - database
---

You can ship MongoDB metrics using Metricbeat.

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

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

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

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.

```shell
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```
{% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Add MongoDB module configuration

Still in the same configuration file, copy and paste the code block below:

```yml
- module: mongodb
  metricsets: ["dbstats", "status", "collstats", "metrics", "replstatus"]
  period: 10s
  enabled: true
  hosts: ["mongodb://<<USER>>:<<PASS>>@localhost:27017"]

processors:
  - add_host_metadata: ~

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

For a full list of available Metricbeat configuration options for the MongoDB module, including explanations about SSL options, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-mongodb.html).


##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

* The hosts must be passed as MongoDB URLs in the format: `[mongodb://][user:pass@]host[:port]`

* Replace the placeholders `<<USER>>` and `<<PASS>>` with your MongoDB credentials.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="MongoDB" %}

</div>
