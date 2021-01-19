---
layout: article
title: Billing for Cloud SIEM accounts 
permalink: /user-guide/billing/billing-siem
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - yberlinger
---

# _DRAFT Content_

## Introduction

Logz.io Cloud SIEM works with your logs to boost your security observability with enriched and aggregated security log and alerts data, excellent prebuilt security content, and more than 10 of the most useful external Threat Intelligence feeds.

We take your Security to the next level with dedicated Customer Success Engineers and a dedicated Security Analyst for your Pro or Enterprise Cloud SIEM account.  

Your Security Analyst will help you manage your onboarding process, and be on tap to help you create custom dashboards and ship additional security products.

## Pricing and billing considerations for Cloud SIEM accounts

Cloud SIEM is inseparable from Log Management: You must have an active Log Management account plan to use Cloud SIEM.

The volume capacity for Cloud SIEM plans starts at 2 Gb of indexed data. The price per GB of indexed data includes Logz.io Log Management, and is indicated on the pricing page.  <!--link -->  

Available Cloud SIEM plan retention: 3, 7, 14, 21, 30, 45 days

+  If you’re a new customer who wants a complete Cloud SIEM solution, the pricing is presented on the <a href = "https://logz.io/pricing/" target="_blank"> Pricing page</a>, when you click  **Cloud SIEM**.
  
  ![Logz.io plan selection](https://dytvr9ot2sszz.cloudfront.net/logz-docs/billing-charges/product-selection.png)

+ If you’re an existing Pro or Enterprise account customer who wants Cloud SIEM, you must have a Log Management plan in place. 

Because Cloud SIEM uses the logs from your Log Management plan, the maximum storage available for your Cloud SIEM plan is the capacity you purchased for your Log Management plan.

For example, if you want to buy 50GB of SIEM, your Log Management plan storage should be at least 50GB.

For Cloud SIEM, you’ll be charged a flat rate per indexed GB. The greater the volume of logs you send us, the less you pay per indexed GB.

_AI/Question: Clarify how SIEM works for main and subaccounts - How much of Log Management capacity is eligible for Security product?_

## Cloud SIEM Billing FAQs

Q: Is there a self-service option to upgrade my Logz.io account plan? <br>
A: Yes! If you already have a Cloud SIEM account, you can upgrade your plan on your own. From your Log Management account, go to the cog wheel in the top right corner of the app, hover over settings, and then go down to ‘Usage and Billing’. 

This will bring you to a page showing the amount of log data you’re currently indexing per day. You’ll also see the option to upgrade your account so you can index more logs for longer periods. All you need is your credit card.

Q: Where can I see the data usage for my account?<br>
A: In the **Settings > Plan & billing > Usage & Info** tab for your account. <br>
To get there, click the cog wheel in the top right corner of the app, hover over settings, and then go down to **Plan & billing**. <br>

  This will bring you to a page that shows the volume of data your Security account has analyzed over the last 30 days of your log retention period. 
  <br> Example: You’ve used an average of 10 indexed GBs of log data per day, over the last 14 days. <br>Note that you'll be billed according to your account plan, and we'll notify you if you go over plan capacity. 

Q: Are archived logs held against my Logz.io costs? <br>
A: No. You only pay for what you index. In fact, you can save costs by archiving your log data in an S3 Bucket or Azure Blob to store logs for cheap, while maintaining access to them if you need to index and analyze them later. <br>
Note that restoring archived logs won't trigger Security rules: The logs will still include our threat enrichment, but the actual threat rules will not be triggered.

Q: Will I be charged for dropping data before it's indexed?<br>
A: For now, no. Not all logs are very interesting - use Logz.io’s [Drop Filters](/user-guide/accounts/drop-filters/) to filter out unneeded logs before they are indexed and held against your Logz.io price. We won’t charge you for using the feature.  <!-- This will be changed in the future, we will charge for dropping data-->

Q: Does Customer Support cost extra? <br>
A: No! Our dedicated 24/7 Customer Support team will help you get started and be successful with Logz.io at no extra cost - regardless of your plan.

