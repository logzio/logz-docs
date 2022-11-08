---
layout: article
title: Sampling rules
permalink: /user-guide/distributed-tracing/sampling-rules.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: What are Sampling rules and how can they improve your Tracing account
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - hidan
---

Sampling rules let you choose which traces you want to index and monitor inside your account. They help you focus your attention on events that are happening right now inside your systems and services. In addition, applying Sampling rules optimize your quota management by only indexing critical and actionable spans. 

### Sampling rules overview

The Sampling rules screen has 3 main components:

* Choose an account - You choose between your Tracing accounts and view your current span usage.
* Insights - Logz.io provides recommended rules to help you optimize your span usage.
* Main table - Your Sampling rules will appear in this table. Each rule includes a description and a list of the services it's running on.

### Create custom Sampling rules

We recommend creating a set of rules for your account.
{:.info-box.tip}

To create Sampling rules, click on the screen's button at the top right corner.

![Create a sampling rule](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/logs-edit-traceid.png)

Next, choose the services to which you'd like to apply this rule. To manually add your services, check the **These services** option and select the relevant services from the drop down menu.

Finally, choose the sampling action. Each rule can only have one of the following actions:

* Keep a certain percentage of the traces. You can choose any value between 1-100.
* Keep traces that are slower than a certain value. You can choose any value that's higher than 1.
* Keep all traces that contain span errors. This will allow you to focus on finding bottlenecks and identifying issues.

While you can only choose one action per rule, you can create multiple rules on the same services. The rules will execute in the order they appear in the table.

For example, you can create the following rules:

* Sample ALL traces with spans that have errors
* Sample traces that are slower than 2000ms
* Sample 50% of the traces
* Sample all traces from a critical service

Once you create a set of rules, navigate to the **[OTEL configuration]()** to activate them.


### Create a Logz.io insights Sampling rules

Logz.io provides recommendations on optimizing your span usage, which you can turn to Sampling rules with a click of a button.

Click on **Review recommendations** to view the suggested rules. You cannot edit or remove certain rules from this list.

To apply these suggested rules, click the **Next: configure OTEL** button.


### Configure and run your Sampling rules

Creating your Sampling rules is the first step. Next, you need to configure them through the OTEL configuration wizard. You can access the wizard by clicking on the button at the top right corner of the screen.

Select the configuration method based on your machine: Local host, Docker, or Kubernetes. Next, make sure you've chosen the relevant Tracing account, and follow the instructions to execute your rules.



![Change format and open](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/logs-edit-traceid.png)