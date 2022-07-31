---
layout: article
title: Alerts
permalink: /user-guide/infrastructure-monitoring/alerts.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Meet Logz.io's alert manager for Metrics
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - amosd92
  - hidan
---

Logz.io alerts help you keep a watchful eye for data that indicates an issue




Add alerts to graphs in your Metrics dashboards to be notified when values are outside of their acceptable range. 

Alerts can be configured to send notifications via your preferred [channels]({{site.baseurl}}/user-guide/integrations/endpoints.html) and email.
You can also add a condition so an alert holds off for a certain time before it sends out notifications. During this time, the alert will appear on the graph in your dashboard as orange, before it switches to red. This will prevent triggering alerts for short-lived issues that are resolved on their own and help reduce alert fatigue.

If you're running multiple servers for load balancing purposes, you'll be happy to know that Logz.io Metrics won't send duplicte alerts. A deduplication mechanism protects against that.

###### On this page
{:.no_toc}

1. toc list
{:toc}





Logz.io alerts lets you know when issues occur in your system, such as memory metric spikes, 3xx-4xx response codes, and more. 

Get alerts as soon as they happen. 

Set an actionable alert to immediately notify engineers of oncoming problems.

You can base your alerts on metric data, providing near real-time measurements of key singnals.

Alert manager for Metrics monitoring. 

Build, edit, and manage metrics alerts quickly and easily. Configure actionable and informative alerts. 


Logz.io’s Alert Manager is fully compatible with the Prometheus Alert Manager, which will make it fast and easy to migrate existing Prometheus alerts to Logz.io- furthering the promise of delivering an enhanced Prometheus-based monitoring experience.

### Create an alert from an existing panel

Navigate to your [Metrics account](https://app.logz.io/#/dashboard/metrics/), open your dashboard and choose the panel you'd like to use for your alert.

Click on the name of the panel and choose **Edit**. 

![Dashboard to alert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/xxx.png)

Then, navigate to the **Alert** tab and click on the **Create alert rule from this panel** button. This will automatically pull the query and variables to the Create alert rule page.

![Create alert flow](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/xxx.png)

Name your alert and choose the folder you'd like to assosiate it to. You can also group this alert with similar alerts inside your folder.

You'll can review and edit the queries you'll be monitoring, as pulled from the panel you chose. For example, you can edit the query to monitor metrics from all backend services, including cart and catalouge.

![Create alert flow](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/xxx.png)

The ‘Cart’, ‘Catalogue,’ and ‘Orders’ services currently match the query conditions. There are other services that have lower latency, so they aren’t currently shown.

Next, you need to define the function that will perform calculations on the data.

Click on the **Operation** dropdown menu and choose the condition you'd like to apply. For example, **Reduce** to reduce the time series to one data point (required for the alert to run).

In the **Fucntion** row, choose **Last** to get the most relevant data point. Since the threshold is defined in the previous section, this funtion will only affects what will be presented in the notification rather than an actual condition. 



<!-->




Now we can define the alert condition. Under ‘Condition,’ we will choose D, which will monitor the expression we just configured. Under ‘Evaluate,’ we’ll specify that the alert should evaluate the expression every minute; and if it is pending over a span of 5 minutes, the alert will trigger a notification. This prevents the alert from triggering if the query briefly crosses the alerting threshold.

Under ‘Configure no data and error handling,’ we can also configure the alert to trigger a notification if there is no data or errors appear – this way we can fix any problems that would prevent the alert from firing. 

We can also preview the alert to verify it is successfully monitoring the data. By hitting ‘Preview alerts’, Logz.io will run the query and give the alerting result.


Finally, we can add details to give the alert context and annotations if it triggers. In the summary, we used templates like {{$labels.path}} and {{$values.D}} to automatically populate the summary with information from the relevant services.

alert details
Finally, we can hit ‘Save’ or ‘Save and exit’ to save the alert. Going back to the Alert Manager homepage (which is in the left menu), we can see our new alert in the ‘Sockshop’ folder.

Alerting
Now, let’s determine where the alert will send notifications if it’s triggered.

Contact Points – define your notification endpoint
This is where Logz.io users can define the messages within the alerts and destinations for their notifications. Common alerting endpoints for Logz.io include Slack, PagerDuty, Gmail, OpsGenie, and others. Go to the ‘Contact points’ tab in Alert Manager and hit ‘New contact point.’

Give the contact point a name and select the application you’ll use as an endpoint. In this example, we’ll choose Slack. We can also specify the Slack channel we want to send the notification.

Next, we can provide the Slack API token or add the Webhook URL. Hit ‘Save contact point.’

create contact point
Now that we have a Contact point, we can link the alerting rule with our new Contact Point by going to ‘Notification Policies.’

Notification policies – configure your alerting notifications
This is where you can match alerts with your contact points (which contains the notification endpoint) and define other components of the alerting notification. 

To start, go to the ‘Notification Policies’ tab and hit ‘New Policy,’ and then ‘Add Matcher.’

We will add the label (alertname) and the value for the label (Backend Latency Alert) for the alert we’re interested in. Then we’ll select the contact point we just configured (Slack Backend Alerts).

By enabling ‘Override grouping’ and selecting a label, we can group all the firing alerts with that label to ensure we aren’t getting annoying duplicates. 

We can also configure a mute timing to pause notifications during predined periods – like weekend, for example.

notifications
Silences – temporarily mute notifications
Production issues, scheduled maintenance, or other production events can cause an overwhelming barrage of alerts. Silences provide an easy way to get some peace and quiet during these events. 

Simply open up an alert within the ‘Alert Rules’ tab and hit ‘Silence.’ This will bring you to the ‘Silences’ tab where you can quickly prevent the alert from firing.

sockshop
alerting
Alert Groups – organize your alerts
Alerts Groups can condense multiple alerts into single notifications to prevent alerting overload. This also prevents duplicate alerts from triggering separate notifications. 

Simply search labels with their according value under ‘Search by label’ and/or select a label under the ‘custom group by’ drop down to identify groups of alerts to consolidate.

alert-group
Try Alert Manager today!
Logz.io’s Infrastructure Monitoring product is getting a huge boost with Alert Manager, which makes alerting for metrics data easier and more customizable for complex alerts.

Alert Manager is in Public Beta. To join the Beta program and try it for yourself, contact your Logz.io Account Manager or reach out to us through our contact form.




<!--
Add alerts to graphs in your Metrics dashboards to be notified when values are outside of their acceptable range. 

Alerts can be configured to send notifications via your preferred [channels]({{site.baseurl}}/user-guide/integrations/endpoints.html) and email.
You can also add a condition so an alert holds off for a certain time before it sends out notifications. During this time, the alert will appear on the graph in your dashboard as orange, before it switches to red. This will prevent triggering alerts for short-lived issues that are resolved on their own and help reduce alert fatigue.

If you're running multiple servers for load balancing purposes, you'll be happy to know that Logz.io Metrics won't send duplicte alerts. A deduplication mechanism protects against that.

###### On this page
{:.no_toc}

1. toc list
{:toc}


### Adding Alerts
Navigate to the Logz.io Infrastructure Monitoring **Metrics** tab.

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
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/copy-existing-dashboard.mp4" type="video/mp4" />
  </video>

##### Edit your graph

Select the graph panel you'll be using for the alert. Only the graph panel is supported at this point.

Hover over the graph panel name, and click **Edit**.

![Edit Grafana Graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/metrics-edit-graph.png)


##### Remove variables

Alerts can't run if you have any variables in your graph, so you'll need to remove them first.

One option, is to duplicate the query and remove the variables from it. That way you can add alerts to the same graph you use to monitor your dashboard.

Click the copy icon **<i class="far fa-copy"></i>** to duplicate the query.
Then click **<i class="far fa-eye-slash"></i>** to hide the query in the dashboard. You'll only be using it for the alert, and don't want it to appear on the graph.

Remove any variables. Variables are indicated by a `$` sign, as seen in the example below. These will block you from saving your alert.

![Remove variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/grafana-query-variable.png)

Select a fixed source and erase the query or rewrite the query so it doesn't contain variables. You can also leave the query blank.


##### Add an alert

Alerts are added and configured in the Alert tab of any dashboard graph panel, letting you build and visualize an alert using existing queries.

![Add an alert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/create-alert-tab.png)

* In the **Name** field, name your alert. Preferrably, use a name that will be clear to anyone on the team and future newcomers.
* Set an **Evaluation interval** to decide how often the rule should be evaluated.
* In the field **For**, set a time for the "silent alert". This is the time that the alert can go off before it sends a notification. For example, you could send an alert if the rule is breached for 5 minutes or longer. Use this to allow for some leeway, or "wiggle room".

![Add Grafana alert to graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/create-alert-edit-screen.png)

Next, set your alert conditions.

* First, make sure the condition points to the right query. That's the one that doesn't contain variables.
* Define the rule's condition. You can type in the value or drag the heart **<i class="fas fa-heart"></i>** directly on the graph to make your selection.
* You can click the condition to decide whether to set it for values above/below a threshold, within/outside a range, or when it has no value.
* You have the option to set up multiple conditions and queries for more advanced alerts.

![Add Grafana alert to graph panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/alert-conditions-set.png)

**Metrics UI tags for alert Severity levels**

Use Metrics tags as a Severity field for your alerts when integrating the Metrics UI with PagerDuty as an alert notification endpoint.
Follow the link for more information on <a href="https://grafana.com/docs/grafana/latest/alerting/notifications/#pagerduty" target="_blank"> the syntax for setting up Metrics UI tags for PagerDuty.  <i class="fas fa-external-link-alt"></i> </a>

<!-- OpsGenie integration is coming too: Use tags as Priority fields for alerts when integrating Grafana withOpsGenie aas an alert notification endpoint.     Follow the link for more information on <a href="https:/grafana.com/docs/grafana/latest/alerting/notifications/" target="_blank"> the syntax for setting up Grafanatags for OpsGenie <i class="fas fa-external-link-alt"></i> </a> -->   

##### Add notifications

If you want to send notifications or emails when the alert is triggered,
choose notification endpoints.

Endpoints can be Slack channels, email addresses, or other places your team communicates.

To limit how often recipients are notified - you'll need to scroll up to the **Evaluation interval > For** rule above. (See the instructions above).

When notifications are suppressed,
your Metrics dashboard will show the orange marker on the graph, indicating that an alert is triggered, but not yet reached its notification threshold.
{:.info-box.note}

**Additional alert notifications**

+ _**Resolved alerts**_

    For better alerts management and to help you focus only on active alerts, when a tracked metric returns to its    accepted values (below the current alert threshold), you'll get notified automatically that the triggered alert   was resolved. 

    Resolved alert notifications are available for Slack, PagerDuty, Opsgenie, and email notification endpoints.

    See [Opsgenie notifications for resolved metrics alerts]({{site.baseurl}}/user-guide/integrations/resolved-metrics-alerts.html) for more information.

+ _**Acknowledged alerts**_

    To help you reduce the noise associated with receiving notifications for multiple instances of the same alert, you can use the Acknowledge status to assign the alert to a team member or to yourself, as well as manage alerts that are already under investigation (as determined by the ACK policy you manage in your notification software).

    When you receive an alert with the same alert ID, if the alert has the Acknowledge status, your notification endpoint will not repeat the notification.

    The Acknowledge status is available for the PagerDuty notification endpoint.
 


##### Save it!

Click **Save <i class="far fa-save"></i>** in the top-right panel to save your dashboard (and the alert).
If the thresholds are passed and the alert is triggered, you'll see the markers on your dashboard and receive your notifications.