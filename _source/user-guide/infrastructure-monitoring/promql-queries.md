---
layout: article
title: Prometheus Examples and Best Practices 
permalink: /user-guide/infrastructure-monitoring/prometheus-promql-queries.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Prometheus and PromQL Use Cases and Examples
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - hidan
---

Logz.io Metrics solution is powered by Prometheus. The following doc is to help you get started with PromQL on Logz.io, and introduce some examples and use cases for your environment.

<p class="info-box note">PromQL does not support the <code>*</code> wildcard that we use in Lucene query. <br>Instead, we need to enter <code>"~"</code> before the value we want to search, and <code>".+"</code> at the end of it.</p>


### Let's query

First, to search all of the time series data points in your dashboard, run the following query:

<code>count({__name__=~".+"}) by (__name__)</code>

To search for a specific time series point, add the relevant value to the query:

<code>{__name__=~"value.+"}</code>

For example, to get all of the time series data points that starts with the value **container**, we'll use the following query:

<code>{__name__=~"container.+"}</code>

![PromQL return container values](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/promql-query-container.png)

Searching a label inside a time series changes the query. We'll add the name of the time series, and the value we're looking for:

<code>nameOfTimeSeries{label=~"value.+"}</code>

In this example, the time series we're querying has the following labels:

* namespace
* container
* pod
* user

To search for a namespace label that starts with **kub**, we'll run the following query:

<code>container_memory_working_set_bytes{namespace=~"kub.+"}</code>

![PromQL search labels and values](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/promql-search-values.png)

If you're not sure what metrics your dashboard contains, which labels it includes, or the values you can search for, click on **Metrics browser** to view all of the data, and build the query that fits your needs. 

![PromQL cheatsheet](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/query-cheatsheet.png)

### Additional resources

Read more about Prometheus, PromQL, and how you can use it in Logz.io:

* [An Intro to PromQL: Basic Concepts & Examples](https://logz.io/blog/promql-examples-introduction/#promqlintroduction)
* [Basics of querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)