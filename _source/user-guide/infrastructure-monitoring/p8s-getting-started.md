---
layout: article
title: Getting started with Prometheus
permalink: /user-guide/infrastructure-monitoring/p8s-getting-started.html
flags:
  logzio-plan: community
  Beta: yes
tags:
  - metrics integrations
contributors:
  - yberlinger
---
Manage your metrics with Logz.io Infrastructure Monitoring, powered by Prometheus and Grafana.  

With our open-source platform, you get enterprise-level user management with role-based access control (RBAC) for Prometheus as a managed service, and, you have the option to correlate your metrics with logs and traces, using Logz.io Log Management and Distributed Tracing capabilities. 

If you're already using Prometheus to pull metrics from your services, you can leverage your current implementation to forward metrics to Logz.io for super fast time-to-value: We store your metrics in our managed service, which cuts most of the metrics retention burden. 

And if you have multiple Prometheus instances, we take on the maintenance tasks to ensure there's enough storage space, as well as upgrading, securing, and in some cases, sharding Prometheus.

You can continue using Prometheus Alert Manager: You'll simply store the metrics on your own servers for a day, so your Alert Managers can access the data.

All it takes to ship your metrics data to Logz.io is to add Remote Write to each Prometheus server. You'll use Remoteconnect to Logz.io as the endpoint - about three lines of code. Remote Write is used to aggregate data from multiple Prometheus servers. In addition to writing metrics to your local Prometheus instance, Remote Write ensures that your metrics are also written to Logz.io. 


<!-- 
1. Highlight the value: 
Hosted, managed & enterprise grade - Secured, user management etc..
Full system view
Long retention (Will be coming later)
Integrated to the logs management and tracing. 

2. Highlight the simplicity in shipping the metrics as well what it means on their environment:  - They will be able to reduce their retention.
implication from resource standpoint : It will require more CPU and memory
 -->



To send your Prometheus application metrics to a Logz.io Infrastructure Monitoring account, use remote write to connect to Logz.io as the endpoint. Your data is formatted as JSON documents by the Logz.io listener. 

For the beta program, your incoming raw data has a 30-day retention period. 

Once your metrics are flowing, import your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

For the record, notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io. For more information, see [Configuring ]()

### Steps to get started
1. locate your token, listener, and region 
2. Remote write procedure.
3. Import dashboards.
4. Configure notification endpoints.
5. Recreate your dashboard annotations.
>