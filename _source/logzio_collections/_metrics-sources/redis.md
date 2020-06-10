---
title: Ship Redis metrics
logo:
  logofile: redis.svg
  orientation: vertical
data-source: Redis
contributors:
  - daniel-tk
  - shalper
---

You can ship Redis metrics using Metricbeat.

#### Metricbeat setup

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add Logz.io configuration

Replace the General configuration with Logz.io settings.

Replace `<<SHIPPING-TOKEN>>` with the token of the account you want to ship to.

```
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true

```

##### Set Logz.io as the output

If Logz.io is not an output, add it now. Remove all other outputs.

Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `listener.logz.io`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']

```


##### Add Redis module configuration



```
metricbeat.modules:
- module: redis
  metricsets: ["info", "keyspace", "key"]
  enabled: true
  key.patterns:
    - pattern: '<<KEY_NAME>>'
	period: 10s

  # Redis hosts
  hosts: ["<<REDIS-HOST>>:6379"]

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

For the full Metricbeat configuration options for the Redis module, including explanations about hosts options and key pattern syntax, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-redis.html).

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

* Replace the placeholder `<<REDIS-HOST>>` with the URL that is used to connect to Redis. The typical formats are `redis://[:password@]host[:port][/db-number][?option=value]` or `redis://HOST[:PORT][?password=PASSWORD[&db=DATABASE]`. 

* Replace the `<<KEY_NAME>>` patterns.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check [Logz.io](http://logz.io/) for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

</div>