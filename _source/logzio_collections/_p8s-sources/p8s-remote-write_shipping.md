---
title: Configuring remote write for Prometheus 
logo:
  logofile: prometheusio-icon.svg
  orientation: vertical
data-source: Remote write for Prometheus
flags:
  logzio-plan:  
  beta: true
templates: ["docker"]
contributors:
  - yberlinger
shipping-tags:
contributors:
  - yberlinger
shipping-tags:  
  - p8s
---

This feature is in beta. Please [email our support](mailto:help@logz.io?subject=Requesting%20early%20access%20for%20p8s.%20Thanks) or your Logz.io account manager to request early access. 

To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents by the Logz.io listener. 

### Plan ahead

* **Multiple server environments**: If you have multiple Prometheus server instances, you'll have to add Logz.io as an endpoint for each instance. 

* **Reduce tagging**: By default, all the metrics from your Prometheus server(s) are sent to Logz.io. To drop or send specific metrics, add Prometheus labeling _before_ enabling the remote write, or as part of the remote write configuration.  Learn more about Prometheus relabeling tricks [here.](https://medium.com/quiq-blog/prometheus-relabeling-tricks-6ae62c56cbda)


* **Paralleism levels**: Set the parallelism level for sending data in the configuration file. 
    This parameter determines the number of connections to open to the remote write listener.  The default parallelism level is 1000. We recommend configuring much fewer connections. Of course, if you're sending more data you'll need to open more channels. _(currently in development)_
    
    We're currently refining our best practice recommendations for configuring connection channels when sending data.

* **Metrics metadata dashboards**: If you have both Prometheus & Grafana, you can activate a dashboard as part of the remote write configuration that will show you the queue size and how many metrics you're sending. If your queue size increases, it might be necessary to open an additional channel. _(currently in development)_

Learn more about Prometheus remote write tuning [here.](https://prometheus.io/docs/practices/remote_write/) 

Once your metrics are flowing, export your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

#### Configuring Remote Write to Logz.io


<div class="tasklist">

##### Get your Logz.io Infrastructure Monitoring account information
Within Logz.io, look up the Listener host for your region (URL) and the Logz.io Metrics Account token.

+ You'll find the correct Region and Listener URL for your region in the [_Regions and Listener Hosts_]({{site.baseurl}}/user-guide/accounts/account-region.html#available-regions) table. 

+ Look up your Metrics account information in the [Manage Accounts **gear icon > Settings > Manage accounts)**](https://app.logz.io/#/dashboard/settings/manage-accounts) page of your Operations workspace. Click the relevant **Metrics account plan** to display its details, including your [Metrics account token.]({{site.baseurl}}//user-guide/accounts/finding-your-metrics-account-token/)
![Account settings navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8s-account-token00.png)

##### Add a remote_write url to the Prometheus yaml file


```yaml
    global:
      external_labels:
        p8s_logzio_name: <labelvalue>
    remote_write:
      - url: https://<<LISTENER-HOST>>:8053
        bearer_token: <<METRICS-SHIPPING-TOKEN>> 
        remote_timeout: 30s
        queue_config:
          batch_send_deadline: 5s  #default = 5s
          max_shards: 10  #default = 1000
          min_shards: 1
          max_samples_per_send: 500 #default = 100
          capacity: 10000  #default = 500

```

###### Parameters   

Add the following parameters to your Prometheus yaml file:

| Environment variable | Description |
|---|---|
| external_labels | Parameter to tag the metrics from this specific Prometheus server. Do not change the label `p8s_logzio_name`: This variable is required to identify from which Prometheus environment the metrics are arriving to Logz.io  |
| remote_write | The remote write section configuration sets Logz.io as the endpoint for your Prometheus metrics data. Place this section at the same indentation level as the `global` section. |
|url (Required)| Logz.io Listener URL and port for your region, configured to use port **8052** for http traffic or port **8053** for https traffic. For more details, see the [Prometheus configuration file remote write reference](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write). {% include log-shipping/listener-var.html %}  |
| bearer-token (Required) | Your Logz.io Metrics account token. {% include metric-shipping/replace-metrics-token.html %}   |
   

##### Verify the remote_write configuration


+ **Run a query**: If you are scraping Prometheus metrics, you can check that the remote_write configuration is working properly by doing one of the following and verifying that the result is greater than zero (n > 0) for the url:

  * Run a query on your local Prometheus interface for the metric `prometheus_remote_storage_samples_total`.

  * Check for the metric in the `/metrics` endpoint on your Prometheus server. 

+ **Check via Grafana Explore**: To verify that metrics are arriving to Logz,io: 

  1. Click **Explore** (compass icon) in the left menu bar to open Grafana's Explore. 

  1. Examine the **Metrics** drop down below the **Explore** heading in the upper left of the pane. 
  An empty list or the text _no metrics_ indicates that the remote write configuration is not working properly. 
  ![Verify Prometheus metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/p8smetrics_arriving.png)