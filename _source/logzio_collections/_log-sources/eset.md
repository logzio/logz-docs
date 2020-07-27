---
title: Ship logs from ESET
logo:
  logofile: eset.png
  orientation: vertical
data-source: ESET
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
  - server-app
  - security
---

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* root access
* ESET Admin Console locally installed. The cloud management console does not support sending logs to a Syslog server.

<div class="tasklist">

##### Configure ESET Admin Console to forward logs to Filebeat

You'll need to configure ESET server to forward logs to Filebeat over port 6514.


##### Install the ESET certificate on your Filebeat server

ESET sends encrypted data,
so you'll need to create a dedicated ESET certificate to decrypt the logs by the Filebeat server.

```shell
sudo mkdir /etc/filebeat/certificates
sudo openssl req -newkey rsa:2048 -nodes \
-keyout /etc/filebeat/certificates/ESET.key -x509 \
-days 365 \
-out /etc/filebeat/certificates/ESET.crt
```

##### Download the Logz.io public certificate to your Filebeat server

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add TCP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add TCP to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:6514"
  ssl.enabled: true
  ssl.certificate: "/etc/filebeat/certificates/ESET.crt"
  ssl.key: "/etc/filebeat/certificates/ESET.key"
  ssl.verification_mode: none

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: eset
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
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Configure ESET to send logs to Logzio

Open the ESET Admin Console on the **Security Management Center**.

  1. In the left side menu, click **<i class="fas fa-ellipsis-h"></i> > More > Server Settings**.
  2. Expand the **Advanced Settings** option.

![ESET Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/eset-admin-console.png)

Scroll down to **Server Settings** and configure the Syslog server:

  1. In the **SYSLOG SERVER** section, enable the option to **Use Syslog server**. Fill in the details:

  * **Host** - Enter your host address.
  * **Port** - Enter your port number.
  * **Format** - Select **BSD** as the log format.
  * **Transport** - Select the **TLS** protocol.

  2. In the **LOGGING** section, enable the option to **Export logs to Syslog**. Fill in the details:

  * **Exported logs format** - Select the **JSON** format.

![ESET Admin Console configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/eset-admin-console-2.png)


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
