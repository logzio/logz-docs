---
layout: article
title: Log patterns
description: Log Patterns analyzes log messages and groups them according to detected patterns. We built Log Patterns to live alongside your logs in Kibana. You can see your patterns under the Patterns tab, and then click the Logs tab to return Kibana's familiar Discover view.
permalink: /user-guide/kibana/log-patterns.html
flags:
  beta: true
  logzio-plan: community
tags:
  - log-patterns
contributors:
  - danielberman
---

Log Patterns dissects incoming logs and
groups them according to detected patterns.
As your logs come into Kibana, you'll see how they fit into existing patterns,
in real time.

The Log Patterns view shows how often each pattern happens.
So you can quickly identify unique or unusual events,
as well as recurring and repetitive events.

You can use log patterns to surface logs you might have otherwise missed,
or you can use it to identify unnecessary logs that you no longer want to ship to your account.

![Log patterns]({{site.baseurl}}/images/kibana/patterns.png)

Log Patterns lives alongside your logs in [Kibana](https://app.logz.io/#/dashboard/kibana).
You can see patterns under the **Patterns** tab,
while the familiar _Discover_ view is now under the **Logs** tab.

## Understanding Log Patterns

![Log patterns]({{site.baseurl}}/images/kibana/patterns-annotated.png)

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
{:.letter-labels}

Logz.io calculates _Time_, _Count_, and _Ratio_ using the Kibana time range.
In other words, when you change the time range,
_Time_, _Count_, and _Ratio_ are recalculated.
Kibana's default time range in 15 minutes.
{:.info-box.note}

You can sort the list by time, count, or ratio.

### Exploring log patterns

Patterns comprise two parts:
_constants_ and _variables_.
This example contains both:

![Log patterns]({{site.baseurl}}/images/kibana/sample-pattern.png)

Constants are displayed as is.
In this example, `Duplicate entry` and `for session` are constants.
So those exact phrases are in all logs with this pattern.

Variables are highlighted and categorized by data type
(e.g., `Number`, `Ip`, `Url`, `Date`).
In this example,
Logz.io identified `Email` and `Guid` data in all logs with this pattern.

If a variable wasn't tagged with a data type,
Logz.io marks it with a wildcard expression: `.*`.

#### To see logs according to a pattern

* Roll over a pattern to see the Kibana filter controls.
* To see the logs that match a pattern,
  click the **+** magnifying glass.
* To see only the logs that don't match a pattern,
  click the **-** magnifying glass.

You'll be taken to the _Discover_ tab,
where you'll see the logs that match your filter.
