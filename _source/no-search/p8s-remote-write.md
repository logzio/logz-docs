---
layout: article
title: Configuring remote write for Prometheus 
permalink: /user-guide/infrastructure-monitoring/p8s-remote-write.html
flags:
  logzio-plan:  
  beta: true
tags:
  - metrics integrations
contributors:
  - yberlinger
---
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
| external_labels | Parameter to tag the metrics from this specific Prometheus server. Do not change the label `p8s_logzio_name`: This variable is required to identify from which Prometheus environment the metrics are arriving to Logz.io  |
| remote_write | The remote write section configuration sets Logz.io as the endpoint for your Prometheus metrics data. Place this section at the same indentation level as the `global` section. |
|url| Logz.io Listener url for for your region, configured to use port **8052** for http traffic and port **8053** for https traffic. For more details, see the [Prometheus configuration file remote write reference](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write)|
|bearer_token| Logz.io Metrics account token|


```yaml
    global:
      external_labels:
        [ p8s_logzio_name: <labelvalue> ... ]
    remote_write:
      - url: https://<the Logz.io Listener URL for your region>:8053
        bearer_token: <your Logz.io Metrics account token> 
        remote_timeout: 30s
        queue_config:
          batch_send_deadline: 5s  #default = 5s
          max_shards: 10  #default = 1000
          min_shards: 1
          max_samples_per_send: 500 #default = 100
          capacity: 10000  #default = 500

```

   
##### Verify the remote_write configuration
To check that the remote_write configuration is working properly, run a query on your local Prometheus for the metric `prometheus_remote_storage_succeeded_sample_total` and verify that the result is greater than zero (n > 0) for the url. 

