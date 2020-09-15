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

#### Metricbeat setup

**Before you begin, you'll need**:

* A server or cluster with Cassandra installed
* [Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher installed

<div class="tasklist">

### Expose metrics

The first step is to expose Kafka metrics using the [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter).


##### JMX exporter

In your Cassandra server, go to the directory where Cassandra is installed on your machine:

```shell
cd {path_to_Kafka_dir}
```

Download the Prometheus JMX exporter:

```
curl -L -O https://search.maven.org/remotecontent?filepath=io/prometheus/jmx/jmx_prometheus_javaagent/0.13.0/jmx_prometheus_javaagent-0.13.0.jar
```

Download the exporter configuration file for Cassandra:

```
curl -L -O https://raw.githubusercontent.com/prometheus/jmx_exporter/master/example_configs/cassandra.yml
```

#### These steps should be performed on all Cassandra nodes

##### Configure Cassandra

In order to integrate Cassandra with the JMX exporter, we'll need to add one line to Cassandra's configuration file:

1. Navigate to Cassandra's configuration directory (in my case, it is located in /etc/cassandra. Might also be found in /etc/cassandra/conf). Open the file 'cassandra-env.sh' in edit mode .

2. Without deleting or changing any of the content of the file, simply add the following line (note that the paths here should match to the Cassandra paths you used):

```
JVM_OPTS="$JVM_OPTS -javaagent:/lib/jmx_prometheus_javaagent-0.13.0.jar=7070:/lib/cassandra.yml"
```

3. Save your changes and restart Cassandra

```
systemctl restart cassandra
```

##### Test JMX exporter metrics endpoint **(Optional)**

At this point, the metrics for your Cassandra server should be locally exposed in Prometheus format.
It's recommended that you test your JMX exporter metrics endpoint:

```
curl http://<<Cassandra_host>>:7070
```
### Metricbeat monitoring setup

### Download the [Logz.io](http://logz.io/) public certificate**

For HTTPS shipping, download the [Logz.io](http://logz.io/) public certificate to your certificate authority folder.

```
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/AAACertificateServices.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add Logz.io to your Metricbeat configuration

Open the Metricbeat configuration file (`<<PATH_TO_METRICBEAT>>/metricbeat.yml`) with your preferred text editor.

Copy and paste the code block below, overwriting the previous contents, to replace the general configuration with the following [Logz.io](http://logz.io/) settings:

```
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true

```

{% include metric-shipping/replace-metrics-token.html %}

### **Set Logz.io as the output

Still in the same configuration file, check if [Logz.io](http://logz.io/) is already an output. If not, add it now.

```
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']

```

{% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure [Logz.io](http://logz.io/) is the only output and appears only once. If the file has other outputs, remove them.

##### Add Cassandra configuration

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
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']

```

For a full list of available Metricbeat configuration options for the Prometheus module, including explanations about TLS connections, please see [Metricbeat's documentation](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-prometheus.html).

##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include metric-shipping/replace-metrics-token.html %}
* {% include log-shipping/replace-vars.html listener=true %}
* Edit the `hosts` field for prometheus JMX metrics, specify comma separated list of your Cassandra servers adresses (exapmle: `hosts: ["cassandra1:7070","cassandra2:7070"]` )
* Replace `<<CLUSTER-TAG>>` with a custom string value to help you identify your Cassandra cluster. This can be helpful if you're running a multi-cluster Cassandra environment.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="Cassandra" %}