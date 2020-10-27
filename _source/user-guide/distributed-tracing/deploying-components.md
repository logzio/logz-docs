---
layout: article
title: Deploying components in your system
permalink: /user-guide/distributed-tracing/deploying-components
flags:
  logzio-plan: community
tags:
  - distributed tracing
contributors:
  - yberlinger
---
You’ll need to install and deploy the following components for distributed tracing:

**Client libraries (required)** - These are language-specific implementations. An instrumented service creates spans when receiving new requests and attaches context meta-data to outgoing requests (Trace ID, Span ID, and so on). 
We support the Jaeger, Zipkin, OpenTracing, and OpenTelemetry instrumentation libraries.

**Agent (optional)** - The Agent component acts as a “buffer” between the tracer and the collector. Because it sits so close to the instrumentation, we use UDP to enhance performance and reduce round trips. 

**Collector (required)** - The collector receives spans and runs them through a processing pipeline. It can receive spans from the agents or directly from the instrumentation, depending on the implementation. The collector is also responsible for batching spans and sending them to Logz.io.

  *  ARCHITECTURE DIAGRAM PLACEHOLDER *

## Component overview
Because Logz.io embraces open source, we opted for Jaeger. Except for the collector integration, everything you need to deploy is created and maintained by the open source community, which means that the Logz.io support team can focus more effectively on the issues that the community can’t resolve. 

## Logz.io Jaeger Collector
Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent directly to Logz.io via the Jaeger Collector which you install inside your environment.

The Logz.io integration builds on the Jaeger Collector base image and uses the gRPC plugin framework, to enable communication between the collector and Logz.io.

Configure the Logz.io extension with shell variables or environment variables. The required ports are described. [here](https://www.jaegertracing.io/docs/1.18/deployment/#collectors).

~~~
docker run -e ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
 --network=net-logzio \
 --name=jaeger-logzio-collector \
 -p 14268:14268 \
 -p 9411:9411 \
 -p 14267:14267 \
 -p 14269:14269 \
 -p 14250:14250 \
logzio/jaeger-logzio-collector:latest
~~~
{: .language-haskell}

The complete list of collector parameters is presented below. In addition to these parameters, you can also use [Jaeger's collector parameters](https://www.jaegertracing.io/docs/1.18/cli/#jaeger-collector-grpc-plugin).

 Collector Parameter | Description
 ------------ | -------------
  ACCOUNT_TOKEN (Required) | - The account token is required when you use the collector to send traces to Logz.io <br> -  Replace `<SHIPPING-TOKEN>` with the token of the account you want to send data to
REGION | -   Optional two-letter region code that determines the suggested listener URL (where you will be sending trace data to)  <br>-   Find your region code in the Regions and URLs table <br>-   This parameter is left blank for US East (Northern Virginia)
GRPC_STORAGE_PLUGIN_LOG_LEVEL| -   The lowest log level to send <br> -   Default: **warn** <br>-   From lowest to highest, log levels are: **trace, debug, info, warn, error** <br>-   Controls logging only for the Jaeger Logz.io Collector  <br>-   Does not affect Jaeger components
COLLECTOR_ZIPKIN_HTTP_PORT | If you’re using a Zipkin implementation to create traces, set this optional environment variable to the HTTP port for the Zipkin collector service

### Agent

You can deploy an agent as a sidecar container or as a Host Daemon. Although deploying an agent is not absolutely required for the instrumentation libraries which support sending spans directly to the collector, an agent can help with load balancing and enriching spans with additional tags that are not available at the collector level. 

When deciding the best approach for your environment, consider the following factors: 

1.  **Do you need to lower the number of open connections?** 
    Sending a high number of spans to the collector can create many open connections. The agent can help with load balancing and lowering the number of connections from your application itself. 
2.  **Is there benefit in enriching the spans?** 
    The agent can enrich spans by adding tags that are not available at the collector level, such as region or pod name, which are often exposed at lower levels.

### Kubernetes deployment reference

If you’re working with Kubernetes, use this yaml file as a reference to deploy the collector/agent, and use the output of `kubectl explain deployment` as your **apiVersion** value.

~~~
apiVersion: v1
kind: List
items:
- apiVersion: extensions/v1beta1
  kind: Deployment
  metadata:
    name: jaeger-logzio-collector
    labels:
      app: jaeger
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: collector
    namespace: monitoring
  spec:
    replicas: 2
    strategy:
      type: Recreate
    template:
      metadata:
        labels:
          app: jaeger
          app.kubernetes.io/name: jaeger
          app.kubernetes.io/component: collector
      spec:
        containers:
        - image: logzio/jaeger-logzio-collector:latest
          name: jaeger-logzio-collector
          ports:
          - containerPort: 14267
            protocol: TCP
          - containerPort: 14268
            protocol: TCP
          - containerPort: 9411
            protocol: TCP
          - containerPort: 14250
            protocol: TCP
          readinessProbe:
            httpGet:
              path: "/"
              port: 14269
          env:
          - name: ACCOUNT_TOKEN
            value: {{ .Values.monitoring_config.jaeger_token }}
{{- if and .Values.environment (eq .Values.environment "staging") }}
          - name: CUSTOM_LISTENER_URL
            value: https://{{ .Values.monitoring_config.listener }}:8071
{{- end }}

- apiVersion: v1
  kind: Service
  metadata:
    name: jaeger-logzio-collector
    labels:
      app: jaeger
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: collector
    namespace: monitoring
  spec:
    ports:
    - name: jaeger-collector-tchannel
      port: 14267
      protocol: TCP
      targetPort: 14267
    - name: jaeger-collector-http
      port: 14268
      protocol: TCP
      targetPort: 14268
    - name: jaeger-collector-zipkin
      port: 9411
      protocol: TCP
      targetPort: 9411
    - name: jaeger-collector-grpc
      port: 14250
      protocol: TCP
      targetPort: 14250
    selector:
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: collector
    type: ClusterIP


- apiVersion: extensions/v1beta1
  kind: DaemonSet
  metadata:
    name: jaeger-agent
    labels:
      app: jaeger
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: agent
    namespace: monitoring
  spec:
    template:
      metadata:
        labels:
          app: jaeger
          app.kubernetes.io/name: jaeger
          app.kubernetes.io/component: agent
      spec:
        containers:
        - name: jaeger-agent
          image: jaegertracing/jaeger-agent:1.18.0
          args: ["--reporter.grpc.host-port=jaeger-logzio-collector:14250"]
          ports:
          - containerPort: 5775
            protocol: UDP
          - containerPort: 6831
            protocol: UDP
          - containerPort: 6832
            protocol: UDP
          - containerPort: 5778
            protocol: TCP
        hostNetwork: true
        dnsPolicy: ClusterFirstWithHostNet
~~~  
{: .language-haskell}