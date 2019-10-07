---
title: Ship auditd logs
logo:
  logofile: linux.svg
  orientation: vertical
data-source: auditd
contributors:
  - imnotashrimp
shipping-tags:
  - security
---

## Setup

As its name suggests, auditd is a service that audits activities in a Linux environment.
It's available for most major Linux distributions.

This page gives instructions for replacing auditd with Auditbeat
so that you can easily ship your audit logs to Logz.io.

###### Configuration

**You'll need**:
auditd,
root access

1.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

2.  Install Auditbeat 6

    Download and install Auditbeat version 6.
    Follow the distribution-specific instructions at
    [Elastic's docs](https://www.elastic.co/guide/en/beats/auditbeat/6.0/auditbeat-installation.html).

3.  Add auditd as a source input

    Paste this code block
    at the top of the Auditbeat configuration file (`/etc/auditbeat/auditbeat.yml`).

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    # ...
    fields:
      type: auditd
      logzio_codec: json
      token: <<SHIPPING-TOKEN>>
    fields_under_root: true

    processors:
    - rename:
        fields:
        - from: "agent"
          to: "beat_agent"
        ignore_missing: true
    - rename:
        fields:
        - from: "log.file.path"
          to: "source_auditd"
        ignore_missing: true
    ```

4.  Paste your auditd rules

    Copy the contents of your auditd rules file
    (usually located at `/etc/audit/rules.d/audit.rules`).

    In the Auditbeat config file,
    add a line below `kernal.audit_rules: |`,
    and indent two spaces.

    Paste the text you copied from the auditd rules file.

    The text you paste from the auditd rules file
    must be indented two spaces from the line above it.
    Otherwise, your config YAML won't be valid.
    {:.info-box.important}

5.  Replace the output with Logz.io

    Remove the output section in the configuration,
    and replace it with this code block.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    # ...
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

6.  Start Auditbeat

    Stop auditd, and then start Auditbeat.

7.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}