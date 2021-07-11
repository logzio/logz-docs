---
title: Ship Auth0 events
logo:
  logofile: auth0.png
  orientation: vertical
data-source: Auth0
templates: ["no-template"]
contributors:
  - nshishkin
shipping-tags:
  - platform-service
order: 50
---

#### Ship events data from your Auth0 account to Logz.io

Deploy this integration to ship Auth0 events from your Auth0 account to Logz.io using Logstash.

**Before you begin, you'll need**: an active account with Auth0

<div class="tasklist">

##### Install the "Auth0 Logs to Logstash" extension

1. Login to your Auth0 account.

2. On the Auth0 Dashboard, select **Extensions**.

3. Configure the required parameters as follows:

   * Enter your Listener host URL and port into the **LOGSTASH_URL** filed. {% include log-shipping/listener-var.md %}
   * Enter your log shipping token (`<<LOG-SHIPPING-TOKEN>>`) into the **LOGSTASH_TOKEN** field. {% include log-shipping/log-shipping-token.md %}
   * Enter `auth0` into the **LOGSTASH_INDEX** field.

4. Configure the optional parameters as described [here](https://auth0.com/docs/extensions/export-logs-to-logstash).

5. Select **Install**.

6. On the **Installed extensions** page, select **Auth0 Logs to Logstash**.

7. Authorize the extension.


##### Check Logz.io for your data

Give your data some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). You can filter for data of type `auth0` to see the incoming Auth0 events.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
