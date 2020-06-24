---
layout: article
title: Kibana Discover
permalink: /user-guide/kibana/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - imnotashrimp
  - shalper
---

Kibana Discover is where you search and query your logs to figure out what happened. It is optimized for debugging and troubleshooting issues as quickly and effectively as possible.

You can use the Discover page to filter logs, search for specific events, and create alerts based on your search queries.

![Kibana Discover Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/kibana-discover-intro.png)

#### Set you query criteria

Kibana Discover is designed to help you investigate immense volumes of data as quickly as possible. Filters, search phrases, and a date picker or relative time range selector are all designed to help you find the logs you want. Together, they are the _query criteria_ that determine which logs are returned from your Elasticsearch logging database.

<div class="tasklist">

##### Account

First, decide which accounts you want to search. Managing your accounts is the first step to successful logging. You can create sub accounts to separate data by environment, microservice, team, and more. [Learn more about account management and sub accounts.]({{site.baseurl}}/user-guide/accounts/manage-the-main-account-and-sub-accounts.html)

##### Filters

Kibana Filters offer the most convenient, powerful, and flexible method for querying logs.

Filters can be used on any mapped fields and can take any number of forms: filter for field exists or does not exist, filter for a field with an exact value match or a field that contains a value among the results, and more. [Learn more about Kibana mapping]({{site.baseurl}}/user-guide/kibana/mapping/)

One advantage of Kibana filters is that they provide guidance that is specific to your dataset.
When Kibana maps your data to fields, it also determines which filtering options are relevant. When you add filters, only relevant options appear in the dropdown menus.

Another advantage is that filters can be inverted, temporarily disabled, edited, and more using the filter menu.

##### Search bar

You can type a search query in Lucene syntax or KQL. It is an alternative to filtering that requires a little familiarity with the search syntax. Almost anything that can be defined in the Search bar can be accomplished using filters as well.

##### Time frame and date picker

You can select the time range for your search in any number of ways, using either relative or absolute time selection options. The default is 15 minutes, but you can select almost any imaginable time range, including the last hour, today so far, yesterday, day before yesterday, and many more.

##### Results

The logs returned by your search are your results. Depending on the time frame you've selected, the results can be set to continuously auto-refresh and can be quite dynamic.

* **Histogram** -  The Histogram shows the distribution of logs over time. It is often easier to see when logs were sent when graphed directly on the timeline. You can also select a time range directly from the histogram using a drag-and-drop motion or by clicking a data bar.

* **Document table** - The table displays select fields for your results. By default, only the message field is selected and the logs are arranged in reverse chronological order. You can toggle additional fields in and out of the table and rearrange the display as suits your needs.

  If you click on a log, it opens so you can view its entire contents mapped into field:value pairs. You can also switch to the raw JSON document view.

* **Patterns** - Logz.io groups your logs using advanced clustering techniques to help you identify similar logs by groups, reducing the amount of logs to review. Patterns also help to surface issues and errors that might otherwise go unnoticed. [Learn more about Log Patterns.]({{site.baseurl}}/user-guide/kibana/log-patterns.html)

##### Take action following your results

The number of hits shows you the number of results returned by your query. This is the count of the total number of log documents that answer the query criteria.

If you click the **Inspect** function, you can view the query as sent to Elasticsearch. This is useful if you are using the [Logz.io API]({{site.baseurl}}/api/), for example.

Once you've refined a query to the point that it returns exactly what you are looking for, you can be proactive in any number of ways:

* Create an **alert** to trigger automatically and send out notifications to your preferred endpoints. [Learn more about alerts.]({{site.baseurl}}/user-guide/alerts/configure-an-alert.html)
* **Save** the search to display it in visualizations and dashboards or to load it in the future.
* **Share** results with colleagues or external stakeholders.
* **Export** results to a spreadsheet.
