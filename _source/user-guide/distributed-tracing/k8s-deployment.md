---
layout: article
title: Kubernetes deployment reference
permalink: /user-guide/distributed-tracing/k8s-deployment
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger   
  - yyyogev
  - hidan
---

You can ship your traces to Logz.io by using a Helm chart, via the OpenTelemetry collector. 

Helm charts are Kubernetes YAML manifests, used to manage packages of pre-configured Kubernetes resources that use charts.

#### _Send traces from Kubernetes_

{:.no_toc}  

<div class="tasklist">

##### Determine which tracing account you want to use and get your tracing account token
Look up your Distributed Tracing `ACCOUNT TOKEN`. <br>
{% include tracing-shipping/tracing-token.md %}

##### Get your region code
{% include tracing-shipping/region-code.md %}

##### Ship your traces to Logz.io

From your account, select **[Send your traces >](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=tracing-sources) [Kubernetes](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/otel-traces-helm)**, and follow the steps to ship your traces.

##### Check the Distributed Tracing tab for your traces.

Give your traces some time to get from your system to ours, then check the Distributed Tracing tab in Logz.io to see the traces in the Jaeger UI.

</div>