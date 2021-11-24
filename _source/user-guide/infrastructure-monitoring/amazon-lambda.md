---
layout: article
title: Amazon Lambda 
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-lambda.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---


This dashboard provides an interface to view and analyze metrics from your Amazon Lambda.

| Metric visualization           | Metric name                                                    | Description                                                                                                                                         |
| ------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Total Function Invocations     | aws\_lambda\_invocations\_sum                                  | Total number of times that your function code is invoked, including successful invocations and invocations that result in a function error.         |
| Total Function Errors   | aws\_lambda\_errors\_sum                                       | The number of invocations that result in a function error.                                                                                          |
| Total Function Throttles       | aws\_lambda\_throttles\_sum                                    | The number of invocation requests that are throttled.                                                                                               |
| Function Error Rate            | Aws\_lambda\_errors\_sum, aws\_lambda\_invocations\_sum        | The number of invocations that result in a function error versus the total invocations count.                                                       |
| Most Invoked Functions | aws\_lambda\_invocations\_sum                                  | The number of times that your function code is invoked the most, including successful invocations and invocations that result in a function error.  |
| Invocation Stats   |
| Function Invocations Over Time | aws\_lambda\_invocations\_sum                                  | The number of times that your function code is invoked over time, including successful invocations and invocations that result in a function error. |
| Function Throttles Over Time   | aws\_lambda\_throttles\_sum                                    | The number of invocation requests that are throttled over time.                                                                                     |
| Function Errors Over Time      | aws\_lambda\_errors\_sum                                       | The number of invocations that result in a function error over time.                                                                                |
| Execution Duration             | Aws\_lambda\_duration\_maximum, aws\_lambda\_duration\_average | The amount of time that your function code spends processing an event.                                                                              |
| Concurrent Executions          | aws\_lambda\_concurrent\_executions\_sum                       | The number of function instances that are processing events.                                                                                        |
