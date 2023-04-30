---
title: Send Docker metrics over Telegraf
logo:
  logofile: docker-logo.png
  orientation: vertical
open-source:
  - title: Docker Metrics Collector
    github-repo: telegraf-docker-collector-metrics
data-for-product-source: Metrics
data-source: Docker metrics via OpenTelemetry
templates: ["docker"]
contributors:
  - hidan
  - nshishkin
shipping-tags:  
  - container
order: 800
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [MacOS and Linux](#macos-linux)
* [Windows](#windows)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

## Overview

Deploy this integration to ship Prometheus format metrics from your Docker network using OpenTelemetry.

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="macos-linux">


#### Setup

**Before you begin, you'll need**:

* One or more Docker engines joined into a Docker swarm, using `docker swarm init` on one manager and `docker swarm join` on other managers and worker nodes.

<div class="tasklist">
  

##### Configure the Docker daemon as a Prometheus target

Create a `daemon.json` file or open the existing `daemon.json` file and add the following settings:

```json
{
  "metrics-addr" : "127.0.0.1:9323",
  "experimental" : true
}
```

Save the configuration and restart Docker.

##### Configure the Prometheus

Copy the following configuration file and save it to `/tmp/prometheus.yml`.

###### Linux


```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
      monitor: 'codelab-monitor'

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first.rules"
  # - "second.rules"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'docker'
         # metrics_path defaults to '/metrics'
         # scheme defaults to 'http'.

    static_configs:
      - targets: ['localhost:9323']
```

###### MacOS

```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
      monitor: 'codelab-monitor'

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first.rules"
  # - "second.rules"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ['host.docker.internal:9090'] # Only works on Docker Desktop for Mac

  - job_name: 'docker'
         # metrics_path defaults to '/metrics'
         # scheme defaults to 'http'.

    static_configs:
      - targets: ['docker.for.mac.host.internal:9323']
```

##### Start the Prometheus service


```shell
 docker service create --replicas 1 --name my-prometheus \
    --mount type=bind,source=/tmp/prometheus.yml,destination=/etc/prometheus/prometheus.yml \
    --publish published=9090,target=9090,protocol=tcp \
    prom/prometheus
```


##### Download OpenTelemetry collector
  
<!-- info-box-start:info -->
If you already have OpenTelemetry, proceed to the next step.
{:.info-box.note}
<!-- info-box-end -->

Create a dedicated directory on your host and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.59.0) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml`.

##### Configure the receiver
  
Open the configuration file and add the Prometheus receiver as follows.

###### Linux

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'consul-metrics'
          scrape_interval: 15s
          static_configs:
            - targets: ['localhost:9323']
```

###### MacOS

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'consul-metrics'
          scrape_interval: 15s
          static_configs:
            - targets: ['docker.for.mac.host.internal:9323']
```

##### Configure the exporters

In the same configuration file, add the following to the `exporters` section:
  
```yaml  
exporters:
  prometheusremotewrite:
    endpoint: https://<<LISTENER-HOST>>:8053
    headers:
      Authorization: Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>
```
  
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Configure the service pipeline
  
In the `service` section of the configuration file, add the following configuration
  
```yaml
service:
  pipelines:
    metrics:
      receivers: [<<YOUR-RECEIVER>>]
      exporters: [prometheusremotewrite]
```
* Replace `<<YOUR_RECEIVER>>` with the name of your receiver.



##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```

* Replace `<path/to>` with the path to the directory where you downloaded the collector. If the name of your configuration file is different to `config`, adjust name in the command accordingly.

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).



</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="windows">

#### Setup

**Before you begin, you'll need**:

* One or more Docker engines joined into a Docker swarm, using `docker swarm init` on one manager and `docker swarm join` on other managers and worker nodes.

<div class="tasklist">
  

##### Configure the Docker daemon as a Prometheus target

Create a `daemon.json` file or open the existing `daemon.json` file and add the following settings:

```json
{
  "metrics-addr" : "127.0.0.1:9323",
  "experimental" : true
}
```

Save the configuration and restart Docker.

##### Configure the Prometheus

Copy the following configuration file and save it to `C:\tmp\prometheus.yml`.


```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
      monitor: 'codelab-monitor'

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first.rules"
  # - "second.rules"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ['host.docker.internal:9090'] # Only works on Docker Desktop for Windows

  - job_name: 'docker'
         # metrics_path defaults to '/metrics'
         # scheme defaults to 'http'.

    static_configs:
      - targets: ['192.168.65.1:9323']
```


##### Start the Prometheus service


```shell
PS C:\> docker service create --replicas 1 --name my-prometheus
    --mount type=bind,source=C:/tmp/prometheus.yml,destination=/etc/prometheus/prometheus.yml
    --publish published=9090,target=9090,protocol=tcp
    prom/prometheus
```


##### Download OpenTelemetry collector
  
<!-- info-box-start:info -->
If you already have OpenTelemetry, proceed to the next step.
{:.info-box.note}
<!-- info-box-end -->

Create a dedicated directory on your host and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.59.0) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml`.

##### Configure the receiver
  
Open the configuration file and add the Prometheus receiver as follows.

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'consul-metrics'
          scrape_interval: 15s
          static_configs:
            - targets: ['192.168.65.1:9323']
```



##### Configure the exporters

In the same configuration file, add the following to the `exporters` section:
  
```yaml  
exporters:
  prometheusremotewrite:
    endpoint: https://<<LISTENER-HOST>>:8053
    headers:
      Authorization: Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>
```
  
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Configure the service pipeline
  
In the `service` section of the configuration file, add the following configuration
  
```yaml
service:
  pipelines:
    metrics:
      receivers: [<<YOUR-RECEIVER>>]
      exporters: [prometheusremotewrite]
```
* Replace `<<YOUR_RECEIVER>>` with the name of your receiver.



##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```

* Replace `<path/to>` with the path to the directory where you downloaded the collector. If the name of your configuration file is different to `config`, adjust name in the command accordingly.

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).

</div>
</div>
<!-- tab:end -->