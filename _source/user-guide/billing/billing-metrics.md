---
layout: article
title: Billing for Infrastructure Monitoring accounts 
permalink: /user-guide/billing/billing-metrics
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - yberlinger
---
# DRAFT Content


### *Give us the trees, we’ll show you the view from the mountain* 

For infrastructure monitoring, while your individual data points are interesting, often what you really want and need are data-driven insights into the trends within your environment. 

Unlike other providers, you won’t be charged different rates for basic infrastructure metrics and application metrics - you get it all, and we’ll work with you to ensure that you’re sending us the metrics that really matter for detecting and analyzing trends, benchmarking, and troubleshooting your environment.

+ Pro plan - single tier license

+ Enterprise model - not yet

## Concepts

The  data you see in the Usage and billing > Usage & Info tab reflects the usage details, as collected up to midnight of the previous day. The page does not present up-to-the moment information.

### Common terms in Distributed Tracing

|---+---|
|Term| Definition|
|-----------------|-----------|
|DPM| Data points per minute|
|Host| |
### Host-based license

Cost per host, per month (according to Sales page - include link)

+ billed annually
+ billed monthly

### Conditions - what you get for your license, for each host:

+ Up to 10 containers per host
+ data shipping frequency >10s
+ Raw data retention: 3 days
+ Data aggregation over time per unique metric: Min, Max, Avg
+ Aggregation frequency: 1 minute, 10 minutes, 1 hour, daily, weekly, monthly
+ Aggregated data retention: months
+ 350 unique metrics per month 
  + Continuous aggregation over time
  + Infrastructure metrics (vanilla): We work with you to refine and tailor the list of metrics that you ship
  + Custom application metrics: Logz.io consultation services will work with you to integrate your specialized metrics into Logz.io

## Metrics account suspension
<!-- Belongs in Accounts & Usage topic: Billing connection? -->
Spikes happen. 

Behind the scenes, we run checks at regular intervals throughout the day to ensure that your account metrics are flowing smoothly, without any sudden spikes that may take you over your account plan capacity. 

If you ship more than the planned capacity for an account, that account is temporarily suspend to enable the shipping rates to return to normal. The suspension can last up to an hour. After that, your metrics flow to Logz.io resumes. 

## Infrastructure Monitoring Billing FAQS

Q: What can I do to prevent or mitigate account suspension? 

A: We understand that you want to make sure this sort of thing doesn’t happen again and we want to help! 

  Here’s what you can do:

  + Reduce the flow of metrics data  you’re sending heading to Logz.io for ingestion.
  + If this was a temporary spike or you’ve already reduced the metrics you're sending, you   don't need to do anything else: Y - breathe easy - your account will resume ingestion   automatically.
  + If you want to increase your metrics plan capacity, contact us so we can  get you on  the right plan.