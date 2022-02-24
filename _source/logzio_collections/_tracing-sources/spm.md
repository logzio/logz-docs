## Service performance monitoring
Send traces and span metrics to logz.io from your environment

split to docker and kubernetes tabs :)
repo: https://github.com/logzio/otel-collector-spm
### docker:
This docker container runs OpenTelemetry collector with the most common receivers (`jaeger` `opencensus` `otlp` `zipkin`) and exports traces and span metrics to Logz.io for performance monitoring.

**This project is currently in beta and subject to breaking changes**

**NOTE: The monitor tab in logz.io tracing calculates statistics only for `server` span kind at the moment**

### Before you start you will need:
* Docker installed on your host
* Logz.io tracing account
* Logz.io span metrics account. **IMPORTANT: The account name should include your tracing account name, for example if your tracing account name is `tracing`, your metrics account should be named something like `tracing-metrics`**

## Quick start:
### Pull docker image:
```
docker pull logzio/otel-collector-spm
```

### Run the container

When running on a Linux host, use the `--network host` flag to publish the collector ports:

```
docker run --name logzio-spm \
-e LOGZIO_REGION=<<LOGZIO_REGION>> \
-e LOGZIO_TRACES_TOKEN=<<LOGZIO_TRACES_TOKEN>> \
-e LOGZIO_METRICS_TOKEN=<<LOGZIO_METRICS_TOKEN>> \
--network host \
logzio/otel-collector-spm
```

When running on MacOS or Windows hosts, publish the ports using the `-p` flag:

```
docker run --name logzio-spm \
-e LOGZIO_REGION=<<LOGZIO_REGION>> \
-e LOGZIO_TRACES_TOKEN=<<LOGZIO_TRACES_TOKEN>> \
-e LOGZIO_METRICS_TOKEN=<<LOGZIO_METRICS_TOKEN>> \
-p 55678-55680:55678-55680 \
-p 1777:1777 \
-p 9411:9411 \
-p 9943:9943 \
-p 6831:6831 \
-p 6832:6832 \
-p 14250:14250 \
-p 14268:14268 \
-p 4317:4317 \
-p 55681:55681 \
logzio/otel-collector-spm
```

### Environment variables configuration:
* `LATENCY_HISTOGRAM_BUCKETS` (Optional): Comma separated list of durations defining the latency histogram buckets. Default: `2ms, 8ms, 50ms, 100ms, 200ms, 500ms, 1s, 5s, 10s`

* `SPAN_METRICS_DIMENSIONS` (Optional) : Each metric will have at least the following dimensions because they are common across all spans: `Service name`,`Operation`,`Span kind`,`Status code`.  The input is comma separated list of dimensions to add together with the default dimensions (example: `region,http.url`). Each additional dimension is defined with a name which is looked up in the span's collection of attributes or resource attributes. If the named attribute is missing in the span, this dimension will be omitted from the metric.

* `SPAN_METRICS_DIMENSIONS_CACHE_SIZE` (Optional): the max items number of metric_key_to_dimensions_cache. If not provided, will use default value size 10000.

* `AGGREGATION_TEMPORALITY` (Optional) : Defines the aggregation temporality of the generated metrics. One of either `cumulative` or `delta`. Default: `cumulative`

### receiver ports

- Jaeger
    - thrift_compact : 6831
    - thrift_binary : 6832
    - grpc : 14250
    - thrift_http : 14268

- Opencensus
    - 55678
    
- Otlp
    - grpc : 4317
    - http : 55681

- Zipkin
    - 9411

**Example usage [here](https://github.com/logzio/otel-collector-spm/tree/master/examples)**



repo: https://github.com/logzio/logzio-helm/tree/master/charts/logzio-otel-spm
### kubernetes:

You can use a Helm chart to ship Traces to Logz.io via the OpenTelemetry collector.
The Helm tool is used to manage packages of pre-configured Kubernetes resources that use charts.

**logzio-otel-spm** allows you to ship traces and span metrics from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.
**Note:** This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart.

**This project is currently in beta and subject to breaking changes**

**NOTE: The monitor tab in logz.io tracing calculates statistics only for `server` span kind at the moment**

### Before you start you will need:
* Helm installed on your host
* Logz.io tracing account
* Logz.io span metrics account. **IMPORTANT: The account name should include your tracing account name, for example if your tracing account name is `tracing`, your metrics account should be named something like `tracing-metrics`**

#### Standard configuration

##### Deploy the Helm chart

Add `logzio-helm` repo as follows:

```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```

##### Configure the parameters in the code

Replace the Logz-io `<<tracing-token>>` with the [token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=tracing) of the tracing account to which you want to send your data.

Replace the Logz-io `<<metrics-token>>` with the [token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=metrics) of the metrics account to which you want to send your data.

Replace `<<logzio-region>>` with the name of your Logz.io region e.g `us`,`eu`.

##### Run the Helm deployment code
```
helm install  \
--set logzio.region=<<logzio-region>> \
--set logzio.tracing_token=<<tracing-token>> \
--set logzio.metrics_token=<<metrics-token>> \
logzio-otel-spm logzio-helm/logzio-otel-spm
```

##### Check Logz.io for your traces

Give your traces and metrics some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

####  Customizing Helm chart parameters
##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`.

* Edit the `values.yaml`.

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example:

```
helm install logzio-otel-spm logzio-helm/logzio-otel-spm -f my_values.yaml 
```
##### Span metrics configuration:

* `config.processors.spanmetrics.latency_histogram_buckets` (Optional): list of durations defining the latency histogram buckets. Default: `[2ms, 8ms, 50ms, 100ms, 200ms, 500ms, 1s, 5s, 10s]`

* `config.processors.spanmetrics.dimensions` (Optional) : Each metric will have at least the following dimensions because they are common across all spans: `Service name`,`Operation`,`Span kind`,`Status code`.  The input is a list of dimensions to add together with the default dimensions (example: `region, http.url`). Each additional dimension is defined with a name which is looked up in the span's collection of attributes or resource attributes. If the named attribute is missing in the span, this dimension will be omitted from the metric.

* `config.processors.spanmetrics.dimensions_cache_size` (Optional): the max items number of metric_key_to_dimensions_cache. If not provided, will use default value size 10000.

* `config.processors.spanmetrics.aggregation_temporality` (Optional) : Defines the aggregation temporality of the generated metrics. One of either `AGGREGATION_TEMPORALITY_CUMULATIVE` or `AGGREGATION_TEMPORALITY_DELTA`. Default: `AGGREGATION_TEMPORALITY_CUMULATIVE`


#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-otel-spm` deployment, use the following command:

```shell
helm uninstall logzio-otel-spm
```

## Sending data from nodes with taints

If you want to ship logs from any of the nodes that have a taint, make sure that the taint key values are listed in your in your daemonset/deployment configuration as follows:

```yaml
tolerations:
- key: 
  operator: 
  value: 
  effect: 
```

To determine if a node uses taints as well as to display the taint keys, run:

```sh
kubectl get nodes -o json | jq ".items[]|{name:.metadata.name, taints:.spec.taints}"
```

**Example usgae [here](https://github.com/logzio/logzio-helm/tree/master/charts/logzio-otel-spm/examples)**
