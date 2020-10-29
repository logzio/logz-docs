---
layout: article
title: Correlate queries
permalink: /user-guide/alerts/correlated-alert/
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
---

Some incidents are best detected by a sequence of logs, which may involve different log types, log fields, or even accounts.

For example: a deployment on a particular microservice, coinciding with an error on another environment. In this case, 2 separate events can be correlated to trigger an alert.

Correlated alerts are instrumental for reducing false-positives. By defining a more specific use case that contains 2 scenarios, the trigger can be more sensitive and reduce unwanted noise.

{% include /rules-alerts/correlated-queries.md name="alert" %}
