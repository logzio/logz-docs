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

### Planning ahead

If you have multiple Prometheus server instances, you'll have to add Logz.io as an endpoint for each instance. 

By default, all metrics in your Prometheus server(s) will be sent to Logz.io. To drop or send specific metrics, add Prometheus labeling before enabling the remote write, or as part of the remote write configuration. You can read more about Prometheus relabeling tricks <a href ="https://medium.com/quiq-blog/prometheus-relabeling-tricks-6ae62c56cbda" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

* _in dev_: Set parallelism level for sending data - how many connections to open to the remote write listener. While the default is 1000, but we recommend configuring much fewer connections. 

* _in dev_: This is set in the configuration file. Parameter for # of connections (if you're sending more data you'll need to open more channels)
  We're in the process of refining best practices for configuring connection channels when sending data

* _in dev_: If you have both Prometheus & Grafana, you can activate a dashboard as part of the remote write configuration that will show you the queue size and how many metrics you're sending. If your queue size increases, it might be necessary to open an additional channel. 

You can read more about Prometheus Remote Write Tuning <a href ="https://prometheus.io/docs/practices/remote_write/" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

Once your metrics are flowing, export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

### Configuring Remote Write to Logz.io

1. Within Logz.io, look up the Logz.io Metrics Account token and Listener address for your region (URL).
    1. You’ll find your Metrics account information in the <a href ="https://app.logz.io/#/dashboard/settings/manage-accounts" target="_blank">Manage Accounts **(<i class="li li-gear"></i> > Settings > Manage accounts)**</a> page of your Operations workspace, when you click the relevant **Metrics account plan**, to display its details.

    1. Look up the correct Listener URL for your region in the <a href ="{{site.baseurl}}/user-guide/accounts/account-region.html#available-regions" target="_blank">_Regions and Listener Hosts_</a> table. 

    Here's how to find your Metrics account token information: 
      ![Account settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8s-account-token00.png)

  
2. Within Prometheus, add a new remote_write URL for Logz.io to your Prometheus yaml file at the same indentation level as the `global` section.  For more details, see the  <a href ="https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write" target="_blank">Prometheus configuration file remote write reference.  <i class="fas fa-external-link-alt"></i>   </a>

    ```yaml

    global
    
    remote_write:
      - url: <the Logz.io Listener URL for your region>
        bearer_token: <your Logz.io Metrics account token> 
        remote_timeout: 30s
        queue_config:
          batch_send_deadline: 5s  #default = 5s
          max_shards: 10  #default = 1000
          min_shards: 1
          max_samples_per_send: 500 #default = 100
          capacity: 10000  #default = 500
    ```

    |Parameter | Description
    |url| Logz.io Listener address for your region
    |bearer_token| Logz.io Metrics account token
   
3. To check that the remote_write configuration is working properly, run a query for `metric prometheus_remote_storage_succeeded_sample_total` and verify that the result is greater than zero (n > 0) for the url. 

