---
title: Ship logs from Azure Blob Storage
logo:
  logofile: azure-blob.svg
  orientation: vertical
data-source: Azure Blob Storage
template-tags: ["azure-deployment"]
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

Logz.io provides an automated deployment process to simplify the process of shipping logs from Azure Blob Storage.
This integration forwards logs from your Azure Blob Storage
to your Logz.io account.


<!-- tabContainer:start -->
<div class="branching-container">

* [Use your existing blob storage account](#existing-blob-config)
* [Create a new blob storage account](#new-blob-config)
{:.branching-tabs}

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

###### In the BASICS section

| Parameter | Description |
|---|---|
| Resource group | Click **Create new**. Give a meaningful **Name**, such as "logziobBlobStorageIntegration", and then click **OK**. |
| Location | Select the same region as the Azure services that will stream data to this Blob Storage. |
{:.paramlist}

###### In the SETTINGS section

| Parameter | Description |
|---|---|
| Logs listener host | Use the listener URL specific to the region of your Logz.io account. You can look it up [here]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| Logs account token | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to. |
| Format (Default: text) | Select one of the supported parsing formats: json/csv/text  |
{:.paramlist}

At the bottom of the page, agree to the terms and conditions.
Then click **Purchase** to deploy. Deployment can take a few minutes.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). 
Any logs sent from this point on should appear under the type `blobStorage`.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

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

###### In the BASICS section

| Parameter | Description |
|---|---|
| Resource group | Select your existing resource group, and then click **OK**. |
| Location | Select the same region as the Azure services that will stream data to this Blob Storage. |
{:.paramlist}

###### In the SETTINGS section

| Parameter | Description |
|---|---|
| Logs listener host | Use the listener URL specific to the region of your Logz.io account. You can look it up [here]({{site.baseurl}}/user-guide/accounts/account-region.html).  |
| Logs account token | Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to.  |
| Format (Default: text) | Select one of the supported parsing formats: json/csv/text  |
{:.paramlist}

At the bottom of the page, agree to the terms and conditions. 
Then click **Purchase** to deploy. Deployment can take a few minutes.

##### Set blob container permissions

In the
[_Storage accounts_](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts)
page, select the relevant StorageV2 account.

Click the **Containers** card to open it.

  * If you already have blob containers, you'll need to change their access level. This is done one by one, for every blob container.
      
      In the top menu, select **Change access level > Public access level > Blob**.

  * If you don't yet have a blob container, build one now.
    
       Click **+ Container** in the toolbar. Give your container a meaningful **Name**, and select **Blob** from the **Public access level** list. Press **OK** to create your container.

##### Build an event subscription

Open your storage account. In the left menu, select **Events**. Click **+ Event Subscription** in the toolbar and fill in the details as described next.

###### In "EVENT SUBSCRIPTION DETAILS"

| Parameter | Description |
|---|---|
| Name | Give a meaningful name. |
| Event Schema | Select **Event Grid Schema** |
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
| Endpoint Type | Select **Event Hubs**. |
| Endpoint | Click **Select an endpoint**, then select your resource group. |
{:.paramlist}

Click **Create** to continue.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). 
Any logs sent from this point on should appear under the type `blobStorage`.

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
