---
layout: article
title: Add drilldown links in Distributed Tracing
permalink: /user-guide/distributed-tracing/jaeger-drilldown/
flags:
  logzio-plan: pro
tags:
  - distributed tracing
  - drilldown
contributors:
  - shalper
  - yberlinger
---


## OUTLINE


### Overview & purpose

Drilldown links help you go straight to the related logs whenever you identify an issue in your traces and spans and see a need to investigate it further. They are a powerful observability tool that gives you context and visibility into the logs that coincided with the Tracing events.

### Accessing drilldowns from your main account

The drilldown configuration is saved at the log account (Main account) level and is only accessible for the account in which you created it. 

Drilldown correlation links are saved at  THE LOGGING ACCOUNT LEVEL


### Configuring Jaeger drilldowns

#### User interface - understanding the fields in the drilldown configuration

UI modal - **Start from --> Lead to**
Phase 1: Jaeger interface - Note: This functionality will be expanded to all product UIs, across the Logz.io Observability Platform



#### Add a drilldown link


#### Edit a drilldown


#### Delete a drilldown





### Drilldown examples


### Drilldown best practices

Start your drilldown in the product user interface. ![placeholder for a gif showing how a link is created](https://dytvr9ot2sszz.cloudfront.net/logz-docs/...)



### Drilldown settings page (last topic) - "Working in the Drilldown Settings (?)"


--------------- _existing content from SIEM topic_

A drilldown link is a redirect link that takes users directly from an informative log field to another dashboard, already filtered by the selected field.

When investigating data through the logs, metrics, or traces, drilldown links make it possible to simply click on an informative field (such as an IP address, username, or hostname) to open a related dashboard, filtered by the selected field, and review the event in a wider context.

Adding drilldown links to your account will help you speed up and streamline investigations and structure your team's workflows and processes.

Drilldown links are configured in the Jaeger UI, when you view a trace. You begin the processes by searching for traces in [** Tracing > Jaeger **](https://app.logz.io/#/dashboard/jaeger/search) and then selecting a span for the drilldown.

![Image placeholder](https://dytvr9ot2sszz.cloudfront.net/logz-docs/....)

Existing drilldowns can be found in [Drilldown Settings (?)](https://app.logz.io/#/dashboard/settings/drilldowns), a general library.  <!--Need the actual link -->

![Image placeholder](https://dytvr9ot2sszz.cloudfront.net/logz-docs/....)



### Add a drilldown link

1. Click **+ Add drilldown**.
2. Select the **source field** from the dropdown list. This is the field that will become a hyperlink.
3. Select a **dashboard** from the dropdown list. This is the target destination of the drilldown link. When users click the log field in a dashboard or Kibana Discover, it will direct them to this dashboard.
4. Click **Add** to confirm the new drilldown link.

### Edit or delete a drilldown link

* To edit a drilldown link, hover over the drilldown, click **edit** <i class="li li-pencil"></i>, make your changes, and click **Save** to confirm the changes.

* To delete a drilldown link, hover over the drilldown and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion.


<!-- ### Example

Your Logz.io Security account comes with a few drilldown links preconfigured by default.

For example, IP addresses in the [Threat Overview dashboard](https://app.logz.io/#/dashboard/security/threats/overview) function as drilldown links that direct you to the **IP Investigation** dashboard in your account. This helps to speed up the investigation and to structure your team's workflow.

Drilldown links maintain context, such that any filters and time range settings already applied, will be kept.

![IP addresses function as drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/drilldown-example.png) -->

