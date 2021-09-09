---
title: Ship ZFS metrics via Telegraf
logo:
  logofile: zfs-telegraf.png
  orientation: vertical
data-source: ZFS metrics over Telegraf
templates: ["docker"]
contributors:
  - daniel-tk
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


---
title: Send custom metrics from your Java code via Micrometer
logo:
  logofile: micrometer-java.png
  orientation: vertical
open-source:
  - title: Java custom metrics
    github-repo: micrometer-registry-logzio
    maven: test
data-source: Java custom metrics via Micrometer
flags:
  logzio-plan:  
  beta: false
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
  - nshishkin
shipping-tags:  
  - prometheus
  - custom-metrics
order: 720
---

{% include metric-shipping/java-custom.md %}  
