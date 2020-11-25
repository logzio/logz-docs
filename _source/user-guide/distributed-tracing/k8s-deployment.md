---
layout: article
title: Kubernetes deployment reference
permalink: /user-guide/distributed-tracing/k8s-deployment
flags:
  logzio-plan: pro enterprise
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger   
---
If you’re working with Kubernetes, use this yaml file as a reference to deploy the collector/agent and use the output of `kubectl explain deployment` as your **apiVersion** value.


_Before you begin:_

+ Make sure you use the correct Jaeger version for the `jaeger-agent` image.
+ Look up your Distributed Tracing `ACCOUNT TOKEN` in the Distributed Tracing section of the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage Accounts**</a> page.
+ Look up your `REGION` on the <a href="/user-guide/accounts/account-region.html" target ="_blank"> Regions and Listener Hosts </a>page. <br>
    _<a href="/user-guide/distributed-tracing/getting-started-tracing/#look-up-your-distributed-tracing-token-and-region-information-in-logzio"  target ="_blank">How do I find my token and region, again?    A reminder. </a>_


```yaml
apiVersion:  apps/v1
kind: Deployment
metadata:
  name: jaeger-logzio-collector
  labels:
    app: jaeger
    app.kubernetes.io/name: jaeger
    app.kubernetes.io/component: collector
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: jaeger
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: collector
  replicas: 1
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
          value: <<ACCOUNT_TOKEN>>
        - name: REGION
          value: <<REGION>>
---
apiVersion: v1
kind: Service
metadata:
  name: jaeger-logzio-collector
  labels:
    app: jaeger
    app.kubernetes.io/name: jaeger
    app.kubernetes.io/component: collector
  namespace: kube-system
spec:
  ports:
  - name: jaeger-health-check
    port: 14269
    protocol: TCP
    targetPort: 14269
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
    app: jaeger
    app.kubernetes.io/name: jaeger
    app.kubernetes.io/component: collector
  type: ClusterIP
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: jaeger-agent
  labels:
    app: jaeger
    app.kubernetes.io/name: jaeger
    app.kubernetes.io/component: agent
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: jaeger
      app.kubernetes.io/name: jaeger
      app.kubernetes.io/component: agent
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

```
