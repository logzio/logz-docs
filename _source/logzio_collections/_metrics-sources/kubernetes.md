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
      --from-literal=logzio-account-token=<ACCOUNT-TOKEN> \
      --from-literal=logzio-listener-host=<LISTENER-HOST>
    ```

2.  Deploy Metricbeat to your cluster

    ```shell
    kubectl --namespace=kube-system create -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-daemonset-deployment.yml
    ```

3.  Check Logz.io for your metrics

    Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).
{: .tasklist .firstline-headline }