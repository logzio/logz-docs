---
title: Ship Kubernetes metrics
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
templates: ["no-template", "no-template"]
contributors:
  - imnotashrimp
  - shalper
  - yyyogev
shipping-tags:
  - container
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Automated deployment <span class="sm ital">(recommended)</span>](#automated-config)
* [Manual deployment](#manual-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="automated-config">

#### Automated deployment


**Before you begin, you'll need**:

* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) installed
* Destination port 5015 open on your firewall for outgoing traffic
* Kubelet read-only-port 10255 enabled. Kubelet read-only-port 10255 is enabled by default on some cluster versions. If it isn't enabled, follow [Kubernetes's instructions](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) for enabling 10255 as a read-only-port in Kubelet's config file.



<div class="tasklist">

##### Run the automated deployment script

```shell
bash <(curl -s https://raw.githubusercontent.com/logzio/logzio-helm/master/quickstart-metrics.sh)
```

###### Prompts and answers

| Prompt | Description |
|---|---|
| Logz.io metrics shipping token <span class="required-param"></span> | Replace `<<SHIPPING-TOKEN>>` with a [token](https://app.logz.io/#/dashboard/settings/manage-accounts)
for the Metrics account you want to ship to. [Detailed instructions]({{site.baseurl}}/user-guide/accounts/finding-your-metrics-account-token/) |
| Logz.io region <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| Kubelet shipping protocol <span class="default-param">`http`</span> | `http` or `https`. If your Kubernetes setup is EKS, you'll need to use `https`. |
| Cluster name <span class="default-param">Detected by the script</span> | The name of the Kubernetes cluster you're deploying in. |
{:.paramlist}

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours,
and then open [Logz.io](https://app.logz.io/).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="manual-config">

#### Manual deployment


**Before you begin, you'll need**:

* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) installed
* Destination port 5015 open on your firewall for outgoing traffic
* Kubelet read-only-port 10255 enabled. Kubelet read-only-port 10255 is enabled by default on some cluster versions. If it isn't enabled, follow [Kubernetes's instructions](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) for enabling 10255 as a read-only-port in Kubelet's config file.

<div class="tasklist">

##### Check for kube-state-metrics in your cluster

```shell
kubectl get pods --all-namespaces | grep kube-state-metrics
```

If you see a response,
that means kube-state-metrics is installed,
and you can move on to step 2.

Otherwise, deploy [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)
with a [compatible version](https://github.com/kubernetes/kube-state-metrics#compatibility-matrix) to your cluster.

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

{% include metric-shipping/replace-metrics-token.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

```shell
kubectl --namespace=kube-system create secret generic logzio-metrics-secret \
  --from-literal=logzio-metrics-shipping-token=<<SHIPPING-TOKEN>> \
  --from-literal=logzio-metrics-listener-host=<<LISTENER-HOST>>
```

##### Gather your cluster details

In the next step, you'll need the following cluster details:

* `<<KUBE-STATE-METRICS-NAMESPACE>>`
* `<<KUBE-STATE-METRICS-PORT>>`
* `<<CLUSTER-NAME>>`

If you already have them, you can skip to the next step. Otherwise, we'll walk you through the steps of how to get them.

To get your `<<KUBE-STATE-METRICS-NAMESPACE>>`, run the following command:

```shell
kubectl get service --all-namespaces | grep -E 'kube-state-metrics|NAMESPACE'
```

To find the kube-state-metrics port, run the following command. (Before you run it, be sure to replace the placeholder <<KUBE-STATE-METRICS-NAMESPACE>> with your cluster details.) The port will be listed in the output, under `http-metrics`.

```shell
kubectl get service -n <<KUBE-STATE-METRICS-NAMESPACE>> kube-state-metrics -o yaml
```

Next, get your `<<CLUSTER-NAME>>`. If you manage Kubernetes in AWS or Azure,
you can find it in your admin console. Otherwise, you can run this command:

```shell
kubectl cluster-info
```

##### Save your cluster details as a Kubernetes secret

For this step, you'll need the cluster details you gathered in the previous step:

* `<<KUBE-STATE-METRICS-NAMESPACE>>`
* `<<KUBE-STATE-METRICS-PORT>>`
* `<<CLUSTER-NAME>>`

Replace the placeholders in the following command. Then run it to save your cluster details as a Kubernetes secret.

```shell
kubectl --namespace=kube-system create secret generic cluster-details \
  --from-literal=kube-state-metrics-namespace=<<KUBE-STATE-METRICS-NAMESPACE>> \
  --from-literal=kube-state-metrics-port=<<KUBE-STATE-METRICS-PORT>> \
  --from-literal=cluster-name=<<CLUSTER-NAME>>
```

##### Deploy

Deploy one of these configurations.

If your Kubernetes setup is EKS,
you'll need to use the HTTPS deployment.
{:.info-box.note}

###### For HTTP communication with kubelet

```shell
kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-metricbeat-http.yml
```

###### ...Or for HTTPS communication with kubelet

If you want your internal kubelet communication over HTTPs,
make sure you update your CA certificate accordingly.

```shell
kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-metricbeat-https.yml
```

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours,
and then open [Logz.io](https://app.logz.io/).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
