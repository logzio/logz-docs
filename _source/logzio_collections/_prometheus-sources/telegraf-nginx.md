---
title: Ship Nginx metrics via Telegraf
logo:
  logofile: nginx.png
  orientation: vertical
data-source: Nginx
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


## Overview

Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. Deploy this integration to ship Nginx metrics, including Plus API, Plus, Stream STS, VTS. Deploy this integration to ship Nginx metrics, including Plus API, Plus, Stream STS, VTS.

Telegraf is a plug-in driven server agent for collecting and sending metrics and events from databases, systems and IoT sensors.

To send your Prometheus-format Nginx metrics to Logz.io, you need to add the **inputs.nginx** and **outputs.http** plug-ins to your Telegraf configuration file.

#### Configuring Telegraf to send your metrics data to Logz.io

<div class="tasklist">

##### Configure Nginx server

1. Enable `stub_status` module in the NGINX configuration file - nginx.conf, located at `/etc/nginx/nginx.conf`:

   ```
   server {
   
           listen       80;
   
           server_name  localhost;

     
           location / {
   
           stub_status;
   
           allow `<<YOUR-LOCALHOST-ADDRESS>>`;
   
           deny all;
   
           }

   }
   ```

2. Replace `<<YOUR-LOCALHOST-ADDRESS>>` with your localhost address.
3. Restart Nginx. 

##### Set up Telegraf v1.17 or higher

{% include metric-shipping/telegraf-setup.md %}
 
##### Add the inputs.nginx plug-in

First you need to configure the input plug-in to enable Telegraf to scrape the Nginx data from your hosts. To do this, add the following code to the configuration file:


``` ini
[[inputs.nginx]]
  ## An array of Nginx stub_status URI to gather stats.
  urls = ["http://localhost/server_status"]

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false

  ## HTTP response timeout (default: 5s)
  response_timeout = "5s"
  
[[inputs.nginx_plus_api]]
  ## An array of Nginx API URIs to gather stats.
  urls = ["http://localhost/api"]
  # Nginx API version, default: 3
  # api_version = 3
  
[[inputs.nginx_plus]]
  ## An array of Nginx status URIs to gather stats.
  urls = ["http://localhost/status"]
  
[[inputs.nginx_sts]]
  ## An array of ngx_http_status_module or status URI to gather stats.
  urls = ["http://localhost/status"]

  ## HTTP response timeout (default: 5s)
  response_timeout = "5s"

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
  
[[inputs.nginx_vts]]
  ## An array of Nginx stub_status URI to gather stats.
  urls = ["http://localhost/server_status"]

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false

  ## HTTP response timeout (default: 5s)
  response_timeout = "5s"
  
```



##### Add the outputs.http plug-in

{% include metric-shipping/telegraf-outputs.md %}
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Check Logz.io for your metrics
  
{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboards to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["3HKho6pQhCmEYmwMc4xCeY"] -->

{% include metric-shipping/generic-dashboard.html %} 

</div>
