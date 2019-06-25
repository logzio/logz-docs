---
title: Ship Kubernetes metrics
logo:
  logofile: kubernetes.svg
  orientation: vertical
shipping-summary:
  data-source: Kubernetes
contributors:
  - imnotashrimp
shipping-tags:
  - container
---

## Setup

###### Configuration

1.  Store your Logz.io token and listener host as Kubernetes secret

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    kubectl --namespace=kube-system create secret generic logzio-secret \
      --from-literal=logzio-account-token=<<ACCOUNT-TOKEN>> \
      --from-literal=logzio-listener-host=<<LISTENER-HOST>>
    ```

2.  Check for kube-state-metrics in your cluster

    ```shell
    kubectl get pods --all-namespaces | grep kube-state-metrics
    ```

    If you see a response,
    that means kube-state-metrics is installed,
    and you can skip to the next step.

    Otherwise, deploy kube-state-metrics to your cluster.

    ```shell
    git clone https://github.com/kubernetes/kube-state-metrics.git \
      && kubectl --namespace=kube-system apply -f kube-state-metrics/kubernetes
    ```

    If you don't want to keep the repo, you can remove it now.

    ```shell
    rm -r kube-state-metrics
    ```

3.  Deploy

    If you're here at step 3,
    that means you're sure kube-state-metrics is installed in your cluster.
    (If you're not sure, go back to step 2 to check, please.
    This step depends on it.)

    Save the kube-state-metrics namespace and port as local session variables.
    This is so we can use these when we deploy your metrics pod.

    ```shell
    tmp=$(kubectl get service --all-namespaces | grep -E kube-state-metrics | sed -E -e 's/([^ ]+)([ ]+[^ ]+){4}[ ]+([^ ]+).+/\1|\3/') &&
      kube_state_metrics_namespace=$(echo $tmp | sed -E -e 's/(.+)\|.+/\1/') &&
      kube_state_metrics_port=$(echo $tmp | sed -E -e 's/.+\|([0-9]+).+/\1/')

    kubectl --namespace=kube-system create secret generic kube-state-metrics-env-vars \
      --from-literal=kube-state-metrics-namespace=$kube_state_metrics_namespace \
      --from-literal=kube-state-metrics-port=$kube_state_metrics_port
    ```

    ```shell
    kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-metricbeat.yml
    ```

3.  Check Logz.io for your metrics

    Give your metrics some time to get from your system to ours,
    and then open [Logz.io](https://app.logz.io/).
{: .tasklist .firstline-headline }