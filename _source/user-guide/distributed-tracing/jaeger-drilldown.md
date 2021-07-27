---
layout: article
title: Adding drilldowns in Distributed Tracing
permalink: /user-guide/distributed-tracing/jaeger-drilldown/
flags:
  logzio-plan: pro
tags:
  - distributed tracing
  - drilldown
contributors:
  - yberlinger
---

Drilldown links help you go straight to related logs or dashboards whenever you identify an issue in your spans and need to investigate further. Drilldowns are a powerful observability tool that gives you context and visibility into the logs that coincided with a tracing event.  

Add a cross-platform drilldown from a span tag to an object in other products. For example, to a Kibana query, or to a Kibana dashboard. 
The time frame of the span you link from is retained when the drilldown opens your target field or dashboard in Kibana. 



#### Configuring Distributed Tracing drilldowns


To test and preview your drilldown, create it in the user interface of the product you're using. For example, create a drilldown in the Kibana interface for Log Management and Cloud SIEM, or in the Jaeger interface for Distributed Tracing.

Entities that already have a configured drilldown are indicated by the **TBD icon name** icon.  <!-- need an icon image or a screen capture -->
Entities that you can use to create a new drilldown are indicated by the **TBD link name** icon.   <!-- need an icon image or a screen capture -->

<!-- info-box-start:info -->
You can only create a single drilldown for each starting entity.
{:.info-box.note}
<!-- info-box-end -->

 
##### Add a drilldown link in the Jaeger trace interface

Select the source and target destination fields and entities for a drilldown link: For example, from a Jaeger span to a Kibana search. Drilldown links maintain context: Any filters and time range settings that are already applied, are retained for the target destination.


1. Within the trace, select the span that you want to create a drilldown link for. 

1. Click the entity to use for the drilldown. Only entities marked with a custom icon are eligible.
   The **New Drilldown** screen opens.

1. Give your drilldown a unique name.  

1. Select the **from**  (source product and entity). This is the field that will become a hyperlink. 

1. Select the  **to** (destination product and entity). This is the target destination of the drilldown link.  


1. Click **Save drilldown** or **Cancel** 

For example, from a Jaeger trace to a Kibana search.

<!--1. Create optional mappings for the start and destination field names in your drilldown to make sure that the fields refer to the same entity. <br>
   For example, if the fields in your source data appear as all lower case, and fields in the target  have been parsed to include capitals, you might need to map *`userid`* to *`UserID`*.  -->

1. Optional. Test your drilldown. 
   This preview is only available when you create a drilldwon in the user interface of the source product, such as Kibana, Jaeger, or the Metrics interface.  

1. Click **Save drilldown** to create the new link or **Cancel** to discard your work.
   After you **Save the drilldown**, the starting entity is marked with a **TBD link name** icon.  The timeframe for the drilldown is propagated automatically. 



### Accessing drilldowns from your main account

The drilldown configuration is saved at the Log Management account (main account) level and is only accessible for the account in which you created it. 
Drilldown links are saved at the Log Management account level.  <!--Need explanation of the implications and an example -->

{% include drilldowns/manage_drilldown_settings_location.md %}







### Drilldown examples


### Drilldown best practices

Start your drilldown in the product user interface. ![placeholder for a gif showing how a link is created](https://dytvr9ot2sszz.cloudfront.net/logz-docs/...)



###  Working in the Drilldown settings

A drilldown link is a redirect link that takes users directly from an informative data field to a dashboard, already filtered by the selected field.

When investigating data through the logs, metrics, or traces, drilldown links make it possible to simply click on an informative field (such as an IP address, username, or hostname) to open a related Kibana search or dashboard, filtered by the selected field, and review the event in a wider context.

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

