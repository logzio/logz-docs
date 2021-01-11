---
layout: article
title: Deploying components in your system
permalink: /user-guide/distributed-tracing/deploying-components
flags:
  logzio-plan: pro enterprise
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger   
---
You’ll need to install and deploy the following components for distributed tracing:

**Client libraries (required)** - These are language-specific implementations. An instrumented service creates spans when receiving new requests and attaches context meta-data to outgoing requests (Trace ID, Span ID, and so on). 
We support the Jaeger, Zipkin, OpenTracing, and OpenTelemetry instrumentation libraries.

**Agent (optional)** - The Agent component acts as a “buffer” between the tracer and the collector. Because it sits so close to the instrumentation, we use UDP to enhance performance and reduce round trips. 

**Collector (required)** - The collector receives spans and runs them through a processing pipeline. It can receive spans from the agents or directly from the instrumentation, depending on the implementation. The collector is also responsible for batching spans and sending them to Logz.io. ![Distributed tracing architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing_architecture.png)


## Component overview
Because Logz.io embraces open source, we opted for Jaeger. Except for the collector integration, everything you need to deploy is created and maintained by the open source community, which means that the Logz.io support team can focus more effectively on the issues that the community can’t resolve. 

### OpenTelemetry Collector
Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent directly to Logz.io via the OpenTelemetry collector which you install inside your environment.

We recommend that you use the OpenTelemetry collector to gather trace transaction data from your system. With the merging of the OpenTracing and OpenCensus projects, OpenTelemetry is the CNCF standard. We plan to add aggregated tracing metrics capabilities that will only be available via the OpenTelemetry collector.

See _<a href ="/shipping/tracing-sources/opentelemetry" target="_blank">Installing the OpenTelemetry Collector for Distributed Tracing</a>_ for the procedure to configure and deploy the OpenTelemetry collector.



### Logz.io Jaeger Collector
As a secondary option, you may consider using the Jaeger Collector if you experience issues with the OpenTelemetry Collector. See _<a href ="/shipping/tracing-sources/jaeger_collector" target="_blank">Installing the Logz.io Jaeger Collector for Distributed Tracing </a>_ for the procedure to configure and deploy the Logz.io Jaeger collector.

### Agent

You can deploy an agent as a sidecar container or as a Host Daemon. Although deploying an agent is not absolutely required for the instrumentation libraries which support sending spans directly to the collector, an agent can help with load balancing and enriching spans with additional tags that are not available at the collector level. 

When deciding the best approach for your environment, consider the following factors: 

1.  **Do you need to lower the number of open connections?** 
    Sending a high number of spans to the collector can create many open connections. The agent can help with load balancing and lowering the number of connections from your application itself. 
2.  **Is there benefit in enriching the spans?** 
    The agent can enrich spans by adding tags that are not available at the collector level, such as region or pod name, which are often exposed at lower levels.

### *To deploy a Jaeger agent in a Docker environment*

```bash
docker run \  ## make sure to expose only the ports you use in your deployment scenario!
  --rm \
 -p6831:6831/udp \
 -p6832:6832/udp \
 -p5778:5778/tcp \
 -p5775:5775/udp \
 jaegertracing/jaeger-agent:1.20  ## Use the relevant agent version
  ```

Refer to the <a href="https://www.jaegertracing.io/docs/latest/deployment/#agent" target="_blank"> Jaeger documentation <i class="fas fa-external-link-alt"></i> </a> for the agent version.

### *Kubernetes deployment reference*

If you’re working with Kubernetes, use [this yaml file](/user-guide/distributed-tracing/k8s-deployment) as a reference to deploy the collector/agent, and use the output of `kubectl explain deployment` as your **apiVersion** value.
