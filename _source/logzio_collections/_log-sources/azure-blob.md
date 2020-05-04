---
title: Ship logs from Azure Blob Storage
logo:
  logofile: azure-blob.svg
  orientation: vertical
data-source: Azure Blob Storage
open-source:
  - title: logzio-azure-blob
    github-repo: logzio-azure-blob
contributors:
  - ronish31
  - imnotashrimp
shipping-tags:
  -  azure
---

To simplify shipping of your logs in Azure Blob Storage,
we provide an automated deployment process.

At the end of this process,
this integration will forward logs from Azure Blob Storage
to your Logz.io account.

<!-- tabContainer:start -->
<div class="branching-container">

* [For a new blob storage account](#new-blob-config)
* [For an existing blob storage account](#existing-blob-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="new-blob-config">

#### New blob storage setup

<div class="tasklist">

##### Configure an automated deployment

👇 Click this button to start the automated deployment.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplateForNewStorage.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.
Make sure to use the settings shown below.

###### In the BASICS section

| Parameter | Description |
|---|---|
| Resource group | Click **Create new**. Give a meaningful **Name**, such as "logziobBlobStorageIntegration", and then click **OK**. |
| Location | Choose the same region as the Azure services that will stream data to this Blob Storage. |
{:.paramlist}

###### In the SETTINGS section

| Parameter | Description |
|---|---|
| Logs listener host | Use the listener URL specific to the region of your Logz.io account. You can look it up [here]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| Logs account token | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to. |
| Format (Default: text) | Choose one of the supported parsing formats: json/csv/text  |
{:.paramlist}

At the bottom of the page, agree to the terms and conditions. 
Then click **Purchase** to deploy. Deployment can take a few minutes.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open Kibana.
If everything went according to plan, you should see logs with the type `blobStorage` in Kibana.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="existing-blob-config">

#### Existing blob storage setup

**If you don't have a StorageV2 account, stop here.**
Instead, set up this deployment for existing blob storage.
\\
\\
This deployment works with general-purpose v2 storage accounts only.
These are listed as "StorageV2" in the
[_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts)
list,
under the _Kind_ column.
{:.info-box.important}

<div class="tasklist">

##### Configure an automated deployment

👇 Click this button to start the automated deployment.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-blob%2Fmaster%2Fdeployments%2FdeploymentTemplate.json)
{:.override.btn-img}

You'll be taken to Azure,
where you'll configure the resources to be deployed.
Make sure to use the settings shown below.

###### In the BASICS section

| Parameter | Description |
|---|---|
| Resource group | Choose your existing resource group, and then click **OK**. |
| Location | Choose the same region as the Azure services that will stream data to this Blob Storage. |
{:.paramlist}

###### In the SETTINGS section

| Parameter | Description |
|---|---|
| Logs listener host | Use the listener URL specific to the region of your Logz.io account. You can look it up [here]({{site.baseurl}}/user-guide/accounts/account-region.html).  |
| Logs account token | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format (Default: text) | Choose one of the supported parsing formats: json/csv/text  |
{:.paramlist}

At the bottom of the page, agree to the terms and conditions. 
Then click **Purchase** to deploy. Deployment can take a few minutes.

##### Add a blob container
In the
[_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts)
page, click your StorageV2 storage account to open it.

Click the **Containers** card to continue to the _Containers_ page.

**If you already have blob containers:** 

For every blob container, in the top menu bar press **Change access level** and choose **Blob** from the **Public access level** list.


**If you don't have a blob container, build one now:** 

Click **+ Container** in the toolbar.

Give your container a meaningful **Name**,
and choose **Blob** from the **Public access level** list.

Press **OK** to create your container
and return to the _Containers_ page.

##### Build an event subscription

Open your storage account. In the left menu, select **Events**.

Click **+ Event Subscription** in the toolbar.

###### In "EVENT SUBSCRIPTION DETAILS"

| Parameter | Description |
|---|---|
| Name | Give a meaningful name. |
| Event Schema | Choose **Event Grid Schema** |
{:.paramlist}

###### In "EVENT TYPES"

Give the event subscription a meaningful **Name**.

| Parameter | Description |
|---|---|
| Filter to Event Types | Select **Blob Created** only, and clear the remaining check boxes. |
{:.paramlist}

###### In "ENDPOINT DETAILS"

| Parameter | Description |
|---|---|
| Endpoint Type | Choose **Event Hubs**. |
| Endpoint | Click **Select an endpoint**, then choose your resource group. |
{:.paramlist}

Click **Create** to continue.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open Kibana.
If everything went according to plan, you should see logs with the type `blobStorage` in Kibana.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
