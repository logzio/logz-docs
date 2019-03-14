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

## logzio-azure-serverless + Event Hubs setup

**You'll need:** An [Event Hub that will receive logs](https://docs.microsoft.com/en-us/azure/event-hubs/), logs streaming [from your Azure services to the Event Hub](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs)

In step 1 below, you'll need the Event Hub name, resource group, and region—so keep this information handy!


###### Configuration

{:.tasklist .firstline-headline}
1. Create a new Azure function app

    <div class="info-box read">
      If you need more help setting up a function app, see [Azure Functions Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/) from Microsoft.
    </div>

    In the left menu of the Azure Portal, click **Create a resource**, then select **Compute > Function App**.
    Click **Create** (bottom of the panel) to continue to the _Function App_ panel.

    Use these settings (set the other values to whatever makes sense for your environment):
    * **Resource Group**: Click **Use existing**, and then choose the resource group that contains the Event Hub you'll collect logs from
    * **Runtime Stack**: Choose **JavaScript**
    * **Location**: Choose the same region as the Event Hub you'll collect logs from

    Click **Create** to deploy the new function app. This may take a few minutes.

    ![Notifications: Deployment Succeeded]({{site.baseurl}}/images/azure-event-hubs/notifications--go-to-resource.png)

    Wait until the deployment is complete to continue.

2. Create a new function in the function app

    In the left menu, click **Resource groups**, then click the resource group that you just deployed to.

    ![Azure resource groups]({{site.baseurl}}/images/azure-event-hubs/resource-groups-overview.png)

    Click the function app you just deployed.
    In the function app's left menu, click **+** (next to **Functions**) to add a new function.
    This takes you to the Quickstart tab.

    ![Azure function Quickstart tab]({{site.baseurl}}/images/azure-event-hubs/function-quickstart.png)

    Click **In-portal**, and then click **Continue**.

    ![Azure function Quickstart tab, step 2]({{site.baseurl}}/images/azure-event-hubs/function-quickstart-step-2.png)

    Click **More templates...**, and then click **Finish and view templates** to continue.

    ![Event Hub Trigger]({{site.baseurl}}/images/azure-event-hubs/event-hub-trigger.png)

    In the search box, type "event hub", and then click **Azure Event Hub Trigger**.
    The _New Function_ panel opens.

    ![New Function panel]({{site.baseurl}}/images/azure-event-hubs/new-function-panel.png)

    Above the **Event Hub connection** list, click **new**.
    In the _Connection_ dialog box, select the **Event Hub** tab, then set the options for the Event Hub you'll collect logs from.
    Click **Select** to return to the _New Function_ panel.

    Leave the other form fields as their default values, and then click **Create**.

3. Set up index.js

      In the _index.js_ file, replace the default code with the code from [index.js](https://github.com/logzio/logzio-azure-serverless/blob/master/src/index.js) in logzio-azure-serverless.

    Replace `<ACCOUNT-TOKEN>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

    Replace `<LISTENER-URL>` with your region's listener URL. If your login URL is app.logz.io, use `listener.logz.io`. If your login URL is app-eu.logz.io, use `listener-eu.logz.io`.

    Click **Save**.

4. Set up data-parser.js

   In the _View files_ panel, click **Add** to add a new file. Name this file `data-parser.js`.

   Open _data-parser.js_, paste the code from [data-parser.js](https://github.com/logzio/logzio-azure-serverless/blob/master/src/data-parser.js) in logzio-azure-serverless, and click **Save**.

5. Install logzio-nodejs

    In the bottom of the window, click **Console** to show the command line, then update npm to the latest version and install logzio-nodejs:

    ```powershell
    npm i -g npm
    npm install logzio-nodejs
    ```

    The logzio-nodejs installation may take a few minutes.
    You can confirm the installation started by clicking **View files** (on the right side of the window) and finding _node_modules > logzio-nodejs_.

6. Check Logz.io for your logs

    On the right of the window, click **Test** to show the test panel, and then click **Run**.
    If you experience any errors in Azure, it may be that the logzio-nodejs installation isn't complete yet.

    <div class="info-box read">
      For information on dependency management, see [Azure Functions JavaScript developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#dependency-management) from Microsoft.
    </div>

    Give your logs some time to get from your system to ours, and then open Kibana.
    If everything went according to plan, you should see logs with the type `eventhub` in Kibana.

    If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).