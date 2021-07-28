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

Within the Distributed Tracing Jaeger interface, add a cross-platform drilldown from a span tag to an object in other products. For example, to a Kibana query, or to a Kibana dashboard. 
The time frame of the span you link from is retained when the drilldown opens your target field or dashboard in Kibana. 


### Accessing drilldowns from your main account

The drilldown configuration is saved at the Log Management account (main account) level and is only accessible for the account in which you created it. 
Drilldown links are saved at the Log Management account level, as well.  <!--Need explanation of the implications and an example -->

{% include drilldowns/manage_drilldown_settings_location.md %}


### Drilldown best practices

We recommend that you create your drilldowns from within a Logz.io observability user interface, such as Kibana or Jaeger.  That way, you can pick exactly the starting point for your investigation and preview the drilldown before you save it. The ability to test and preview a drilldown is not available in the **Drilldown settings** page.

![placeholder for a gif showing how a link is created](https://dytvr9ot2sszz.cloudfront.net/logz-docs/...)


#### Configuring Distributed Tracing drilldowns

To test and preview your drilldown, create it in the user interface of the product you're using. For example, create a drilldown in the Kibana interface for Log Management and Cloud SIEM, or in the Jaeger interface for Distributed Tracing.

* Entities that you can use to create a new drilldown are indicated by the "custom chain links"  <i class="fas fa-link"></i> icon.  
* Entities that already have a configured drilldown are indicated by the "link out" <i class="fas fa-external-link-alt"></i> icon.  

<!-- info-box-start:info -->
You can only create a single drilldown for each starting entity.
{:.info-box.note}
<!-- info-box-end -->

<div class="tasklist">
 
##### Add a drilldown link in the Jaeger interface

Select where you want to drill from and the correlating field or dashboard for a drilldown link: For example, from a Jaeger span to a Kibana search field. 
Drilldown links maintain context: Any filters and time range settings that are already applied for the starting point, are retained for the target field or dashboard.


1. In [**Tracing > Jaeger**](https://app.logz.io/#/dashboard/jaeger/search), select the desired data **Source** (Tracing account) and search for the relevant trace. 

1. Within the trace, select the span that you want to create a drilldown link for. 

1. Click the field or dashboard to use for the drilldown. <br>
   Only fields or dashboards marked with the "custom chain links"  <i class="fas fa-link"></i> icon can be used for a new drilldown.<br>
   The **New Drilldown** dialog opens.

   ![New drilldown](https://dytvr9ot2sszz.cloudfront.net/logz-docs/.png)

{% include drilldowns/new_drilldown_steps.md %} 

<br> 
After you **Save the drilldown**, the starting point is marked with the "link out" <i class="fas fa-external-link-alt"></i> icon.  
The timeframe for the drilldown is propagated automatically from the starting field. 

When a user clicks the link icon for the starting point, it directs them to the target field or dashboard.




<!--1. PHASE 2: Create optional mappings for the start and destination field names in your drilldown to make sure that the fields all refer to the same entity. <br>
   For example, if the fields in your source data appear as all lower case, and fields in the target  have been parsed to include capitals, you might need to map *`userid`* to *`UserID`*.  -->

##### Preview and test a drilldown
This preview is only available when you create a drilldwon in the user interface of the source product, such as Kibana, Jaeger, or the Metrics interface.  

1. Click **Test drilldown** to see where the link takes you. 
1. Click **Save drilldown** to create the new link or **Cancel** to discard your work.
   After you **Save the drilldown**, the starting entity is marked with the  "link out" <i class="fas fa-external-link-alt"></i> icon.  The timeframe for the drilldown is propagated automatically. 


##### {% include drilldowns/edit-delete_drilldowns.md %}


<div>


<!--  >

###  Working in the **Drilldown settings** page

A drilldown link is a redirect link that takes users directly from an informative data field to a dashboard, already filtered by the selected field.

When investigating data through the logs, metrics, or traces, drilldown links make it possible to simply click on an informative field (such as an IP address, username, or hostname) to open a related Kibana search or dashboard, filtered by the selected field, and review the event in a wider context.

Adding drilldown links to your account will help you speed up and streamline investigations and structure your team's workflows and processes.

Drilldown links are configured in the Jaeger UI, when you view a trace. You begin the processes by searching for traces in [** Tracing > Jaeger **](https://app.logz.io/#/dashboard/jaeger/search) and then selecting a span for the drilldown.

![Image placeholder](https://dytvr9ot2sszz.cloudfront.net/logz-docs/....)

Existing drilldowns can be found in [Drilldown Settings (?)](https://app.logz.io/#/dashboard/settings/drilldowns), a general library.  <!--Need the actual link -->

![Image placeholder](https://dytvr9ot2sszz.cloudfront.net/logz-docs/....)
