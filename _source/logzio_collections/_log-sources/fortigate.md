---
title: Ship FortiGate logs
logo:
  logofile: fortinet.svg
  orientation: vertical
data-source: FortiGate
contributors:
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

##### Configure FortiGate logging

Configure your FortiGate firewall to send logs to your Filebeat server.
Make sure you meet this configuration:

* Log format: syslog
* Send over: UDP
* IP address: Filebeat server IP address
* Port 514

See the [FortiGate docs](https://docs.fortinet.com/product/fortigate/) for more information
on configuring your FortiGate firewall.

###### Sample commands for FortiOS 6.2

```
config log syslogd setting
set status enable
set format default
set server <FILEBEAT-SERVER-IP-ADDR>
set port 514
end
```

##### Download the Logz.io public certificate to your Filebeat server

Starting May 26, 2020, we'll be transitioning our listener servers
to a new public certificate.
To make sure your shipped data arrives at your account,
we recommend using both the old and new certificates
as soon as possible,
and including both certificates in your Filebeat configuration.
After June 1, 2020, you can safely remove the old certificate.
{:.info-box.important}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Add UDP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add UDP to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: udp
  max_message_size: 10MiB
  host: "0.0.0.0:514"

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: fortigate
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
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
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
