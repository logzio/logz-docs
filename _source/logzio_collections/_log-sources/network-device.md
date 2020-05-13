---
title: Ship logs from network devices
logo:
  logofile: network-device.svg
  orientation: horizontal
data-source: Network device
contributors:
  - imnotashrimp
  - schwin007
shipping-tags:
  - server-app
---

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure your device

Configure your network device to send logs to your Filebeat server, TCP port 9000.
See your device's documentation if you're not sure how to do this.

##### Download the Logz.io public certificate to your Filebeat server

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

##### Add TCP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add TCP to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:9000"

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: network-device
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
