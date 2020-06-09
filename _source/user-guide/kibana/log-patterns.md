---
layout: article
title: Log patterns
description: Log Patterns analyzes log messages and groups them according to detected patterns. We built Log Patterns to live alongside your logs in Kibana. You can see your patterns under the Patterns tab, and then click the Logs tab to return Kibana's familiar Discover view.
permalink: /user-guide/kibana/log-patterns.html
#flags:
  #beta: true
  #logzio-plan: pro
tags:
  - log-patterns
contributors:
  - danielberman
  - imnotashrimp
  - shalper
---

Log Patterns runs advanced clustering algorithms to group logs by their frequency of occurrence to help you identify patterns in your logs. Use Patterns to quickly single out unique or unusual events from the mass of recurring and repetitive events.

As your logs come into Kibana, you'll see how they fit into existing patterns,
in near real time.

Log patterns can help you surface logs you might have otherwise missed, logs that should be captured by [Optimizers]({{site.baseurl}}/user-guide/optimizers/configure-optimizers.html) and saved to a Timeless Account for long-term retention, or logs that you don't need to ship to your account and can be dropped using [drop filters]({{site.baseurl}}/user-guide/accounts/drop-filters/).

![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns2.png)

To open Log Patterns, click the **Patterns** tab in [Kibana Discover](https://app.logz.io/#/dashboard/kibana).

## Understanding Log Patterns

Log Patterns recognizes these types of data: \\
`Ip`, `Email`, `Url`, `Number`, `Path`, `Guid`, `Hash`, `Syslogtimestamp`, `Date`

You can sort your log patterns by time, count, or ratio.

![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns-annotated1.png)

Time
: The timestamp of the first log with this pattern in this time range.

Count
: The number of logs with this pattern in this time range.
  You'll see patterns with the highest counts at the top of the Patterns list by default.

Ratio
: The ratio of logs with this pattern,
  as compared to total logs in this time range.

Pattern
: The pattern itself.
  Data types (such as IP addresses, numbers, or URLs) are shown in brown.
  Hover over a pattern to see the familiar Kibana filter controls.

Filter value
: Click these to filter for or filter out the logs that match a pattern. You'll be taken to the **Logs** tab,
where you'll see the logs that match your filter. You can use this option as the basis for a query which you can use for alerts, drop filters, visualizations, and more.
{:.letter-labels}

Kibana's default time range is the last 15 minutes. You can select another time range using the Histogram or the time picker to view Log Patterns for any time range you need.
{:.info-box.note}


## Constants vs. Variables

Log Patterns take into account _constants_ and _variables_.
This is best explained with an example. Here's a pattern that contains both:

```
Duplicate entry `Email` for session `Guid`
```

Constants are displayed as is.
In this example, `Duplicate entry` and `for session` are constants.
So those exact phrases are in all logs with this pattern.

Variables are highlighted and categorized by data type
(e.g., `Number`, `Ip`, `Url`, `Date`).
In this example,
Logz.io identified `Email` and `Guid` data in all logs with this pattern.

If a variable wasn't tagged with a data type,
Logz.io marks it with a wildcard expression: `.*`.
