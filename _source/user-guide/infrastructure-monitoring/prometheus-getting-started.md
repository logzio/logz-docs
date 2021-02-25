---
layout: article
title: Getting started with Prometheus 
permalink: /user-guide/infrastructure-monitoring/prometheus-getting-started.html
flags:
  logzio-plan: 
  beta: true
tags:
  - metrics integrations
contributors:
  - yberlinger
---

{% include page-info/early-access.md type="beta" %} 

## Why go it alone? 
Manage your metrics with Logz.io Infrastructure Monitoring, powered by Prometheus and Grafana.  

With our open-source platform, you get enterprise-level user management with role-based access control (RBAC) for Prometheus as a managed service, and you have the option to correlate your metrics with logs and traces, using Logz.io Log Management and Distributed Tracing capabilities. 

## Bring it on home
If you're already using Prometheus to pull metrics from your services, you can leverage your current implementation to forward metrics to Logz.io for fast time-to-value: We store your metrics in our managed service, which cuts most of your metrics retention burden. And if you have multiple Prometheus instances, we take on the maintenance tasks to ensure there's enough storage space, as well as upgrading, securing, and in some cases, sharding Prometheus.

You can continue using Prometheus Alert Manager: You'll simply store the metrics on your own servers based on your alerts needs, so your Alert Managers can access the data.

## One small step
All it takes to ship your metrics data to Logz.io is to use Remote Write on each Prometheus server, with Logz.io configured as the endpoint: By adding a few lines of code, Remote Write ensures that your metrics are written to Logz.io. 

Your data is formatted as JSON documents by the Logz.io listener. 
For the beta program, your incoming raw data has a 30-day retention period. 

Once your metrics are flowing, import your existing Prometheus and Grafana dashboards to Logz.io Infrastructure Monitoring as JSON files.  

For the record, notification endpoints and dashboard annotations are not imported: You'll need to recreate them in Logz.io.  See [Notification endpoints](/user-guide/integrations/endpoints.html) and [Annotations](/user-guide/infrastructure-monitoring/annotations/) for more information.

 

### Steps to get started
1. <a href ="/user-guide/infrastructure-monitoring/prometheus-remote-write#configuring-remote-write-to-logzio)"  target="_blank">Configure Remote Write. 
1. [Import dashboards.](/user-guide/infrastructure-monitoring/prometheus-importing-dashbds)
1. [Configure notification endpoints.](/user-guide/integrations/endpoints.html)
1. [Recreate your dashboard annotations.](/user-guide/infrastructure-monitoring/annotations/)
1. [Explore your Prometheus metrics in Grafana](/user-guide/infrastructure-monitoring/grafana-explore-prometheus/)

<!-- 
1. Highlight the value: 
Hosted, managed & enterprise grade - Secured, user management etc..
Full system view
Long retention (Will be coming later)
Integrated to the logs management and tracing. 

2. Highlight the simplicity in shipping the metrics as well what it means on their environment:  - They will be able to reduce their retention.
implication from resource standpoint : It will require more CPU and memory
 -->
