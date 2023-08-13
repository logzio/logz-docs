---
layout: article
title: Alerts Event Management
permalink: /user-guide/alerts/event-management.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Monitor and handle the events triggered by your Logz.io alerts
flags:
  logzio-plan: pro
tags:
  - alerts
  - event management
contributors:
  - hidan
---

Use Event Management to monitor the events triggered by your alerts.

Event Management offers a single source of truth into triggered alerts in your environment. It allows you to track alerts, set their status, add comments and additional information, and prioritize how those issues are handled.

The events are displayed in a table: You can sort the events table by severity, status, handler (who they’re assigned to), last triggering data, and the last time the event was updated or edited. You can also filter and search the events in the table to further refine your results.

**Topics on this page:**

* toc list
{:toc}

<!-- 
* [Filter events](/user-guide/cloud-siem/siem-event-management.html#event-filtering) - Learn about the available filters to refine the list of triggered events.
* [Search events](/user-guide/cloud-siem/siem-event-management.html#searching-for-events) - Where to set your criteria to find specific events.
* [Edit an event](/user-guide/cloud-siem/siem-event-management.html#editing-an-event) - Update who the event is assigned to or add comments with additional information and priority handling decisions. 
* [Edit the event rule](/user-guide/cloud-siem/siem-event-management.html#editing-an-event-rule) - Fine tune your security rule to improve event management.
* [Investigate an event](/user-guide/cloud-siem/siem-event-management.html#investigating-an-event) -  Harness OpenSearch Dashboards to see the related event logs for more powerful insights.
* [Viewing the event history](/user-guide/cloud-siem/siem-event-management.html#viewing-the-event-history) - View the rule information for the triggered event.
* [Viewing grouped events](/user-guide/cloud-siem/siem-event-management.html#viewing-grouped-events) - What those event counts mean. 
-->

## The Event Management table


![Event management](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/event-management-main.png)

The information that is provided for each event triggered is summarized in the table. The retention for the Event Management table is two weeks, and the number of events you can view is bound by the number of triggered alerts.  


|Event| Description| 
|---|---| 
|Event details|This information includes the title, description, and Event ID of the triggered alert |
|Severity| The triggering conditions defined in the alert for a configured event threshold and time period. The event is labeled with the severity set for the alert:   **Severe > High > Medium > Low > Info**|
|Count| The number of grouped events included in the entry |
|Assigned to| Team member handling event investigation and resolution |
|Status|Investigation stage of the triggered event:  <br>  **- New:** A triggered event that has not been assigned<br>**- Assigned:** Investigation pending<br>**- In Progress:** The assigned handler is investigating the event<br>**- Waiting for response:** Investigation on hold pending reply from external stakeholders <br>**- False positive:**  Investigation verified that the detected activity is benign <br>**- Resolved:** Investigation complete |
|Last triggered| Date and time of the most recent occurrence of this event within the past 3 days |
|Comment| Additional information added by investigators:  Use this field to include handling priority information and any information relevant to the investigation|
|Updated|Date of latest changes made to the event and which user made the changes|


## Event filtering 

Filter events by any combination of the available filters. 

<!-- info-box-start:info  -->
If you're using filters and no events are displayed, try adjusting your filter choices to find what you're looking for.
{:.info-box.tip}
<!-- info-box-end -->

![Filter panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/event-filters.png)

|Filter| Description| Filter options|
|---|---|---|
|Assigned to| Team member handling event investigation and resolution. <br> <br>You can select all users or pick an investigator from the list.<br> Default = **All Users**|  All Users, Myself, or pick from the list|
|Severity| The triggering conditions defined in the alert for a configured event threshold and time period.<br> Default =  **All**| All, Severe, High, Medium,  Low, Info|
|Status|Investigation stage of the triggered event. <br> Default =  **All**|  All, New, Assigned, In Progress, Waiting for response, False positive, Resolved   |


### Clear filters
You can always change the filters you've set. 
To reset all the filters to the defaults, click **Clear filters**. 

## Searching for events

You can run a free text **Search** on the information in the **Event details** field -  This includes any of the information in the event title, ID, or **Description**.

<!-- info-box-start:info  -->
If you're running a search and no events are displayed, try adjusting your search terms to find what you're looking for. 
{:.info-box.tip}
<!-- info-box-end -->

## Editing an event

You can update the following event fields: 

- The investigation **Status** of the event.
- The investigator the event is **Assigned to**. Once an event is assigned to a team member, the assignment can't be reset to **Unassigned**. 
- Add text to the **Comment** field, to provide information about the event investigation, the handling process, or task priorities. 

After an investigator edits an event, the date and user are automatically displayed in the **Updated** field for the event.  

<!-- ![Updated event](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/siem_updated-event.png) -->

## Editing an event alert

To fine tune event management, go back to a source alert and edit it! 

![Edit the event alert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/edit-alert-event.gif)


## Investigating an event
This option opens the OpenSearch Dashboards interface, where you can view the related logs for the triggered event, according to the time frame you selected to display your events.

<!-- ![Investigate an event](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/siem-3investigate.gif) -->

## Viewing the event history
View the alert information for the triggered event, including the:

- Event title 
- Event ID
- Event description
- Time the event was triggered and subsequent actions

![Event History](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/event-history.png)

<!-- ## Viewing grouped events
To view all the events grouped in the **Count** field, select **View all occurrences** in the **More actions**  menu for the event.
![View grouped events](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/view_grouped.png)

In addition to the name, ID, and description of the triggered rule, the list also displays the date, time, and unique Event ID for each occurence , as well as the [**Investigate**](/user-guide/cloud-siem/siem-event-management.html#investigating-an-event) link to take you to the relevant logs in OpenSearch Dashboards. 
![View list of grouped events](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/view_all_occurences_nov2021.png)

-->