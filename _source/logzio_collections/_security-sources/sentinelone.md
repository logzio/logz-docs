---
title: Ship logs from SentinelOne
logo:
  logofile: sentintelone-icon.png
  orientation: vertical
data-source: SentinelOne
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
  - server-app
    
---

**Before you begin, you'll need**:

* SentinelOne installed
* Root access


<div class="tasklist">

##### Install the SentinelOne certificate on your Filebeat server

SentinelOne sends encrypted data,
so you'll need to create a dedicated SentinelOne certificate to decrypt the logs by the Filebeat server.

```shell
sudo mkdir /etc/filebeat/certificates
sudo openssl req -newkey rsa:2048 -nodes \
-keyout /etc/filebeat/certificates/SentinelOne.key -x509 \
-days 365 \
-out /etc/filebeat/certificates/SentinelOne.crt
```

{% include log-shipping/certificate.md %}


##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds SentinelOne as an input and sets Logz.io as the output.

```yaml
# ... Filebeat inputs
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:6514"
  ssl.enabled: true
  ssl.certificate: "/etc/filebeat/certificates/SentinelOne.crt"
  ssl.key: "/etc/filebeat/certificates/SentinelOne.key"
  ssl.verification_mode: none
  fields:
    logzio_codec: json
    token: <<SHIPPING-TOKEN>>
    type: sentinel_one
  fields_under_root: true
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

### Outputs
output:
  logstash:
    hosts: ["<<LISTENER-HOST>>:5015"]
    ssl:
      certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/log-shipping-token.html %}

* {% include log-shipping/replace-vars.html listener=true %}

* Replace the host port with your syslog port details. The above example has `host: "0.0.0.0:6514"` but you should change it to your specifics.

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Configure SentinelOne to send logs to Logzio

Open the SentinelOne Admin Console. Configure SentinelOne to send logs to your Syslog server.

1. Select your site.
2. In the left side menu, click the slider icon **[⊶]** to open the **Settings menu**.
3. Open the **INTEGRATIONS** tab, and fill in the details:
    1. Under **Types**, select **SYSLOG**.
    2. Toggle the button to **enable SYSLOG**.
    3. **Host** - Enter your SYSLOG server IP address and port.
    4. **TLS** - Enable TLS.
    5. **Formatting** - Select **CEF2**.
    6. Save your changes.

![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/sentinelone-admin4.png)


##### Configure SentinelOne to send notifications

In the same screen, open the **NOTIFICATIONS** tab, and fill in the details:

Under **Notification Types**, check all options under **Syslog** notifications.

We recommend enabling all notification options to send Syslog logs. Still, it is optional. Note that if you leave some Syslog notification options disabled, it may interfere with Logz.io's detection rules.


![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/sentinelone-admin2.png)



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
