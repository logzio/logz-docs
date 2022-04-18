---
layout: article
title: Best practices and popular features in Logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Best practices and popular features in Logs
permalink: /user-guide/kibana/best-practices.html
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - hidan
---

After setting up your Logz.io's Logs account, it's time to learn how to gain more out of your logs.

The following guide includes some of the basics that will help you get started with Logs.

#### Search your logs

Once you've sent your data to Logz.io, you can search and query your logs to debug, troubleshoot, and monitor issues as quickly and effectively as possible.

Logs support a few query methods, including:

##### Use Lucene / Kibana Query Language (KQL)

The default query language in Logz.io is Lucene, and you can use it or KQL syntax to query your logs. However, it’s recommended to use Lucene while it enables using your query in an alert or optimizer.

You can search for free text by typing the text string you want to find; for example, `error` will return all words containing this string, and using quotation marks, `"error"`, will return only the specific word you're searching for.

![String search](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/kibana-string-search.png)

To search for a value in a specific field, use the following syntax:

`status:200`

You can use the boolean operators AND, OR, and NOT to create more complex searches. For example, to find a range of values. The following syntax will find all status codes between 400-499:

`status:[400 TO 499]`

To make your search more complex, you can find status codes 400-499 with the extension php:

`status:[400 TO 499] AND extension:PHP`

Or, find status codes 400-499 with the extension php or html:

`status:[400 TO 499] AND (extension:php OR extension:html)`


##### How to use Regex in Logs

Logz.io uses Apache Lucene's regular expression engine to parse regex queries, supporting regexp and query_string.

While Lucene's regex supports all Unicode characters, several characters are reserved as operators and cannot be searched on their own:

`. ? + * | { } [ ] ( ) " \`

Depending on the optional operators enabled, some additional characters may also be reserved. These characters are:

`# @ & < >  ~`

However, you can still use reserved characters by applying a backslash or double-quotes. For example:

`\*` will render as a * sign.

`\#` will render as a # sign.

`\()` will render as brackets.

#### Filter your log results

To narrow down your search, click the **Add filter** option underneath the search bar. 

Choose the field, operator, and value you'd like to apply in your filter, and click save. You can also create a custom label to rename the filter for better identification.

![Apply a filter](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-a-filter.png)

Once you've set your filter, clicking on it will open additional abilities such as pinning it across all apps, excluding results, temporarily disabling it, editing, or deleting it.

#### Select the time frame for your logs 

The default period to display results is 15 minutes. You can edit this time frame by clicking on the **Show dates** link or clicking on the calendar icon.

The calendar icon offers popular time frames for you to choose from and lets you select the refresh rate of your data.

![Time frame options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/quick-time-edits.png)

The **Show dates** option lets you set a start and end time. In the popup, select between the following options:

* **Relative** - Set a start and end date to view your data
* **Now** - Get real-time troubleshooting and monitoring of your logs
* **Absolute** - Browse the calendar view and choose any time frame to view your data. In this option, you can type the time frame you want to view

![Choose time frame](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/time-settings-gif.gif)

#### Create Log Visualizations with Logz.io

In the following video, you'll be able to see how to create a visualization dashboard based on your logs:

<iframe class="vidyard_iframe" src="//play.vidyard.com/XEpKRQHt8TGhPYacFBZsBM.html?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe>


###### Additional resources

* [Configure an alert](https://docs.logz.io/user-guide/alerts/configure-an-alert.html)
* [Use Insights to detect new exceptions and critical errors](https://docs.logz.io/user-guide/insights/)
* [Use Live tail to get a live view of your logs](https://docs.logz.io/user-guide/live-tail/)