---
title: Ship Chef Automate data
logo:
  logofile: chef-automate-logo.svg
  orientation: horizontal
data-source: Chef Automate
contributors:
  - doron-bargo
  - shalper
shipping-tags:
  - security
  - ci-cd
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Operational Logs](#Opertional-config)
* [InSpec Compliance](#inspec-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="Opertional-config">

You can ship Chef-Automate operational logs using Journalbeat.

#### Journalbeat setup

**Before you begin, you'll need**:

* [Journalbeat](https://www.elastic.co/guide/en/beats/journalbeat/current/journalbeat-installation-configuration.html) installed on your Chef Automate server

<div class="tasklist">

{% include log-shipping/certificate.md server="to your Chef Automate server" %}


##### Add chef automate journal as as input

```yaml
journalbeat.inputs:
- paths:
  - /var/log/journal/<<JOURNAL_DIRECTORY>>/system.journal
  seek: tail
  include_matches:
    - _SYSTEMD_UNIT=chef-automate.service

processors:
  - dissect:
      tokenizer: "%{type|string}.default(%{pid}): %{message}"
      field: "message"
      target_prefix: ""
      overwrite_keys: true
```

Replace <<JOURNAL_DIRECTORY>> with your Journal directory name ( under /var/log/journal)

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml

fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: chef_automate
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Journal

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="inspec-config">

To automaticly recive new InSpec compliance report in your Logz.io evniroment you'll need to set a webhook. This is done from the Chef Automate admin console.

<div class="tasklist">

##### Create new webhook

Open the Chef Automate admin console.

Go to **Settings > Notifications > Create Notification**

![Create notification in Chef Automate admin console](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/chef-automate.png)


##### Set Logz.io parameters

* **Name** - Choose a name for the notification (for example: Logzio - Security)
* **Webhook type** - Webhook
* **Failure type** - InSpec compliance scan failures
* **Webhook URL** - `http://<<LISTENER-HOST>>:8070/?token=<<SHIPPING-TOKEN>>&type=inspec_compliance`


{% include log-shipping/replace-vars.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

![notification param]()


##### Test Notification

Press the test notification and look for the following log in your Logzio Security account.

![Kibana notification]()

Press create notification.


Once you run the Inspec compliance report, the report will be shipped to your Logzio security account on a regular basis.

</div>
</div>

<!-- tab:end -->

</div>

<!-- tabContainer:end -->

