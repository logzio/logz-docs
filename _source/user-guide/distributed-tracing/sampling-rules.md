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

Sampling rules let you choose which traces you want to index and monitor inside your account. They help you focus your attention on events that are happening right now inside your systems and services. In addition, applying Sampling rules optimizes your quota management by only indexing critical and actionable spans or full traces.

### Sampling rules overview

The Sampling rules screen has these main components:

* **Choose an account** - Choose between your Tracing accounts and can set a different set of rules per each account.
<!-- * **Insights** - Logz.io provides recommended rules to help you optimize your span usage. -->
* **Main table** - Your Sampling rules will appear in this table. Each rule includes a description and a list of the services it's running on.

![Sampling rules overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/sampling-rules/sampling-rules.png)

### Create custom Sampling rules

We recommend creating a set of rules for your account.
{:.info-box.tip}

To create Sampling rules, click on the **New rule** button at the top right corner.

Next, choose the services to which you'd like to apply this rule. To manually add your services, check the **These services** option and select the relevant services from the drop down menu.

Finally, choose the sampling action. Each rule can only have one of the following actions:

* Keep a certain percentage of the traces. You can choose any value between 1-100.
* Keep traces that are slower than a certain value. You can choose any value that's higher than 1.
* Keep all traces that contain span errors. This will allow you to focus on finding and identifying issues.

![Create a sampling rule](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/sampling-rules/create-a-rule.png)

While you can only choose one action per rule, you can create multiple rules on the same services.

For example, you can create the following rules:

* Sample ALL traces with spans that have errors
* Sample traces that are slower than 2000ms
* Sample 50% of the traces
* Sample all traces from a critical service

Once you create a set of rules, navigate to the **[OTEL configuration generator](https://app.logz.io/#/dashboard/settings/tracing-yaml-configuration/)** to activate them.


<!-- ### Create a Logz.io insights Sampling rules

Logz.io provides recommendations on optimizing your span usage, which you can turn to Sampling rules with a click of a button.

Click on **Review recommendations** to view the suggested rules. You cannot edit or remove certain rules from this list.

To apply these suggested rules, click the **Next: configure OTEL** button. -->


### Configure and run your Sampling rules

Creating your Sampling rules is the first step. Once you've finished creating a set of rules for your chosen account, you need to configure them through the OTEL configuration generator. 

You can access the generator by clicking on the button at the top right corner of the screen or navigating to the page by clicking **[Tracing > OTEL configuration](https://app.logz.io/#/dashboard/settings/tracing-yaml-configuration/)**.

Select the configuration method based on your machine. You can currently choose Localhost; Docker and Kubernetes support is coming soon.

Next, make sure you’ve chosen the relevant Tracing account, and follow the instructions to execute your rules.

![Create a sampling rule](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/sampling-rules/otel-configuration-screen.png)