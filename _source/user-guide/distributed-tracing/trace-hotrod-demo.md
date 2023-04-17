---
layout: article
title: Sending demo traces with the HotROD application
permalink: /user-guide/distributed-tracing/trace-hotrod-demo
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: How to set up Logz.io's HotROD demo application
flags:
  logzio-plan: community
tags:
  - distributed tracing
contributors:
  - yberlinger
  - hidan
---

Not ready to instrument and deploy components? We've got you covered with an app that can send demo traces to your Distributed Tracing.

Using the **HotROD app** is so easy, and fast, that you'll be searching for traces in Logz.io within a few minutes of setting up the app! 

In this guide, you'll find:

* [What's HotROD demo application?](/user-guide/distributed-tracing/trace-hotrod-demo#whats-hotrod-demo-application)
* [How to set up HotROD demo traces](/user-guide/distributed-tracing/trace-hotrod-demo#set-up-hotrod-demo-traces)
  * [Prerequisites](/user-guide/distributed-tracing/trace-hotrod-demo#prerequisites)
  * [Add token and region](/user-guide/distributed-tracing/trace-hotrod-demo#update-the-env-file-from-the-logzio-tracing-demo-repository)
  * [Deploy the demo app](/user-guide/distributed-tracing/trace-hotrod-demo#deploy-the-demo-app)
* [Additional resources](/user-guide/distributed-tracing/trace-hotrod-demo#additional-resources)

## What's HotROD demo application? ##

HotROD (Rides on Demand) is a demo application, created by Logz.io, that consists of several microservices that send requests to each other. The application illustrates the use of the OpenTracing API. It can be run standalone, but requires a Jaeger backend to view the traces. 

The _HotROD (Rides on Demand)_ application generates a web page with four customer buttons to order a car to the customer's business to pick up passengers or merchandise for delivery to a desired location. 

Clicking a button sends a request to the backend, which generates a trace. The app responds with the car license number and estimated time of arrival (ETA). 

<!-- ![HotROD interface image](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-hotrod.png) -->

![HotROD interface animation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-hotrod-anim8.gif)

You have a web client ID in the upper left corner: A random session ID assigned by the Javascript UI. Each time you reload the page, it generates a new session ID.

In this example, the web client ID is 1465. All the ride requests generated in the session include this ID in a unique request ID. For each button click, you'll see the following information: 

+ Car license number
+ Driver ETA
+ Unique request ID, built from the session ID and a sequence number. 
+ Latency - how long the backend took to respond, as measured by the Javascript UI.


And once you open the Distributed Tracing tab, select a service, and **Find Traces**: ![HotROD traces in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/traces-hotrod-driver-results_oct21.png	)

## Set up HotROD demo traces 

This topic explains how to set up the Logz.io HotROD sample application to send demo traces to your Distributed Tracing account. 

During this process, you'll use a simple yaml configuration file to deploy the following components in a Docker environment:

+ A modified HotROD sample application, based on the original project developed to demonstrate distributed tracing
+ The Jaeger agent
+ The Logz.io Jaeger collector

### Prerequisites

To run the demo configuration and deploy the components, you must have the following software installed: 

+ <a href ="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank"> Git  <i class="fas fa-external-link-alt"></i>  </a>  
+ <a href ="https://docs.docker.com/get-docker/" target="_blank"> Docker  <i class="fas fa-external-link-alt"></i> </a>  

### Update the **.env** file from the Logz.io tracing-demo repository

The **.env** file might be hidden.
{:.info-box.note}

1. Use a **terminal** to grab the repo code using the git command:  `git clone https://github.com/logzio/tracing-demo.git` and change directories: `cd tracing-demo`.

1. Open the `.env` file and update the parameters with your preferred text editor.
1. Enter your Distributed Tracing account token in the first line: `ACCOUNT_TOKEN=Enter your account token here`. You must have admin permissions for the Logz.io account to view the **Manage tokens** page. If you’re not an admin user for the account, consult with an account admin to get the Distributed Tracing token information.
    
    1. From the **Tracing** or <i class="li li-gear"></i> (**Settings**) menu, go to **[Manage tokens > Data shipping tokens > Tracing](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=tracing)**
    ![Distributed Tracing tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-token_sept2021.png)
    1. Find the Distributed Tracing account you want to ship to in the table, and copy the token.
1. Enter the correct 2-letter code for your region in the second line: `REGION_CODE=Enter your region code here`<br>
    Look up the 2-letter code for your region in the <a href="/user-guide/accounts/account-region.html#available-regions" target ="_blank"> Regions and Listener Hosts table.</a> 
   
   You can find the region code for your account in the General settings page, here: <a href="https://app.logz.io/#/dashboard/settings/general" target ="_blank"> **<i class="li li-gear"></i> >Settings > General**.

   ![Navigate to general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/traces-general-settings_oct21.png	)


1. Save and close the updated **.env** file.

1. In the terminal, run `docker network create dockercompose_testcluster` to create a Docker network.


Updating the **.env** file in the Logz.io tracing demo repo with your tracing account token and region code 
adds your `jaeger-logzio-collector` definition parameters to the yaml file, in the `environment` section.
{:.info-box.read}

### Deploy the demo app

_To run the demo:_

1. To start the HotROD demo app, in the terminal, run: `docker-compose up`.
2. To open the application, navigate to the main HotROD service at [127.0.0.1:18080](http://127.0.0.1:18080).
3. To send traces, click the buttons.
    You can view the logs in the foreground in the terminal. 
4. To stop the demo, run: `ctrl+c`.
5. To remove the docker container, run: `docker-compose down`.

### Command summary

|-----------------+------------|
|Command|Description|
|---------------|---------------|
|`docker-compose up`| Starts the demo app|
|`ctrl+c`|Interrupts the demo process |
|`docker-compose down`|Removes the demo container|


## Viewing demo traces

After sending traces with the tracing demo app, navigate to the [Distributed Tracing](https://app.logz.io/#/dashboard/jaeger/search?switchToAccountId=2977) tab in Logz.io, select a service and click **Find Traces** to view your generated trace data.    

## Additional resources

* [Learn more about Jaeger's HotROD project](https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod).
* [See Read more about Logz.io's HotROD demo project](https://github.com/logzio/tracing-demo/blob/main/README.md).
* [Read about Logz.io Distributed Tracing platform](/user-guide/distributed-tracing). 

<!-- For more background information, visit the <a href ="https://github.com/jaegertracing/jaeger/tree/master/examples/hotrod" target="_blank">  HotROD in Github project <i class="fas fa-external-link-alt"></i>. </a> 

*The Logz.io **tracing-demo** project repository includes modified configuration paramaters to create the HotROD web app. The app sends data to a Logz.io Jaeger collector that you configure to work with your Distributed Tracing account.  Click to open the <a href ="https://github.com/logzio/tracing-demo/blob/main/README.md" target="_blank"> **README** for the tracing demo project. </a>* -->

<!--The configuration repository <a href ="https://github.com/logzio/tracing-demo"  target="_blank">  is here <i class="fas fa-external-link-alt"></i> </a>. -->

<!-- Visit the docs to learn more about <a href=" /user-guide/distributed-tracing"  target ="_blank"> Logz.io Distributed Tracing. </a> -->
