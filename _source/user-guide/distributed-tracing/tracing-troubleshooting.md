---
layout: article
title: Distributed Tracing troubleshooting
permalink: /user-guide/distributed-tracing/tracing-troubleshooting.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Distributed Tracing troubleshooting and common questions
flags:
  logzio-plan: community pro enterprise
tags:
  - distributed tracing
contributors:
  - afishler
  - hidan
---

Setting up a Distributed Tracing account might require some additional help. In this doc, we'll walk through troubleshooting some common issues. 

* [Jaeger is not showing any data](/user-guide/distributed-tracing/tracing-troubleshooting.html#jaeger-is-not-showing-any-data)
* [Troubleshooting the collector](/user-guide/distributed-tracing/tracing-troubleshooting.html#troubleshoot-the-collector)
* [Service Performance Monitoring dashboard couldn't fetch data](/user-guide/distributed-tracing/tracing-troubleshooting.html#service-performance-monitoring-dashboard-couldnt-fetch-data)
* [Service Performance Monitoring dashboard showing no data](/user-guide/distributed-tracing/tracing-troubleshooting.html#service-performance-monitoring-dashboard-showing-no-data)

#### Jaeger is not showing any data

You've logged into your Jaeger dashboard, and you can't see any data in Services and Operations list, or nothing comes up in the search.

<!-- ![Jaeger not showing data](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/troubleshooting-jaeger.png) -->

This could happen due to a misconfiguration of the account's tokens.

Navigate to [Logs](https://app.logz.io/#/dashboard/kibana/) > Choose the **Tracing account you're trying to troubleshoot** and refresh.

![Logs showing tracing data](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/traces-in-logs.png)

If don't see any logs, navigate to **[Manage tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/shared) > [Data shipping tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs) > [Tracing](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=tracing)**. Copy the token of the Tracing account you're troubleshooting, and re-configure your collector.

If you can see logs in the Tracing account you're troubleshooting, you might need to restart your collector.

To verify that the logs are of the Tracing account, make sure they contain `type:jaegerSpan`:

![Type jaegerSpan](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/typejaegerspan.png)

After restarting the collector, navigate back to **[Tracing](https://app.logz.io/#/dashboard/jaeger)** and see whether the traces are now visible.

If you can see the logs, but **they do not contain `type:jaegerSpan`**, you'll need to troubleshoot the collector instrumentation:

##### Troubleshoot the collector

1. Check your collector's **logs**. They can point to what happened during the data shipping process.
2. Check your collector's **metrics**. Check the count of spans received and sent. 
3. If logs and metrics indicate that data is not being sent, check that the instrumentation is correctly pointing to the collector (ports), or that the correct receiver is configured in the collector.

If you still can't see data in your Tracing account, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.

<!-- ![Trace logs](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-fields-log.png) -->

<!-- #### Service Performance Monitoring not showing data

Setting up a Service Performance Monitoring dashboards requires creating a Metrics account to help connect between the data and its visuallization. -->

#### Service Performance Monitoring dashboard couldn't fetch data


After setting up a Service Performance Monitoring dashboard, you get a message saying **Couldn't fetch data** across all elements in your dashboard.

![Query of Metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/couldnt-fetch-data-tracing.png)


To resolve this issue, follow the **[Set up your Service Performance Monitoring dashboard](/user-guide/distributed-tracing/service-performance-monitoring-setup)** guide to ensure your account is properly configured. 

If the issue consists, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.

#### Service Performance Monitoring dashboard showing no data

Your Service Performance Monitoring dashboard shows a **No Data** message across all elements in your dashboard.

![Query of Metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-no-data-showing.png)

This occurs when no metrics are sent to the Metrics account that's attached to the tracing data, or the collector configuration has not been updated.

First, you'll need to verify that metrics are configured and sent. Navigate to **[Metrics](https://app-uk.logz.io/#/dashboard/metrics) > [Explore](https://app.logz.io/#/dashboard/metrics/explore)** and choose the relevant data source connected to your Service Performance Monitoring dashboard from the dropdown list.

To confirm that the data is available and accessible, type `calls_total` and run the query.

![Query of calls total](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/calls-total-tracing.png)

If there are no results, go through the **[Set up your Service Performance Monitoring dashboard](/user-guide/distributed-tracing/service-performance-monitoring-setup)** guide again to confirm that the collector is properly configured to send the data.

If you can see the query's results, but the data is not visible in your Service Performance Monitoring dashboard, contact the [Logz.io Support team](mailto:help@logz.io) for additional help.