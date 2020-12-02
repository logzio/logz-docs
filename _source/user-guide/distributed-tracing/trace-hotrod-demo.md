---
layout: article
title: Sending demo traces with the Hot R.O.D. application
permalink: /user-guide/distributed-tracing/trace-hotrod-demo
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger
---
Not ready to instrument and deploy components? 
We've got you covered with an app that can send demo traces to your Distributed Tracing. 

This section explains how to set up a sample application to send demo traces to your Logz.io Distributed Tracing account.

---

## Getting started with Hot R.O.D. demo traces 

You'll use a simple configuration file to deploy the following components:

+ The <a href ="https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod"  target="_blank"> Hot R.O.D. sample application <i class="fas fa-external-link-alt"></i>  </a>. developed to demonstrate distributed tracing.
+ The Jaeger agent
+ The Logz.io Jaeger collector

Download the configuration file <a href ="repository link for yaml file"  target="_blank"> here <i class="fas fa-external-link-alt"></i> </a> .

The yaml file that we provide includes modified configuration paramaters to enable the Hot R.O.D. app to run on the Logz.io Jaeger collector. 

In the yaml file, for the `jaeger-logzio-collector` definitions, in the `environment` section:

1. Enter your Distributed Tracing account token: `- ACCOUNT_TOKEN=[lookup your tracing token in Manage accounts]`. 
    {add navigation to param}
2. Enter the correct Listener URL for your region, formatted as `http://[listener]:8070`: `- CUSTOM_LISTENER_URL=http://[<]lookup the listener url]:8070`.
    {add navigation to param}

### About the Hot R.O.D. demo application

Hot R.O.D. (Rides on Demand) is a demo application that consists of several microservices that send requests to each other. The application is used to illustrate the use of the OpenTracing API. It can be run standalone, but requires a Jaeger backend to view the traces. 

![placeholder for Hot R.O.D. interface image](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/NameOFile.png)

For more information, visit the Github project <a href ="https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod" target="_blank">  Hot R.O.D. in Github <i class="fas fa-external-link-alt"></i> </a> 

## Deploying the demo app: Useful commands

|-----------------+------------|
|Command|Description|
|---------------|---------------|
|`docker-compose up`| Runs the configuration file|
|`ctrl+c`|Interrupts the process |
|`docker-compose down`|Removes the container|

## Opening and using the Hot R.O.D. application

1. To open the application, navigate to http://127.0.0.1:8080
2. To send traces, click the buttons.
![placeholder for screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/NameOFile.png)
3. Navigate to the Distributed Tracing tab in Logz.io to view the trace data.    

