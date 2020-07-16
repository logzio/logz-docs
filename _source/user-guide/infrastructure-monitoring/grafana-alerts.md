---
layout: article
title: Alerts
permalink: /user-guide/infrastructure-monitoring/alerts.html
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
  - imnotashrimp
---

Add alerts to graphs in your Metrics dashboards to be notified when values are outside of their acceptable range. 

Alerts can be configured to send notifications via your preferred [channels]({{site.baseurl}}/user-guide/integrations/endpoints.html) and email.
You can also add a condition so an alert holds off for a certain time before it sends out notifications. During this time, the alert will appear on the graph in your dashboard as orange, before it switches to red. This will help to avoid getting alerted of short-lived issues that were resolved on their own and reduce alert fatigue.

If you're running multiple servers for load balancing purposes, you'll be happy to know that Logz.io Metrics won't send duplicte alerts. A deduplication mechanism protects against that.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### To add an alert
{:.no_toc}


<div class="tasklist">

##### Pick your dashboard

Before you begin, you'll need to make sure you have permissions to edit the dashboard.

If you are using any of the pre-configured dashboards provided by Logz.io, you'll need to duplicate it first.
(They are read-only, by default.)

Click the gear **<i class="li li-gear"></i>** in the top menu, then select **Save as > Save** .
If you don't rename the dashboard, it will have the same name as the original dashboard, with **Copy** appended at the end.

  <video autoplay loop>
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/copy-dashboard2.mp4" type="video/mp4" />
  </video>

##### Edit your graph

Select the graph panel you'll be using for the alert. Only the graph panel is supported at this point.

Hover over the graph panel name, and click **Edit**.

![Edit Grafana Graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/edit-graph.png)


##### Remove variables

Alerts can't run if you have any variables in your graph, so you'll need to remove them first.

One option, is to duplicate the query and remove the variables from it. That way you can add alerts to the same graph you use to monitor your dashboard.

Click the copy icon **<i class="far fa-copy"></i>** to duplicate the query.
Then click **<i class="far fa-eye-slash"></i>** to hide the query in the dashboard. You'll only be using it for the alert, and don't want it to appear on the graph.

Remove any variables. Variables are indicated by a `$` sign, as seen in the example below. These will block you from saving your alert.

![Remove variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/grafana-variables.png)

Select a fixed source and erase the query or rewrite the query so it doesn't contain variables. You can also leave the query blank.


##### Add an alert

Click the bell **<i class="fas fa-bell"></i>** in the left panel > **Create alert** to add an alert.

Next, configure the alert.

* In the **Name** field, name your alert. Preferrably, use a name that will be clear to anyone on the team and future newcomers.
* Set an **Evaluation interval** to decide how often the rule should be evaluated.
* In the field **For**, set a time for the "silent alert". This is the time that the alert can go off before it sends a notification. For example, you could send an alert if the rule is breached for 5 minutes or longer. Use this to allow for some leeway, or "wiggle room".

![Add Grafana alert to graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/grafana-alert.png)

Next, set your alert conditions.

* First, make sure the condition points to the right query. That's the one that doesn't contain variables.
* Define the rule's condition. You can type in the value or drag the heart **<i class="fas fa-heart"></i>** directly on the graph to make your selection.
* You can click the condition to decide whether to set it for values above/below a threshold, within/outside a range, or when it has no value.
* You have the option to set up multiple conditions and queries for more advanced alerts.

![Add Grafana alert to graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/alert-condition.png)

##### Add notifications

If you want to send notifications or emails when the alert is triggered,
choose notification endpoints.

Endpoints can be Slack channels, email addresses, or other places your team communicates.

To limit how often recipients are notified - you'll need to scroll up to the **Evaluation interval > For** rule above. (See the instructions above).

When notifications are suppressed,
your Metrics dashboard will show the orange marker on the graph, indicating that an alert is triggered, but not yet reached its notification threshold.
{:.info-box.note}

##### Save it!

Click **Save <i class="far fa-save"></i>** in the top-right panel to save your dashboard (and the alert).
If the thresholds are passed and the alert is triggered, you'll see the markers on your dashboard and receive your notifications.
