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

## AWS Cloudwatch - API Gateway

This dashboard provides an interface to view and analyze system metrics from AWS Cloudwatch - API Gateway.

| Metric visualization                     | Description                                                                                                                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API Requests   | The total number API requests in a given period.                                                                                                                                                                                           |
| Cache Hit Vs Miss | The number of requests served from the API cache in a given period versus the number of requests served from the backend in a given period, when API caching is enabled.                                                                   |
| Errors    | The number of client-side and server-side errors captured in a given period.                                                                                                                                                               |
| API Latency Vs Integration Latency | The time between when API Gateway relays a request to the backend and when it receives a response from the backend versus the time between when API Gateway receives a request from a client and when it returns a response to the client. |
