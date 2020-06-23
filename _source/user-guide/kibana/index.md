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

You can use the Discover page to filter recent logs, search for specific events, and create alerts based on your search queries.

![Kibana UI in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/kibana-discover-overview1.png)

#### Setting your search and query criteria

You can use these search, filtering, and querying options to select the logs you want to see. 

<div class="tasklist">

##### Account

Decide which accounts to search. Sub accounts can be created to separate data by environment, microservice, team, and more.[Learn more about sub accounts.]({{site.baseurl}}/user-guide/accounts/manage-the-main-account-and-sub-accounts.html)

##### Filters

Add Kibana filters to define more flexible and precise queries.
Filters can be added for any mapped field and can take any number of forms: filter for field exists or does not exist, field with an exact value match or a field with a value that is one of the results, and more.

Behind the scenes, Kibana Filters are translated into Elasticsearch Query DSL and offer the most flexible and convenient method for logging.

##### Search bar

You can type a search query in Lucene syntax or KQL. Almost anything that can be defined in the Search bar can be accomplished using filters as well. It is an alternative to filtering that requires a little familiarity with the search syntax.

##### Timeframe and date picker

Select the time range for your search. There are many ways to select the timeframe using relative or absolute selection options. The default is 15 minutes, but you can select almost any imaginable time range, including last hour, today so far, yesterday, day before yesterday, and many many more.

##### Results

The logs returned by your search are your results. Depending on the timeframe you've selected, the results can be set to continuously auto-refresh and can be quite dynamic.

* **Histogram** -  The Histogram shows the distribution of logs over time. It is often easier to see when logs were sent when graphed directly on the timeline. You can also select a time range directly from the histogram using a drag-and-drop motion or by clicking a data bar.

* **Document table** - View the results of your search query. Click on any log document to open it and view the data mapped into field:value pairs. You can also switch to the raw JSON document view.

* **Patterns** - Logz.io groups your logs using advanced clustering techniques to help you identify similar logs by groups, reducing the amount of logs to review. Patterns also helps to surface issues and errors that might otherwise go unnoticed. [Learn more about Log Patterns.]({{site.baseurl}}/user-guide/kibana/log-patterns.html)
