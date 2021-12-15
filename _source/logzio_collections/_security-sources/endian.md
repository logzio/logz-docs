---
title: Ship logs from Endian Firewall
logo:
  logofile: endian.png
  orientation: vertical
data-source: Endian Firewall
data-for-product-source: Cloud SIEM
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - firewalls
order: 1380
---
Endian Firewall is an open-source router, firewall and gateway security Linux distribution. Deploy this integration to send logs from Endian Firewall to your to Logz.io account.


**Before you begin, you'll need**: 

* Endian Firewall installed and configured.

* Access to the Endian Firewall admin console.

* Filebeat 7 installed.

* Terminal access to the instance running Filebeat.


<div class="tasklist">


##### Ensure the Intrusion Prevention System is enabled on your Endian Firewall

1. Login to your Endian Firewall console.
2. Navigate to **Services > Intrusion Prevention**.
3. Ensure the IPS setting is enabled.
4. Ensure the **Automatically fetch SNORT rule** setting is enabled.

![IPS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/Endian/Endian-1.jpg)


##### Define log settings

1. Navigate to **CLogs and Reports > Settings**.
2. Under **Log summaries**, select **Detail level: High is selected**.
3. Under **Remote logging**, enable syslog server and enter the `<<Syslog server Address>>`.
4. Under **Protocol**, select **TCP**.
5. Under **Firewall logging**, enable all four logging options.

![Log settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/Endian/Endian-2.jpg)


{% include log-shipping/certificate.md %}


##### Configure Filebeat

1. Paste the following into the inputs section of the Filebeat configuration file:

   ```yaml
   filebeat.inputs:
   #protocol needs to be the same as the Endian log settings,
   - type: tcp
     max_message_size: 10MiB
     host: "0.0.0.0:9000"
     fields:
       logzio_codec: plain
       token: <<LOG-SHIPPING-TOKEN>>
       type: endianfw
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
   
   #For version 6.x and lower
   #filebeat.registry_file: /var/lib/filebeat/registry
   
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
   
   ############################# Output ##########################################
   
   output:
     logstash:
       hosts: ["<<LISTENER-HOST>>:5015"]
       ssl:
         certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
           
   ```
  
   * {% include log-shipping/log-shipping-token.md %}
   * {% include log-shipping/listener-var.md %}

2. Run Filebeat with the new configuration.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `endianfw` to see the incoming Endian Firewall logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
