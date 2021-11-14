---
title: Ship logs from Office365
logo:
  logofile: eset.png
  orientation: vertical
data-source: Office365
data-for-product-source: Cloud SIEM
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - Azure
order: 731
---

This guide is intended to assist you with forwarding Unified Audit Logging from Microsoft Office 365 to Logz.io. This method of log forwarding utilizes the Office/Microsoft 365 Management API, which at the time of writing supports the following Microsoft Office 365 content types:

* Audit.AzureActiveDirectory

* Audit.Exchange

* Audit.SharePoint

* Audit.General (includes all other workloads not included in the previous content types)

* DLP.All (DLP events only for all workloads)

**Before you begin, you'll need**:

* An active subscription for Microsoft Office 365 with an appropriately provisioned administrator account.
* Unified Audit Logging enabled within M365’s Security and [Audit Center](https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#verify-the-auditing-status-for-your-organization )
* A machine with installed [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)


<div class="tasklist">

##### Register a new application in Azure AD

1. Navigate to portal.azure.com and sign-in with an administrative account.
2. After logging in, open the pop-out menu from the top left corner of the web page. Click on “Azure Active Directory”.
3. Under the “Manage” section on the left-hand side of the page, select “App registrations” and then register a new app. 

INSERT PICTURE1 HERE

4. Name your app, and then adjust options as necessary. The default settings should be fine if working with a single M365 tenant without a URI proxy.
5. Take note of the Application (client) ID and the Directory (tenant) ID. These will be used later when configuring filebeat.

##### Configure your new application

1. From your application overview, navigate to “Certificates & secrets”. A client secret will be needed for your filebeat configuration in order to pull data from the management API.
2. Select “+ New client secret” and provide a description of your choosing.
3. Take note of the “Value” of the new client secret:
	
INSERT PICTURE 2A HERE
	
4. We now need to adjust app permissions to allow for interaction with the management API. Navigate to “API Permissions” on the left hand side of the page.
5. Select  “+ Add a permission” and scroll down to find  the “Office 365 Management APIs” widget.
6. From the “Application permissions” tab, enable the “ActivityFeed.Read” and “ActivityFeed.ReadDlp” permissions:

INSERT PICTURE 2B HERE

{% include log-shipping/certificate.md %}

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds Office365 as an input and sets Logz.io as the output.

```yaml
# ...
filebeat.config:
  modules:
	enabled: true
	path: modules.d/*.yml

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    type: o365
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

# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```


{% include /general-shipping/replace-placeholders.html %}

* Replace <<Application/Client ID>> with the Client ID you kept in step 1.5 .

* Replace <<Tenant ID>> with the Tenant ID you kept in step 1.5 .
	
* Replace <<Tenant Name>> with the token of the account you want to ship to.

* Replace <<Client Secret>> with the Client Secret you kept in step 2.3

<!-- info-box-start:info -->
One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.
{:.info-box.note}
<!-- info-box-end -->

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.

##### Check Logz.io for your logs
  
Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). You can filter for data of type o365 to see the incoming pfSense logs.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
