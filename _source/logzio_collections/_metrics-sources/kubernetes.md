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

## Setup

###### Configuration

1.  Check for kube-state-metrics in your cluster

    ```shell
    kubectl get pods --all-namespaces | grep -E 'kube-state-metrics|NAMESPACE'
    ```

    If you see a response,
    that means kube-state-metrics is installed,
    and you can move on to step 2.

    Otherwise, deploy kube-state-metrics to your cluster.

    ```shell
    git clone https://github.com/kubernetes/kube-state-metrics.git \
      && kubectl --namespace=kube-system apply -f kube-state-metrics/kubernetes
    ```

2.  Store your Kubernetes secrets

    Save your Logz.io shipping credentials as a Kubernetes secret.

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    kubectl --namespace=kube-system create secret generic logzio-metrics-secret \
      --from-literal=logzio-metrics-shipping-token=<<ACCOUNT-TOKEN>> \
      --from-literal=logzio-metrics-listener-host=<<LISTENER-HOST>>
    ```

    Get the kube-state-metrics details...

    ```shell
    kubectl get pods --all-namespaces | grep -E 'kube-state-metrics|NAMESPACE'
    ```

    ...and replace `<<KUBE-STATE-METRICS-NAMESPACE>>` and `<<KUBE-STATE-METRICS-PORT>>` in this command.
    Run this command to save your kube-state-metrics details as a Kubernetes secret.

    ```shell
    kubectl --namespace=kube-system create secret generic kube-state-metrics-env-vars \
      --from-literal=kube-state-metrics-namespace=<<KUBE-STATE-METRICS-NAMESPACE>> \
      --from-literal=kube-state-metrics-port=<<KUBE-STATE-METRICS-PORT>>
    ```

3.  Deploy

    ```shell
    kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-metricbeat.yml
    ```

3.  Check Logz.io for your metrics

    Give your metrics some time to get from your system to ours,
    and then open [Logz.io](https://app.logz.io/).
{: .tasklist .firstline-headline }