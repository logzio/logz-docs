---
layout: article
title: Smart Tier - Data Management
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

Logz.io Smart Tier is a cost-effective data storage solution. Unlike Hot-Warm storage architectures, Smart Tier offers cost reduction _without_ increasing query latency or increasing retrieval times. Instead, Smart Tier reduces costs by using cheaper storage solutions for data replication. [Learn more in our blog 🔗 ](https://logz.io/blog/smart-tiering/)

{% include page-info/early-access.md type="Beta" %}

### Logz.io Data Tiering

* **Real-Time Tier** - Your most recent data is stored and replicated in Hot instances to guarantee top real-time performance. The data is always available with top replication fail-safe guaranteed.
* **Smart Tier** - Less recent data offers the same real-time querying performance as the Real-Time Tier. Data availability is guaranteed at a 97% SLA.
* **Historical Tier** - Data that ages out of your plan's retention policy can be archived for long term storage and recovered on-demand. [Learn more](/user-guide/archive-and-restore/)

### 97% availability - guaranteed

As a user, most of the time, there is no difference between the experience of querying the Real-Time Tier and Smart Tier data.

The only time the difference might become noticeable,
is on the rare occasion when you try to query a specific Smart Tier data segment at the same time that it is being recovered from a replica.
This coincidence is statistically rare enough for the trade-off between
availability and cost to be competitive.

## Data integrity

Smart Tier does not compromise data integrity.

Replicas ensure no data is lost to the same standard as the Real-Time Tier. The only consequence is that Smart Tier _data replicas_ are not as highly available for immediate querying in Kibana.

Since data replicas are only queried when a primary data center is temporarily down, the effects are likely to be minimal. Most of the time, replicas are a fail-safe precautionary measure that you as a user do not interact with.

## Smart Tier does _not_ increase latency

Smart Tier does not increase query latency and will not slow your workflow.
Unlike other hot-warm architectures, Logz.io Smart Tier cuts costs by maintaining **replicas** on warm storage.

Kibana search and query performance will be the same as you are used to from the top, Hot Tier experience.
