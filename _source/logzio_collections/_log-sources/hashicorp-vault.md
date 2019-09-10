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

## Setup

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
root access

1.  Configure Vault for raw log output

    Start or restart Vault,
    enabling raw log output to the default location.

    Raw log output disables log hashing
    so Filebeat can read the log files.

    ```shell
    vault audit enable file file_path=/var/log/vault_audit.log log_raw=true
    ```

    For more information on logging and enabling audit devices,
    see [File Audit Device](https://www.vaultproject.io/docs/audit/file.html) from HashiCorp.

2.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

3.  Add Vault as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Vault to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    # ...
    filebeat.inputs:
    - type: log

      paths:
      - /var/log/vault_audit.log

      fields:
        logzio_codec: json

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <<SHIPPING-TOKEN>>
        logzio_type: vault
      fields_under_root: true
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
    ```

4.  Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    # ...
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

5.  Start Filebeat

    Start or restart Filebeat for the changes to take effect.

6.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}
