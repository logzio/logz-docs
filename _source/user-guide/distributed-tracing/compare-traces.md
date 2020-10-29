---
layout: article
title: Compare traces
permalink: /user-guide/distributed-tracing/compare-traces
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
You can compare traces by their structural aspects. Logz.io condenses each trace into a tree of unique service / operation paths.  

## Grouped spans
Instead of comparing two traces as a graph of the spans, the comparison feature compares traces as a graph of groups of spans. Grouping spans into nodes helps analysis by making trace comparisons easier to understand.  When comparing traces, there will always be more spans per trace than the number of nodes that represent it.

Jaeger considers two spans to belong in the same group if:

1. They are from the same service
2. They have the same service & operation
3. They have the same ancestral lineage (by service & operation)
![Simplified spans](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/grouped-spans.png)


## Color-coded nodes
Differences in the presence or prevalence of nodes in the trees are color-coded for emphasis:

+ Gray - Both traces have the same node and an equal number of spans.
+ Dark green - Trace B has a node that trace A doesn’t include.
+ Dark red - Trace A has a node that trace B doesn’t include. 
+ Light green - Both traces have the node but the number of spans is different. Trace B has more spans than trace A for the node.
+ Light red - Both traces have the node but the number of spans is different. Trace B has fewer spans than trace A for the node.

## Comparing traces: an example
Two traces were selected for comparison in the Search page. They both have about 50 spans. 
![Spans for comparison](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spans_for_com[are].png)



When you compare traces, the spans are grouped into nodes. 

In the image below, the grey nodes indicate that both traces include the node and an equal number of spans.  

The light red node indicates that both traces have the node, but that the number of spans is different: Trace B has one span less than trace A. This indicates that the span is less frequent in trace B.

