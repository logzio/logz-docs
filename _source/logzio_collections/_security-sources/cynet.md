---
title: Ship logs from Cynet
logo:
  logofile: cynet.png
  orientation: vertical
data-source: Cynet
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - firewalls
order: 1380
---
[Cynet](https://www.cynet.com/platform/) is a cybersecurity asset management platform. This topic describes how to send system logs from your Cynet platform to Logz.io. . 

**Before you begin, you'll need**: 

* An active Cynet license
* Cynet login credentials 
* An active account with Logz.io
* Filebeat 7 installed on your machine
* Root priveleges on your machines 

<div class="tasklist">


##### Configure Cynet to send syslog notifications to a remote Syslog server running Filebeat

1. On your Cynet web interface, go to **Setting > Advanced**.
![Advanced options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Cynet/cynet1.png)
2. Select the box beside **Send Audit Records to SIEM**.
3. Go to **Configuration > SIEM settings** and enable the following configuration:
![SIEM settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Cynet/cynet2.png)
   * **IP** - IP
   * **Port** - 514
   * **IP address** - `<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>`, e.g. 100.25.154.13:9000

<!-- info-box-start:info -->
By default, syslog will be forwarded over port 514. Feel free to adjust this, based on your preference or availability, but be sure to note any change to this port in the Filebeat configuration.
{:.info-box.note}
<!-- info-box-end -->

{% include log-shipping/certificate.md %}


##### Configure Filebeat

1. Paste the following into the inputs section of the Filebeat configuration file:

   ```yaml
   filebeat.inputs:
   - type: udp
     max_message_size: 10MiB
     host: "<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>"
     fields:
       logzio_codec: json
       # Your Logz.io account token. You can find your token at
       #  https://app.logz.io/#/dashboard/settings/manage-accounts
       token: <<LOG-SHIPPING-TOKEN>>
       type: cynet
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
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
  
   * Replace `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>` with the address of your server running Filebeat.
   * {% include log-shipping/log-shipping-token.md %}
   * {% include log-shipping/listener-var.md %}

2. Run Filebeat with the new configuration.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `pfsense` to see the incoming pfSense logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
