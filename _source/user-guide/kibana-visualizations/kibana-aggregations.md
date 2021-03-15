---
layout: article
title: Aggregations
permalink: /user-guide/kibana/aggregations/
flags:
  logzio-plan: community
tags:
  - elk stack
  - Kibana
  - Kibana visualizations
contributors:
  - shalper
---

Elasticsearch Aggregations provide you with the ability to group and perform calculations and statistics (such as sums and averages) on your data by using a simple search query. An aggregation can be viewed as a working unit that builds analytical information across a set of documents.


## Buckets

Bucket aggregations are sets of log documents, grouped by a particular field:value pair.

It also possible to create filtering buckets that hold different value ranges for IP ranges, hosts, and other numeric values.


Types of bucket aggregations:

1. Histogram
2. Range
3. Filters
4. Terms

### Average aggregation
 

### Range aggregation

### Single filter vs. Multi filter aggregations

A single-filter aggregation aggregates results in a single bucket for all logs that match a field:value pair.

It is a way to identify logs that match a certain criteria.
Logz.io will run through all logs and check if they have the group by field and if it contains the required value.
It will then count the results - that is, it will count the number of log documents that match the criteria.



### Average, count, sum...

These basic numeric calculations are known as "sub-aggregations" in Kibana.




