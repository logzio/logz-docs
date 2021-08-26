---
layout: article
title: Exceptions
permalink: /user-guide/insights/exceptions/
flags:
  logzio-plan: pro
tags:
  - insights
contributors:
  - shalper

---
Logz.io Insights Engine automatically surfaces exceptions and highlights them in your log results.

As you're troubleshooting in Kibana Discover, you can easily see the number of exceptions identified in your log results for every query you run. The list is always in-context, and specific to the log results returned by your search.

To review exceptions affecting your environments, switch to the **Exceptions** tab and expand the documents that interest you.

![Exceptions count in Kibana Discover](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/exceptions-in-discover-count_aug2021.png)

### Exception count
To help you stay focused, the list is capped and will always show the top 10 exceptions.
If there are more exceptions than can be shown, you can fetch the **Most frequent** or **Most recent** exceptions.

* **Most frequent** - Most number of occurrences in the given time frame.
* **Most recent** - Most recently occurred within your selected time frame.

![Filter exceptions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/top-exceptions_aug2021.png)

### Investigating an exception

The same exception may recur in different log lines, with slight variations. Sometimes, they may even appear as clones.

Logz.io tracks the recurrence of each exception over time, and retains its **First occurrence**, that is the earliest time the exception was identified. The history of exceptions can date back up to 6 months.

![Expand an exception for more details directly in Kibana Discover](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/exceptions-in-discover-drilldown_aug2021.png)

|---|---|
|Exception| Concise title auto-detected by Logz.io based on the contents of the logs |
|Tag| Descriptive tags auto-detected by Logz.io that describe the exception type |
|Log types| A list of all the log types found to be affected by the exception |
|# of occurrences| The number of times logs associated with this exception were spotted in the given time frame |
|First occurrence| The earliest time the exception was identified |
| Last seen | Most recent occurrence of the exception |

### Sorting & Filtering options

By default, exceptions are sorted by their frequency (that is, their number of occurrences).

To reorder exceptions by **# of occurrences**, **First occurrence**, or **Last seen**, click the column header to sort the data in ascending/descending order. (An arrow indicates the sorting method.)



### New exceptions

Exceptions that occurred for the first time within the search time frame are tagged as **New** exceptions.

![Expand an exception for more details directly in Kibana Discover](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-discover/new-exceptions_2021.png)
