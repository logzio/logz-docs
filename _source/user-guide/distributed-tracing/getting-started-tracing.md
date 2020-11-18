---
layout: article
title: Getting started with Logz.io Distributed Tracing
permalink: /user-guide/distributed-tracing/getting-started-tracing
flags:
  logzio-plan: pro enterprise
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
Get set and get ready: This section describes what you have to do to get set up - before you can use Distributed Tracing in Logz.io.


#### Next steps: 
{:.no_toc}  

<div class="tasklist">

##### Look up your Distributed Tracing Token and Region information in Logz.io
You’ll find your Distributed Tracing account information in the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage Accounts page**</a> of your Operations workspace, 

![Distributed Tracing token location](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-token1.png)

...when you click the account name at the bottom of the section. 
![Reveal Distributed Tracing Token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-acct-tokeninfo11.gif)

Look up your accounts region code in the General Settings page, here:  <a href="https://app.logz.io/#/dashboard/settings/general" target ="_blank"> **<i class="li li-gear"></i> > Settings > General**.
![Navigate to general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/general-settings1.png)

You can also find your region code in the <a href="/user-guide/accounts/account-region.html" target ="_blank"> Regions and Listener Hosts table.</a>

URLs are available in the <a href="/user-guide/log-shipping/listener-ip-addresses.html" target ="_blank"> Listener IP addresses </a>page.


##### Deploy tracing components
Decide on your tracing source, make deployment decisions, and decide whether or not to use an agent to send tracing data to Logz.io.
<a href="/user-guide/distributed-tracing/deploying-components.html" target ="_blank"> Read more about deploying tracing components.</a>

If you’re deploying distributed tracing on Kubernetes, we recommend the following blog post: <a href="https://logz.io/blog/jaeger-kubernetes-best-practices/" target ="_blank">A Guide to Deploying Jaeger on Kubernetes in Production. </a>

##### Set up instrumentation
Determine the best instrumentation strategy for your system: Manual or automatic instrumentation.
<a href="/user-guide/distributed-tracing/tracing-instrumentation.html" target ="_blank"> Read more about setting up instrumentation.</a>







