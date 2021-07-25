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

* An Azure Blob Storage account of the type **StorageV2 (general purpose v2)**
* A virtual machine instance in Azure resource group connected to the storage account
* Network Watcher enabled in the region of the virtual machine

<div class="tasklist">

##### Register Insights provider

Register the Microsoft.Insights provider as described [here](https://docs.microsoft.com/en-us/azure/network-watcher/network-watcher-nsg-flow-logging-portal#register-insights-provider).

##### Enable NSG flow log

1. For your VM, navigate to **Networking > NSG > NSG flow**.
2. From the list of NSGs, select the NSG with the name of your VM.
3. Set the **Flow logs** status to **on**.
4. Select the required **Flow logs version**.
5. In the **Storage accound** field, select the Azure Blob Storage account for this resource group.
6. Select the required retention period.
7. If required, enable the **Traffic Analytics**.
8. Save the configuration.


##### Connect your Azure Blob Storage account to Logz.io

Connect your Azure Blob Storage account to Logz.io as described in the instructions [here](https://docs.logz.io/shipping/log-sources/azure-blob.html#existing-blob-config).

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

