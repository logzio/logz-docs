---
layout: article
title: Kubernetes deployment reference
permalink: /user-guide/distributed-tracing/k8s-deployment
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship traces from your Kubernetes cluster using OpenTelemetry
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger   
  - yyyogev
  - hidan
---

If you're working with Kubernetes, you can ship your traces to Logz.io using a Helm chart, via the OpenTelemetry collector.

The following guide will walk you through how to get your Tracing account token and how to configure and send your Helm chart to Logz.io.

The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).

#### _Send traces from Kubernetes_

{:.no_toc}  

<div class="tasklist">

##### Determine which Tracing account you want to use and get your Tracing account token
Look up your Distributed Tracing `ACCOUNT TOKEN`. <br>
{% include tracing-shipping/tracing-token.md %}

##### Get your region code
{% include tracing-shipping/region-code.md %}

##### Ship your traces to Logz.io

Logz.io uses a Helm chart to send traces from your Kubernetes cluster via the OpenTelemetry collector. 

Select **[Send your data](https://app.logz.io/#/dashboard/integrations/collectors) [> Kubernetes](https://app.logz.io/#/dashboard/integrations/Kubernetes)** and follow the steps to deploy the chart and trace your data.

##### Check the Distributed Tracing tab for your traces.

Give your traces some time to get from your system to ours, then check the Distributed Tracing tab in Logz.io to see the traces in the Jaeger UI.

</div>
