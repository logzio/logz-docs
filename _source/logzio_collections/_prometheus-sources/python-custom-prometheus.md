---
title: Send custom metrics from your Python application
logo:
  logofile: python.svg
  orientation: vertical
data-source: Python custom metrics
data-for-product-source: Metrics
flags:
  logzio-plan:  
  beta: true
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
shipping-tags:  
  - prometheus
  - custom-metrics
order: 530
---

This page contains instructions on how to send custom metrics to Logz.io from your Python application. This example uses the [OpenTelemetry Python SDK](https://github.com/open-telemetry/opentelemetry-python-contrib) and the [OpenTelemetry remote write exporter](https://pypi.org/project/opentelemetry-exporter-prometheus-remote-write/), which are both in alpha/preview.

#### Quick start

<div class="tasklist">

##### Install the snappy c-library

DEB: `sudo apt-get install libsnappy-dev`

RPM: `sudo yum install libsnappy-devel`

OSX/Brew: `brew install snappy`

Windows: `pip install python_snappy-0.5-cp36-cp36m-win_amd64.whl`

##### Install the exporter and opentelemtry sdk
```
pip install opentelemetry-exporter-prometheus-remote-write
```

##### Add instruments to your application

Replace the placeholders in the `exporter` section code (indicated by the double angle brackets `<< >>`) to match your specifics.


|Environment variable|Description|
|---|---|
|endpoint|  The Logz.io Listener URL for for your region, configured to use port **8052** for http traffic, or port **8053** for https traffic. {% include /log-shipping/listener-var.html %} and add http/https protocol (https://listener.logz.io:8053) |
|Bearer| Your Logz.io Prometheus Metrics account token.  {% include /p8s-shipping/replace-prometheus-token.html %}  |



```python
from opentelemetry import metrics
from opentelemetry.exporter.prometheus_remote_write import (
    PrometheusRemoteWriteMetricsExporter,
)
from opentelemetry.sdk.metrics import MeterProvider

# configure the Logz.io listener endpoint and Prometheus metrics account token
exporter = PrometheusRemoteWriteMetricsExporter(
    endpoint="<<LISTENER-HOST>>:8053",
    headers={
        "Authorization": "Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>",
    }
)
# set push interval in seconds
push_interval = 15

# setup metrics export pipeline
metrics.set_meter_provider(MeterProvider())
meter = metrics.get_meter(__name__)
metrics.get_meter_provider().start_pipeline(meter, exporter, push_interval)

# create a counter instrument and provide the first data point
counter = meter.create_counter(
    name="MyCounter",
    description="Description of MyCounter",
    unit="1",
    value_type=int
)
# add labels
labels = {
    "dimension": "value"
}
counter.add(25, labels)
```


## Types of metric instruments


Refer to the OpenTelemetry [documentation](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md) for more details. 


| Name | Behavior | Default aggregation |
| ---- | ---------- | ------------------- |
| Counter           | Metric value can only go up or be reset to 0, calculated per `counter.add(value,labels)` request. | Sum |
| UpDownCounter     | Metric value can arbitrarily increment or decrement, calculated per `updowncounter.add(value,labels)` request. | Sum |
| ValueRecorder     | Metric values captured by the `valuerecorder.record(value)` function, calculated per request. | TBD  |
| SumObserver       | Metric value can only go up or be reset to 0, calculated per push interval.| Sum |
| UpDownSumObserver | Metric value can arbitrarily increment or decrement, calculated per push interval.| Sum |
| ValueObserver     | Metric values captured by the `valuerecorder.observe(value)` function, calculated per push interval.| LastValue  |

### [Counter](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#counter)
```python
# create a counter instrument
counter = meter.create_counter(
    name="MyCounter",
    description="Description of MyCounter",
    unit="1",
    value_type=int
)
# add labels
labels = {
    "dimension": "value"
}
# provide the first data point
counter.add(25, labels)
```

### [UpDownCounter](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#updowncounter)
```python
# create a updowncounter instrument
requests_active = meter.create_updowncounter(
    name="requests_active",
    description="number of active requests",
    unit="1",
    value_type=int,
)
# add labels
labels = {
    "dimension": "value"
}
# provide the first data point
requests_active.add(-2, labels)
```

### [ValueRecorder](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#valuerecorder)
```python
# create a valuerecorder instrument
requests_size = meter.create_valuerecorder(
    name="requests_size",
    description="size of requests",
    unit="1",
    value_type=int,
)
# add labels
labels = {
    "dimension": "value"
}
# provide the first data point
requests_size.record(85, labels)
```

### [SumObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#sumobserver)
```python
import psutil
# Callback to gather RAM usage
def get_ram_usage_callback(observer):
    ram_percent = psutil.virtual_memory().percent
    # add labels
    labels = {
        "dimension": "value"
    }
    observer.observe(ram_percent, labels)
# create a sumobserver instrument
meter.register_sumobserver(
    callback=get_ram_usage_callback,
    name="ram_usage",
    description="ram usage",
    unit="1",
    value_type=float,
)
```

### [UpDownSumObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#updownsumobserver)
```python
# Callback to gather RAM usage
def get_ram_usage_callback(observer):
    ram_percent = psutil.virtual_memory().percent
    # add labels
    labels = {
        "dimension": "value"
    }
    observer.observe(ram_percent, labels)
# create a updownsumobserver instrument
meter.register_updownsumobserver(
    callback=get_ram_usage_callback,
    name="ram_usage",
    description="ram usage",
    unit="1",
    value_type=float,
)
```

### [ValueObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#valueobserver)
```python
import psutil
def get_cpu_usage_callback(observer):
    for (number, percent) in enumerate(psutil.cpu_percent(percpu=True)):
        labels = {"cpu_number": str(number)}
        observer.observe(percent, labels)
# create a valueobserver instrument
meter.register_valueobserver(
    callback=get_cpu_usage_callback,
    name="cpu_percent",
    description="per-cpu usage",
    unit="1",
    value_type=float,
)
```

##### Check Logz.io for your metrics
Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).

</div>