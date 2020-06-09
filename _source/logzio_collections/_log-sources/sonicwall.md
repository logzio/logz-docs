---
title: Ship SonicWall logs
logo:
  logofile: SonicWall-Logo.svg
  orientation: vertical
data-source: SonicWall
contributors:
  - shalper
shipping-tags:
  - server-app
  - security
---

#### Configuration

<div class="tasklist">

##### Before you begin

These are the prerequisites you'll need before you can begin:

* [SonicWall firewall](https://www.sonicwall.com/products/firewalls)
* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* root access

##### Configure SonicWall Server logging

Configure your SonicWall firewall to send logs to your Filebeat server.
Make sure you meet this configuration:

* Log format: syslog
* Send over: UDP
* IP address: Filebeat server IP address
* Port 514

See [SonicWall docs](https://www.sonicwall.com/support/technical-documentation/?language=English) for more information
on configuring your SonicWall firewall.

##### Download the Logz.io public certificate to your Filebeat server

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor. Copy and paste the code block below, overwriting the previous contents.
(Replace the file’s contents with this code block.)

This code block adds SonicWall as an input sent over UDP traffic.

```yaml
# ...
filebeat.inputs:
- type: udp
  max_message_size: 10MiB
  host: "0.0.0.0:514"

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: sonicwall
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

  # ... For Filebeat 7 only ...
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
  ignore_older: 3h
```

Copy and paste the following code block directly below.
It sets Logz.io as the output.


```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
