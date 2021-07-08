---
title: Ship logs from Azure Blob Storage
logo:
  logofile: azure-blob.svg
  orientation: vertical
data-source: Azure Blob Storage
templates: ["azure-deployment"]
open-source:
  - title: logzio-azure-blob
    github-repo: logzio-azure-blob
contributors:
  - ronish31
  - imnotashrimp
  - shalper
shipping-tags:
  -  azure
order: 460
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Connect to existing blob storage account](#existing-blob-config)
* [Create a new blob storage account](#new-blob-config)
* [Update settings](#update)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to forward logs from your Azure Blob Storage account
to Logz.io using an automated deployment process. This integration offers the option to connect to an existing Blob storage account or create a new one, and it can be updated post-deployment.


## Architecture overview

The following services are created when you deploy this integration:

* Serverless Function App
* Application Insights
* App Service Plan
* Event Hub Namespace
* Event Grid System Topic
* Storage Account for the Function's logs
* If you select the option to deploy a new account, a new Blob Storage Account is created as well.

![Integration-architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/logzio-blob-diagram.png)



</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="new-blob-config">



#### Set up a new blob storage account

<div class="tasklist">

##### Launch an automated deployment

👇 Click this button to start.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplateForNewStorage.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.

##### Fill in the form

| Parameter | Description | Required/Default |
|---|---|---|
| Resource group | Click Create new. Give a meaningful Name, such as "logziobBlobStorageIntegration", and then click OK. | Required |
| Location | Select the same region as the Azure services that will stream data to this Blob Storage. |  Required |
| Logzio host | {% include log-shipping/listener-var.md %} |  Required |
| Log shipping token  | {% include log-shipping/log-shipping-token.md %} | Required |
| Format | Select one of the supported parsing formats: text/json/csv | Required |
| Buffersize | The maximum number of messages the logger will accumulate before sending them all as a bulk  | `100` |
| Timeout | The read/write/connection timeout in *milliseconds*.  | `180,000 = 3 minutes` | 

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  
Deployment can take a few minutes.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).



</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="existing-blob-config">



#### Use your existing blob storage account

**Before you begin, you'll need**: a blob storage account of the type **StorageV2 (general purpose v2)**.


<!-- info-box-start:info -->
If your existing blob storage account is of any other kind, it will NOT work. Instead, follow the process to set up a new blob storage account.
{:.info-box.important}
<!-- info-box-end -->


<div class="tasklist">

##### Check your storage account for compatibility

Double-check your [_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) to make sure that they are compatible with this integration. They should be of the type **StorageV2 (general purpose v2)**.


##### Launch an automated deployment

👇 Click this button to start.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplate.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.

##### Fill in the form

| Parameter | Description | Required/Default |
|---|---|---|
| Resource group | Select your existing resource group. | Required |
| Location | Select the same region as the Azure services that will stream data to this Blob Storage.  |  Required |
| Logzio host | {% include log-shipping/listener-var.md %} |  Required |
| Log shipping token  | {% include log-shipping/log-shipping-token.md %} | Required |
| Blob Storage Account Name | Insert the name of the storage account that contains the logs. |  Required |
| Format | Select one of the supported parsing formats: text/json/csv | Required |
| Buffersize | The maximum number of messages the logger will accumulate before sending them all as a bulk  | `100` |
| Timeout | The read/write/connection timeout in *milliseconds*.  | `180,000 = 3 minutes` | 


At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  Deployment can take a few minutes. Only logs sent from this point on will be searchable in Logz.io.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->





<!-- tab:start -->
<div id="update">

#### Updating parameters after deployment

To update your parameters post-deployment:

1. Open the **Function App** page in your Azure portal. 
2. On the left menu, select the **Configuration** tab. 
3. Make your edits and save your changes.


Here are the parameters that can be updated post-deployment:

* Shipper-related configurations:
  * **LogzioHost**
  * **LogzioToken**
  * **Buffersize**
  * **Timeout**
* **FUNCTIONS_WORKER_PROCESS_COUNT** - maximum of 10. [See Microsoft documentation for more details](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count).
* **ParseEmptyField** - Enable/disable the option to parse logs with invalid empty fields. If you encounter an issue with services shipping unnamed fields that break the parsing pipeline, enable this flag. **Note that this option may slow the shipper's performance.**


![Function's configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/configuration-settings.png)


</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
