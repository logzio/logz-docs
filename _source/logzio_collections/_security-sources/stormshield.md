---
title: Ship logs from Stormshield
logo:
  logofile: stormshield.png
  orientation: vertical
data-source: Stormshield
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
  - firewalls
order: 1280

---

**Before you begin, you'll need**:

* Stormshield syslog server configured to send logs in legacy format over port tcp/6514
* [Filebeat 7 installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* root access

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Configure Filebeat

#### NEW BUTTON
456

<!-- logzio-inject:install:grafana:dashboards ids=["4Tk1cgkBEnyrOjTuhKILto","4F0PJis1p02ZyMtuMflYyo"] -->

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following settings:

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
    token: <<LOG-SHIPPING-TOKEN>>
    type: stormshield
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h 
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
{% include log-shipping/log-shipping-token.html %}

##### Set Logz.io as the output

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.

```
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include log-shipping/listener-var.html %} 

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
