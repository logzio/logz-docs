---
layout: article
title: Kubernetes deployment reference
permalink: /user-guide/distributed-tracing/k8s-deployment
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger   
  - yyyogev
---
If you’re working with Kubernetes, you can use the yaml file below as a reference to deploy the collector/agent and use the output of `kubectl explain deployment` as your **apiVersion** value. 

<!-- info-box-start:info -->
We checked this Kubernetes deployment reference with Jaeger agent version 1.18.  If you're using a newer Jaeger agent version and you have issues implementing this example in your environment, you may need to modify the yaml. If you need help, reach out to the Logz.io Support team by chat or by email. 
{:.info-box.note}
<!-- info-box-end -->
#### _Configuring your Kubernetes yaml file_

{:.no_toc}  

<div class="tasklist">

##### Determine which tracing account you want to use and get your tracing account token
Look up your Distributed Tracing `ACCOUNT TOKEN`. <br>
{% include tracing-shipping/tracing-token.md %}

##### Get your region code
{% include tracing-shipping/region-code.md %}

##### Create a secret for your Distributed Tracing shipping token

We recommend that you _not_ hard code tokens in your yaml. <br> To add another layer of security with a token secret, copy the Tracing token value you obtained in step 2 above to the `<<ACCOUNT-TOKEN>>` placeholder in the following command: 

```
kubectl --namespace=monitoring create secret generic logzio-monitoring-secret \
  --from-literal=logzio-traces-shipping-token=<<ACCOUNT-TOKEN>> 
```

##### Deploy a Jaeger agent and a collector

Logz.io recommends that you use the OpenTelemetry collector. <br>If you already have a local Jaeger in your environment, use the [Logz.io Jaeger collector](https://docs.logz.io/user-guide/distributed-tracing/local-jaeger_transition) to get a head start on sending your tracing data to Logz.io.


1. Save the yaml below to a file and name it `config.yaml`.
2. Edit the 2-letter region code, if needed. The region appears in the otel-collector-config ConfigMap under `config.yaml > exporters > logzio: ` specification in the yaml code below).
3. Deploy the yaml:

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
                key: logzio-traces-shipping-token # This is the secret you created in step 4 above. 
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
 config.yaml: |  #  In the "exporters" section,  replace the "{generic}" region placeholder with the 2-letter code for your region - from the Logz.io Regions and Listener hosts table, or from your Account settings page - as in step 3 above. 
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
      region: "{generic}"    # Replace with the 2-letter code for your region from the Logz.io Regions and Listener hosts table or from your Account settings page - as in step 3 above. 
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

##### Check the Distributed Tracing tab for your traces.

Give your traces some time to get from your system to ours, then check the Distributed Tracing tab in Logz.io to see the traces in the Jaeger UI.

</div>