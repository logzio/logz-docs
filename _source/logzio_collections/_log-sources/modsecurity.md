---
title: Ship ModSecurity logs
logo:
  logofile: modsec.png
  orientation: horizontal
data-source: ModSecurity
contributors:
  - dorisnaaman
  - shalper
shipping-tags:
  - security
---

#### Configure Filebeat 

**Before you begin, you'll need**:

* Apache2 Web Server and Terminal access to the instance running it
* [ModSecurity module installed](https://github.com/SpiderLabs/ModSecurity) 
* [OWASP ModSecurity Core Rule Set (CRS) imported](https://github.com/SpiderLabs/owasp-modsecurity-crs)
* [Filebeat 7 installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)

<div class="tasklist">

{% include log-shipping/certificate.md server="to your Filebeat server" %}

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor. Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

{% include log-shipping/replace-vars.html token=true %}

```yml
### Filebeat ###
filebeat.inputs:

- type: log
  paths:
    - /var/log/apache2/error.log
  fields:
    logzio_codec: json
    token: <<SHIPPING-TOKEN>>
    type: modsecurity
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

#For version 6.x and lower
#filebeat.registry_file: /var/lib/filebeat/registry

# For version 7 and higher
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

### Output ###
output:
  logstash:
    hosts: ["<<LISTENER-HOST>>:5015"]
    ssl:
      certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in your Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>