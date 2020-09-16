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

Trend Micro [Cloud One - Workload Security](https://www.trendmicro.com/en_us/business/products/hybrid-cloud/cloud-one-workload-security.html) (formerly Deep Security Software) is a hybrid cloud runtime security solution.

You can review the Trend Micro resources in your security account, including pre-configured [security rules](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC&search=trend%20micro) and [dashboards](https://app.logz.io/#/dashboard/security/research/dashboards?) to get you started.


**Before you begin, you'll need**:

* Credentials for [Trend Micro Cloud One](https://cloudone.trendmicro.com/)
* [Filebeat 7 installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* Root access

<div class="tasklist">

##### Install the Trend Micro certificate on your Filebeat server {#key}

Trend Micro sends encrypted data, so you'll need to install the Trend Micro certificate on your Filebeat server.

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

The process for configuring Trend Micro to send logs to your Syslog server involves several steps. All of them are performed in the Trend Micro Cloud One console. You can also reference the [official documentaton published by Trend Micro](https://cloudone.trendmicro.com/docs/workload-security/event-syslog/).

First, log into your Trend Micro Cloud One console.

1. Select **Policies** from the top menu.
2. Select **Other > Syslog Configurations** in the left menu.
3. Select **New → New Configuration**.
4. Fill in the new configuration form:
    1. **Name** - Provide a name for the new Syslog configuration. For example: Logz.io.
    2. **Server Name** and **Server Port** - Provide the IP address and port 6514.
    3. **Event Format** - Select **Log Event Extended Format 2.0**.
    4. Check the box to **Include time zone in events**.
    5. **Transport** - Select **TLS**.
    6. Save your changes.

    ![Trend Micro Cloud One screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-integrations/trendmicro-console1.png)


5. Open the **Credentials** tab, and fill in the details:

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

     ![Trend Micro Deep Security Cloud One screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-integrations/trendmicro-console2.png)

##### Activate syslog forwarding

Configure Trend Micro agents to forward event logs to Logz.io.

1. Open the **Policies** tab, and select the relevant policy.
2. In the policy form, select **Setting** in the left menu.
3. Select the tab **Event forwarding** in the top menu.
4. Select the relevant syslog policies you created in the previous steps.

 ![Trend Micro Deep Security Cloud One screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-integrations/trendmicro-console4.png)

###### Sample configuration

You can reference the sample configuration used by the Logz.io Security Team in development of this integration. [Exported configuration in XML format.](/user-guide/security/trend-micro-configuration-sample/)

The configuration file includes settings for the following services:

* Anti-malware
* Integrity monitoring
* Log inspection
* Firewall
* Intrusion prevention

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>