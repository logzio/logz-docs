---
layout: article
title: Amazon SES
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/amazon-ses.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics from Amazon SES
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---



This dashboard provides an interface to view and analyze metrics from your Amazon SES.

| Metric visualization                      | Metric name                                  | Description                                                                           |
| ----------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| Average Number Of Emails Sent             | aws\_ses\_send\_average                      | Average number of emails sent.                                                        |
| Delivery Success Rate                     | aws\_ses\_delivery\_sum/aws\_ses\_send\_sum  | Total number of emails successfully delivered versus the total number of emails sent. |
| Messages That Resulted In Hard Bounces    | aws\_ses\_reputation\_bounce\_rate\_sum      | Messages resulted in hard bounces.                                                    |
| Messages That Recipients Reported As Spam | aws\_ses\_reputation\_complaint\_rate\_sum   | Messages reported as spam by recipients.                                              |
| Email deliveries                          | aws\_ses\_delivery\_sum, aws\_ses\_send\_sum | Total number of emails successfully delivered and sent                                |
| Email Rejects And Bounces                 | aws\_ses\_bounce\_sum, aws\_ses\_reject\_sum | The total number of emails that resulted in a bounce versus rejected send attempts.   | 
