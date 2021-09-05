---
title: Ship Azure diagnostic metrics
open-source:
  - title: logzio-azure-serverless
    github-repo: logzio-azure-serverless
logo:
  logofile: azure-monitor.svg
  orientation: vertical
data-source: Azure diagnostic metrics
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
#### NEW BUTTON
456
<!-- logzio-inject:grafana:dashboards-installation ids=['4Tk1cgkBEnyrOjTuhKILto','4F0PJis1p02ZyMtuMflYyo'] -->

<!-- info-box-start:info -->
This metrics solution is deprecated and only works with the Elastic-based Logz.io metrics product.
{:.info-box.important}
<!-- info-box-end -->

Ship your Azure activity metrics using an automated deployment process.
At the end of this process, your Azure function will forward metrics from an Azure Event Hub to your Logz.io account.


![Overview of Azure Diagnostic Logz.io integration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/azure-diagnostic-logs-overview.png)

###### Overview of the services you'll be setting up in your Azure account

The automated deployment sets up a new Event Hub namespace and all the components you'll need to collect metrics in one Azure region.

The automated deployment will create the following resources in your Azure environment:

* Serveless Function App
* Event Hubs Namspace
* Storage Account for the Function's logs
* Storage Account for backing up failed shipping
* App Service Plan
* Application Insights


###### How to determine how many automated deployments you'll need

You'll need at least 1 automated deployment for each region where you want to collect metrics. So the number of automated deployments you need depends on the number of regions involved.


Azure requires an event hub in the same region as your services. The good news is you can stream data from multiple services to the same event hub, just as long as they are in the same region.


###### Backing up your logs

This deployment will automatically back up your data in case of connection or shipping errors.

If this happens, the logs that weren't shipped to Logz.io will be uploaded to the blob storage `logziologsbackupstorage` under the container `logziologsbackupcontainer`.



#### Configuration

<div class="tasklist">

##### Configure an automated deployment

You can skip this step if you have already set up an automated deployment in this region before.

👇 Otherwise, click this button to start the automated deployment.

[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-serverless%2Fmaster%2Fdeployments%2Fazuredeploymetrics.json)
{:.override.btn-img}

You'll be taken to Azure, where you'll configure the resources to be deployed.
Make sure to use the settings shown below.


###### Recommended settings



| Parameter | Description |
|---|---|
| Resource group (**Required**) | Create a new resource group or select an existing one, and click **OK**. |
| Region (**Required**) | Select the same region as the Azure services that will stream data to this event hub. |
| Shipping token (**Required**) | Add the [Metrics shipping token](https://docs.logz.io/user-guide/accounts/finding-your-metrics-account-token/) for the Logz.io account you want to ship to.  |
| Listener host (Default: `listener.logz.io`)| Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |
| buffersize (Default: `100`) | The maximum number of messages the logger will accumulate before sending them in bulk.  |

For all other parameters: To use your existing services, change the parameter to the relevant service name. Otherwise, the template will build the necessary services automatically.

At the bottom of the page, select **Review + Create**, and then click **Create** to deploy.  
Deployment can take a few minutes.

##### Stream data to the new event hub

So far in this process, you've deployed an event hub and a function app.

Now you'll need to configure Azure to stream diagnostic metrics to the event hub you just deployed.
When data comes into the event hub, the function app will forward that data to Logz.io.


Navigate to the **Diagnostics settings** page (You can search for it).
Choose a resource from the list of resources, and select **Turn on diagnostics settings** to open the _Diagnostics settings_ panel for that resource.

* Give your diagnostic settings a **Name**.
* Select **Stream to an event hub**. Next, select **Configure** to open the _Select event hub_ panel.


![Stream data to the new event hub](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/diagnostic-settings.png)



Select your event hub:

* **Event hub namespace**: Select the namespace that begins with **LogzioMNS** (For example, `LogzioMNS6nvkqdcci10p`)
* **Event hub name**: Select **logzioeventhub**
* **Event hub policy name**: Select **LogzioMSharedAccessKey**
* Click **OK** to return to the _Diagnostics settings_ panel.

* In the _Metrics_ section, select the data you want to stream, and then click **Save**.

The selected data will now begin streaming to the event hub.


##### Contact support to request a custom rollups config

Metrics rollups are a method of downsampling, or compressing the metrics over time. [Learn more](docs.logz.io/user-guide/infrastructure-monitoring/data-rollups.html)

Configuring the rollups for your custom metrics is included in your package and we’re happy to offer it!
Please [email our support](mailto:help@logz.io?subject=Requesting%20a%20custom%20rollups%20config%20for%20Azure%20Diagnostic%20metrics&body=Hi!%20Please%20be%20in%20touch%20with%20further%20instructions.%20Thanks!) to request assistance.

Include the following details in your message:

* Your Logz.io Metrics account ID or token.
* At least 5 sample JSONs of your custom metrics.
* If you are sending multiple metricsets, add descriptions to clarify which dimensions are associated with each metricset.


##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, and then open your [Logz.io Metrics account](https://app.logz.io/#/dashboard/metrics?).



##### Updating your parameters after deployment

You may find that you want to make changes to the parameter values after you've deployed. Here's what you can do:

* Go to your function app page
* Select the **Configuration** tab in the left menu.

You'll have the option to edit the following values:

* The shipper's configurations, including: LogzioHost, LogzioToken, Buffersize.
* FUNCTIONS_WORKER_PROCESS_COUNT - maximum of 10. [Learn more in Azure Docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-app-settings#functions_worker_process_count).
* ParseEmptyFields (Default: `false`) - This option is a patch to handle a known bug. Consider changing this parameter to `true`, if you encounter invalid logs sent by Azure services that contain empty fields. Logs with empty fields will appear unparsed in Kibana. **Please note that this option may slow the shipper's perfomance and should be enabled only as required.**


![Adjust your Azure Function's configuration settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/configuration-settings-azure-diagnostic-logs.png)




</div>
