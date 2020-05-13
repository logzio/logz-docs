---
title: Ship logs from HashiCorp Vault
logo:
  logofile: hashicorp-vault.svg
  orientation: horizontal
data-source: HashiCorp Vault
contributors:
  - imnotashrimp
  - dorisnaaman
shipping-tags:
  - security
---

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Vault for raw log output

Start or restart Vault,
enabling raw log output to the default location.

Raw log output disables log hashing
so Filebeat can read the log files.

```shell
vault audit enable file file_path=/var/log/vault_audit.log log_raw=true
```

For more information on logging and enabling audit devices,
see [File Audit Device](https://www.vaultproject.io/docs/audit/file.html) from HashiCorp.

##### Download the Logz.io public certificate

**Action required**:
Starting May 26, 2020, we'll transition our listener servers
to a new public SSL certificate.
Before that date,
you'll need to include both the old and new certificates
in your configurations. \\
\\
**If you send encrypted data without using both certificates after May 26,
that data might not arrive at your Logz.io account or be archived.** \\
\\
You can safely remove the old certificate
after June 5, 2020.
{:.info-box.warning}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Create your configuration file for Vault

The Filebeat configuration file is at `/etc/filebeat/filebeat.yml` by default.

To avoid conflicts with fields from other log sources,
you'll need to run a dedicated Filebeat instance for Vault logs.
This allows Filebeat to rename some fields
to keep Vault logs compatible with Logz.io.
{:.info-box.important}

{% include log-shipping/replace-vars.html token=true %} \\
{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  - /var/log/vault_audit.log

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
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
    certificate_authorities:
      - '/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt'
      - '/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt'
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>