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

We recommend that you use the OpenTelemetry collector to gather trace transaction data from your system. 

<!--See _<a href ="/shipping/tracing-sources/opentelemetry" target="_blank">Ship traces with OpenTelemetry </a>_ for the procedure to configure and deploy the OpenTelemetry collector. -->


### Logz.io Jaeger Collector
As a secondary option, you may consider using the Jaeger Collector if you experience issues with the OpenTelemetry Collector. 

The Logz.io integration builds on the Jaeger Collector base image and uses the gRPC plugin framework, to enable communication between the collector and Logz.io.

Configure the Logz.io extension with shell variables or environment variables. The required ports are described 
<a href ="https://www.jaegertracing.io/docs/latest/deployment/#collectors)" target="_blank">here <i class="fas fa-external-link-alt"></i>.</a> You'll need to change to the version page for your deployment. 

```bash
docker run -e ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
 --network=net-logzio \
 --name=jaeger-logzio-collector \
 -p 14268:14268 \
 -p 9411:9411 \
 -p 14267:14267 \
 -p 14269:14269 \
 -p 14250:14250 \
logzio/jaeger-logzio-collector:latest
```

The complete list of collector parameters is presented below. In addition to these parameters, you can also use 
 <a href ="https://www.jaegertracing.io/docs/latest/cli/#jaeger-collector-grpc-plugin" target="_blank">Jaeger's collector parameters <i class="fas fa-external-link-alt"></i> </a> . You'll need to change to the version page for your deployment. 

 Collector Parameter | Description
 ------------ | -------------
  ACCOUNT_TOKEN (Required) | - The account token is required when you use the collector to send traces to Logz.io <br> -  Replace `<SHIPPING-TOKEN>` with the token of the Distributed Tracing account you want to send data to <br><a href ="/user-guide/accounts/finding-your-tracing-account-token" target="_blank">How do I look up my Distributed Tracing account token?</a>
REGION | -   Two-letter region code that determines the suggested listener URL (where you will be sending trace data to)  <br>-   Find your region code in the Regions and URLs table <br>-   This parameter is left blank for US East (Northern Virginia)<br><a href ="/user-guide/accounts/account-region.html#available-regions " target="_blank">How do I look up the Listener host URL for my region?</a>
GRPC_STORAGE_PLUGIN_LOG_LEVEL| -   The lowest log level to send <br> -   Default: **warn** <br>-   From lowest to highest, log levels are: **trace, debug, info, warn, error** <br>-   Controls logging only for the Jaeger Logz.io Collector  <br>-   Does not affect Jaeger components
COLLECTOR_ZIPKIN_HTTP_PORT | If you’re using a Zipkin implementation to create traces, set this optional environment variable to the HTTP port for the Zipkin collector service

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
