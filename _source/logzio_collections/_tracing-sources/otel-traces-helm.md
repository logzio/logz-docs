---
title: Sending traces from your Kubernetes cluster using OpenTelemetry
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Sending traces from your Kubernetes cluster using OpenTelemetry to Logz.io
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - yotamloe
shipping-tags:
  - existing-instrumentation
order: 1380
---

### Overview

You can use a Helm chart to ship Traces to Logz.io via the OpenTelemetry collector. The Helm tool is used to manage packages of pre-configured Kubernetes resources that use charts.

**logzio-k8s-telemetry** allows you to ship traces from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.

<!-- info-box-start:info -->
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.important}
<!-- info-box-end -->

###### Sending logs from nodes with taints

If you want to ship logs from any of the nodes that have a taint, make sure that the taint key values are listed in your in your daemonset/deployment configuration as follows:

```yaml
tolerations:
- key: 
  operator: 
  value: 
  effect: 
```

To determine if a node uses taints as well as to display the taint keys, run:

```
kubectl get nodes -o json | jq ".items[]|{name:.metadata.name, taints:.spec.taints}"
```


#### Standard configuration

<div class="tasklist">

##### Deploy the Helm chart
 
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
logzio-k8s-telemetry logzio-helm/logzio-k8s-telemetry
```

{% include /tracing-shipping/replace-tracing-token.html %}

##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>

####  Customizing Helm chart parameters

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`.

* Edit the `values.yaml`.

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

If required, you can add the following optional parameters as environment variables:
  
| Parameter | Description | 
|---|---|
| secrets.SamplingLatency | Threshold for the spand latency - all traces slower than the threshold value will be filtered in. Default 500. | 
| secrets.SamplingProbability | Sampling percentage for the probabilistic policy. Default 10. | 

###### Example

You can run the logzio-k8s-telemetry chart with your custom configuration file that takes precedence over the `values.yaml` of the chart.

For example:

<!-- info-box-start:info -->
The collector will sample **ALL traces** where is some span with error with this example configuration. 
{:.info-box.note}
<!-- info-box-end -->

```yaml
baseCollectorConfig:
  processors:
    tail_sampling:
      policies:
        [
          {
            name: error-in-policy,
            type: status_code,
            status_code: {status_codes: [ERROR]}
          },
          {
            name: slow-traces-policy,
            type: latency,
            latency: {threshold_ms: 400}
          },
          {
            name: health-traces,
            type: and,
            and: {
              and_sub_policy:
              [
                {
                  name: ping-operation,
                  type: string_attribute,
                  string_attribute: { key: http.url, values: [ /health ] }
                },
                {
                  name: main-service,
                  type: string_attribute,
                  string_attribute: { key: service.name, values: [ main-service ] }
                },
                {
                  name: probability-policy-1,
                  type: probabilistic,
                  probabilistic: {sampling_percentage: 1}
                }
              ]
            }
          },
          {
            name: probability-policy,
            type: probabilistic,
            probabilistic: {sampling_percentage: 20}
          }
        ] 
```

```
helm install \
--set traces.enabled=true \
--set secrets.TracesToken=<<TRACES-SHIPPING-TOKEN>> \
--set secrets.LogzioRegion=<<logzio-region>> \
--set secrets.p8s_logzio_name=<<P8S-LOGZIO-NAME>> \
--set secrets.env_id=<<ENV-ID>> \
logzio-k8s-telemetry logzio-helm/logzio-k8s-telemetry
```

{% include /tracing-shipping/replace-tracing-token.html %}





#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-k8s-telemetry` deployment, use the following command:

```shell
helm uninstall logzio-k8s-telemetry
```
