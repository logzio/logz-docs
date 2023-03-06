---
title: Ship Azure diagnostic metrics
open-source:
  - title: logzio-azure-serverless
    github-repo: logzio-azure-serverless
logo:
  logofile: azure-monitor.svg
  orientation: vertical
data-source: Azure diagnostic metrics
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/diagnostics-settings
tags:
  - azure
  - event-hubs
contributors:
  - imnotashrimp
  - amirkalron
  - idohalevi
  - ronish31
  - shalper
shipping-tags:
  - azure
---

To simplify shipping your Azure diagnostic metrics, we provide an automated deployment process.
	At the end of this process, your Azure function will forward metrics from an Azure Event Hub to your Logz.io account.

## More information

<details>

<summary>
What am I setting up in my Azure account?
</summary>

The automated deployment sets up a new Event Hub namespace and all the components you'll need to collect metrics in one Azure region.

Each automated deployment sets up these resources in your Azure environment:

* Serveless Function App
* Event Hubs Namspace
* Function's logs Storage Account
* Back up Storage Account for failed shipping
* App Service Plan
* Application Insights

##### Naming convention

Each deployed resource has a Logz.io-defined name and ends with a string unique to that deployment.

For example:
We name the namespace `LogzioMNS`—so if your namespace is `LogzioMNS6nvkqdcci10p`, the rest of the deployed resources will end with `6nvkqdcci10p`.

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

#### Configuration

<div class="tasklist">

##### If needed, configure an automated deployment

If you already set up an automated deployment in this region, you can skip to step 2.

👇 Otherwise, click this button to start the automated deployment.

[![Deploy to Azure](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure_blob/deploybutton-az.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-serverless%2Fmaster%2Fdeployments%2Fazuredeploymetrics.json)
{:.override.btn-img}

You'll be taken to Azure, where you'll configure the resources to be deployed.
Make sure to use the settings shown below.

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/azure-event-hubs/customized-template.png)

###### In the SETTINGS section

| Parameter | Description |
|---|---|
| Resource group* | Create a new resource group or select your existing one, and then click **OK**. |
| Region* | Select the same region as the Azure services that will stream data to this event hub. |
| Shipping token* | Add the [metrics shipping token](https://docs.logz.io/user-guide/accounts/finding-your-metrics-account-token/) for the Logz.io account you want to ship to.  |
| Logs listener host* (Default: `listener.logz.io`)| Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| buffersize (Default: 100) | The maximum number of messages the logger will accumulate before sending them all as a bulk  |

*Required fields.  

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  
Deployment can take a few minutes.

##### Stream data to the new event hub

So far in this process, you've deployed an event hub and a function app.

Now you'll need to configure Azure to stream diagnostic metrics to the event hub you just deployed.
When data comes into the event hub, the function app will forward that data to Logz.io.

In the search bar, type "Diagnostics", and then click **Diagnostics settings**.
This brings you to the _Diagnostics settings_ page.

Choose a resource from the list of resources, and click **Turn on diagnostics settings** to open the _Diagnostics settings_ panel for that resource.

Give your diagnostic settings a **Name**.

Select **Stream to an event hub**, and then click **Configure** to open the _Select event hub_ panel.

Choose your event hub:

* **Event hub namespace**: Choose the namespace that starts with **LogzioMNS** (LogzioMNS6nvkqdcci10p, for example)
* **Event hub name**: Choose **logzioeventhub**
* **Event hub policy name**: Choose **LogzioMSharedAccessKey**
* Click **OK** to return to Diagnostics settings.

Click **OK** to return to the _Diagnostics settings_ panel.

In the _Metrics_ section, select the data you want to stream, and then click **Save**.
The selected data will now stream to the event hub.

##### Building rollups config

**Contact support to request a custom rollups config.**  
Your Metrics account offers 18 month retention, by default. This is to allow you to establish your baseline and make comparisons over a substantial time frame.
Data rollups are used to compress the data without losing the original extremes. The original max, min, and average values are kept so you can graph the data more accurately despite its compression. For more information and the list of default configs, see Rollups.
To kick off this process, email Support to request a custom rollups config,
help@logz.io.

Include the following details in your message:  
Your Logz.io Metrics account ID or token.
At least 5 sample JSONs of your custom metrics.
If you are sending multiple metricsets, add descriptions to clarify which dimensions are associated with each metricset.
Configuring the rollups for your custom metrics is included in your package and we’re happy to offer it!

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/osd).

##### Backing up your logs!

This deployment will also back up your data in case of connection or shipping errors. In that case the logs that weren't shipped to Logz.io will be uploaded to the blob storage 'logziologsbackupstorage' under the container 'logziologsbackupcontainer'.

##### Working with your parameters after deployment

If you wish to change parameters values after the deployment, go to your function app page, then on the left menu press the 'Configuration' tab.
You'll have the option to edit the following values:
* Shipper's configurations such as LogzioHost, LogzioToken, Buffersize.
* FUNCTIONS_WORKER_PROCESS_COUNT - maximum of 10, for more information press [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count).
* ParseEmptyFields - (Default: False) If you encounter invalid logs of Azure's services that contains empty fields and will not parse in Open Search Dashboards, you can use this option by changing it's values to 'true'. **Please note using this option may slow the shipper's perfomance.**

![Function's configuration](img/configuration-settings.png)

</div>
