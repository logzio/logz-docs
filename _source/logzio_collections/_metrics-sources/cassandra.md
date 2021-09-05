---
title: Ship Cassandra metrics
logo:
  logofile: cassandra_logo.svg
  orientation: vertical
data-source: Cassandra
contributors:
  - daniel-tk
  - shalper
shipping-tags:
  - database
---

You can ship Cassandra metrics to Logz.io using Metricbeat.


#### Configuration

**Before you begin, you'll need**:
#### NEW BUTTON
123
<!-- logzio-inject:grafana:dashboards-installation ids=['1m3Sqx6atnxPd7829LV2W5'] -->

* A server or cluster with Cassandra installed
* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher installed

<div class="tasklist">

### Expose metrics

The first step is to expose Cassandra metrics using the [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter).

You will need to download the JMX exporter on each Cassandra node.

##### JMX exporter

Go to the directory where Cassandra is installed on your machine:

```shell
cd {path_to_cassandra_dir}
```

Download the Prometheus JMX exporter:

```
curl -L -O https://search.maven.org/remotecontent?filepath=io/prometheus/jmx/jmx_prometheus_javaagent/0.13.0/jmx_prometheus_javaagent-0.13.0.jar
```

Download the exporter configuration file for Cassandra:

```
curl -L -O https://raw.githubusercontent.com/prometheus/jmx_exporter/master/example_configs/cassandra.yml
```

##### Configure Cassandra to forward metrics via JMX exporter

In order to integrate Cassandra with the JMX exporter, we'll need to add one line to the Cassandra configuration file.

Navigate to the Cassandra configuration directory. (Depending on the installation method, it may be located under `/etc/cassandra` or `/etc/cassandra/conf`.) Open the file `cassandra-env.sh` in edit mode.

Without deleting or changing any of the content of the file, add the following line (after making the necessary changes to match the paths to your details):

```
JVM_OPTS="$JVM_OPTS -javaagent:/lib/jmx_prometheus_javaagent-0.13.0.jar=7070:/lib/cassandra.yml"
```

##### Restart Cassandra

Save your changes and restart Cassandra.

```
systemctl restart cassandra
```

##### Verify the JMX exporter metrics endpoint

At this point, the metrics for your Cassandra server should be locally exposed in Prometheus format.
It's recommended that you test your JMX exporter metrics endpoint:

```
curl http://<<Cassandra_host>>:7070
```



### Metricbeat setup

Now that metrics are exposed, set up Metricbeat monitoring to send the data to Logz.io.

{% include log-shipping/certificate.md %}

##### Add Logz.io to your Metricbeat configuration

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following Logz.io settings:

```
# ===== General =====
fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
```

{% include metric-shipping/replace-metrics-token.html %}

##### Set Logz.io as the output

Still in the same configuration file, check if Logz.io is already an output. If not, add it now.

```
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']

```

{% include log-shipping/listener-var.html %} 

One last validation - make sure Logz.io is the only output and appears only once. If the file has other outputs, remove them.

##### Add the Cassandra configuration

Still in the same configuration file, copy and paste the code block below:

```yaml
metricbeat.modules:

# Prometheus JMX metrics
- module: prometheus
  period: 10s
  metricsets: ["collector"]
  hosts: ["<<CASSANDRA-HOST>>:7070"]
  metrics_path: /

processors:
  - add_host_metadata: ~
  - add_fields:
      target: fields
      fields:
        module: cassandra
        cassandra.cluster:<<CLUSTER-TAG>>

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

For a full list of available Metricbeat configuration options for the Prometheus module, including explanations about TLS connections, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-prometheus.html).

{% include /general-shipping/replace-placeholders-metrics.html %}

* Edit the `hosts` field for prometheus JMX metrics. Specify a comma-separated list of your Cassandra server adresses, (for example: `hosts: ["cassandra1:7070","cassandra2:7070"]`).
* Replace `<<CLUSTER-TAG>>` with a custom string value to help you identify your Cassandra cluster. This can be helpful if you're running a multi-cluster Cassandra environment.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="Cassandra" %}