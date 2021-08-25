---
layout: article
title: Deploying components in your system
permalink: /user-guide/distributed-tracing/deploying-components
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger   
---
You’ll need to install and deploy the following components for distributed tracing:

**Client libraries (required)** - These are language-specific implementations. An instrumented service creates spans when receiving new requests and attaches context meta-data to outgoing requests (Trace ID, Span ID, and so on). 
We support the Jaeger, OpenTelemetry, Zipkin, and OpenTracing instrumentation libraries.

**Agent (optional)** - The Agent component acts as a “buffer” between the tracer and the collector. Because it sits so close to the instrumentation, we use UDP to enhance performance and reduce round trips. 

**Collector (required)** - The collector receives spans and runs them through a processing pipeline. It can receive spans from the agents or directly from the instrumentation, depending on the implementation. The collector is also responsible for batching spans and sending them to Logz.io. ![Distributed tracing architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing_architecture2.png)


Logz.io recommends that you use the OpenTelemetry Collector. If you already have a local Jaeger in your environment, use the Logz.io Jaeger Collector to get a head start on sending tracing data to Logz.io.

## Component overview
Because Logz.io embraces open source, we opted for Jaeger. Except for the collector integration, everything you need to deploy is created and maintained by the open source community, which means that the Logz.io support team can focus more effectively on the issues that the community can’t resolve. 

To enable communication between the collector and agent, you'll need to create a Docker network that will be shared by these compontents. 

When you configure the components, make sure that you:

+ Specify the same network name in the code for both the collector and the agent.
+ Specify the relevant collector name when you configure your agent.  

### OpenTelemetry Collector
Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent directly to Logz.io via the OpenTelemetry collector which you install inside your environment.

We recommend that you use the OpenTelemetry collector to gather trace transaction data from your system. With the merging of the OpenTracing and OpenCensus projects, OpenTelemetry is the CNCF standard. We plan to add aggregated tracing metrics capabilities that will only be available via the OpenTelemetry collector.

See _<a href ="/shipping/tracing-sources/opentelemetry" target="_blank">Installing the OpenTelemetry Collector for Distributed Tracing</a>_ for the procedure to configure and deploy the OpenTelemetry collector.


{% include tracing-shipping/otel_bug_june2021.md %}

### Logz.io Jaeger Collector
If you already have a local Jaeger in your environment, to get a head start on sending tracing data to Logz.io, you may want to consider using the Logz.io Jaeger Collector. 

If you experience issues with the OpenTelemetry Collector, as a secondary option, you may also want to consider using the Logz.io Jaeger Collector. See _<a href ="/shipping/tracing-sources/jaeger-collector" target="_blank">Making the easy switch from your local Jaeger installation to Logz.io Distributed Tracing</a>_ for the procedure to configure and deploy the Logz.io Jaeger collector.

### Agent

You can deploy an agent as a sidecar container or as a Host Daemon. Although deploying an agent is not absolutely required for the instrumentation libraries which support sending spans directly to the collector, an agent can help with load balancing and enriching spans with additional tags that are not available at the collector level. 

When deciding the best approach for your environment, consider the following factors: 

1.  **Do you need to lower the number of open connections?** 
    Sending a high number of spans to the collector can create many open connections. The agent can help with load balancing and lowering the number of connections from your application itself. 
2.  **Is there benefit in enriching the spans?** 
    The agent can enrich spans by adding tags that are not available at the collector level, such as region or pod name, which are often exposed at lower levels.

#### To deploy a Jaeger agent in a Docker environment

When you deploy a Jaeger agent in a Docker environment, make sure you include the Docker network name and the relevant collector name in the configuration.

In the agent configuration below, the Docker network name is `net-logzio` and the collector name is `logzio-collector`:

```yaml
docker run \ --rm --name=jaeger-agent --network=net-logzio \ ## Make sure to expose only the ports you use in your deployment scenario!
 -p6831:6831/udp \
 -p6832:6832/udp \
 -p5778:5778/tcp \
 -p5775:5775/udp \
 jaegertracing/jaeger-agent:1.18.0  ## Use the relevant Jaeger version for the agent. Logz.io has tested this file for version 1.18. It is possible that the reference may not work for other versions.
--reporter.grpc.host-port=logzio-collector:14250  ## This line specifies which collector the agent communicates with. In the collector configuration, <<collector-name>> is taken from the --name param used to run the collector. In this example, the <<collector-name>> is "logzio-collector".

```

While you can always refer to the <a href="https://www.jaegertracing.io/docs/latest/deployment/#agent" target="_blank"> Jaeger documentation <i class="fas fa-external-link-alt"></i> </a> for the latest agent version, we recommend you use version 1.18.

 Logz.io has tested the Docker deployment file for version 1.18 of the Jaeger agent. It is possible that the reference may not work for other versions.

## Kubernetes deployment reference

If you’re working with Kubernetes, use [this yaml file](/user-guide/distributed-tracing/k8s-deployment) as a reference to deploy the collector/agent, and use the output of `kubectl explain deployment` as your **apiVersion** value.
