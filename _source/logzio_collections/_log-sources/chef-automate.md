---
title: Ship .NET logs
data-source:
templates: ["library"]
open-source:
  - title: Chef Automate
contributors:
  - doronbargo
shipping-tags:
  - Security
  - ci-cd
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Operational Logs](#opertional-config)
* [InfoSpec Compliance](#infospec-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="opertional-config">

You can ship Chef-Automate operational logs using Journalbeat
#### Journalbeat setup

**Before you begin, you'll need**:

* [Journalbeat](https://www.elastic.co/guide/en/beats/journalbeat/current/journalbeat-installation-configuration.html) installed on your Chef Automate server

<div class="tasklist">

{% Download log-shipping/certificate.md server="to your Chef Automate server" %}


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
type: metrics
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


<!-- tab:end -->

<!-- tab:start -->
<div id="infospec-config">

To get Infospec compliance report you will have to set a webhook using Chef Automate UI

<div class="tasklist">

##### Create new webhook
In Chef Automate UI go to Setting -> Notifications -> Create Notification
<<PICTURE configuration - need to add numbers>>

##### Set Logz.io parameters
Name - Choose a name for the notification (Logzio - Security)
Webhook type - Webhook
Failure type - InSpec compliance scan failures
Webhook URL - http://<<Listener>>:8070/?token=<<Your Security Token>>&type=inspec_compliance

<<Picture notification param>>

replace <<Listener>> and <<Token>>

##### Test Notification
Press the test notification and look for the following log in your Logzio Security account
<<picture kibana >
Press create notification


Once you run Inspec compliance report, the report will be shipped to your Logzio security account

</div>
</div>
</div>
<!-- tabContainer:end -->

