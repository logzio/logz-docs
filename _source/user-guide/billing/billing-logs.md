---
layout: article
title: Billing for Log Management accounts 
permalink: /user-guide/billing/billing-logs
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

# DRAFT Content
## Pricing and billing for Log Management

Logz.io Log Management provides you with a hosted, open source solution for observability, based on the ELK stack.

Your Log Management plan is covered by the Logz.io _Terms of Use_, unless you have a Master Services Agreement (MSA) with Logz.io. 

### Standard self-service plans

The conditions for the different account plans are summarized <a href ="/user-guide/billing/billing-log-plan-summaries" target="_blank">here </a>. Self-service is currently available for Trial, Community, and Pro plans.  

If you need a  <a href ="user-guide/billing/billing-log-plan-summaries#enterprise-plans" target="_blank">customized Enterprise plan </a> to suit your log management needs, don't hesitate to contact us!

## Log Management usage metrics

Product charges are determined according to the following parameters:

|-------+----------------|
|Parameter| Description|
|-----------------|-----------|
|Daily Data Capacity|How many GB you want to send us per day|
|Retention Period|How many days you want us to store your data |



Want to learn more about account usage? See <a href ="/user-guide/accounts/manage-account-usage" target="_blank"> Manage account usage </a> in our docs. 

## Pricing calculations for Log Management 
Your bill is calculated each month, based on the terms of your active plan, the daily indexed volume of the data you send to Logz.io - after it has been processed for observability - and the additional charges that may be incurred if your data usage exceeds your plan. 

At the end of each day, the data you sent to Logz.io is indexed, enriched, tagged, and compressed. You can typically see the data usage for a given day within 3 hours after the end of that day.  <!--provide location Usage information page -->

If your account is nearing its daily quota, Logz.io sends an email alert to account administrators. 

For those days when your system is overloaded, the data runs thick, and your data usage goes over the daily quota for your plan, we’ve got you covered with On Demand usage. 


### An example
<i class="fas fa-info-circle"></i>  

~ need data for example ~~

<!-- place in a box - find syntax -->
Your plan is _________  GB/Day x  _____________days of retention.

On Sunday, you ship ________ GB between the hours of 00:00 and 23:59. 

3 hours later (3AM Monday morning), after indexing and compressing, your Usage tab displays ___________GB.

Charge for the day: USD_______.

### Useful links

Want the details? See: 

+ <a href ="/user-guide/link placeholder" target="_blank"> On Demand billing</a> <!--replace link placeholder --> _~~placeholder link~~_

+ <a href ="/user-guide/accounts/manage-account-usage" target="_blank"> Managing account usage </a>

+ <a href ="/user-guide/accounts/drop-filters/" target="_blank"> Drop filters </a> to learn more about refining your log volume

## Billing and payment terms

Log Management customers are billed according to the capacity and retention time for their plan.

Billing period: Yearly or monthly 

## On Demand pricing and billing for Log Management

Our On-Demand solution lets you pay based on how much data you've indexed per month, which is particularly useful when you need more data to accommodate the occasional spikes in usage that may happen when critical issues occur.  

On Demand lets you ship unlimited data above your subscription plan at a cost of 40% above your current price per GB/Day. 

On Demand usage is recorded for each day that your usage goes above the defined plan limits for an account.

The charges are calculated at the end of each calendar month and invoiced at the end of the following calendar month. 

## Changing your plan

### Upgrading

At any time during your subscription period, you may upgrade your current plan by increasing your Daily Data Capacity and/or Retention Period. You'll be invoiced according to the additional price per month for the remainder of your subscription period.  

{Example place holder}

### Downgrading
Your plan charges are based on a commitment period of at least one year. 

At the end of your subscription period, you may downgrade your current plan by decreasing your Daily Data Capacity and/or Retention Period. You'll be invoiced according to the price per month for the new subscription period.  

## Log Management Billing FAQs
Q: How do you calculate the price for Logz.io Log Management? <br>
A: The two major factors that determine the price for Logz.io Log Management are:
+  The amount of log data Logz.io indexes in your account per day (per GB).
+ How long Logz.io retains the indexed data (usually ranges between 3-90 days).

Q: Is there a self-service option to start and/or upgrade my Logz.io account? <br>
A: Yes! Sign up for a free trial on our website to create your account. At any time, you can upgrade your account by hitting the cog wheel in the top right corner of the app, hovering over settings, and then going down to **Usage and Billing**. 

This will bring you to a page showing the amount of log data you’re currently indexing per day. <!--When it's a free trial it is not necessarily about indexing more logs.....if they do not upgrade to PRO they will be able to eventually log only 1GB with 1 day retention that is available on the FREE plan --> You’ll also see the option to upgrade your account so you can index more logs for longer periods. All you need is your credit card.

Q: How do I know how much data I’m using in my account?  <br>
A: Hit the cog wheel in the top right corner of the app, hover over settings, and then go down to **Usage and Billing**. This will bring you to a page that shows the average amount of data you’ve indexed per day during your log retention period (For example: You’ve used an average of 10 indexed GBs of log data per day, over the last 14 days).

Q: Are archived logs held against my Logz.io costs?
A: No. You only pay for what you index. In fact, you can save costs by archiving your log data in an S3 Bucket or Azure Blob to store logs for cheap, while maintaining access to them if you need to index and analyze them later.

Q: Will I be charged for dropping data before it's indexed?
A: No. Not all logs are very interesting - use Logz.io’s Drop Filters to filter out unneeded logs before they are indexed and held against your Logz.io price. We won’t charge you for using the feature.

Q: Does Customer Support cost extra?
A: No! Our beloved 24/7 Customer Support team (seriously, our customers love them) will help you get started and be successful with Logz.io at no extra cost - regardless of your plan.
