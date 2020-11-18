---
layout: article
title: Configuring remote write for Prometheus
permalink: /user-guide/infrastructure-monitoring/p8s-remote-write.html
flags:
  logzio-plan: community
  Beta: yes
tags:
  - metrics integrations
contributors:
  - yberlinger
---

To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents by the Logz.io listener. 

If you have multiple Prometheus server instances, you'll have to add Logz.io as an endpoint for each instance. 

By default, all metrics in your Prometheus server(s) will be sent to Logz.io. To drop or send specific metrics, add Prometheus labeling before enabling the remote write, or as part of the remote write configuration. You can read more about Prometheus relabeling tricks <a href ="https://medium.com/quiq-blog/prometheus-relabeling-tricks-6ae62c56cbda" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

* TBD: Set parallelism level for sending data - how many connections to open to the remote write listener. While the default is 1000, but we recommend configuring much fewer connections. 

* TBD: This is set in the configuration file. Parameter for # of connections (more data --o--> more channels)
  Sending data - best practice in configuring connection channels: 

* TBD: If you have both Prometheus & Grafana, you can activate a dashboard as part of the remote write configuration that will show you the queue size and how many metrics you're sending. If your queue size increases, it might be necessary to open an additional channel. 

You can read more about Prometheus Remote Write Tuning <a href ="https://prometheus.io/docs/practices/remote_write/" target="_blank">here. <i class="fas fa-external-link-alt"></i> </a> 

Once your metrics are flowing, export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

### Configuring Remote Write to Logz.io

Within Prometheus:

1. Define Logz.io as a new endpoint, using remote write.


```bash
remote_write:
  - url: http://54.80.84.252:8050/
    bearer_token: tlcFvDpHdATDZtvwvMFilCacyvLFriZQ
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
|bearer_token| Logz.io metrics account token

2. Provide the Logz.io metrics account token and listener address (URL).

  - To find the default token in the <a href ="https://app.logz.io/#/dashboard/settings/general" target="_blank">General Settings</a> page, click **<i class="li li-gear"></i> > Settings > General** in the top menu.

![General settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/general-settings1.png)

<!-- <video autoplay loop>
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/p8sgo-to-acct_settings2.mp4" type="video/mp4"/>
</video>  -->

  - To find the correct listener URL for your region, look in the <a href ="/user-guide/log-shipping/listener-ip-addresses.html" target="_blank">_Listener IP Addresses_</a> topic. 

