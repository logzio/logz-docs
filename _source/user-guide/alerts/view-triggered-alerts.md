---
layout: article
title: View triggered alerts
contributors:
  - imnotashrimp
---

Logz.io creates a log entry every time an alert is triggered, even if no notification is sent out. So if an alert is triggered while notifications are suppressed, or if you configured a non-critical alert without notifications, the alert is still logged.

![Triggered alerts]({{site.baseurl}}/images/alerts/alerts--triggered-alerts.png)

To view triggered alerts, select [**Alerts > Triggered alerts**](https://app.logz.io/#/dashboard/triggers/triggered-alerts) from the top menu.

###### View a triggered alert in Kibana

To see a triggered alert in Kibana, hover over the alert, and then click **View in Kibana**.

![View triggered alert in Kibana]({{site.baseurl}}/images/alerts/alerts--view-in-kibana.png)

This takes you to the alert query for the time period that triggered the alert. Using Kibana, you can explore your logs and get a better idea of the conditions that led to the triggered alert.