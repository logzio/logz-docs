1. Paste the following into the inputs section of the Filebeat configuration file:

   ```yaml
   filebeat.inputs:
   - type: udp
     max_message_size: 10MiB
     host: "<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>:514"
     fields:
       logzio_codec: plain
       # Your Logz.io account token. You can find your token at
       #  https://app.logz.io/#/dashboard/settings/manage-accounts
       token: <<LOG-SHIPPING-TOKEN>>
       type: <<LOG-TYPE>>
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
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
   output.logstash:
     hosts: ["<<LISTENER-HOST>>:5015"]
     ssl:
       certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
   ```
  
   * Replace `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>` with the address of your server running Filebeat.
   * {% include log-shipping/log-shipping-token.md %}
   * {% include log-shipping/listener-var.md %}

2. Run Filebeat with the new configuration.