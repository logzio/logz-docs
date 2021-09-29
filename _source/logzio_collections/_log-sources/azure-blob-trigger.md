---
title: Ship logs from Azure Blob Storage using Azure Blob Trigger
logo:
  logofile: azure-blob.svg
  orientation: vertical
data-source: Azure Blob Storage via trigger
templates: ["azure-deployment"]
open-source:
  - title: logzio-azure-blob-trigger
    github-repo: logzio-azure-blob-trigger
contributors:
  - savidov
  - nshishkin
shipping-tags:
  -  azure
order: 460
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Create a new blob storage account](#new-blob-config)
* [Connect to existing blob storage account](#existing-blob-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to forward logs from your Azure Blob Storage account to Logz.io using an automated deployment process via the trigger function. Each new log in the container path inside the storage account (including sub directories), will trigger the Logz.io function that will ship the file content to Logz.io.


## Architecture overview

The following resources are needed for this integration:

* Storage Account (general purpose v2) + Container
* App Service Plan - Consumption Plan
* Application Insights
* Logz.io Function App + Logz.io Blob Trigger Function
* Storage Account for Logz.io Function App logs

![Integration-architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-resources.png)

### Supported data types

This Logz.io function supports the following data types:

* Json
* CSV (supported delimiters: `',' ';' '|'`)
* Text (supports multiline text - MultilineRegex parameter)

<!-- info-box-start:info -->
The file name does not have to be with these extensions.
{:.info-box.important}
<!-- info-box-end -->

### Supported file formats

The Logz.io function supports the following file formats:

* Gzip

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="new-blob-config">



#### Create a new blob storage account

If you don't have a general purpose v2 storage account with a container for logs, or you want to create everything from scratch, this auto-deployment is for you.

* Storage Account (general purpose v2) + Container
* App Service Plan - Consumption Plan
* Application Insights
* Logz.io Function App and Logz.io Blob Trigger Function
* Storage Account for Logz.io Function App logs

<div class="tasklist">

##### Launch an automated deployment

👇 Click this button:

[![Deploy to Azure](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/deploybutton-az.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob-trigger%2Fmain%2Fazure%2Ffull-auto-deployment.json)
{:.override.btn-img}
  
##### Fill in the deployment parameters

In the **Custom deployment** screen, fill in all the parameters as per table below and click **Review + create**.

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-1.png)

| Parameter | Description |
| --- | --- |
| Storage Account Name | The storage account (general purpose v2) name. | 
| Container Name | The name of the container inside the storage account |
| Logs Path | The path from where blob files will trigger the Logz.io function (including sub-directories in that path). Leave empty if you want every blob file in the container to trigger the Logz.io function. |
| Logzio URL | {% include log-shipping/listener-var.md %} |
| Logzio Token | {% include log-shipping/log-shipping-token.md %} |
| Multiline Regex | The regex that matches the multiline logs in text blob files. Leave empty if you do not use multiline logs in your text blob files. |

##### Confirm the deployment parameters

In the **Custom deployment: review + create** screen, review the deployment and click **Create**.

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-2.png)

If all the parameters have been configured correctly, the following conformation screen will appear:

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-3.png)

Click **Go to resource group** to go to your resource group with all the created resources.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).



</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="existing-blob-config">



#### Connect to existing blob storage account

**Before you begin, you'll need**: a blob storage account of the type **StorageV2 (general purpose v2)**.


<!-- info-box-start:info -->
If your existing blob storage account is of any other kind, it will NOT work. Instead, follow the process to set up a new blob storage account.
{:.info-box.important}
<!-- info-box-end -->


<div class="tasklist">

##### Check your storage account for compatibility

Double-check your [_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) to make sure that they are compatible with this integration. They should be of the type **StorageV2 (general purpose v2)**.


##### Launch an automated deployment

👇 Click this button:

[![Deploy to Azure](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/deploybutton-az.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob-trigger%2Fmain%2Fazure%2Ffunction-auto-deployment.json)
{:.override.btn-img}
  

##### Fill in the deployment parameters

In the **Custom deployment** screen, fill in all the parameters as per table below and click **Review + create**.

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-1.png)

| Parameter | Description |
| --- | --- |
| Storage Account Name | The storage account (general purpose v2) name. |
| Storage Account Resource Name | The resource name that contains the storage account. (Needed only in Logz.io Function Auto-Deployment) |
| Container Name | The name of the container inside the storage account |
| Logs Path | The path from where blob files will trigger the Logz.io function (including sub-directories in that path). Leave empty if you want every blob file in the container to trigger the Logz.io function. |
| Logzio URL | {% include log-shipping/listener-var.md %} |
| Logzio Token | {% include log-shipping/log-shipping-token.md %} |
| Multiline Regex | The regex that matches the multiline logs in text blob files. Leave empty if you do not use multiline logs in your text blob files. |

<!-- info-box-start:info -->
Logs that were in the container before the deployment will be shipped to Logz.io. If these logs have already been shipped to Logz.io, we recommend that you empty the container before the deployment.
{:.info-box.important}
<!-- info-box-end -->

##### Confirm the deployment parameters

In the **Custom deployment: review + create** screen, review the deployment and click **Create**.

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-2.png)

If all the parameters have been configured correctly, the following conformation screen will appear:

![Custom deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/blob-trigger-3.png)

Click **Go to resource group** to go to your resource group with all the created resources.



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<!-- tabContainer:end -->
