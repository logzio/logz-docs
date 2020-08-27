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
  - security
---

**Before you begin, you'll need**:

* SentinelOne Console installed. (Use current manufacturer instructions.)
* root access


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

##### Download the Logz.io public certificate to your Filebeat server

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```


##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds SentinelOne as an input and sets Logz.io as the output.

```yaml
# ...
filebeat.inputs:
- type: syslog
  protocol.udp:
    host: "<<SYSLOG-IP>>:<<PORT>>"
  fields:
    logzio_codec: plain
    token: <<SHIPPING-TOKEN>>
    type: sentinel_one
  fields_under_root: true
#For version 6.x and lower uncomment the line below and remove the line after it 
logging.level: debug
logging.to_files: true
logging.files:
  path: /home/logzio/
  name: filebeat.log
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
    hosts: ["<<LISTENER>>:5015"]
    ssl:
      certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

* Replace  `<<SYSLOG-IP>>:<<PORT>>` with your syslog IP and PORT details.

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Configure SentinelOne to send logs to Logzio

Open the SentinelOne Admin Console. Configure SentinelOne to send logs to your SYSLOG server.

![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/sentinelone-admin.png)

1. Select your site.
2. In the left side menu, click the **Settings** slider icon **<i class="fas fa-sliders-h"></i>**.

3. Open the **INTEGRATIONS** tab, and fill in the details:

    1. Under **Types**, select **SYSLOG**.
    2. Toggle the button to **enable SYSLOG**.
    3. **Host** - Enter your SYSLOG server IP address and port.
    4. **TLS** - Leave TLS unchecked. It should remain disabled.
    5. **Formatting** - Select **CEF2**.

    Save your changes.

##### Configure SentinelOne to send logs

In the same screen, open the **NOTIFICATIONS** tab, and fill in the details:

1. Under **Notification Types**, go through the list of options and check off the **Syslog** option.

  We recommend checking off all notification options to send logs to the Syslog server. However, this is optional. Note that if you leave some notification options disabled, it may interfere with Logz.io's detection rules.


![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/sentinelone-admin2.png)



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
