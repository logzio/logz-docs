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
---

Deploy this integration to forward logs from your Azure Blob Storage
to your Logz.io account using an automated deployment process.


![Integration-architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/logzio-blob-diagram.png)

<!-- tabContainer:start -->
<div class="branching-container">

* [Connect to existing blob storage account](#existing-blob-config)
* [Create a new blob storage account](#new-blob-config)
{:.branching-tabs}

#### Which services are deployed 

The following services are created when you deploy this integration:

* Serveless Function App
* Application Insights
* App Service Plan
* Event Hubs Namspace
* Event Grid System Topic
* Function's logs Storage Account
* _Optional_ Blob Storage Account. (Only created if you select the option to deploy a new blob storage.)

<!-- tab:start -->
<div id="new-blob-config">

#### Set up a new blob storage account

<div class="tasklist">

##### Configure an automated deployment

👇 Click this button to start the automated deployment.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplateForNewStorage.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.
Make sure to use the settings shown below.

	
| Parameter | Description |
|---|---|
| Resource group <span class="required-param"></span> | Click Create new. Give a meaningful Name, such as "logziobBlobStorageIntegration", and then click OK. |
| Location <span class="required-param"></span> | Select the same region as the Azure services that will stream data to this Blob Storage. |
| Logzio host <span class="required-param"></span>  | Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| Log shipping token <span class="required-param"></span>  | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format <span class="default-param">`text`</span> | Select one of the supported parsing formats: text/json/csv |
| Buffersize <span class="default-param">`100`</span>  | The maximum number of messages the logger will accumulate before sending them all as a bulk  |
| Timeout <span class="default-param">`180,000 = 3 minutes`</span> | The read/write/connection timeout in *milliseconds*.  |
{:.paramlist}

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  
Deployment can take a few minutes.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). 
Please note that only logs sent from this point on would be sent and appear under the type `blobStorage`.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

For information about working with your parameters after deployment press [here](#parameters-after-deploy).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="existing-blob-config">

**Before you begin, you'll need**:
a blob storage account of the type **StorageV2 (general purpose v2)** . If your existing blob storage account is of any other kind, it will NOT work. Instead, follow the process to set up a new blob storage account.

Double-check your [_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) to make sure that they are compatible. They should be of the type **StorageV2 (general purpose v2)**.
{:.info-box.important}

#### Use your existing blob storage account

<div class="tasklist">

##### Configure an automated deployment

👇 Click this button to start the automated deployment.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplate.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.
Make sure to use the settings shown below.

| Parameter | Description |
|---|---|
| Resource group* | Select your existing resource group, and then click **OK**. |
| Region* | Select the same region as the Azure services that will stream data to this Blob Storage. |
| Logzio host* | Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| Log shipping token* | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format (Default: text) | Select one of the supported parsing formats: text/json/csv.  |
| Blob Storage Account Name* | Insert the name of the storage account that contains the logs.  |
| Buffersize (Default: 100) | The maximum number of messages the logger will accumulate before sending them all as a bulk.  |
| Timeout (Default: 180,000 = 3 minutes) | The read/write/connection timeout in *milliseconds*.  |
{:.paramlist}

*Required fields  

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  
Deployment can take a few minutes.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). 
Please note that only logs sent from this point on would be sent and appear under the type `blobStorage`.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<div id="parameters-after-deploy">
  
### Working with your parameters after deployment
If you wish to change parameters values after the deployment, go to your function app page, then on the left menu press the 'Configuration' tab.
You'll have the option to edit the following values:
* Shipper's configurations such as LogzioHost, LogzioToken, Buffersize, Timeout.
* FUNCTIONS_WORKER_PROCESS_COUNT - maximum of 10, for more information press [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count).  
* ParseEmptyField - Parse logs with invalid empty fields. **Please note using this option may slow the shipper's perfomance.**

![Function's configuration](https://github.com/logzio/logzio-azure-blob/blob/master/images/configuration-settings.png)

</div>
<!-- tabContainer:end -->
