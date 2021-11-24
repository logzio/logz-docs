---
layout: article
title: Amazon Auto Scaling
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-auto-scaling.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon Auto Scaling

This dashboard provides an interface to view and analyze metrics from your Amazon Auto Scaling instances.

| Metric visualization     | Metric name                                                                              | Description                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Group Size               | Aws\_autoscaling\_group\_max\_size\_average, aws\_autoscaling\_group\_min\_size\_average | The minimum size of the Auto Scaling group versus the maximum size of the Auto Scaling group. |
| Group's Desired Capacity | aws\_autoscaling\_group\_desired\_capacity\_average                                      | The number of instances that the Auto Scaling group attempts to maintain.                               |
| Total Instances          | aws\_autoscaling\_group\_total\_instances\_average                                       | The total number of instances in the Auto Scaling group.                                                |
| Running Instances        | aws\_autoscaling\_group\_in\_service\_instances\_average                                 | The number of instances that are running as part of the Auto Scaling group.                       |
| Pending Instances        | aws\_autoscaling\_group\_pending\_instances\_average                                     | The number of instances that are pending.                                                               |
| Standby Instances        | aws\_autoscaling\_group\_standby\_instances\_average                                     | The number of instances that are in a Standby state.                                                    |
| Terminating Instances    | aws\_autoscaling\_group\_terminating\_instances\_average                                 | The number of instances that are in the process of terminating.                                         |