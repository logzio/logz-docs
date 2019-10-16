---
title: Ship system metrics
logo:
  logofile: gauge.svg
  orientation: vertical
data-source: System
contributors:
  - imnotashrimp
shipping-tags:
  - os
  - container
---

#### Configuration

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/7.1/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io certificate

Download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Add Logz.io configuration

Replace the General configuration with Logz.io settings.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
```

##### Add Logz.io as an output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### _(If needed)_ Enable the system module

The system module is enabled by default.
If you've disabled it for any reason, re-enable it now.

```shell
sudo metricbeat modules enable system
```

You can change the metrics collected by Metricbeat by modifying `modules.d/system.yml`.
If you installed Metricbeat from a package manager, this directory is under `/etc/metricbeat`.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

</div>
