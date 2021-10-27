---
title: Ship logs from McAfee ePolicy Orchestrator
logo:
  logofile: mcafee.svg
  orientation: vertical
data-source: McAfee ePolicy Orchestrator
data-for-product-source: Cloud SIEM
templates: ["network-device-filebeat"]
contributors:
  - imnotashrimp
shipping-tags:
  - endpoint-security
order: 1350
---

#### Configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure McAfee ePO server to forward logs to Filebeat

You'll need to configure McAfee ePO server to forward logs to Filebeat over port 6514.

For more information, see
[Register syslog servers](https://docs.mcafee.com/bundle/epolicy-orchestrator-5.10.0-product-guide/page/GUID-5C5332B3-837A-4DDA-BE5C-1513A230D90A.html)
from McAfee.

##### Install the McAfee certificate on your Filebeat server

McAfee ePO sends encrypted data,
so you'll need to install the McAfee certificate on the Filebeat server.

```shell
sudo mkdir /etc/filebeat/certificates
sudo openssl req -newkey rsa:2048 -nodes \
-keyout /etc/filebeat/certificates/McAfeeEpo.key -x509 \
-days 365 \
-out /etc/filebeat/certificates/McafeeEpo.crt
```

{% include log-shipping/certificate.md %}

##### Add TCP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add TCP to the filebeat.inputs section.

{% include log-shipping/log-shipping-token.html %}

```yaml
# ...
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:6514"
  ssl.enabled: true
  ssl.certificate: "/etc/filebeat/certificates/McAfeeEpo.crt"
  ssl.key: "/etc/filebeat/certificates/McAfeeEpo.key"
  ssl.verification_mode: none

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    type: mcafee_epo
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

{% include log-shipping/listener-var.html %} 

```yaml
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
