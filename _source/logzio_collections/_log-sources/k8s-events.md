# Shipping Kubernetes events

Kubernetes events are a resource type in Kubernetes that are automatically created when other resources have state changes, errors, or other messages that should be broadcast to the system.

This guide uses the [kubernetes-event-exporter](https://github.com/opsgenie/kubernetes-event-exporter) tool to ship kubernetes events to Logz.io.

### 1. Create monitoring namespace

```shell
kubectl create namespace monitoring
```

### 2. Store your Logz.io credentials
Save your Logz.io shipping credentials as a Kubernetes secret. Customize the sample command below to your specifics before running it.

```shell
kubectl create secret generic logzio-events-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='<<LISTENER-HOST>>' \
  -n monitoring
```

-   Replace  `<<LOG-SHIPPING-TOKEN>>`  with the token of the account you want to ship to.
-   Replace  `<<LISTENER-HOST>>`  with the host  [for your region](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions). For example,  `listener.logz.io`  if your account is hosted on AWS US East, or  `listener-nl.logz.io`  if hosted on Azure West Europe.

### 3. Deploy

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-events.yaml
```

### 4. Check Logz.io for your events

Give your events some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don’t see your events, see  [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).