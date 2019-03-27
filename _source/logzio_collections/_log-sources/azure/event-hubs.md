---
layout: article
title: Ship Event Hub logs
logo:
  logofile: azure-event-hubs.svg
  orientation: vertical
shipping-summary:
  data-source: Azure Event Hubs
  log-shippers:
    - logzio-azure-serverless
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/EventHub
tags:
  - azure
  - event-hubs
contributors:
  - imnotashrimp
  - amirkalron
---

## Setup

This page tells you how to ship logs from your Azure services to Logz.io.
At the end of this process, your Azure function will forward logs from an Azure Event Hub to your Logz.io account.

###### Configuration

{:.tasklist .firstline-headline}
1. Deploy the Logz.io template

    👇 Click this button to load the Logz.io template in Azure.

    <a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Flogzio%2Flogzio-azure-serverless%2Fmaster%2Fazuredeploy.json">
      <img class="override btn-img" alt="Deploy to Azure" src="http://azuredeploy.net/deploybutton.png">
    </a>

2. Configure the template

    ![Customized template]({{site.baseurl}}/images/azure-event-hubs/customized-template.png)

    Make sure to use the settings shown below.

    {: .inline-header}
    In the BASICS section

    {: .parameter-list }
    Resource group
    : Click **Create new**.
      Give a meaningful Name, such as "logzioEventHubIntegration", and then click **OK**.

    Location
    : Choose the same region as the Azure services that will stream data to this Event Hub.

    {: .inline-header }
    In the SETTINGS section

    {: .parameter-list }
    Logs listener host
    : Use the listener URL for your logs account region.
      For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). \\
      <span class="default-param">listener.logz.io</span>

    Metrics listener host
    : Use the listener URL for your metrics account region \\
      <span class="default-param">listener.logz.io</span>

    Logs account token
    : Use the [token](https://app.logz.io/#/dashboard/settings/general) of the logs account you want to ship to.

    Metrics account token
    : Use the [token](https://app.logz.io/#/dashboard/settings/general) of the metrics account you want to ship to.

    \\
    At the bottom of the page, select **I agree to the terms and conditions stated above**, and then click **Purchase** to deploy.

    Deployment can take a few minutes.

3. _(Optional)_ Add failsafes for shipping timeouts

    You can configure logzio-azure-serverless to back up logs and metrics to Azure Blob Storage.
    So if the connection to Logz.io times out or an error occurs, you'll still have a backup of any dropped data that didn't get shipped.

    To do this, expand your function app's left menu, and then click **Integrate**.

    ![New Blob output]({{site.baseurl}}/images/azure-event-hubs/azure-blob-storage-outputblob.png)

    In the top of the triggers panel, click **Azure Blob Storage (outputBlob)**.
    The _Azure Blob Storage output_ settings are displayed.

    Leave **Blob parameter name** blank.
    Enter the **Path** for the Azure blob you're sending dropped logs or metrics to, and then click **Save**.

    <div class="info-box important">
      Make sure the blob **Path** you're using here already exists, or create it now.
    </div>

    <div class="info-box read">
      For more information on Azure Blob output binding, see [Azure Blob storage bindings for Azure Functions > Output](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob#output) from Microsoft.
    </div>

4. Stream activity and audit logs to your new event hub

    Now you'll need to configure Azure to stream logs to your new event hub so that your new function apps can forward that data to Logz.io.

    In the search bar, type "Active", and then click **Azure Active Directory**.
    This brings you to the _Activity log_ page.

    Select **Monitoring > Audit logs** from the left menu to go to the _Audit logs_ page.

    In the button bar, click **Export Data Settings** to go to the _Diagnostics settings_ page, and then click **+ Add diagnostic setting**.
    This opens the _Diagnostics settings_ panel.

    Give your diagnostic settings a **Name**.

    Select **Stream to an event hub**, and then click **Configure** to open the _Select event hub_ panel.

    Choose your event hub:

    * **Event hub namespace**: Choose the namespace that starts with "LogzioNS" (_LogzioNS6nvkqdcci10p_, for example)
    * **Event hub name**: Choose "insights-operational-logs"
    * **Event hub policy name**: Choose "LogzioSharedAccessKey"

    Click **OK** to return to _Diagnostics settings_.

    In the _Log_ section, select the logs you want to stream, and then click **Save**.
    The selected logs will now stream to the event hub.


6. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open Kibana.
    If everything went according to plan, you should see logs with the type `eventhub` in Kibana.

    If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).