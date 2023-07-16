---
layout: article
title: Azure Cloud Fetcher Usage and Cost
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn more about Azure Cloud Fetcher usage
permalink: /user-guide/cloud-fetcher-usage.html
flags:
tags:
  - cloud
  - cloud fetcher
  - ship data
  - Azure
contributors:
  - hidan
---


Azure Cloud Fetcher monitors the operation of Azure Virtual Machines within your infrastructure. Your usage, and correspondingly, your costs, are predicated on the data ingested from these machines and subsequently transmitted to Logz.io.

Our pricing model is based on the total number of active machines, regardless of whether Logz.io has been deployed on them. Furthermore, Logz.io considers nodes within the Azure application as billable entities.

As a result, using Azure Cloud Fetcher could potentially result in exceeding your allocated daily or monthly quota, increasing your account's expenses according to the volume of additional data processed by Logz.io.

Azure Cloud Fetcher is capable of gathering metrics across all Azure service tiers. The Shared, Dynamic, or Free tier App Service Plans, are monitored without any impact on your monthly cost.

If you choose to collect custom metrics in your Azure account, Logz.io will incorporate all custom metrics written to any Azure App instances within the scope of the integration. These metrics are considered custom metrics in Logz.io and might also influence and increase your costs.