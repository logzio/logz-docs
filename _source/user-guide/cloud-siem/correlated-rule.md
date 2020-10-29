---
layout: article
title: Correlate queries
permalink: /user-guide/siem/security-correlated-queries/
flags:
  logzio-plan: enterprise
tags:
  - alerts
  - rules
  - kibana alerts
contributors:
  - shalper
---

Some security incidents are best detected by a sequence of logs originating from different products, i.e. log types.

For example: an email attachment followed by a malware infection.
In this example, the first event is detected by an email security product and the second event is detected by an endpoint security product. In this case 2 separate events can be defined using a correlated alert.

Correlated events are instrumental for reducing false-positives. By defining a more specific use case that contains 2 scenarios, the trigger can be more sensitive and reduce unwanted noise.

{% include /rules-alerts/correlated-queries.md name="rule" %}

![Investigate correlated events](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-event-logs.png)