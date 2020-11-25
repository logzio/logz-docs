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


#### To set up Distributed Tracing: 
{:.no_toc}  

<div class="tasklist">

##### Set up instrumentation
Determine the best instrumentation strategy for your system: Manual or automatic instrumentation.
<a href="/user-guide/distributed-tracing/tracing-instrumentation.html" target ="_blank"> Read more about setting up instrumentation.</a>

##### Look up your Distributed Tracing Token and Region information in Logz.io
You must have admin permissions for the Logz.io Distributed Tracing account to view the **Manage accounts** page. If you're not an admin user for the account, consult with an account admin to get the Distributed Tracing token information. 

+  You’ll find your Distributed Tracing account information in the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage accounts** page</a> of your Operations workspace, 

    ![Distributed Tracing token location](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-token1.png)

      ...when you click the relevant tracing account name at the bottom of the section.
    ![Reveal Distributed Tracing Token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-acct-tokeninfo11.gif)

+ You can find the Listener host URL for your region in the <a href="/user-guide/accounts/account-region.html#available-regions" target ="_blank"> Regions and Listener Hosts table.</a> <br> If you need to clarify your region code, you can look it up in the General Settings page, here:  <a href="https://app.logz.io/#/dashboard/settings/general" target ="_blank"> **<i class="li li-gear"></i> > Settings > General**.
    ![Navigate to general settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/general-settings1.png)

##### Deploy tracing components
Decide on your tracing source, make deployment decisions, and decide whether or not to use an agent to send tracing data to Logz.io.
<a href="/user-guide/distributed-tracing/deploying-components.html" target ="_blank"> Read more about deploying tracing components.</a>

If you’re deploying distributed tracing on Kubernetes, we recommend the following blog post: <a href="https://logz.io/blog/jaeger-kubernetes-best-practices/" target ="_blank">A Guide to Deploying Jaeger on Kubernetes in Production. </a>








