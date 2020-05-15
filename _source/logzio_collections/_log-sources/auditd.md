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

As its name suggests, auditd is a service that audits activities in a Linux environment.
It's available for most major Linux distributions.

This page gives instructions for replacing auditd with Auditbeat
so you can easily ship your audit logs to Logz.io.

#### Configuration

**Before you begin, you'll need**:
auditd,
root access

<div class="tasklist">

##### Download the Logz.io public certificate

{% include trust-chain-warning.html %}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt -O /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Install Auditbeat

Download and install [Auditbeat 6.8](https://www.elastic.co/guide/en/beats/auditbeat/6.8/auditbeat-installation.html).

##### Copy auditd rules

You need root privileges to interact with the auditd rules file.
{:.info-box.important}

Create a new `audit.rules` file to hold your audit rules for Auditbeat:

```shell
sudo touch /etc/auditbeat/audit.rules.d/audit.rules
```

Copy the auditd rules to your newly created Auditbeat rules file:

```shell
sudo su
cat /etc/audit/rules.d/audit.rules > /etc/auditbeat/audit.rules.d/audit.rules
exit
```

##### Add auditd as a source input

Open the Auditbeat configuration file (`/etc/auditbeat/auditbeat.yml`).

Paste this code block at the top of the file.

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

##### Configure Auditbeat to use the new rules file

In the `auditbeat.modules` object, find the `auditd` module.

Replace the `audit_rule_files` array with this:

```yaml
audit_rule_files: [ '/etc/auditbeat/audit.rules.d/audit.rules' ]
```

##### Set Logz.io as the output

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

##### Start Auditbeat

Stop auditd, and then start Auditbeat.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>