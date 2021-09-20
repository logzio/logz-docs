---
title: Ship Apache Storm logs
logo:
  logofile: apache-storm.png
  orientation: vertical
short-description: Use Filebeat - a lightweight open source agent - to send Apache Storm logs to Logz.io.
data-source: Apache Storm
templates: [beats-logs]
contributors:
  - nshishkin
shipping-tags:
  - server-app
order: 120
---

#### Step by step

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) installed
* Port 5015 open.
* Root access

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Find Apache Storm log location

Run the following command to find your Apache Storm logs directory:

```shell
ps -o args= -C java | grep -Po -- '-Dstorm.log.dir=\K[^\s]+'
```



##### Add Apache Storm as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.


{% include log-shipping/log-shipping-token.html %} Replace `<<LOGS_DIRECTORY>>` with the path to your Apache Storm logs directory mentioned in the step above. 

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  - <<LOGS_DIRECTORY>>/*.log
  - /<<LOGS_DIRECTORY>>/workers-artifacts/*/*/*.log*

  exclude_files: ['.gz$']

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: apache_storm
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

```

If you're running Filebeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
# For Filebeat 7 and higher
filebeat.registry.path: /var/lib/filebeat
# The following processors are to ensure compatibility with version 7
processors:
- rename:
    fields:
    - from: "agent"
      to: "beat_agent"
    ignore_missing: true
- rename:
    fields:
    - from: "log.file.path"
      to: "source"
    ignore_missing: true
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

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). You can search for `type:apache OR apache_access OR apache-access` to filter for your Apache logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
