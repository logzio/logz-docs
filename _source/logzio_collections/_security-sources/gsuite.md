---
title: Ship logs from Google Workspace
logo:
  logofile: google-workspace.svg
  orientation: horizontal
data-source: Google Workspace
data-for-product-source: Cloud SIEM
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
  - gcp
order: 630
---
Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google. You can ship Google Workspace logs to Logz.io using Filebeat and Google Reports API.


**Before you begin, you'll need**: [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation-configuration.html) installed

<!-- info-box-start:info -->
The GSuite module was [deprecated as of Filebeat 7.12](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-module-gsuite.html#filebeat-module-gsuite) and has been replaced with the [Google Workspace module](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-module-google_workspace.html), to bring it in line with Google's current naming. The integration itself remains the same, requiring only that you replace "- module: gsuite" with "- module: google_workspace" in the modules block.
{:.info-box.note}
<!-- info-box-end -->

<div class="tasklist">

#### Google Workspace setup

##### Set up a Service Account

Follow the official Google Workspace [tutorial](https://support.google.com/gsuitemigrate/answer/9222993?hl=en) for setting up a service account.

##### Grant access to the Admin SDK API

Follow the official Google Workspace [tutorial](https://support.google.com/gsuitemigrate/answer/9222865?hl=en) for granting access to the Admin API.

##### Delegate domain-wide authority to your service account

* Open your Google Workspace domain’s [Admin console](http://admin.google.com/).
* Go to **Main menu** > **Security** > **API controls**.
* In the Domain-wide delegation pane, select **Manage Domain Wide Delegation**.
* Click **Add new**, and fill in the details:
    * **Client ID** - Enter the service account's Client ID - you can find it in the service account's details under **Unique ID**. It is also found in the **client_id** field of the credentials file that was auto-downloaded when you created a new key for your service account.
    * **OAuth Scopes** - Enter [the admin's API](https://www.googleapis.com/auth/admin.reports.audit.readonly)
    * Click **Authorize** to confirm your changes.

#### Filebeat monitoring setup

{% include log-shipping/certificate.md %}

##### Configure Filebeat

Open the Filebeat configuration file (the default path `/etc/filebeat/filebeat.yml`) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contens.

{% include log-shipping/filebeat-input-extension.md %}


```yaml
### Filebeat


### General
fields:
  logzio_codec: json
  token: <<LOG-SHIPPING-TOKEN>>
  type: google_workspace
fields_under_root: true
encoding: utf-8
ignore_older: 3h

### Modules
filebeat.modules:
- module: google_workspace
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

### Input

### Registry
filebeat.registry.path: /var/lib/filebeat

### Processors
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
- add_id: ~

### Output 
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For a full list of available Filebeat configuration options for the Google Workspace module, please see Filebeat's [documentation](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-module-google_workspace.html).



Still in the same configuration file, replace the placeholders to match your specifics.

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

* Replace `<<PATH_TO_CREDENTIALS_FILE>>` with the path to the credentials file (for example `./credentials_file.json` if the credentials file is in the same path as `filebeat.yml`).

* Replace `<<DELEGATED_ACCOUNT_EMAIL>>` with the email address of the admin Google Workspace user (for example `user@example.com`).

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [Filebeat troubleshooting](https://docs.logz.io/shipping/log-sources/filebeat.html#troubleshooting).

</div>
