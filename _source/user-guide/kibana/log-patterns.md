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
in near real time. Log patterns will help you surface logs you might have otherwise missed, and uninteresting logs that can be filtered out.


![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns2.png)

To open Log Patterns, click the **Patterns** tab in Kibana Discover.

## What are Log Patterns?

Log Patterns offers an alternative view to the standard log document table in Kibana Discover. It shows the same logs organized in a different way.

While the log document table is organized chronologically by default, the Log Patterns tab reorganizes logs into groups and reorganizes them by their frequency of appearance. By default, the most common log patterns are shown at the top.

If you are looking for outliers, Patterns can help you find those easily. Click the *Ratio* column header to invert the sorting and see the least common logs on top.

Log Patterns recalculates every time you submit a new query in Kibana Discover.
It responds to every change in your query, when you apply different filters, change the time frame, or adjust the search query.

You can sort your log patterns by their time of first occurrence, count, or ratio.

![Log patterns](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns-annotated1.png)

Time
: The timestamp of the earliest log that matches the pattern.

Count
: The number of logs matching the pattern.
  Count is shown in descending order by default, from the highest to the lowest count. Click the header to switch between ascending and descending order.

Ratio
: The ratio of logs matching the pattern,
  relative to the total logs in the dataset.
  Click the header to switch between ascending and descending order.

Pattern
: The patterns identified in the message field.

Filters
: Patterns function as filters and can be used in saved searches, visualizations, and dashboards. They can also be pinned across all apps, inverted, and temporarily disabled. 

    You can filter for or filter out the logs that match a pattern. You'll be taken to the **Logs** tab in Kibana Discover, where you'll see the logs that match your filter.

    Unlike other filters, Pattern filters cannot be edited.
   
    ![Patterns filter](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/patterns-filter1.png)
{:.letter-labels}

## Variables

In the Patterns view, some specifics in the log document are identified as _variables_ and substituted by their category name. The simplification is meant to help identify relevant log patterns without worrying about the particular details.

Most variables are straightforward categories, including: \\
`Ip`, `Email`, `Url`, `Number`, `Path`, `Guid`, `Hash`, `Syslogtimestamp`, `Date`

Variables are highlighted and easy to spot. Here's an example of a pattern that has identified 2 variables: Email and GUID.

![Duplicate entry `Email` for session `Guid`](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/sample-pattern1.png)

If you filter for this pattern, the document table will return all of the logs that match this pattern in their original format, with the email and GUID information.

Log Patterns also identifies other, less intuitive variables that don't belong to any standard category. These variables are indicated as wildcards: `.*`.

![reloading account `.*`log patterns matcher](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/sample-pattern2.png)
