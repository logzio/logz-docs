---
layout: article
title: Distributed Tracing troubleshooting
permalink: /user-guide/distributed-tracing/tracing-troubleshooting.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Distributed Tracing troubleshooting and common questions
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - hidan
---

Setting up a Distributed Tracing account might require some additional help. In this doc, we'll walk through troubleshooting some common issues. 

* [Jaeger is not showing any data](/user-guide/distributed-tracing/tracing-troubleshooting.html#jaeger-is-not-showing-any-data)
* [Can't find Traces in search fields](/user-guide/distributed-tracing/tracing-troubleshooting.html#cant-find-traces-in-search-fields)
* [Service Performance Monitoring dashboard couldn't fetch data](/user-guide/distributed-tracing/tracing-troubleshooting.html#service-performance-monitoring-dashboard-couldnt-fetch-data)
* [Service Performance Monitoring dashboard showing no data](/user-guide/distributed-tracing/tracing-troubleshooting.html#service-performance-monitoring-dashboard-showing-no-data)

#### Jaeger is not showing any data

You've logged into your Jaeger dashboard, and you can't see any Tracing sources or services.

![Jaeger not showing data](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/troubleshooting-jaeger.png)

This could happen due to a misconfiguration of the account's tokens.

To fix that, navigate to **[Manage tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/shared) > [Data shipping tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs) > [Tracing](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=tracing)** and verify that you are using the appropriate Tracing token.

If the issue consists of no data in your Tracing account, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.


#### Can't find Traces in search fields

After setting up your Tracing account, you can't find traces in the search fields.

Navigate to [Logs](https://app.logz.io/#/dashboard/kibana) and choose your Tracing account. This step is to make sure data is being sent correctly to Logz.io. If you can see your Tracing data in Kibana, your collector requires a restart. After restarting the collector, navigate to your Tracing account to see if the traces are now visible. If the data isn't visible in your account, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.


<!-- #### Service Performance Monitoring not showing data

Setting up a Service Performance Monitoring dashboards requires creating a Metrics account to help connect between the data and its visuallization. -->

#### Service Performance Monitoring dashboard couldn't fetch data


After setting up a Service Performance Monitoring dashboard you get an error saying **Couldn't fetch data**.

![Query of Metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-couldnt-fetch-data.png)


To resolve this issue, follow the **[Set up your Service Performance Monitoring dashboard](/user-guide/distributed-tracing/service-performance-monitoring-setup)** guide to ensure your account is properly configured. If the issue consists, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.

#### Service Performance Monitoring dashboard showing no data

Your Service Performance Monitoring dashboard shows an error saying **No Data** across all of the elements on the page.

![Query of Metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-no-data-showing.png)

This might happen due to an issue with the Metrics account connected to your dashboard. First, you'll need to verify that metrics are configured and sent. Navigate to **[Metrics](https://app-uk.logz.io/#/dashboard/metrics) > [Explore](https://app.logz.io/#/dashboard/metrics/explore)** and choose the relevant account from the dropdown list. 

To confirm that the data is available and accessible, perform a query. For example, `container_last_seen`.

If there are no results, you're required to go through the configuration process again, as detailed in our **[Set up your Service Performance Monitoring dashboard](/user-guide/distributed-tracing/service-performance-monitoring-setup)** guide, and make sure data is properly sent to the relevant accounts.

If you can see the query's results and the data is not visible in your Service Performance Monitoring dashboard, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.

![Query of Metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/container-last-seen.png)
