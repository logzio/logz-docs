---
title: Shipping with Metricbeat
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Metricbeat for Windows
shipping-tags:
  - log-shipper
contributors:
  - imnotashrimp
  - boofinka
  - shalper
---

#### Metricbeat setup

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/7.1/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the
[Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt)
to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.


##### Make your configuration file

Replace the General configuration with Logz.io settings and set Logz.io as the output.

```yaml
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true

# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/grafana).