---
title: Ship Intercom events
logo:
  logofile: intercom.png
  orientation: vertical
data-source: Intercom
templates: ["no-template"]
contributors:
  - nshishkin
shipping-tags:
  - platform-service
order: 50
---

#### NEW BUTTON111

<!-- logzio-inject:install:grafana:dashboards ids=["7GOPHucWSajA5pptILGVcc8G","7GOPHucWSajA5pptILGV8G11111","4Tk1cgkBEnccyrOjTuhKILto","4F0PJis1ccp02ZyMtuMflYyo","asdasd"] -->

#### Ship events data from your Intercom account to Logz.io

Deploy this integration to ship Intercom events from your Intercom account to Logz.io using webhooks.

**Before you begin, you'll need**: an active account with Intercom.

<div class="tasklist">

##### Create an Intercom developer app

1. Log in to your Intercom account.

2. Navigate to the [Developer hub](https://app.intercom.com/a/apps/_/developer-hub) and select **New app**.

3. Enter the required app name.

4. Select the required workspace.

5. Select **Internal integration**.

6. Select **Create app**.

7. Navigate to **Configure > Webhooks**.

8. Enter the following into the **Your request endpoint URL** field:

   ```shell
   https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=<<MY-TYPE>>
   ```
      {% include /general-shipping/replace-placeholders.md %}

9. {% include log-shipping/type.md %}

10. Select the required webhook topics for the notification types that will be sent to Logz.io.

11. Select **Save**.


##### Check Logz.io for your data

Give your data some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
