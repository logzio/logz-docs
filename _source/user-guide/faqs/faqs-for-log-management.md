---
layout: article
title: FAQs for Log Management
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Log Management FAQs
permalink: /user-guide/faqs-for-log-management/
flags:
  admin: false
  beta: 
  logzio-plan: community
tags:
  - log-shipping
contributors:
  - ralong
  - boofinka 
  - yberlinger
---

You've heard it before, but we'll say it again: At Logz.io, customer obsession is in our DNA. We're here to make cloud observability easy, valuable, and cost effective. 

# Integrating with your service or application

## Q: Can we integrate with {the name of your service or application}

## TL;DR - The short version

### A: Integrating with your 3rd-party application or service
+ If the logs are only viewable within the service or application, the answers is most likely "no“, since there would be no way to have the logs index on our clusters.
+ If the logs are accessible from outside your service or application, then it's much more likely that you can ship those to Logz.io - depending on how that access is managed.

### Integrating with your proprietary application or service
Logz.io offers a variety of [Send Your Data integrations](https://app.logz.io/#/dashboard/send-your-data?tag=from-your-code&collection=log-sources) to enable you to ship logs directly from your code based on the language you're using.

This information is also available in the Logz.io Docs, via [**Ship data > Logs**](https://docs.logz.io/shipping/#log-sources), when you select the **From your code** filter.

## The detailed version

### Logs written to file

+ One-time upload
+ Continuous shipping

### Logs written to cloud storage

### Logs that are accessible via API

+ One-time upload
+ Continuous shipping