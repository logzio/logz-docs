---
title: Ship logs from OpenVPN
logo:
  logofile: openvpn.png
  orientation: vertical
data-source: OpenVPN
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - firewalls
order: 1380
---
[OpenVPN](https://openvpn.net) is a virtual private network system for secure point-to-point or site-to-site connections.



**Before you begin, you'll need**: 

* OpenVPN installed and configured on your machine
* an active account with Logz.io
* Filebeat 7 installed on your machine
* Root priveleges on your machines 

<div class="tasklist">


{% include log-shipping/certificate.md %}


##### Configure Filebeat

1. Paste the following into the inputs section of the Filebeat configuration file:

   ```yaml
   filebeat.inputs:
   - type: log
     paths:
       - /var/log/openvpnas.log.*
       - /var/log/messages
     fields:
       logzio_codec: json
       # Your Logz.io account token. You can find your token at
       #  https://app.logz.io/#/dashboard/settings/manage-accounts
       token: <<LOG-SHIPPING-TOKEN>>
       type: openvpn
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
     multiline.type: pattern
     multiline.pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+[0-9]{4} \[\S+\]( {2,}| \})'
     multiline.negate: false
     multiline.match: after
   filebeat.registry.path: /var/lib/filebeat
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
   output.logstash:
     hosts: ["<<LISTENER-HOST>>:5015"]
     ssl:
       certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
   ```
  
   * {% include log-shipping/log-shipping-token.md %}
   * {% include log-shipping/listener-var.md %}

2. Run Filebeat with the new configuration.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `openvpn` to see the incoming OpenVPN logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
