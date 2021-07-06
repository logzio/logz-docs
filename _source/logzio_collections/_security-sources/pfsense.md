---
title: Ship logs from pfSense
logo:
  logofile: pfsense-logo.png
  orientation: vertical
data-source: pfSense
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - endpoint-security
order: 1380
---

**Before you begin, you'll need**: 

* pfSense installed and configured on your machine
* an active account with Logz.io
* Filebeat 6 or later installed on your machine
* Root priveleges on your machines 

<div class="tasklist">


##### Configure pfSense to send syslog notifications to a remote Syslog server running Filebeat

1. Access your Pfsense firewall web interface.
2. On Pfsense Dashboard, navigate to the Pfsense Status menu and select **System logs**.
3. On the System logs screen, select **Settings**.
4. On the Settings tab, locate the **Remote Logging Options** area and enable the following configuration:
   * Enable Remote Logging - Yes
   * Source Address - Any
   * IP Protocol - IPV4
   * Remote log servers - `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>`:514
   * Remote Syslog Contents - Everything
   * Log message format - syslog (RFC 5424, with RFC 3339 microsecond-precision timestamps).
5. Replace `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>` with the address of your server running Filebeat.
6. Save the changes.
   <!-- info-box-start:info -->
   By default, syslog will be forwarded over port 514. Feel free to adjust this, based on your preference or availability, but be sure to note any change to this port in the Filebeat configuration.
   {:.info-box.note}
   <!-- info-box-end -->

{% include log-shipping/certificate.md %}


##### Configure Filebeat

1. Paste the following into the Inputs section of the Filebeat configuration file:

   ```yaml
   
   filebeatilebeat.inputs:
       - type: udp
       max_message_size: 10MiB
       host: "`<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>`:514"
       fields:
           logzio_codec: plain
           # Your Logz.io account token. You can find your token at
           #  https://app.logz.io/#/dashboard/settings/manage-accounts
           token: <<LOG-SHIPPING-TOKEN>>
           type: pfsense
       fields_under_root: true
       encoding: utf-8
       ignore_older: 3h
   
   ```

2. Replace `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>` with the address of your server running Filebeat.
3. {% include log-shipping/log-shipping-token.md %}
4. Add the following code block to the same section:
   * For Filebeat 7:

      ```yaml
      
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

   * For Filebeat 6:
   
      ```yaml
      
      registry_file: /var/lib/filebeat/registry
      
      ```

5. Paste the following into the Inputs section of the Filebeat configuration file:

   ```yaml
   
   output.logstash:
               hosts: ["<<LISTENER-HOST>>:5015"]
               ssl:
                 certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
   
   ```

6. {% include log-shipping/listener-var.md %}


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `pfsense` to see the incoming pfSense logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
