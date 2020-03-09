---
title: Ship Kubernetes metrics
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
contributors:
  - imnotashrimp
shipping-tags:
  - container
---
### Run our automated installtion script

```shell
curl -sSL https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/quickstart.sh | bash -s
```
And Follow the instructions

 <img>../_source/script.png</img>
 Note that if you choose shipping protocol to be https then ... (Ask josh)

### Or follow our manual instructions

#### Configuration

<div class="tasklist">

##### Check for kube-state-metrics in your cluster

```shell
kubectl get pods --all-namespaces | grep kube-state-metrics
```

If you see a response,
that means kube-state-metrics is installed,
and you can move on to step 2.

Otherwise, deploy kube-state-metrics to your cluster.

```shell
git clone https://github.com/kubernetes/kube-state-metrics.git \
  && kubectl --namespace=kube-system apply -f kube-state-metrics/examples/standard
```

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

{% include log-shipping/replace-vars.html token=true listener=true %}

```shell
kubectl --namespace=kube-system create secret generic logzio-metrics-secret \
  --from-literal=logzio-metrics-shipping-token=<<SHIPPING-TOKEN>> \
  --from-literal=logzio-metrics-listener-host=<<LISTENER-HOST>>
```

##### Store your cluster details

Paste the kube-state-metrics namespace and port in your text editor.
You can find them by running this command.

```shell
kubectl get service --all-namespaces | grep -E 'kube-state-metrics|NAMESPACE'
```

Paste the cluster name in your text editor.
You can find it by running this command,
or if you manage Kubernetes in AWS or Azure,
you can find it in your admin console.

```shell
kubectl cluster-info
```

Now replace `<<KUBE-STATE-METRICS-NAMESPACE>>`, `<<KUBE-STATE-METRICS-PORT>>`, and `<<CLUSTER-NAME>>` in this command to save your cluster details as a Kubernetes secret.

```shell
kubectl --namespace=kube-system create secret generic cluster-details \
  --from-literal=kube-state-metrics-namespace=<<KUBE-STATE-METRICS-NAMESPACE>> \
  --from-literal=kube-state-metrics-port=<<KUBE-STATE-METRICS-PORT>> \
  --from-literal=cluster-name=<<CLUSTER-NAME>>
```

##### Deploy

```shell
kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-metricbeat.yml
```

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours,
and then open [Logz.io](https://app.logz.io/).

</div>
