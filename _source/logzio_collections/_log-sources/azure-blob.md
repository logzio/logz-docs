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

Deploy this integration to forward logs from your Azure Blob Storage account
to Logz.io using an automated deployment process. You have the option to either connect to an existing Blob storage account or create a new one. You can also [update the parameters for an existing integration](#update-params).

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


<!-- tabContainer:start -->
<div class="branching-container">

* [Connect to existing blob storage account](#existing-blob-config)
* [Create a new blob storage account](#new-blob-config)
{:.branching-tabs}


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

| Parameter | Description |
|---|---|
| Resource group (Required) | Click Create new. Give a meaningful Name, such as "logziobBlobStorageIntegration", and then click OK. |
| Location (Required) | Select the same region as the Azure services that will stream data to this Blob Storage. |
| Logzio host (Required)  | Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| Log shipping token (Required)  | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format (Required) | Select one of the supported parsing formats: text/json/csv |
| Buffersize <span class="default-param">`100`</span>  | The maximum number of messages the logger will accumulate before sending them all as a bulk  |
| Timeout <span class="default-param">`180,000 = 3 minutes`</span> | The read/write/connection timeout in *milliseconds*.  |
{:.paramlist}

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

**Before you begin, you'll need**:

A Blob storage account of the type **StorageV2 (general purpose v2)**.

If your existing blob storage account is of any other kind, it will NOT work. Instead, follow the process to set up a new blob storage account.

Double-check your [_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) to make sure that they are compatible. They should be of the type **StorageV2 (general purpose v2)**.
{:.info-box.important}


<div class="tasklist">

##### Launch an automated deployment

👇 Click this button to start.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplate.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.

##### Fill in the form

| Parameter | Description |
|---|---|
| Resource group (Required) | Select your existing resource group. |
| Location (Required) | Select the same region as the Azure services that will stream data to this Blob Storage. |
| Logzio host (Required)  | Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| Log shipping token (Required)  | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format (Required) | Select one of the supported parsing formats: text/json/csv |
| Blob Storage Account Name (Required) | Insert the name of the storage account that contains the logs.  |
| Buffersize <span class="default-param">`100`</span>  | The maximum number of messages the logger will accumulate before sending them all as a bulk  |
| Timeout <span class="default-param">`180,000 = 3 minutes`</span> | The read/write/connection timeout in *milliseconds*.  |
{:.paramlist}

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  Deployment can take a few minutes. Only logs sent from this point on will be searchable in Logz.io.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for logs of `type` `blobStorage` to see the incoming logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<div>
#### Updating parameters after deployment {#update-params}

Some parameters can be updated post-deployment. These include:

* Shipper-related configurations: **LogzioHost**, **LogzioToken**, **Buffersize**, **Timeout**.
* **FUNCTIONS_WORKER_PROCESS_COUNT** - maximum of 10. [See Microsoft documentation for more details](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count).
* **ParseEmptyField** - Enable/disable the option to parse logs with invalid empty fields. This option exists to overcome a rare bug whereby the services ship unnamed fields that break the parsing pipeline. **Please consider enabling this option only if you encounter unparsed logs due to unnamed fields. Note that it may slow the shipper's performance.**

To update your parameters post-deployment, open the **Function App** page in your Azure portal. On the left menu, select the **Configuration** tab and edit the relevant values.

![Function's configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/configuration-settings.png)

</div>
<!-- tabContainer:end -->
