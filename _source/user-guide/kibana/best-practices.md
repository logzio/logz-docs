---
layout: article
title: Best practices and popular features in Log Management
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Best practices, search, and popular features in Log Management
permalink: /user-guide/logs/best-practices.html
flags:
  logzio-plan: community
tags:
  - kibana
  - opensearchdashboards
contributors:
  - refaelmi
  - hidan
---

After setting up your Logz.io's Log Management account, it's time to learn how to gain more out of your logs.

The following guide includes some of the basics that will help you get started with Logs:

* toc list
{:toc}

#### Search your logs

Once you've sent your data to Logz.io, you can search and query your logs to debug, troubleshoot, and monitor issues as quickly and effectively as possible.

Logs support a few query methods, including:

##### Use Lucene / OpenSearch Dashboards Query Language (DQL)

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


##### Searching and filtering in Log Management

Learn how to search and filter your log data with Logz.io.

<!-- <video controls width=640 height=360 poster="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/search-and-filter.png">
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/searching-and-filtering.mp4" type="video/mp4" />
  </video> -->

<p><a href="https://logz.io/learn/searching-and-filtering/?wvideo=kq0z0sux4d" target="_blank"><img src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/search-and-filter.png" width="640" height="360" style="width: 640px; height: 360px;"></a></p><p><a href="https://logz.io/learn/searching-and-filtering/?wvideo=kq0z0sux4d"></a></p>

<!-- 
<iframe class="vidyard_iframe" src="https://fast.wistia.com/embed/iframe/kq0z0sux4d" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe> -->

##### Add more columns to your view results

You can add additional columns to your logs field view.

Find the field you'd like to add, hover over it and click on the **+** button. 

![Add field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-field-discover.png)

Once the field is added, you can move or remove it using its inner menu. 

![Edit field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/add-field-overview.gif)

Finally, you can save your search and its view by clicking on the **Save** option, at the top navigation bar. 

![Save field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/save-your-fields.png)

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

<!-- <video controls width=640 height=360 poster="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/log-visualization.png">
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/log-visualizations-velcfd5tpr.mp4" type="video/mp4" />
  </video> -->

<p><a href="https://logz.io/learn/create-log-visualizations-with-logzio/?wvideo=velcfd5tpr" target="_blank"><img src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/videos/log-visualization.png" width="640" height="360" style="width: 640px; height: 360px;"></a></p><p><a href="https://logz.io/learn/create-log-visualizations-with-logzio/?wvideo=velcfd5tpr"></a></p>

<!-- <iframe class="vidyard_iframe" src="https://fast.wistia.com/embed/iframe/velcfd5tpr?" width=640 height=360 scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen></iframe> -->


#### Use sub accounts to assign multiple data types

{% include /account-info/sub-account.md %}


###### Additional resources
{:.no_toc}

* [Configure an alert](https://docs.logz.io/user-guide/alerts/configure-an-alert.html)
* [Use Insights to detect new exceptions and critical errors](https://docs.logz.io/user-guide/insights/)
* [Use Live tail to get a live view of your logs](https://docs.logz.io/user-guide/live-tail/)