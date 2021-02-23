---
layout: article
title: Topology diagrams
permalink: /user-guide/distributed-tracing/topology-system_architecture
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger
---

## View Topology Diagrams   
The available diagrams are based either on the traces you search for (deep dependency graph) or are a compilation of all the current trace data available in your system (system architecture graphs).

### Viewing a deep dependency graph
The deep dependency graph describes how the services in traces are connected to each other, based on the results of the trace search query you run.  The graph lets you focus on the up- and downstream hops of a service call, as well as define the aggregation and graph density for the  layout. 

From the <a href="https://www.jaegertracing.io/docs/latest/features/#deep-dependency-graph" target="_blank">Jaeger deep dependency documentation <i class="fas fa-external-link-alt"></i> </a>, the deep depency graph is...

> ...also known as “Transitive Dependency Graph”, where a chain `A -> B -> C` means that `A` has a transitive dependency  on `C`. A single graph requires a “focal” service (shown in pink) and only displays the paths passing through that service. Typically, this type of graph does not represent the full architecture of the system, unless there is a service that is connected to everything, e.g. an API gateway, and it is selected as a focal service.

Use the deep dependency graph to view a partial graph relevant to your service of interest. 
This ability is genuinely useful when it’s not possible to view that service in a system architecture graph, especially if you have hundreds of services (or many more), where hovering to find a specific service isn’t feasible. 

1. In the top right of the search results, click **Deep Dependency Graph** (next to the **Sort** drop-down).
     ![Open DDG](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/open-ddg.png) You can set which service to focus on as origin (in pink) and expand and collapse the levels in the diagram.![Layout DDG](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/deep_depend_graph-layout2.png)

2. Enter a service or operation in the search box to highlight it in the deep dependency graph.
![highlight DDG](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/ddgraph_highligh.png)

 
## Viewing system architecture diagrams   (--Coming SOON!--)
The system architecture diagrams are based on all the trace data in your system, compiled over a given time frame and refreshed periodically. You can see the connected services in your environment in a force directed graph or in a directed acyclic graph (DAG). 

For more information, see the <a href = "https://www.jaegertracing.io/docs/1.20/features/#system-architecture" target="_blank">Jaeger system architecture documentation. </a> 

### Viewing the force directed graph  (--Coming SOON!--)
To highlight a specific service in the force directed graph, you can drag and zoom in on the image. 

To change the focus and see service dependencies, you can click a node to highlight the segments for the spans that are related to that node.
![Change focus in force directed graph](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/fgraph-animated.gif)

### Viewing the directed acyclic graph (DAG)
To view the details of the calls in the directed acyclic graph (DAG), you can drag and zoom in on the image. 

The lines represent the interaction requests between the connected services. The numbers you see are the number of interaction requests between those services over the last 7 days.

To make it easier to see values in the graph, you can grab and drag the nodes to rearrange them.
![2 views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/dist_tr-dag-2views.png)