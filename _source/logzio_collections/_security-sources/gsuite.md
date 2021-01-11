---
title: Ship logs from G Suite
logo:
  logofile: gsuite-logo.svg
  orientation: horizontal
data-source: G Suite
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
   
---

You can ship G Suite logs to Logz.io using Filebeat and Google Reports API.

**Before you begin, you'll need**:

* [Filebeat 7.9](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation-configuration.html) or higher installed


<div class="tasklist">

#### G Suite setup

##### Set up a Service Account

Follow the official G Suite [tutorial](https://support.google.com/gsuitemigrate/answer/9222993?hl=en) for setting up a service account.

##### Grant access to the Admin SDK API

Follow the official G Suite [tutorial](https://support.google.com/gsuitemigrate/answer/9222865?hl=en) for granting access to the Admin API.

##### Delegate domain-wide authority to your service account

* Open your G Suite domain’s [Admin console](http://admin.google.com/).
* Go to **Main menu** > **Security** > **API controls**.
* In the Domain-wide delegation pane, select **Manage Domain Wide Delegation**.
* Click **Add new**, and fill in the details:
    * **Client ID** - Enter the service account's Client ID - you can find it in the service account's details under **Unique ID**. It is also found in the **client_id** field of the credentials file that was auto-downloaded when you created a new key for your service account.
    * **OAuth Scopes** - Enter [https://www.googleapis.com/auth/admin.reports.audit.readonly](https://www.googleapis.com/auth/admin.reports.audit.readonly)
    * Click **Authorize** to confirm your changes.

#### Filebeat monitoring setup

{% include log-shipping/certificate.md %}

##### Configure Filebeat

Open the Filebeat configuration file (the default path `/etc/filebeat/filebeat.yml`) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents.

```yaml
############################# Filebeat #####################################


############################# General #####################################
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
  type: gsuite
fields_under_root: true
encoding: utf-8
ignore_older: 3h

############################# Modules #####################################
filebeat.modules:
- module: gsuite
  saml:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"
  user_accounts:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"
  login:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"
  admin:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"
  drive:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"
  groups:
    enabled: true
    var.jwt_file: "<<PATH_TO_CERDNTIALS_FILE>>"
    var.delegated_account: "<<DELEGATED_ACCOUNT_EMAIL>>"

############################# Input #####################################

############################# Registry #####################################
filebeat.registry.path: /var/lib/filebeat

############################# Processors #####################################
# The following processors are to ensure compatibility with version 7
processors:
- if:
    has_fields: ['gsuite']
  then:
  - rename:
      fields:
      - from: "source"
        to: "gsuite_source"
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

############################# Output #####################################
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For a full list of available Filebeat configuration options for the G Suite module, please see Filebeat's [documentation](https://www.elastic.co/guide/en/beats/filebeat/current/_configure_the_module.html).

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

* Replace `<<PATH_TO_CREDENTIALS_FILE>>` with the path to the credentials file (for example `./credentials_file.json` if the credentials file is in the same path as `filebeat.yml`).

* Replace `<<DELEGATED_ACCOUNT_EMAIL>>` with the email address of the admin G Suite user (for example `user@example.com`).

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
