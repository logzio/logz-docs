---
layout: article
title: Billing for Distributed Tracing accounts 
permalink: /user-guide/billing/billing-tracing
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
## Concepts 

+ Monthly charge is per sum of spans (in 1 million span increments)
+ Base price per annum: 12 x monthly charge, where: 
+ Monthly charge =[number of Hosts x USD rate per Host] + [number of additional 1M spans x USD rate per 1M spans]
+ Number of hosts (at 1M spans each) + additional 1M spans = calculated total
+ Quantity discounts do not apply for Tracing products
### Common terms in Distributed Tracing

|---+---|
|Term| Definition|
|-----------------|-----------|
|DPM| Data points per minute|
|Host| |

### FAQs
Hosts and...

What happens if you are using: 

+ VM
+ Kubernetes

### Calculations and Charges
Plans: 

+ Yearly plan
+ Monthly plan= charged at +20%
+ Enterprise plan = charged at +15%
+ Product bundling discounts

<!--
Q:  default plan for a trial tracing account? 
and are those levels kept once it converts to free?

A: 10m monthly spans for 10 days retention.
We have no free plan for tracing 
-->