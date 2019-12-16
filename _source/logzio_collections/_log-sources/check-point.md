---
title: Ship Check Point logs
logo:
  logofile: check-point.png
  orientation: vertical
data-source: Check Point
contributors:
  - imnotashrimp
shipping-tags:
  - security
  - server-app
---

#### Configuration

**Before you begin, you'll need**:
[Check Point Log Exporter](https://supportcenter.checkpoint.com/supportcenter/portal?eventSubmit_doGoviewsolutiondetails=&solutionid=sk122323),
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Check Point Log Exporter

Configure your Check Point Log Exporter to send logs to your Filebeat server.

For complete details on configuring Log Exporter, see
[_Log Exporter - Check Point Log Export_](https://supportcenter.checkpoint.com/supportcenter/portal?eventSubmit_doGoviewsolutiondetails=&solutionid=sk122323)
from Check Point.
{:.info-box.read}

###### Option 1: Export logs for all domains

```shell
cp_log_export add name logzio_filebeat_exporter \
target-server <<FILEBEAT-IP-ADDRESS>> \
target-port 514 \
protocol udp \
format syslog \
--apply-now
```

###### Option 2: Export logs for a specific domain

```shell
cp_log_export add name logzio_filebeat_exporter \
domain-server <<YOUR-DOMAIN>> \
target-server <<FILEBEAT-IP-ADDRESS>> \
target-port 514 \
protocol udp \
format syslog \
--apply-now
```

If you restart the management server, you'll need to run `cp_log_export` again
to restart the exporter.
{:.info-box.note}

##### Download the Logz.io certificate to your Filebeat server

```shell
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
    type: checkpoint
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
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
