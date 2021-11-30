---
title: Ship logs from Microsoft Office 365
logo:
  logofile: office365.png
  orientation: vertical
data-source: Office 365
data-for-product-source: Cloud SIEM
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - windows
order: 1380
---
Deploy this integration to send Unified Audit Logging logs from Microsoft 365 to Logz.io. This method of log forwarding utilizes the Office/Microsoft 365 Management API, which currently supports the following M365 content types:

* Audit.AzureActiveDirectory
* Audit.Exchange
* Audit.SharePoint
* Audit.General (includes all other workloads not included in the previous content types)
* DLP.All (DLP events only for all workloads)


**Before you begin, you'll need**: 

* An active subscription for Microsoft 365 with an appropriately provisioned administrator account.
* Unified Audit Logging enabled within M365’s [Security and Audit Center](https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#verify-the-auditing-status-for-your-organization)
* A machine for hosting filebeat version 7 or greater, preferably a Windows machine.


<div class="tasklist">


##### Register a new application in Azure AD

1. Navigate to portal.azure.com and sign-in with an administrative account.
2. Open the pop-out menu from the top left corner of the web page and click on **Azure Active Directory**.
3. Under the **Manage** section on the left-hand side of the page, select **App registrations > New registration**.
  ![New registration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/office365/new.png)

4. Name your app, and then adjust options as necessary. The default settings should be fine if working with a single M365 tenant without a URI proxy.
5. Take note of the Application (client) ID and the Directory (tenant) ID. These will be used later when configuring Filebeat.

##### Create a client secret for your application

1. From your application overview, navigate to **Certificates & secrets**. A client secret will be needed for your Filebeat configuration in order to pull data from the management API.
2. Select **+ New client secret** and provide a description of your choosing.
3. Take note of the **Value** of the new client secret.

![Client secret](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/office365/client.png)


##### Adjust app permissions to allow for interaction with the management API


1. Navigate to **API Permissions** on the left hand side of the page, select **+ Add a permission** and scroll down to find  the “Office 365 Management APIs” widget.
2. From the **Application permissions** tab, enable the **ActivityFeed.Read** and **ActivityFeed.ReadDlp** permissions.
![App permissions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/office365/permissions.png)


{% include log-shipping/certificate.md %}


##### Configure Filebeat

1. Paste the following into the inputs section of the Filebeat configuration file:

   ```yaml
   filebeat.inputs:
   - type: udp
     fields:
       logzio_codec: plain
       # Your Logz.io account token. You can find your token at
       #  https://app.logz.io/#/dashboard/settings/manage-accounts
       token: <<LOG-SHIPPING-TOKEN>>
       type: o365
     fields_under_root: true
   filebeat.registry.path: 'C:\ProgramData\filebeat'
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
   output.logstash:
     hosts: ["<<LISTENER-HOST>>:5015"]
     ssl:
       certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
   ```
  
   * Replace `<<ADDRESS-OF-YOUR-FILEBEAT-SERVER>>` with the address of your server running Filebeat.
   * {% include log-shipping/log-shipping-token.md %}
   * {% include log-shipping/listener-var.md %}

2. Run Filebeat with the new configuration.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `o365` to see the incoming pfSense logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
