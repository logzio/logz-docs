---
layout: article
title: Amazon Network ELB 
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-network-elb.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Amazon Network ELB 

This dashboard provides an interface to view and analyze metrics from your Amazon Network ELB.

| Metric visualization                         | Metric name                                                                                                                                                                                               | Description                                                                                                                                                               |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum Healthy Host Count                   | aws\_networkelb\_healthy\_host\_count\_minimum                                                                                                                                                            | The number of targets that are considered healthy.                                                                                                                        |
| Maximum Unhealthy Host Count                 | aws\_networkelb\_un\_healthy\_host\_count\_minimum                                                                                                                                                        | The number of targets that are considered unhealthy.                                                                                                                      |
| Hosts Status Over Time                       | Aws\_networkelb\_healthy\_host\_count\_minimum, aws\_networkelb\_un\_healthy\_host\_count\_minimum                                                                                                        | The number of targets that are considered healthy and the number of targets that are considered healthy. .                                                                |
| Flow Count Per ELB   |
| Active Flow                                  | Aws\_networkelb\_active\_flow\_count\_average, aws\_networkelb\_active\_flow\_count\_tls\_average, aws\_networkelb\_active\_flow\_count\_udp\_average, aws\_networkelb\_active\_flow\_count\_tcp\_average | The total number of active concurrent flows (or connections), TCP flows (or connections), TLS flows (or connections), UDP flows (or connections) from clients to targets. |
| New Flow                                     | Aws\_networkelb\_new\_flow\_count\_average, aws\_networkelb\_new\_flow\_count\_tls\_average, aws\_networkelb\_new\_flow\_count\_udp\_average, aws\_networkelb\_new\_flow\_count\_tcp\_average             | The total number of new concurrent flows (or connections), TCP flows (or connections), TLS flows (or connections), UDP flows (or connections) from clients to targets.    |
| Processing And Consuming Stats Per ELB |
| Processed Bytes                              | Aws\_networkelb\_processed\_bytes\_sum, aws\_networkelb\_processed\_bytes\_tcp\_sum, aws\_networkelb\_processed\_bytes\_tls\_sum, aws\_networkelb\_processed\_bytes\_udp\_sum                             | <br>

The total number of bytes processed by the load balancer, including TCP/IP headers, TCP, TLS and UDP listeners.                                                     |
| Processed Packets                            | aws\_networkelb\_processed\_packets\_sum                                                                                                                                                                  | The total number of packets processed by the load balancer.                                                                                                         |
| Consumed LCUs                                | Aws\_networkelb\_consumed\_lcus\_average, aws\_networkelb\_consumed\_lcus\_tcp\_average, aws\_networkelb\_consumed\_lcus\_tls\_average, aws\_networkelb\_consumed\_lcus\_udp\_average                     | The number of load balancer capacity units (LCU) used by your load balancer, including TCP, TLS and UDP.                                                                  |
| Resets Per ELB   |
| Client Reset Count                           | aws\_networkelb\_tcp\_client\_reset\_count\_sum                                                                                                                                                           | 

The total number of reset (RST) packets sent from a client to a target.                                                                                             |
| Target Reset Count                           | aws\_networkelb\_tcp\_target\_reset\_count\_sum                                                                                                                                                           | 

The total number of reset (RST) packets sent from a target to a client.                                                                                             |
| Client Reset Count                           | aws\_networkelb\_tcp\_elb\_reset\_count\_sum                                                                                                                                                              | The total number of reset (RST) packets generated by the load balancer.  |
| Negotiations Errors Per ELB        |
| Client TLS Negotiations Errors               | aws\_networkelb\_client\_tls\_negotiation\_error\_count\_sum                                                                                                                                              | The total number of TLS handshakes that failed during negotiation between a client and a TLS listener.    |
| Target TLS Negotiations Errors               | aws\_networkelb\_target\_tls\_negotiation\_error\_count\_sum                                                                                                                                              | The total number of TLS handshakes that failed during negotiation between a TLS listener and a target.        |