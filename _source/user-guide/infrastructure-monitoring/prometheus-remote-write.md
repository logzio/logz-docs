---
layout: article
title: Configuring remote write for Prometheus 
permalink: /user-guide/infrastructure-monitoring/prometheus-remote-write.html
flags:
  logzio-plan:  
  beta: true
tags:
  - metrics integrations
contributors:
  - yberlinger
  - yotamloe
---

{% include page-info/early-access.md type="beta" %}

To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents by the Logz.io listener. 

### Plan ahead

* **Multiple server environments**: If you have multiple Prometheus server instances, you'll have to add Logz.io as an endpoint for each instance. 

* **Reduce tagging**: By default, all the metrics from your Prometheus server(s) are sent to Logz.io. To drop or send specific metrics, add Prometheus labeling _before_ enabling the remote write, or as part of the remote write configuration.  Learn more about Prometheus <a href ="https://medium.com/quiq-blog/prometheus-relabeling-tricks-6ae62c56cbda" target="_blank">relabeling tricks here <i class="fas fa-external-link-alt"></i>. </a>

* **Paralleism levels**: Set the parallelism level for sending data in the configuration file. 
    This parameter determines the number of connections to open to the remote write listener.  The default parallelism level is 1000. We recommend configuring much fewer connections. Of course, if you're sending more data you'll need to open more channels. _(currently in development)_
    
    We're currently refining our best practice recommendations for configuring connection channels when sending data.

* **Metrics metadata dashboards**: If you have both Prometheus & Grafana, you can activate a dashboard as part of the remote write configuration that will show you the queue size and how many metrics you're sending. If your queue size increases, it might be necessary to open an additional channel. _(currently in development)_

Learn more about Prometheus  <a href ="https://prometheus.io/docs/practices/remote_write/" target="_blank">remote write tuning here <i class="fas fa-external-link-alt"></i>. </a> 

Once your metrics are flowing, export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

#### Configuring Remote Write to Logz.io

{:.no_toc}  

<div class="tasklist">

##### Get your Logz.io Infrastructure Monitoring account information
Within Logz.io, look up the Listener host for your region (URL) and the Logz.io Metrics Account token.

+ You'll find the correct Region and Listener URL for your region in the <a href ="{{site.baseurl}}/user-guide/accounts/account-region.html#available-regions" target="_blank">_Regions and Listener Hosts_</a> table. 

+ Look up your Metrics account information in the <a href ="https://app.logz.io/#/dashboard/settings/manage-accounts" target="_blank">Manage Accounts **(<i class="li li-gear"></i> > Settings > Manage accounts)**</a> page of your Operations workspace. Click the relevant **Metrics account plan** to display its details, including your <a href ="/user-guide/accounts/finding-your-metrics-account-token/" target="_blank">Metrics account token. </a> 
![Account settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8s-account-token00.png)

##### Add a remote_write url
Add the following parameters to your Prometheus yaml file:

| Environment variable | Description |
|---|---|
{% include p8s-shipping/p8s_logzio_name.md %}
| remote_write | The remote write section configuration sets Logz.io as the endpoint for your Prometheus metrics data. Place this section at the same indentation level as the `global` section. |
|url| Logz.io Listener url for for your region, configured to use port **8052** for http traffic or port **8053** for https traffic. For more details, see the [Prometheus configuration file remote write reference](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write)|
|bearer_token| Logz.io Metrics account token|


```yaml
    global:
      external_labels:
        p8s_logzio_name: <labelvalue>
    remote_write:
      - url: https://<the Logz.io Listener URL for your region>:8053
        bearer_token: <your Logz.io Metrics account token> 
        remote_timeout: 30s
        queue_config:
          batch_send_deadline: 5s  #default = 5s
          max_shards: 10  #default = 1000
          max_samples_per_send: 500 #default = 100
          capacity: 10000  #default = 500
```
For [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart users:

Edit your chart `values.yaml` file in the following sections:

1. remote write:
```yaml
remoteWrite:
    - url: https://<<LISTENER-HOST>>:8053  The Logz.io Listener URL for your region, configured with port 8053
      bearerToken:<<PROMETHEUS-METRICS-SHIPPING-TOKEN>> Your Logz.io Prometheus metrics account token
      remoteTimeout: 30s
      queueConfig:
        batchSendDeadline: 5s  #default = 5s
        maxShards: 10  #default = 1000
        maxSamplesPerSend: 500 #default = 100
        capacity: 10000  #default = 500
```

2. externalLabels:

```yaml
externalLabels:
    - p8s_logzio_name: <labelvalue>
```
   
##### Verify the remote_write configuration


+ **Run a query**: If you are scraping Prometheus metrics, you can check that the remote_write configuration is working properly by doing one of the following and verifying that the result is greater than zero (n > 0) for the url:

  * Run a query on your local Prometheus interface for the metric `prometheus_remote_storage_samples_total`.

  * Check for the metric in the `/metrics` endpoint on your Prometheus server. 

+ **Check via Grafana Explore**: To verify that metrics are arriving to Logz,io: 
  1. Open **Explore <i class="far fa-compass"></i>** in the left menu bar. 

  1. Examine the **Metrics** dropdown list below the **Explore** heading in the upper left of the pane. <br>
    An empty list or the text _no metrics_ indicates that the remote write configuration is not working properly. 
    ![Verify Prometheus metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8smetrics_arriving.png)
