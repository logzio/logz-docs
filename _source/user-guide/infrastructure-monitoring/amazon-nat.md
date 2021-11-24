---
layout: article
title: Amazon NAT
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-nat.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your Amazon NAT.

| Metric visualization                                 | Metric name                                                                                              | Description                                                                                                                                                    |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connections               |
| Active Connections                                   | aws\_natgateway\_active\_connection\_count\_sum                                                          | The total number of concurrent active TCP connections through the NAT gateway.                                                                                 |
| Unsuccessful Connection Attempts                     | Aws\_natgateway\_connection\_established\_count\_sum, aws\_natgateway\_connection\_attempt\_count\_sum   | The number of connection attempts made through the NAT gateway and the number of connections established through the NAT gateway.                              |
| Attempted Connections                                | aws\_natgateway\_connection\_attempt\_count\_sum                                                         | The number of connection attempts made through the NAT gateway.                                                                                                |
| Error Port Allocation   | aws\_natgateway\_error\_port\_allocation\_sum                                                            | The number of times the NAT gateway could not allocate a source port.                                                                                          |
| Established Connections                              | aws\_natgateway\_connection\_established\_count\_sum                                                     | The number of connections established through the NAT gateway.                                                         |
| Attempted Connection VS Established Connection| Aws\_natgateway\_connection\_attempt\_count\_sum, 

aws\_natgateway\_connection\_established\_count\_sum | The number of connection attempts made through the NAT gateway versus the number of connections established through the NAT gateway.                           |
| Data Traffic Stream- Bytes           |
| Bytes Out To Destination                             | aws\_natgateway\_bytes\_out\_to\_destination\_sum                                                        | The number of bytes sent out through the NAT gateway to the destination.                                                       |
| Bytes in From Source                                 | aws\_natgateway\_bytes\_in\_from\_source\_sum                                                            | The number of bytes received by the NAT gateway from clients in your VPC.                                                                  |
| Bytes Out To Source                                  | aws\_natgateway\_bytes\_in\_from\_destination\_sum                                                       | The number of bytes sent through the NAT gateway to the clients in your VPC.                                               |
| Bytes in From Destination                            | aws\_natgateway\_bytes\_in\_from\_destination\_sum                                                       | The number of bytes received by the NAT gateway from the destination.                                                 |
| Bytes in From Dest VS Bytes Out To Source  | Aws\_natgateway\_bytes\_in\_from\_destination\_sum, aws\_natgateway\_bytes\_out\_to\_source\_sum         | The number of bytes received by the NAT gateway from the destination versus the number of bytes sent through the NAT gateway to the clients in your VPC.       |
| Bytes in From Source VS Bytes Out To Dest            | Aws\_natgateway\_bytes\_in\_from\_source\_sum, aws\_natgateway\_bytes\_out\_to\_destination\_sum         | The number of bytes received by the NAT gateway from clients in your VPC versus the number of bytes sent out through the NAT gateway to the destination. |
| Data Traffic Stream- Packets |
| Packets Out To Destination                           | aws\_natgateway\_packets\_out\_to\_destination\_sum                                                      | The number of packets sent out through the NAT gateway to the destination.                                                                                     |
| Packets Out To Source                                | aws\_natgateway\_packets\_out\_to\_source\_sum                                                           | The number of packets sent through the NAT gateway to the clients in your VPC.                                                         |
| Packets In From Destination                          | aws\_natgateway\_packets\_in\_from\_destination\_sum                                                     | The number of packets received by the NAT gateway from the destination.                                                   |
| Packets in From Dest VS Packets Out To Source        | Aws\_natgateway\_packets\_in\_from\_destination\_sum, aws\_natgateway\_packets\_out\_to\_source\_sum     | The number of packets received by the NAT gateway from the destination versus the number of packets sent through the NAT gateway to the clients in your VPC.   |
| Packets Drop Count                                   | aws\_natgateway\_packets\_drop\_count\_sum                                                               | The number of packets dropped by the NAT gateway.                                                                            |
| Packets In From Source                               | aws\_natgateway\_packets\_in\_from\_source\_sum                                                          | The number of packets received by the NAT gateway from clients in your VPC.                                        |
| Packets in From Source VS Packets Out To Dest | Aws\_natgateway\_packets\_in\_from\_source\_sum, aws\_natgateway\_packets\_out\_to\_destination\_sum     | The number of packets received by the NAT gateway from clients in your VPC versus the number of packets sent out through the NAT gateway to the destination.   |
