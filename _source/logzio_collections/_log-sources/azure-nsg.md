---
title: Ship Azure NSG logs
logo:
  logofile: nsg-logo.png
  orientation: vertical
data-source: Azure NSG logs
templates: ["azure-deployment-event-hubs"]
tags:
  - azure
  - event-hubs
contributors:
  - nshishkin
shipping-tags:
  - azure
order: 630
---

Enable an Azure function to forward NSG logs from your Azure Blob Storage account to your Logz.io account.


**Before you begin, you'll need**: 

* An Azure Blob Storage account of the type **StorageV2 (general purpose v2)** dedicated to NSG logs and called **Logzio_NSG_BLOB**
* A virtual machine instance in Azure resource group connected to the storage account
* Network Watcher enabled in the region of the virtual machine

<div class="tasklist">

##### Configure the NSG flow to your Azure Blob Storage account

###### Register Insights provider

1. Log in to the Azure Portal.
2. Navigate to **All services > Subscriptions**.
3. Select the subscription that the Azure resource group belongs to.
4. Select **Settings > Resource providers**.
5. Make sure that **Status** for the **microsoft.insights** provider is set to **Registered**. If not, set it to **Registered**.

###### Enable NSG flow log
   
1. For your VM, navigate to **Networking > NSG > NSG flow**.
2. From the list of NSGs, select the NSG with the name of your VM.
3. Set the **Flow logs** status to **on**.
4. Select the required **Flow logs version**.
5. In the **Storage accound** field, select the Logzio_NSG_BLOB Azure Blob Storage account.
6. Select the required retention period.
7. If required, enable the **Traffic Analytics**.
8. Save the configuration.


##### Connect your Azure Blob Storage account to Logz.io

Open the link below and fill in the form according to the table.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplate.json)
{:.override.btn-img}

| Parameter | Description | Required/Default |
|---|---|---|
| Resource group | Select your existing resource group. | Required |
| Location | Select the same region as the Azure services that will stream data to this Blob Storage.  |  Required |
| Logzio host | {% include log-shipping/listener-var.md %} |  Required |
| Log shipping token  | {% include log-shipping/log-shipping-token.md %} | Required |
| Blob Storage Account Name | Logzio_NSG_BLOB |  Required |
| Format | Select the supported parsing format: json | Required |
| Buffersize | The maximum number of messages the logger will accumulate before sending them all as a bulk  | `100` |
| Timeout | The read/write/connection timeout in *milliseconds*.  | `180,000 = 3 minutes` | 

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  Deployment can take a few minutes. 

<!-- info-box-start:info -->
Only new logs that are created from the moment the integration process is complete are sent to Logz.io. Logs that were added before this integration are not sent to Logz.io.
{:.info-box.important}
<!-- info-box-end -->

###### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

