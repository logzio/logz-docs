---
title: Ship logs from SentinelOne
logo:
  logofile: sentinelone.png
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
    host: "<<SYSLOG_IP>>:<<PORT>>"
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

* Replace  <<SYSLOG_IP>>:<<PORT>> with your syslog IP and PORT details.

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Configure SentinelOne to send logs to Logzio

Open the SentinelOne Admin Console.

  1. In the left side menu, click **<i class="fas fa-ellipsis-h"></i> > More > Server Settings**.
  2. Expand the **Advanced Settings** option.

![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/SentinelOne-admin-console.png)

Scroll down to **Server Settings** and configure the Syslog server:

In the **SYSLOG SERVER** section, enable the option to **Use Syslog server**. Fill in the details:

  * **Host** - Enter your host address.
  * **Port** - Enter your port number. (Port 6514 unless you've changed the default)
  * **Format** - Select **BSD** as the log format.
  * **Transport** - Select the **TLS** protocol.

In the **LOGGING** section, enable the option to **Export logs to Syslog**. Fill in the details:

  * **Exported logs format** - Select the **JSON** format.

![SentinelOne Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/SentinelOne-admin-console-2.png)


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
