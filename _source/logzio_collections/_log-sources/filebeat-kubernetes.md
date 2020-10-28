---
title: Ship Kubernetes logs
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
templates: ["no-template", "no-template"]
shipping-tags:
  - container
---
<!-- tabContainer:start -->
<div class="branching-container">

<!-- tab:start -->
<div id="standard-config">

**Before you begin, you'll need**:

* Destination port 5015 open on your firewall for outgoing traffic

#### Deploy


#### 1. Store your Logz.io credentials

Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

Replace `<<LISTENER-HOST>>` associated to your region (for example, `listener.logz.io` is associated to `US East` region  ). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

Replace `<<CLUSTER-NAME>>` with your cluster's name. If you manage Kubernetes in AWS or Azure,
you can find it in your admin console. Otherwise, you can run this command: `kubectl cluster-info`

```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<SHIPPING-TOKEN>>' \
  --from-literal=logzio-logs-listener='<<LISTENER-HOST>>' \
  --from-literal=cluster-name='<<CLUSTER-NAME>>' \
  -n kube-system
```

#### 2. deploy

##### For standard configuration deployment:
```shell
 kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-filebeat.yaml -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/filebeat-standard-configuration.yaml
```

##### For autodiscover configuration deployment:
```shell
 kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-filebeat.yaml -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/filebeat-autodiscovery-configuration.yaml
```

##### If you want to apply  your one custom configuration:
Download standard-configmap.yaml and apply your changes there, make sure that you will have the same structure of the file.
  
```shell
kubectl apply -f /Users/fadikhatib/logzio/integration-team/logz-docs/_source/logzio_collections/_log-sources/standard-filebeat-daemonset.yaml -f <<Your-custom-configuration-file.yaml>>
```

#### 3. Check Logz.io for your logs
Give your logs some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/).


</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
