---
layout: article
title: The Grand Distributed Tracing Tour
permalink: /user-guide/distributed-tracing/tracing-tour
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
###### What can I do on the Search and Trace pages?
{:.no_toc}

1. toc list
{:toc}

#### Next steps:
{:.no_toc}

<div class="tasklist">

##### Log in to your account and go to Distributed Tracing

Your Distributed Tracing account complements your logging ELK stack. To reach it, log into your Logz.io Operations workspace and select the **Jaeger** or **Tracing** tab.

Don’t see it? By default, your Distributed Tracing account is accessed from your main account. If you don’t see the **Tracing**  tab, the account doesn’t have permissions to it. [Learn how to grant sub accounts permissions for Tracing](link placeholder).
![tracing tour](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing_tour1.png)

##### Find traces 
After you log in to your Distributed Tracing account, you’ll want to find traces to view, either by trace ID lookup, by searching for traces, or by uploading a JSON file:  ![Look up a trace or load a JSON](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/dist_trace-panel1.png)

* To look up a trace by its trace ID, get the trace ID from your service logs and use it to link from logs to traces (and vice versa) in Kibana.

* To upload a JSON file, click or drag a JSON file that contains at least one trace to this area.

##### Search for traces 
You search for and view traces on the **Search** page. 
Use the following fields to search for traces: 
![Search traces page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_search_fields_table.png)
    
###### Tag formatting requirements:
* Use a space for conjunctions 
* Enclose values that contain whitespace in quotes
* Tag formatting requirements are summarized here: [logfmt (https://brandur.org/logfmt)](https://brandur.org/logfmt) 
* A list of recommended tags can be found here: [https://github.com/opentracing/specification/blob/master/semantic_conventions.md](https://github.com/opentracing/specification/blob/master/semantic_conventions.md)

**Tag examples:** 

*  `error=true` returns the traces with spans that are tagged as an error
*  `error=true db.statement="select * from User"`  returns the traces with spans that are tagged as `error=true`, which also include the requested db statement.
*  `http.status_code=500` returns the traces with a communication error   

##### View trace search results on the Search page
![Search results](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing_search-results.png)

**Results timeline**

The trace results timeline visualizes traces over the *lookback* period you selected for the search. 

Each circle represents a trace: The larger the circle, the more spans that trace includes. Click a circle to view the trace. Smaller circles may indicate a short end-to-end transaction or missing information caused by incomplete or [missing instrumentation](https://app.logz.io/#/distributed-tracing/tracing-instrumentation/). 
![results timeline1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/results-timeline1.png)

This view helps you find patterns and identify when the returned results happened.
![results timeline1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/results-timeline2.png)
Hover over a trace to see the service and operation associated with the trace. 
![results timeline1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/results-timeline3.png)

**Trace list**

In the trace list, each row represents a single trace and includes the service and operation names, the trace ID, the duration of the trace, and a timestamp of when it occurred.

The colors represent the different services involved in the trace. Each trace shows the number of spans it includes and how many of them were tagged as errors. The trace page shows you the spans that include the errors.

Sort trace results by the time they occured, by duration, or by the number of spans. 
![sort trace list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/dist_trace-sort_traces.png)

##### View a trace on the Trace page
Click a trace from the trace results timeline or from the trace results list to view its trace page. 

By default, the trace opens in the timeline view. Select an option for different perspectives: 

![pick a trace view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_view_pick-context.png)

**[What can I do in the Trace Timeline?](/user-guide/distributed-tracing/trace-timeline)**

**[What can I do in the Trace Graph?](/user-guide/distributed-tracing/trace-graph)**

**[What can I do in the Trace Statistics?](/user-guide/distributed-tracing/trace-statistics)**

**[What can I do in the Trace JSON?](/user-guide/distributed-tracing/trace-json)**

##### Compare traces

##### View Topology graphs, including service architecture, for your system


