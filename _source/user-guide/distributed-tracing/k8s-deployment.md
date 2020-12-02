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
If you’re working with Kubernetes, you can use the yaml file below as a reference to deploy the collector/agent and use the output of `kubectl explain deployment` as your **apiVersion** value. This example may not work for all files: Some environments may require you to modify the yaml file. 


_Before you begin:_

+ Make sure you use the correct Jaeger version for the `jaeger-agent` image. Logz.io has tested this yaml file for version 1.18. It is possible that the reference may not work for other versions. 
+ Look up your Distributed Tracing `ACCOUNT TOKEN` in the Distributed Tracing section of the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage Accounts**</a> page.
    ![Reveal Distributed Tracing Token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-acct-tokeninfo11.gif)
+ Look up the 2-letter code in the **Region code** column of <a href="/user-guide/accounts/account-region.html#available-regions" target ="_blank"> Regions and Listener Hosts table.</a>  For US east, the region code is **us**.  <a href="https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/   #look-up-your-distributed-tracing-token-and-region-information-in-logzio" target ="_blank"> *Remind me where I can find my token and region in the **settings** pages for my account, again?* </a>

### Kubernetes yaml example

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
          value: <<ACCOUNT_TOKEN>> # Replace with the Tracing account token from Logz.io in Manage accounts > Distributed Tracing
        - name: REGION
          value: <<REGION>> # Replace with the 2-letter code for your region from the Logz.io Regions and Listener hosts table or from your Account settings page
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
        image: jaegertracing/jaeger-agent:1.18.0   # This specific version has been tested by Logz.io. If you opt for a later version, the Logz.io recommendation is to test before you deploy. 
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
