---
title: Ship Redis metrics via Telegraf
logo:
  logofile: redis-telegraf.png
  orientation: vertical
data-source: Redis metrics over Telegraf
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---
{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1sS7i6SyMz35RIay8NRYGp"] --> 

{% include metric-shipping/generic-dashboard.html %} 