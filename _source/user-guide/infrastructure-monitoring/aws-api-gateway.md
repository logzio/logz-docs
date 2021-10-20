---
layout: article
title: AWS Cloudwatch - API Gateway
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/aws-api-gateway.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze system metrics from AWS Cloudwatch - API Gateway. To learn more about this integration, check our [documentation](https://app.logz.io/#/dashboard/send-your-data/prometheus-sources/aws-apigateway-prometheus).

| Metric visualization                     | Metrci name | Description                                                                                                                                                                                                                                |
| ---------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Requests   | aws_apigateway_count_sample_count | The total number API requests in a given period.                                                                                                                                                                                           |
| Cache Hit Vs Miss | aws_apigateway_cache_hit_count_sum, aws_apigateway_cache_miss_count_sum | The number of requests served from the API cache in a given period versus the number of requests served from the backend in a given period, when API caching is enabled.                                                                   |
| Errors    | aws_apigateway_4_xxerror_sum, aws_apigateway_5_xxerror_sum | The number of client-side and server-side errors captured in a given period.                                                                                                                                                               |
| API Latency Vs Integration Latency | aws_apigateway_latency_average, aws_apigateway_integration_latency_average | The time between when API Gateway relays a request to the backend and when it receives a response from the backend versus the time between when API Gateway receives a request from a client and when it returns a response to the client. |
