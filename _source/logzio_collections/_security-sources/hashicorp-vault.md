---
title: Ship logs from HashiCorp Vault
logo:
  logofile: hashicorp-vault.svg
  orientation: horizontal
data-source: HashiCorp Vault
data-for-product-source: Cloud SIEM
templates: [beats-logs]
contributors:
  - imnotashrimp
  - dorisnaaman
shipping-tags:
  - server-app
order: 1360
---
HashiCorp Vault secures, stores, and tightly controls access to tokens, passwords, certificates, API keys, and other secrets in modern computing. This integration allows you to send HashiCorp Vault logs to your Logz.io SIEM account.

#### Configuration

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* Root access

<div class="tasklist">

##### Configure Vault to output raw logs

Configure Vault to enable raw log output to the default location.
After making the change, start or restart Vault for the changes to take effect.

<!-- info-box-start:info -->
Disabling log hashing means that Vault will send logs in clear text. This is required at this time, because Vault supports decryption for only a limited number of fields that don’t match the fields required by Logz.io Cloud SIEM. When this limitation is resolved, the requirement to send raw logs will be lifted.
{:.info-box.important}
<!-- info-box-end -->


For more information on logging and enabling audit devices,
see [File Audit Device](https://www.vaultproject.io/docs/audit/file.html) from HashiCorp.


{% include log-shipping/certificate.md %}

##### Create your configuration file for Vault

The Filebeat configuration file is at `/etc/filebeat/filebeat.yml` by default.

<!-- info-box-start:info -->
To avoid conflicts with fields from other log sources, you'll need to run a dedicated Filebeat instance for Vault logs. This allows Filebeat to rename some fields
to keep Vault logs compatible with Logz.io.
{:.info-box.important}
<!-- info-box-end -->

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  - /var/log/vault_audit.log

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    logzio_type: vault
  fields_under_root: true
  json.keys_under_root: true
  encoding: utf-8
  ignore_older: 3h

filebeat.registry.path: /var/lib/filebeat
processors:
- rename:
    fields:
    - from: "agent"
      to: "filebeat_agent"
    ignore_missing: true
- rename:
    fields:
    - from: "log.file.path"
      to: "source"
    ignore_missing: true
- rename:
  fields:
  - from: "type"
    to: "hashi_type"
  ignore_missing: true
- rename:
  fields:
  - from: "logzio_type"
    to: "type"
  ignore_missing: true

# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
