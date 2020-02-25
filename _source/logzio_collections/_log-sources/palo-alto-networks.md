---
title: Ship logs from Palo Alto Networks
logo:
  logofile: palo-alto-networks.svg
  orientation: horizontal
data-source: Palo Alto Networks
contributors:
  - imnotashrimp
shipping-tags:
  - server-app
  - security
---

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

For more information, see
[Configure Syslog Monitoring](https://docs.paloaltonetworks.com/pan-os/7-1/pan-os-admin/monitoring/use-syslog-for-monitoring/configure-syslog-monitoring)
from Palo Alto Networks.
{:.info-box.read}

<div class="tasklist">

##### Configure the firewall to forward logs to Filebeat

You'll need to configure your firewall
to forward logs to your Filebeat server
at port 6514 over UDP.

In your PAN-OS admin console,
click the **Device** tab, and then select **Server Profiles > Syslog** from the left menu.

Click the **Add** button to open the _Syslog Server Profile_ dialog,
and give your profile a descriptive **Name** that includes "logzio".

Click **Add** to add a new server.
Give your new server these settings:

* **Name**: We recommend including "Filebeat" in the name.
* **Syslog Server**: The IP address of your Filebeat server.
* **Transport**: UDP
* **Port**: 6514
* **Format**: BSD
* **Facility**: Leave as "LOG_USER"

Click **OK** to save the profile.

##### Configure syslog forwarding

Click the **Objects** tab, and then select **Log Forwarding** from the left menu.

Click the **Add** button to open the _Log Forwarding Profile_ dialog.
Give your profile a **Name** and optional **Description**.

Click the **Add** button to open the _Log Forwarding Profile Match List_ dialog.
Choose a **Log Type**, and paste that log type in the **Name** box.

In the _Syslog_ panel, click **Add**, and choose the server profile you created in step 1.

Click **OK** to save this log type.

Repeat this process for each log type you plan to send to Filebeat.

Click **OK** to save the log forwarding profile.

##### Configure the security policy rules

Click the **Policies** tab, and then select **Security** from the left menu.

Double-click a security policy,
or create a new security policy,
to open the _Security Policy Rule_ dialog.

Click the **Action** tab,
and select **Log at Session Start** and **Log at Session End**.

In the **Log Forwarding** list, choose the log forwarding profile you created in step 3.

Fill in the required information in tabs with a red squiggly underline.

##### Commit the changes to your firewall

In the upper right corner of the page, click **Commit**.

Select **Commit All Changes**,
and click the **Commit** button to save.

##### Download the Logz.io certificate to your Filebeat server

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Add TCP traffic as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add TCP to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

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
    type: ???
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
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
```

If you're running Filebeat 6, paste this code block.

```yaml
# ... For Filebeat 6 only ...
registry_file: /var/lib/filebeat/registry
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

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
