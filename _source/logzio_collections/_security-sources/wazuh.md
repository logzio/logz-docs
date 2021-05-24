---
title: Ship logs from Wazuh
logo:
  logofile: wazuh.svg
  orientation: vertical
data-source: Wazuh
templates: [beats-logs]
contributors:
  - imnotashrimp
  - schwin007
shipping-tags:
  - endpoint-security
  - popular
order: 940
---

#### Configuration

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or [Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)
* Root access

<div class="tasklist">

##### Configure Wazuh for JSON logging

In the Wazuh configuration file (/var/ossec/etc/ossec.conf), find the `<logging>` tag, and set the `<log_format>` property to `json`.

```xml
<logging>
  <log_format>json</log_format>
</logging>
```

Restart Wazuh.

```shell
sudo systemctl restart wazuh-manager
```

{% include log-shipping/certificate.md %}

##### Add Wazuh as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Wazuh to the filebeat.inputs section.

{% include log-shipping/log-shipping-token.html %}

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  - /var/ossec/logs/alerts/alerts.json

  fields:
    logzio_codec: json

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    type: wazuh
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

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).


You can search for `type:wazuh` to filter for your logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.


If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
