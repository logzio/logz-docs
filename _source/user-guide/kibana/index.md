---
layout: article
title: OpenSearch Dashboards
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io intro to Log Management
permalink: /user-guide/logs/
flags:
  logzio-plan: community
tags:
  - kibana
  - opensearchdashboards
contributors:
  - imnotashrimp
  - shalper
  - hidan
---

OpenSearch Dashboards (OSD) is where you search and query your logs to figure out what happened. It is optimized for debugging and troubleshooting issues as quickly and effectively as possible.

You can use the Discover page to filter logs, search for specific events, and create alerts based on your search queries.

On this page you'll find:

* toc list
{:toc}


![OSD Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/osd-discover/osd-main-screen.png)

#### Overview

OpenSearch Dashboards is designed to help you investigate massive volumes of data as quickly as possible. Filters, search phrases, and a date picker or relative time range selector are all designed to help you find the logs you want. Together, they are the _query criteria_ that determine which logs are returned from your logging database.

<div class="tasklist">

##### Account

First, decide which accounts you want to search. Managing your accounts is the first step to successful logging. You can create sub accounts to separate data by environment, microservice, team, and more. [Learn more about account management and sub accounts.]({{site.baseurl}}/user-guide/accounts/manage-the-main-account-and-sub-accounts.html)

##### Filters

OpenSearch Dashboards filters offer the most convenient, powerful, and flexible method for querying logs.

Filters can be used on any mapped fields and can take any number of forms: filter for field exists or does not exist, filter for a field with an exact value match or a field that contains a value among the results, and more. [Learn more about OSD mapping]({{site.baseurl}}/user-guide/logs/mapping/)

One advantage of OpenSearch filters is that they provide guidance that is specific to your dataset.
When OpenSearch maps your data to fields, it also determines which filtering options are relevant. When you add filters, only relevant options appear in the dropdown menus.

Another advantage is that filters can be inverted, temporarily disabled, edited, and more using the filter menu.

##### Search bar

You can type a search query in Lucene syntax or DQL. It is an alternative to filtering that requires a little familiarity with the search syntax. Almost anything that can be defined in the Search bar can be accomplished using filters as well.

You can also save your search query in case you want to use them again in the future. Save or load search queries by clicking on the **Save** icon located next to the search bar. 

![Save search query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/osd-discover/save-search-query.png)

###### Regex
{:.no_toc}

To use Regex in a search query in OpenSearch, you'll need to use the following template: 

`fieldName:/.*value.*/`.

For example, you have a field called `sentence` that holds the following line: "The quick brown fox jumps over the lazy dog".

To find one of the values in the field, such as `fox`, you'll need to use the following query:

`sentence:/.*fox.*/`.

##### Time frame and date picker

The default time frame in OpenSearch Dashboards is always the last 15 minutes.

You can select the time frame in any number of ways, including relative times such as the last hour, today so far, or the day before yesterday, or use absolute times by calendar dates and timestamps.

##### Results

The logs returned by your search are your results - aka "hits". Depending on the time frame you've selected, the results can be set to continuously auto-refresh and can be quite dynamic.

* **Histogram** -  The Histogram shows the distribution of logs over time. It is often easier to see when logs were sent when graphed directly on the timeline. You can also select a time range directly from the histogram using a drag-and-drop motion or by clicking a data bar.

* **Logs** - The log document table displays a preview of your top results, arranged with the most recent results at the top. The default fields are **time** and **message**, but you can toggle the fields that interest you in and out. 

  To expand a log, click it and review the complete log mapped into field:value pairs. You can also switch to the raw JSON.

* **Patterns** - Logz.io groups your logs using advanced clustering techniques to help you identify similar logs by groups, reducing the amount of logs to review. Patterns also help to surface issues and errors that might otherwise go unnoticed. [Learn more]({{site.baseurl}}/user-guide/logs/log-patterns.html)

* **Exceptions** - Logz.io Insights Engine scans your logs for application errors and warnings to help you identify issues that require your attention. [Learn more]({{site.baseurl}}/user-guide/insights/exceptions/) 

##### Take action following your results

The number of hits shows you the number of results returned by your query. This is the count of the total number of log documents that answer the query criteria.

If you click the **Inspect** function, you can view the query as sent to OpenSearch. This is useful if you are using the [Logz.io API]({{site.baseurl}}/api/), for example.

Once you've refined a query to the point that it returns exactly what you are looking for, you can be proactive in any number of ways:

* Create an **alert** to trigger automatically and send out notifications to your preferred endpoints. [Learn how to configure an alert.]({{site.baseurl}}/user-guide/alerts/configure-an-alert.html)
* **Save** the search to display it in visualizations and dashboards or to load it in the future.
* **Share** results with colleagues or external stakeholders.
* **Export** results to a spreadsheet.


#### Best practices and popular features

###### Search your logs

Once you've sent your data to Logz.io, you can search and query your logs to debug, troubleshoot, and monitor issues as quickly and effectively as possible.

Logs support a few query methods, including:

###### Use Lucene / OpenSearch Dashboards Query Language (DQL)

The default query language in Logz.io is Lucene, and you can use it or DQL syntax to query your logs. However, it’s recommended to use Lucene while it enables using your query in an alert or optimizer.

You can search for free text by typing the text string you want to find; for example, `error` will return all words containing this string, and using quotation marks, `"error"`, will return only the specific word you're searching for.

![String search](https://dytvr9ot2sszz.cloudfront.net/logz-docs/osd-discover/search-in-osd.png)

To search for a value in a specific field, use the following syntax:

`status:200`

You can use the boolean operators AND, OR, and NOT to create more complex searches. For example, to search for a specific status that doesn't contain a certain word:

`status:406 NOT "error"`

If you want to perform **range-related searches**, the fields must be mapped as numbers (long, float, double, etc.). Then, you can use the following syntax to find all status codes between 400-499:

`status:[400 TO 499]`

To make your search more complex, you can find status codes 400-499 with the extension php:

`status:[400 TO 499] AND extension:PHP`

Or, find status codes 400-499 with the extension php or html:

`status:[400 TO 499] AND (extension:php OR extension:html)`


###### How to use Regex in Log Management

Logz.io uses Apache Lucene's regular expression engine to parse regex queries, supporting regexp and query_string.

While Lucene's regex supports all Unicode characters, several characters are reserved as operators and cannot be searched on their own:

`. ? + * | { } [ ] ( ) " \`

Depending on the optional operators enabled, some additional characters may also be reserved. These characters are:

`# @ & < >  ~`

However, you can still use reserved characters by applying a backslash or double-quotes. For example:

`\*` will render as a * sign.

`\#` will render as a # sign.

`\()` will render as brackets.

###### Searching and filtering in Log Management

Learn how to search and filter your log data with Logz.io.

<!-- <video controls width=640 height=360 poster="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/search-and-filter.png">
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/searching-and-filtering.mp4" type="video/mp4" />
  </video> -->

<p><a href="https://logz.io/learn/searching-and-filtering/?wvideo=kq0z0sux4d" target="_blank"><img src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/search-and-filter.png" width="640" height="360" style="width: 640px; height: 360px;"></a></p><p><a href="https://logz.io/learn/searching-and-filtering/?wvideo=kq0z0sux4d"></a></p>

<!-- 
<iframe class="vidyard_iframe" src="https://fast.wistia.com/embed/iframe/kq0z0sux4d" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe> -->

###### Add more columns to your view results

You can add additional columns to your logs field view.

Find the field you'd like to add, hover over it and click on the **+** button. 

![Add field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-field-discover.png)

Once the field is added, you can move or remove it using its inner menu. 

![Edit field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-field-overview.gif)

Finally, you can save your search and its view by clicking on the **Save** option, at the top navigation bar. 

![Save field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/save-your-fields.png)

###### Filter your log results

To narrow down your search, click the **Add filter** option underneath the search bar. 

Choose the field, operator, and value you'd like to apply in your filter, and click save. You can also create a custom label to rename the filter for better identification.

![Apply a filter](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-a-filter.png)

Once you've set your filter, clicking on it will open additional abilities such as pinning it across all apps, excluding results, temporarily disabling it, editing, or deleting it.

###### Select the time frame for your logs 

The default period to display results is 15 minutes. You can edit this time frame by clicking on the **Show dates** link or clicking on the calendar icon.

The calendar icon offers popular time frames for you to choose from and lets you select the refresh rate of your data.

![Time frame options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/quick-time-edits.png)

The **Show dates** option lets you set a start and end time. In the popup, select between the following options:

* **Relative** - Set a start and end date to view your data
* **Now** - Get real-time troubleshooting and monitoring of your logs
* **Absolute** - Browse the calendar view and choose any time frame to view your data. In this option, you can type the time frame you want to view

![Choose time frame](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/time-settings-gif.gif)

###### Use sub accounts to assign multiple data types

{% include /account-info/sub-account.md %}


###### Additional resources
{:.no_toc}

* [Configure an alert](https://docs.logz.io/user-guide/alerts/configure-an-alert.html)
* [Use Insights to detect new exceptions and critical errors](https://docs.logz.io/user-guide/insights/)
* [Use Live tail to get a live view of your logs](https://docs.logz.io/user-guide/live-tail/)
* [Create and run advanced searches in OpenSearch Dashboards](https://logz.io/blog/kibana-advanced/)