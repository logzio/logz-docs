---
layout: article
title: Log patterns
permalink: /user-guide/kibana/log-patterns.html
flags:
  logzio-plan: community
tags:
  - log-patterns
contributors:
  - danielberman
  - imnotashrimp
  - shalper
---

Log Patterns runs advanced clustering algorithms to group logs with similar message fields by their frequency of occurrence. Log patterns can help you to quickly single out unique or unusual events from the mass of recurring and repetitive events or identify errors that are more frequent so you know where to focus your efforts.

As your logs come into Kibana, you'll see how they fit into patterns,
in near real time. Log patterns will help you surface logs you might have otherwise missed, and logs that can be filtered out by default using [drop filters]({{site.baseurl}}/user-guide/accounts/drop-filters/) to lower costs and data volume.

![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns2.png)

To open Log Patterns, click the **Patterns** tab in [Kibana Discover](https://app.logz.io/#/dashboard/kibana).

## Understanding Log Patterns

Log Patterns analyzes the subset of data as the log document table. This is determined by the time range, filters, and search query applied.

As you make changes to the dataset and apply different filters, change the time frame, or adjust the search query - Log Patterns will recalculate to cover the new set of data under review. By default, Kibana's date picker is set to return data from the last 15 minutes. You can select another time range using the Histogram or the time picker to view Log Patterns for any time range you need. 

You can sort your log patterns by time, count, or ratio.

![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns-annotated1.png)

Time
: The timestamp of the earliest log that matches the pattern.

Count
: The number of logs matching the pattern.
  The highest count will be shown at the top of the list by default. Click the title to switch between ascending and descending order.

Ratio
: The ratio of logs matching the pattern,
  relative to the total logs in the dataset. 
  Click the title to switch between ascending and descending order.

Pattern
: The patterns identified in the message field.

Filters
: Click these to filter for or filter out the logs that match a pattern. You'll be taken to the **Logs** tab,
where you'll see the logs that match your filter. You can use this option as the basis for a query which you can use for alerts, drop filters, visualizations, and more.
{:.letter-labels}


## Constants vs. Variables

Log Patterns take into account _constants_ and _variables_.
This is best explained with an example. Here's a pattern that contains both:

![Duplicate entry `Email` for session `Guid`](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/sample-pattern1.png)


In this example, `Duplicate entry` and `for session` are constants, and `Email` and `Guid` are the variables.
You can tell the variables from the constants, because variables are highlighted.

Log Patterns recognizes these data types as named variables: \\
`Ip`, `Email`, `Url`, `Number`, `Path`, `Guid`, `Hash`, `Syslogtimestamp`, `Date`

Variables that don't belong to any of these data types are indicated as wildcards: `.*`.

![reloading account `.*`log patterns matcher](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/sample-pattern2.png)
