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

Make sure you use the correct Jaeger version for the `jaeger-agent` image. 

Look up your Distributed Tracing `ACCOUNT TOKEN` at the bottom of the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage Accounts**</a> page. 

Look up your `CUSTOM_LISTENER_URL` on the <a href="/user-guide/log-shipping/listener-ip-addresses.html" target ="_blank"> Listener IP addresses page</a>.


```yaml
apiVersion: apps/v1
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
          - name: ACCOUNT_TOKEN # obtained from Logz.io in Manage Accounts > Distributed Tracing
            value: {{ .Values.monitoring_config.jaeger_token }}
{{- if and .Values.environment (eq .Values.environment "staging") }}
          - name: CUSTOM_LISTENER_URL # obtained from Logz.io Listener IP addresses table
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
          image: jaegertracing/jaeger-agent:1.18.0   # Relace "1.18.0" with the latest Jaeger version
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
``` 