---
title: Ship logs from Sophos
logo:
  logofile: sophos-shield.png
  orientation: vertical
data-source: Sophos
contributors:
  - shalper
shipping-tags:
    
---

**Before you begin, you'll need**:

* Sophos installed
* Access to the Sophos Central Cloud console
* [Filebeat 7 installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* Terminal access to the instance running Filebeat. It is recommended to run the Sophos API script from the same instance running your Filebeat. 



<div class="tasklist">

##### Configure Sophos to collect the Central Cloud logs

Follow the official instructions provided by Sophos for [collecting Sophos Central Cloud logs from all machines](https://support.sophos.com/support/s/article/KB-000036372?language=en_US).

The procedure involves using the Sophos API.

{% include log-shipping/certificate.md server="to your Filebeat server" %}

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following settings:

```yaml
#...
filebeat.inputs:

- type: log
  paths:
    - <<FILE_PATH.TXT>>
  fields:
    logzio_codec: json
    token: <<SHIPPING-TOKEN>>
    type: sophos_endpoint
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

#For version 7 and higher
filebeat.registry.path: /var/lib/filebeat

#The following processors are to ensure compatibility with version 7
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
    
#... Output

output:
  logstash:
    hosts: ["<<LISTENER-HOST>>"]
    ssl:
      certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include log-shipping/replace-vars.html listener=true %}

{% include log-shipping/replace-vars.html token=true %}

Change `<<FILE_PATH.TXT>>` to the output text file retrieved from the Sophos siem.py script.


One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
