---
layout: article
title: Kibana
permalink: /user-guide/kibana/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - imnotashrimp
  - shalper
---

When you first sign in to Logz.io, you'll find yourself at the Discover page. You can use the Discover page to filter recent logs, search for specific events, and create alerts based on your search queries.

![Kibana UI in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/kibana--discover-annotated1.png)

Query bar
: This is where you type your search query

Account
: Choose which accounts to search. Sub accounts can be created to separate data by environment, microservice, team, and more. [Learn more about sub accounts.]({{site.baseurl}}/user-guide/accounts/manage-the-main-account-and-sub-accounts.html)

Histogram
: Select a time range directly from the histogram of using the date picker.

Document table
: View the results of your search query. Click on any log document to open it and view the field:value pairs or switch to the raw JSON document.

Log Patterns
: Logz.io groups your logs using advanced clustering techniques to help you identify similar logs by groups, reducing the amount of logs to review. Patterns also helps to surface issues and errors that might otherwise go unnoticed. [Learn more about Log Patterns]({{site.baseurl}}/user-guide/kibana/log-patterns.html)
{:.letter-labels}