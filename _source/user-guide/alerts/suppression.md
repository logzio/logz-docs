---
layout: article
title: Wait between notifications
permalink: /user-guide/alerts/suppress-notifications/
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
---

The same alert can potentially trigger many times over a short period of time. If it is set to send out notifications, it can swamp your channels and get too noisy.

To avoid this problem, you can add a waiting period beween alert notificaitons.

### Escalations and De-escalations

If you have several thresholds with different severities configured for an alert, each is evaluated independently when it comes to waiting between notifications.

If the same alert triggers multiple times within the waiting period but for _different thresholds_, the notifications for each threshold is sent out without waiting. 

In other words, if you add a waiting period between notifications, they do not delay notifications of escalations or de-escalations.


### Group by fields

If an alert includes group-by fields, it will be evaluated independently per set of aggregated group by results. That is, _each set of values_ is considered a separate event and will not delay notification of a similar event, impacting a different set of values.

If the same alert triggers multiple times within the waiting period but for _different value results_ for the group by fields, the notifications for each set of values is sent out without waiting.

In other words, if you add a waiting period between notifications, they do not delay notifications of for different results.

If an alert is grouping results by city, it counts the results per city. That is, the group by is a count aggregation. So if, for example, the same alert triggers for Paris and London and shortly thereafter for Paris, London, and Berlin, both alerts will be sent without waiting. This is because they triggered for different sets of values.
