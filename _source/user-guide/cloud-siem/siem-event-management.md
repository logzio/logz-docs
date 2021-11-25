---
layout: article
title: Cloud SIEM Event Management
permalink: /user-guide/cloud-siem/siem-event-management.html
flags:
  logzio-plan: pro
tags:
  - logz.io-security
  - siem
contributors:
  - yberlinger
---

Use Cloud SIEM Event Management to monitor the events triggered by Logz.io Cloud SIEM security rules.

With a single source of truth, you have visibility into the triggered security events in your environment, to track, set the event status, assign an event handler, and use comments to add information and prioritize how those issues are handled.
The events are displayed in a table: You can sort the events table by severity, status, handler, initial triggering date, and the last time the event was updated or edited.

You can also filter and search the events in the table, to further refine your results.

![Event management](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/event_mgmnt1_nov2021.png)

Topics on this page: 
<!-- consider the presumed order of actions for a user on this page 
AIs: 
Need to include descriptions for each field column in event table
Need to give guidance if there are no events
2 use cases. 1. No event rules were triggered. 2. Adjust filters and search terms. -->

* [Filter events](user-guide/cloud-siem/siem-event-management.html#event-filtering) - Learn about the available filters to refine the list of triggered events.
* [Search events](/user-guide/cloud-siem/siem-event-management.html#searching-for-events) - Where to set your criteria to find specific events.
* [Edit an event](/user-guide/cloud-siem/siem-event-management.html#editing-an-event) - Update who the event is assigned to or add comments with additional information and priority handling decisions. 
* [Edit the triggering rule]()
* [View the Event history](/user-guide/cloud-siem/siem-event-management.html#view-the-event-history) - View the actions for a specific event.
* [Investigate an event](/user-guide/cloud-siem/siem-event-management.html#investigate-an-event) -  Harness Kibana to see the related event logs for more powerful insights.
* [Assign an event](/user-guide/cloud-siem/siem-event-management.html#assigning-events) - What happens when you assign an event to a team member.
* [Grouped events](user-guide/cloud-siem/siem-event-management.html#grouped-events) - What those event counts mean. 

## Event filtering 

Filter events by any combination of the available filters. 
If you're using filters and no events are displayed, try adjusting your filter choices to find what you're looking for. It might also be that no events were triggered during the time frame you selected. 

![Filter panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/filter_panel-nov2021.png)

|Filter| Description| Filter options|
|---|---|---|
|Time frame| The period for which you want to view triggered events.<br>Default = Last 24 hours| Last 24 hours (min)<br>Last 48 hours <br> Last week <br> Last 2 weeks (max)|
|Assigned to| Which team member is assigned to handle the triggered event.<br>You can select all users or a single user.<br> Default = All users|  All users  <br> Myself <br> Select a user|
|Severity| The severity defined in the triggering rule as a <br>function of instances in a given time period.<br> Default =  All| All <br>Severe<br>High <br>Medium <br>Low<br> Info|
|Status|The handling status of the triggered event. <br> Default =  All|  All <br> New<br>Assigned<br> In Progress<br>Waiting for response<br>False positive<br>Resolved |

### Clear filters
You can always change the filters you've set. 
To reset all the filters to the defaults, click **Clear filters**. 

## Searching for events

You can run a free text search on the following fields: 

- **Event name**
- **Event ID**
- **Description**
- **Comment** 

If you're running a search and no events are displayed, try adjusting your search terms to find what you're looking for. It might also be that no events were triggered during the time frame you selected. 
## Editing an event

You can update: 
- Which user the event is assigned to 
- Comments to provide additional information about the handling process or priority 


## Investigate an event
This option opens the Kibana interface, where you can view the related logs for the triggered event, according to the selected time frame


## View the event history
View the rule information for the triggered event, including the:

- Event title 
- Event ID
- Event description
- Time the event was triggered and the related action



## Grouped events

## Assigning events

When you assign an event, the user receives an email notification with the following information: 

- Event name
- Event ID
- Description
- Severity
- Created time
- Event ID

The Event name and ID are clickable links to the [**Event Management**](https://app.logz.io/#/dashboard/security/event-management) table.