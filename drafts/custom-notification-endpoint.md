# Logz.io Integration

## What does Opsgenie offer Logz.io users?

The Logz.io platform allows customers to configure customizable alerts and take actions based on the chosen criteria in order to highlight or be notified of events of interest. With Logz.io Integration, Opsgenie acts as a dispatcher for these alerts, determines the right people to notify based on on-call schedules– notifies via email, text messages (SMS), phone calls and iPhone & Android push notifications, and escalates alerts until the alert is acknowledged or closed.

## Functionality of the integration

When an alert is created in Logz.io, an alert is also created in Opsgenie automatically through the integration.

### Add Logz.io Integration in Opsgenie

1. Please create an [Opsgenie account](https://www.opsgenie.com/#signup) if you haven't done so already.
2. Go to [Opsgenie Logz.io Integration page](https://app.opsgenie.com/integration#/add/LogzIO).

For **Free** and **Essentials** plans, you can **only** add the integrations from the Team Dashboards, please use the alternative instructions given below to add this integration.
{:.info-box.important}

3. Specify who is notified of Logz.io alerts using the **Teams field**. Auto-complete suggestions are provided as you type.

An alternative for Step 2) and Step 3) is to add the integration from the Team Dashboard of the team which will own the integration. To add an integration directly to a team, navigate to the **Team Dashboard** and open **Integrations** tab. Click **Add Integration** and select the integration that you would like to add.
{:.info-box.note}

4. Copy the API URL.
5. Click **Save Integration**.

## Configuration in Logz.io

1. In Logz.io, open Alerts Screen from the upper menu.
2. Select **Alert Endpoints** from the side menu.
3. Select **Custom** as "Type".
4. Paste the API URL into Webhook URL field.
5. Select **Post** as "Method".
6. Click **Save**.
7. To create an alert, click **Create Alert**.
8. Select the "Opsgenie" endpoint as Notification Endpoint.

### Sample payload sent from Logz.io

Create Alert payload: [ screen shot ]
This payload is parsed by Opsgenie as: [ screen shot ]

### Sample alert


