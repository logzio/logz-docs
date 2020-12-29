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
  - yyyogev
---
If you’re working with Kubernetes, you can use the yaml file below as a reference to deploy the collector/agent and use the output of `kubectl explain deployment` as your **apiVersion** value. This example may not work for all files: Some environments may require you to modify the yaml file.

#### _Before you begin:_

{:.no_toc}  

<div class="tasklist">

##### Determine the Jaeger version for the agent.
Make sure you use the correct Jaeger version for the `jaeger-agent` image. Logz.io has tested this yaml file for version 1.18. It is possible that the reference may not work for other versions. 

##### Get your tracing account token.
Look up your Distributed Tracing `ACCOUNT TOKEN`: {% include tracing-shipping/tracing-token.md %}

##### Get your region code
Look up the 2-letter code in the **Region code** column of <a href="/user-guide/accounts/account-region.html#available-regions" target ="_blank"> Regions and Listener Hosts table.</a>  For US east, the region code is **us**.  <a href="https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/   #look-up-your-distributed-tracing-token-and-region-information-in-logzio" target ="_blank"> *Remind me where I can find my token and region in the **settings** pages for my account, again?* </a>

##### Create a secret for your Distributed Tracing shipping token:

```
kubectl --namespace=monitoring create secret generic logzio-monitoring-secret \
  --from-literal=logzio-traces-shipping-token=<<ACCOUNT-TOKEN>> 
```

##### Deploy agent and collector
Deploy Jaeger agents and a collector - either the OpenTelemetry collector (recommended) or the Jaeger collector:

### OpenTelemetry collector + Jaeger agents
* Save the yaml below to a file and name it `config.yaml`
* Edit the 2-letter region code if necessary (line 86)
* Deploy the yaml:

```
kubectl apply -f config.yaml
```

```yaml
apiVersion:  apps/v1
kind: Deployment
metadata:
  name: otel-collector-logzio
  labels:
    app: otel-logzio
    app.kubernetes.io/name: otel-logzio
    app.kubernetes.io/component: collector
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: otel-logzio
      app.kubernetes.io/name: otel-logzio
      app.kubernetes.io/component: collector
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: otel-logzio
        app.kubernetes.io/name: otel-logzio
        app.kubernetes.io/component: collector
    spec:
      containers:
      - image: otel/opentelemetry-collector-contrib:0.17.0
        name: otel-collector-logzio
        ports:
          # - "1888:1888"   # pprof extension
          # - "8888:8888"   # Prometheus metrics exposed by the collector
          # - "8889:8889"   # Prometheus exporter metrics
          # - "13133:13133" # health_check extension
          # - "9411"   # Zipkin receiver
          # - "55680:55679" # zpages extension
        - containerPort: 1888   # pprof extension
          protocol: TCP
        - containerPort: 9411  # Zipkin receiver
          protocol: TCP
        - containerPort: 8888  # Prometheus metrics exposed by the collector
          protocol: TCP
        - containerPort: 13133  # health_check extension
          protocol: TCP
        - containerPort: 14250 #jaeger receiver
          protocol: TCP
        env:
          - name: LOGZIO_TRACES_TOKEN
            valueFrom:
              secretKeyRef:
                key: logzio-traces-shipping-token
                name: logzio-monitoring-secret
        volumeMounts:
        - name: otel-collector-config
          mountPath: "/etc/otel/"
          readOnly: true
          # subPath: config.yml
      volumes:
      - name: otel-collector-config
        configMap:
          defaultMode: 0600
          name: otel-collector-config

---
apiVersion: v1
kind: ConfigMap
metadata:
 name: otel-collector-config
 namespace: monitoring
 labels:
   app: otel-logzio
   component: otel-collector-conf
data:
 config.yaml: |
  receivers:
    opencensus:
    zipkin:
      endpoint: :9411
    jaeger:
      protocols:
        thrift_http:
        grpc:

  exporters:
    logzio:
      account_token: "${LOGZIO_TRACES_TOKEN}"
      region: us
    logging:

  processors:
    batch:
    queued_retry:

  extensions:
    pprof:
      endpoint: :1777
    zpages:
      endpoint: :55679
    health_check:

  service:
    extensions: [health_check, pprof]
    pipelines:
      traces:
        receivers: [opencensus, jaeger, zipkin]
        processors: [batch, queued_retry]
        exporters: [logzio]
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: jaeger-agent
  labels:
    app: jaeger
    app.kubernetes.io/name: jaeger
    app.kubernetes.io/component: agent
  namespace: monitoring
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
        args: ["--reporter.grpc.host-port=otel-collector-logzio:14250", "--log-level=debug"]
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
---
apiVersion: v1
kind: Service
metadata:
  name: otel-collector-logzio
  labels:
    app: otel-logzio
    app.kubernetes.io/name: otel-logzio
    app.kubernetes.io/component: collector
  namespace: monitoring
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
    app: otel-logzio
    app.kubernetes.io/name: otel-logzio
    app.kubernetes.io/component: collector
  type: ClusterIP
```

### Jaeger collector and agents
* Save the yaml below to a file and name it `config.yaml`
* Edit the 2-letter region code if necessary (line 44)

* Deploy the yaml:

```
kubectl apply -f config.yaml
```

```yaml
apiVersion:  apps/v1
kind: Deployment
metadata:
  name: jaeger-collector-logzio
  labels:
    app: jaeger-logzio
    app.kubernetes.io/name: jaeger-logzio
    app.kubernetes.io/component: collector
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: jaeger-logzio
      app.kubernetes.io/name: jaeger-logzio
      app.kubernetes.io/component: collector
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: jaeger-logzio
        app.kubernetes.io/name: jaeger-logzio
        app.kubernetes.io/component: collector
    spec:
      containers:
      - image: logzio/jaeger-logzio-collector:latest
        name: jaeger-collector-logzio
        imagePullPolicy: IfNotPresent
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
          valueFrom:
            secretKeyRef:
              key: logzio-traces-shipping-token
              name: logzio-monitoring-secret
        - name: REGION
          value: us # Replace with the 2-letter code for your region from the Logz.io Regions and Listener hosts table or from your Account settings page
#        - name: GRPC_STORAGE_PLUGIN_LOG_LEVEL  # Uncomment these lines to enable debug logs in the collector
#          value: debug
---
apiVersion: v1
kind: Service
metadata:
  name: jaeger-collector-logzio
  labels:
    app: jaeger-logzio
    app.kubernetes.io/name: jaeger-logzio
    app.kubernetes.io/component: collector
  namespace: monitoring
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
    app: jaeger-logzio
    app.kubernetes.io/name: jaeger-logzio
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
  namespace: monitoring
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
        args: ["--reporter.grpc.host-port=jaeger-collector-logzio:14250", "--log-level=debug"]
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
