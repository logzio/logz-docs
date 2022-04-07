---
title: Sending traces from your Istio service mesh using OpenTelemetry
logo:
  logofile: istio.png
  orientation: vertical
data-source: Istio
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

Deploy this integration to send traces from your Istio service mesh layers to Logz.io via the OpenTelemetry collector using **logzio-otel-traces** Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).

**Before you begin, you'll need**:

* An applicaion instrumented by Istio in a Kubernetes cluster
* [Istioctl](https://istio.io/latest/docs/reference/commands/istioctl/) installed on your machine
* An active account with Logz.io


#### Configuration instructions

<div class="tasklist">

##### Deploy the Helm chart in the same Kubernetes cluster as your application
 
Add `logzio-helm` repo as follows:
 
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```

##### Run the Helm deployment code

```
helm install  \
--set config.exporters.logzio.region=<<LOGZIO_ACCOUNT_REGION_CODE>> \
--set config.exporters.logzio.account_token=<<TRACING-SHIPPING-TOKEN>> \
logzio-otel-traces logzio-helm/logzio-otel-traces
```

{% include /tracing-shipping/replace-tracing-token.html %}


##### Define the logzio-otel-traces service name

In most cases, the service name will be `logzio-otel-traces.default.svc.cluster.local`, where `default` is the namespace where you deployed the helm chart and `svc.cluster.name` is your cluster domain name.
  
If you are not sure what your cluster domain name is, you can run the following command to look it up: 
  
```shell
kubectl run -it --image=k8s.gcr.io/e2e-test-images/jessie-dnsutils:1.3 --restart=Never shell -- \
sh -c 'nslookup kubernetes.default | grep Name | sed "s/Name:\skubernetes.default//"'
```
  
It will deploy a small pod that extracts your cluster domain name from your Kubernetes environment. You can remove this pod after it has returned the cluster domain name.
  

##### Set Istio to send traces to Logz.io

Replace `<<logzio-otel-traces-service-name>>` in the command below with the service name obtained in the previous step and run the command.

```
istioctl install --set meshConfig.defaultConfig.tracing.zipkin.address=<<logzio-otel-traces-service-name>>:9411 --set values.pilot.traceSampling=100.0
```

<!-- info-box-start:info -->
By default, we set the `traceSampling` to 100, which means that Istio will send 100% of the application traces to Logz.io. You can adjust this value as required.
{:.info-box.note}
<!-- info-box-end -->

##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>
