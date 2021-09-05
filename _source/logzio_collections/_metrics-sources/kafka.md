---
title: Ship Kafka metrics
logo:
  logofile: kafka.svg
  orientation: vertical
data-source: Kafka
contributors:
  - yotamloe
shipping-tags:
 - platform-service
---

You can ship Kafka metrics to logz.io using Metricbeat.

#### Configuration

**Before you begin, you'll need**:

* A server or cluster with Kafka installed
* A host installed with [Docker](https://www.docker.com/get-started) and [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=['1m3Sqx6atnxPd7829LV2W5'] -->

### Expose metrics

The first step is to expose Kafka metrics using the [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter) and [Kafka exporter](https://hub.docker.com/r/danielqsj/kafka-exporter).

<div class="tasklist">

##### JMX exporter

In your Kafka server, go to the directory where Kafka is installed on your machine:

```shell
cd {path_to_Kafka_dir}
```

Download the Prometheus JMX exporter:

```shell
curl -L -O https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.6/jmx_prometheus_javaagent-0.6.jar
```

Download the exporter configuration file:

```shell
curl -L -O https://raw.githubusercontent.com/prometheus/jmx_exporter/master/example_configs/Kafka-2_0_0.yml
```

Restart your Kafka server with this `KAFKA_OPTS` variable assignment:

```shell
KAFKA_OPTS="$KAFKA_OPTS -javaagent:{path_to_Kafka_dir}/jmx_prometheus_javaagent-0.6.jar=7071:{path_to_Kafka_dir}/Kafka-metrics.yaml.yml" \
```

At this point, the metrics for your Kafka server should be locally exposed in Prometheus format.
It's recommended that you test your JMX exporter metrics endpoint:

```shell
curl https://{Kafka_server_address}:7071/metrics
```


##### Kafka exporter

On your host, run the [danielqsj/Kafka-exporter](https://hub.docker.com/r/danielqsj/Kafka-exporter) docker image. Specify the address of your Kafka server. To specify multiple servers, you can add multiple `kafka.server` arguments.

```shell
docker run -ti --rm -p 9308:9308 danielqsj/kafka-exporter --kafka.server=kafka:9092 [--kafka.server=another-server]
```


At this point, the metrics for your Kafka server should be locally exposed.
It's recommended that you test your Kafka exporter metrics endpoint:

```shell
curl https://localhost:9308/metrics
```

### Metricbeat monitoring setup

{% include metric-shipping/certificate.md %}

##### Add Logz.io to your Metricbeat configuration

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following Logz.io settings:

```shell
# ===== General =====
fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
```

{% include metric-shipping/replace-metrics-token.html %}


##### Set Logz.io as the output

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.


```shell
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include log-shipping/listener-var.html %} 

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Add the Kafka configuration

Still in the same configuration file, copy and paste the code block below:

```yaml
metricbeat.modules:

# Prometheus JMX metrics
- module: prometheus
  period: 10s
  metricsets: ["collector"]
  hosts: ["<<Kafka_server_address>>:7071"]
  metrics_path: /metrics

# Kafka exporter metrics
- module: prometheus
  period: 10s
  metricsets: ["collector"]
  hosts: ["localhost:9308"]
  metrics_path: /metrics

processors:
  - add_host_metadata: ~
  - add_fields:
      target: fields
      fields:
        module: Kafka
        Kafka.cluster: <<cluster_tag>>

fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

For a full list of available Metricbeat configuration options for the Prometheus module, including explanations about TLS connections, see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-prometheus.html).


{% include /general-shipping/replace-placeholders-metrics.html %}

* Edit the `hosts` field for prometheus JMX metrics. Specify a comma separated list of addresses for your Kafka servers. (For example: `hosts: ["Kafka1:7071","Kafka2:7071"]` )

* Replace `<<cluster_tag>>` with a custom string value to help you identify your Kafka cluster. This can be helpful if you are running a multi-cluster Kafka environment.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="Kafka overview" %}

</div>
