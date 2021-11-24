---
layout: article
title: Amazon Route 53
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-route-53.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon Route 53

This dashboard provides an interface to view and analyze metrics from your Amazon Route 53.

| Metric visualization             | Metric name                                                 | Description                                                                                                                                     |
| -------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Health Check Status              | aws\_route53\_health\_check\_status\_minimum                | The status of the health check endpoint that CloudWatch is checking.                                                                            |
| Healthy Health Check Child Count | aws\_route53\_child\_health\_check\_healthy\_count\_average | For a calculated health check, the number of health checks that are healthy among the health checks that Route 53 is monitoring.  |
| Time To First Byte               | aws\_route53\_time\_to\_first\_byte\_average                | The average time, in milliseconds, that it took Route 53 health checkers to receive the first byte of the response to an HTTP or HTTPS request. |
| Healthy Health Check Percentage  | aws\_route53\_health\_check\_percentage\_healthy\_average   | The percentage of Route 53 health checkers that consider the selected endpoint to be healthy.                                                   |
| Connection Time                  | aws\_route53\_connection\_time\_average                     | The average time, in milliseconds, that it took Route 53 health checkers to establish a TCP connection with the endpoint.                       |
| SSL Handshake Time               | aws\_route53\_ssl\_handshake\_average                       | The average time, in milliseconds, that it took Route 53 health checkers to complete the SSL handshake.                                         |