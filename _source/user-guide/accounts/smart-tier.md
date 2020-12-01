---
layout: article
title: Log Retention - Smart Tiering
permalink: /user-guide/accounts/smart-tier/
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-utilization
contributors:
  - shalper
---

Retention is a major factor influencing the cost of your Log Management plan. If you are looking for ways to extend log retention and maximize cost savings, Logz.io Smart Tier may be a good solution for your needs.

Logz.io Smart Tier is a cost-effective data storage solution. Unlike the Hot-Warm storage architecture, Smart Tier offers cost reduction _without_ increasing query latency or increasing retrieval times. Instead, Smart Tier reduces storage costs by approximately 25% by using cheaper storage solutions for data replication.

{% include /page-info/early-access.md %}

### Logz.io Data Tiering

* **Real-Time Tier** - Most recent data is stored and replicated in Hot instances to guarantee top real-time performance.
* **Smart Tier** - Less recent data is stored in Hot instances for the same real-time querying performance as the **Real-Time Tier**. Data is replicated in Warm storage.
* **Historical Tier** - Enable archiving to an AWS S3 bucket or an Azure storage container for your historical data. [Learn more](/user-guide/archive-and-restore/)


### Smart Tier offers 97% availability guarantee

As a user, there is no difference between the experience of querying the Real-Time Tier and Smart Tier 97% of the time.

The only time the difference between the Smart Tier and Real-Time Tier might be noticable, is when a specific Smart Tier data segment is being queryied at the same time that it is being recovered following a failure. Statistically, this is sufficiently rare enough to make the trade-off between availability and cost competitive.

## Data integrity

Smart Tier does not compromise data integrity.

Replicas ensure no data is lost to the same standard as the Real-Time Tier. The only consequence is that Smart Tier _data replicas_ are not as highly available for immediate querying in Kibana.

Since data replicas are only queried when a primary data center is temporarily down, the effects are likely to be minimal. Most of the time, replicas are a fail-safe precautionary measure that you as a user do not interact with.

## Minimal latency impact

Logz.io Smart Tier does not operate on traditional hot-warm-cold architectures, which exhibit increased latency corresponding to colder tiers.

Smart Tier storage is a warm data tier, that reduces costs while keeping Kibana query performance at the normal Hot tier speed.
