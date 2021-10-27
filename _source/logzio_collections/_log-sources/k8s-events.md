---
title: Ship Kubernetes events
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes events
data-for-product-source: Logs
templates: ["s3-fetcher"]
contributors:
  - mirii1994
  - nshishkin
shipping-tags:
  - container
order: 160
---

#### Shipping Kubernetes events

Kubernetes events are a resource type that Kubernetes automatically creates when other resources get state changes, errors, or other messages that should be shared across the system.

This guide uses the [kubernetes-event-exporter](https://github.com/opsgenie/kubernetes-event-exporter) tool to ship kubernetes events to Logz.io.

<div class="tasklist">

##### Create monitoring namespace

```shell
kubectl create namespace monitoring
```

##### Store your Logz.io credentials
Save your Logz.io shipping credentials as a Kubernetes secret. To do this, customize the sample command below to your specifics and run it.

```shell
kubectl create secret generic logzio-events-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='<<LISTENER-HOST>>' \
  -n monitoring
```

* {% include /log-shipping/listener-var.html %}
* {% include /log-shipping/log-shipping-token.html %}

##### Deploy

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-events.yaml
```

##### Check Logz.io for your events

Give your events some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don’t see your events, see  [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).
  
</div>

