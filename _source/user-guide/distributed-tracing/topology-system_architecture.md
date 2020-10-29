---
layout: article
title: Topology graphs
permalink: /user-guide/distributed-tracing/topology-system_architecture
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---

## View Topology Graphs

### Viewing a deep dependency graph
The deep dependency graph is based on the results of your trace query. The graph lets you focus on the up- and downstream hops of a service call, as well as define the aggregation and graph density for the  layout.

You can use the deep dependency graph to view a partial graph relevant to your service of interest. 
This ability is genuinely useful when it’s not possible to view that service in a system architecture graph, especially if you have hundreds of services (or many more), where hovering to find a specific service isn’t feasible.

![jaeger on deep dependency](https://www.jaegertracing.io/docs/1.20/features/#deep-dependency-graph)

1. In the top right of the search results, click **Deep Dependency Graph** (next to order by drop-down).
2. Enter a service or operation in the search box to highlight it in the deep dependency graph.

![pick your service or operation]()  DDG
 
## Viewing system architecture graphs
The system architecture graphs are based on all the recent spans in a trace. You can see the connected services in your environment in a force directed graph or in a directed acyclic graph (DAG). 

For more information on the Jaeger site, see [https://www.jaegertracing.io/docs/1.20/features/#system-architecture](https://www.jaegertracing.io/docs/1.20/features/#system-architecture)

### Viewing the force directed graph
To highlight a specific service in the force directed graph, you can drag and zoom in on the image. 

To change the focus and see service dependencies, you can click a node to highlight the segments for the spans that are related to that node.

### Viewing the directed acyclic graph (DAG)
To view the details of the calls in the directed acyclic graph(DAG), you can drag and zoom in on the image. 

The lines represent the interaction requests between the connected services. The numbers you see are the number of interaction requests between those services over the last 7 days.

To make it easier to see values in the graph, you can grab and drag the nodes to rearrange them.