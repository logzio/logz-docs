---
title: Ship Azure diagnostic metrics
open-source:
  - title: logzio-azure-serverless
    github-repo: logzio-azure-serverless
logo:
  logofile: azure-monitor.svg
  orientation: vertical
data-source: Azure diagnostic metrics
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Diagnostics-settings
tags:
  - azure
  - event-hubs
contributors:
  - imnotashrimp
  - amirkalron
  - idohalevi
shipping-tags:
  - azure
---

To simplify shipping your Azure diagnostic metrics, we provide an automated deployment process.
At the end of this process, you'll have configured an event hub namespace, an event hub, and 2 storage blobs.

The resources set up by the automated deployment can collect data for a single Azure region and ship that data to Logz.io.

## More information

<details>

<summary>
What am I setting up in my Azure account?
</summary>

The automated deployment sets up a new Event Hub namespace and all the components you'll need to collect metrics in one Azure region.

Each automated deployment sets up these resources in your Azure environment:

* 1 namespace
* 1 Azure function
* 1 event hubs
* 2 blobs

##### Naming convention

Each deployed resource has a Logz.io-defined name and ends with a string unique to that deployment.

For example:
We name the namespace `LogzioNS`—so if your namespace is `LogzioNS6nvkqdcci10p`, the rest of the deployed resources will end with `6nvkqdcci10p`.

</details>

<details>

<summary>
How many automated deployments should I... deploy?
</summary>

Azure requires an event hub in the same region as your services.
Also worth noting is that you can stream data from multiple services to one event hub (as long as it's in the same region).

So what does this mean for you?
It means that you'll need to do at least one automated deployment for each region where you want to collect logs or metrics.

</details>

## Setup

###### Configuration

{:.tasklist.firstline-headline}
1. If needed, configure an automated deployment

    If you already set up an automated deployment in this region, you can skip to step 2.

    👇 Otherwise, click this button to start the automated deployment.

    [![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-serverless%2Fmaster%2Fdeployments%2Fazuredeploymetrics.json)
    {:.override.btn-img}

    You'll be taken to Azure, where you'll configure the resources to be deployed.
    Make sure to use the settings shown below.

    ![Customized template]({{site.baseurl}}/images/azure-event-hubs/customized-template.png)

    {:.inline-header}
    In the BASICS section

    Resource group
    : Click **Create new**.
      Give a meaningful **Name**, such as "logzioEventHubIntegration", and then click **OK**.

    Location
    : Choose the same region as the Azure services that will stream data to this Event Hub.


    {:.inline-header}
    In the SETTINGS section

    Metrics listener host
    : Use the listener URL for your metrics account region.
      For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

    Metrics account token
    : Use the [token](https://app.logz.io/#/dashboard/settings/general) of the metrics account you want to ship to.

    At the bottom of the page, select **I agree to the terms and conditions stated above**, and then click **Purchase** to deploy.

    Deployment can take a few minutes.

2. _(Optional)_ Add failsafes for shipping timeouts

    You can configure Azure to back up your data to Azure Blob Storage.
    So if the connection to Logz.io times out or an error occurs, you'll still have a backup of any dropped data.

    To do this, expand your function app's left menu, and then click **Integrate**.

    ![New Blob output]({{site.baseurl}}/images/azure-event-hubs/azure-blob-storage-outputblob.png)

    In the top of the triggers panel, click **Azure Blob Storage (outputBlob)**.
    The _Azure Blob Storage output_ settings are displayed.

    Leave **Blob parameter name** blank.
    Enter the **Path** for the Azure blob you're sending dropped metrics to, and then click **Save**.

    <div class="info-box read">
      For more information on Azure Blob output binding, see [Azure Blob storage bindings for Azure Functions > Output](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob#output) from Microsoft.
    </div>

3. Stream data to the new event hub

    So far in this process, you've deployed an event hub and a function app.

    Now you'll need to configure Azure to stream diagnostic metrics to the event hub you just deployed.
    When data comes into the event hub, the function app will forward that data to Logz.io.

    In the search bar, type "Diagnostics", and then click **Diagnostics settings**.
    This brings you to the _Diagnostics settings_ page.

    Choose a resource from the list of resources, and click **Turn on diagnostics settings** to open the _Diagnostics settings_ panel for that resource.

    Give your diagnostic settings a **Name**.

    Select **Stream to an event hub**, and then click **Configure** to open the _Select event hub_ panel.

    Choose your event hub:

    * **Event hub namespace**: Choose the namespace that starts with **LogzioNS** (LogzioNS6nvkqdcci10p, for example)
    * **Event hub name**: Choose **insights-operational-metrics**
    * **Event hub policy name**: Choose **LogzioSharedAccessKey**
    * Click **OK** to return to Diagnostics settings.

    Click **OK** to return to the _Diagnostics settings_ panel.

    In the _Metrics_ section, select the data you want to stream, and then click **Save**.
    The selected data will now stream to the event hub.

6. Check Logz.io for your metrics

    Give your data some time to get from your system to ours, and then open Kibana.
