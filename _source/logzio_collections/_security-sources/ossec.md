---
title: Ship logs from OSSEC
logo:
  logofile: ossec.png
  orientation: vertical
data-source: OSSEC
templates: [beats-logs]
contributors:
  - imnotashrimp
  - schwin007
shipping-tags:
  - endpoint-security
order: 1290

---
#### Filebeat configuration

#### NEW BUTTON
456

<!-- logzio-inject:install:grafana:dashboards ids=['4Tk1cgkBEnyrOjTuhKILto','4F0PJis1p02ZyMtuMflYyo'] -->

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or [Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)
* Root access
* Port 5015 open


<div class="tasklist">

##### Configure OSSEC to output JSON alerts

In the OSSEC configuration file (/var/ossec/etc/ossec.conf), find the `<global>` tag.
Add the `<jsonout_output>` property and set to `yes`.

```xml
<global>
  <jsonout_output>yes</jsonout_output>
</global>
```

Restart OSSEC.

```shell
sudo /var/ossec/bin/ossec-control restart
```

{% include log-shipping/certificate.md %}

##### Add OSSEC as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add OSSEC to the filebeat.inputs section.

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
    type: ossec
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

The above assumes the following defaults:

* Log locations (JSON format) - `/var/ossec/logs/alerts/alerts.json`
* Log locations (plain text format) - `/var/ossec/logs/alerts/alerts.log`

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


You can search for `type:ossec` to filter for your logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.


If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>