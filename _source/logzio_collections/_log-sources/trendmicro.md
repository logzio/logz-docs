---
title: Send logs from Trend Micro
logo:
  logofile: trendmicro-small-logo.png
  orientation: vertical
data-source: Trend Micro
contributors:
  - dorisnaaman
  - shalper
shipping-tags:
  - server-app
  - security
---


[Deep Security](https://www.trendmicro.com/en_us/business/products/hybrid-cloud/deep-security.html)

**Before you begin, you'll need**:

* Credentials for Trend Micro [Deep Security Cloud One](https://cloudone.trendmicro.com/)
* [Filebeat 7 installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* Root access

<div class="tasklist">

##### Install the Trendmicro certificate on your Filebeat server {#key}

Trend Micro sends encrypted data, so you'll need to install the Trend Micro certificate on the Filebeat server.

```
sudo mkdir /etc/filebeat/certificates
sudo openssl req -newkey rsa:2048 -nodes \
-keyout /etc/filebeat/certificates/Trendmicro.key -x509 \
-days 365 \
-out /etc/filebeat/certificates/Trendmicro.crt
```

{% include log-shipping/certificate.md %}

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following settings:

```yaml
# ...
filebeat.inputs:
- type: tcp
  max_message_size: 10MiB
  host: "0.0.0.0:1514"
  ssl.enabled: true
  ssl.certificate: "/etc/filebeat/certificates/Trendmicro.crt"
  ssl.key: "/etc/filebeat/certificates/Trendmicro.key"
  ssl.verification_mode: none
  fields:
    logzio_codec: json
    token: <<SHIPPING-TOKEN>>
    type: trendmicro_deep
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
```
{% include log-shipping/replace-vars.html token=true %}

##### Set Logz.io as the output

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.

```
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.




##### Configure Trend Micro agents to forward logs to Filebeat

Open your Trend Micro - Deep Security Cloud One console. Configure Trend Micro to send logs to your Syslog server.

You can reference the original instructions in this [Trend Micro help page](https://help.deepsecurity.trendmicro.com/event-syslog.html?Highlight=syslog).

1. Log into your Trend Micro - Deep Security Cloud One console.

    1. Select **Policies** from the top menu.
    2. Select **Other > Syslog Configurations** in the left menu.
    3. Select **New → New Configuration**.

2. Fill in the form:

    1. **Name** - Provide a new for the new Syslog configuration. For example: Logz.io.
    2. **Server Name** and **Server Port** -  Provide the IP address and port 6514.
    3. **Event Format** - Select **Log Event Extended Format 2.0**.
    4. Checkoff the box for **Include time zone in events**.
    5. **Transport** - Select **TLS**.
    6. Save your changes.

3. Open the **Credentials** tab, and fill in the details:

    1. **Private key** - Provide the **Trendmicro.key** you created in [step 1](#key). You can run the following command to look up the key:

        ```
        sudo nano /etc/filebeat/certificates/Trendmicro.key
        ```
    2. **Certificate** - Provide the **Trendmicro.crt** you created in [step 1](#key). You can run the following command to look up the key:

        ```
        sudo nano /etc/filebeat/certificates/Trendmicro.crt
        ```

    3. Click **Test connection** to test your settings.
    4. Save your changes.

##### Activate syslog forwarding

Configure Trend Micro agents to forward event logs to Logz.io.

1. Open the **Policies** tab, and select the relevant policy.
2. In the policy form, select **Setting** in the left menu.
3. Select the tab **Event forwarding** in the top menu.
4. Select the relevant syslog policies you created in the previous steps.

Sample configuration as was used by the Logz.io Security Team in development of this integration. [Exported configuration in XML format.](/user-guide/security/trend-micro-configuration-sample/)

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


