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

{% include page-info/early-access.md type="Beta" %}

### Logz.io Data Tiering

* **Real-Time Tier** - Most recent data is stored and replicated in Hot instances to guarantee top real-time performance.
* **Smart Tier** - Less recent data is stored in Hot instances for the same real-time querying performance as the **Real-Time Tier**. Data is replicated in Warm storage.
* **Historical Tier** - Historical data that is outside of your plan's retention policy can be archived for long term storage and recovered on-demand. [Learn more](/user-guide/archive-and-restore/)

### Guaranteed availability

As a user, there is no difference between the experience of querying the Real-Time Tier and Smart Tier 97% of the time.

The only time the difference might be noticeable,
is when you try to query a specific Smart Tier data segment at the same time that it is being recovered from a replica.
This coincidence is statistically rare enough for the trade-off between
availability and cost to be competitive.

## Data integrity

Smart Tier does not compromise data integrity.

Replicas ensure no data is lost to the same standard as the Real-Time Tier. The only consequence is that Smart Tier _data replicas_ are not as highly available for immediate querying in Kibana.

Since data replicas are only queried when a primary data center is temporarily down, the effects are likely to be minimal. Most of the time, replicas are a fail-safe precautionary measure that you as a user do not interact with.

## Smart Tier does _not_ increase latency

Logz.io Smart Tier does not operate on traditional hot-warm-cold architectures.

Smart Tier storage is a warm data tier that reduces costs while keeping Kibana query performance at the normal Hot tier speed. The Smart Tier does not increase query latency and will not slow your workflow.
