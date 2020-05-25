---
title: Ship Cisco ASA Server logs
logo:
  logofile: cisco.svg
  orientation: vertical
data-source: Cisco ASA
templates: ["network-device-filebeat"]
contributors:
  - shalper
  - imnotashrimp
shipping-tags:
  - server-app
  - security
---

#### Configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Cisco ASA Server logging

Configure your Cisco ASA firewall to send logs to your Filebeat server.
Make sure you meet this configuration:

* Log format: syslog
* Send over: TCP
* IP address: Filebeat server IP address
* Port 6514

See [Cisco docs](https://www.cisco.com/c/en/us/support/security/index.html) for more information
on configuring your Cisco ASA firewall.

##### Download the Logz.io public certificate to your Filebeat server

{% include trust-chain-warning.html %}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add TCP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add TCP to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:6514"

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: cisco-asa
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
# ... For Filebeat 7 only ...
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
```

If you're running Filebeat 6, paste this code block.

```yaml
# ... For Filebeat 6 only ...
registry_file: /var/lib/filebeat/registry
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
(Remove all other outputs - there should only be 1 output in the configuration file.) 

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
