---
layout: article
title: Logz.io Security Analytics
permalink: /user-guide/security-analytics/
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-summary
  - security-threats
  - security-research
  - correlation-rules
contributors:
  - imnotashrimp
  - proudboffin
---

Logz.io Security Analytics is a unified platform for security and operations.
It combines the ELK stack with advanced security analytics tools to help you identify and remediate threats to your system.
Security Analytics helps you identify potential compromises to your system by correlating your Logz.io data with lists of known threats.

If you’re on a Pro or Enterprise plan, you can request access to Security Analytics from your account manager, or you can email [help@logz.io](mailto:help@logz.io) to get started.

![Logz.io Security Analytics]({{site.baseurl}}/images/security-analytics/security-analytics--annotated.png)

{: .letter-labels }
Summary
  : The first thing you see when you sign in to your security account.
    The summary dashboard shows the last 24 hours of events that Logz.io found in your log data.

Threats
  : Using publicly available threat feeds, this screen shows the potential threats from known bad actors on the internet.

Research
  : Use Kibana to drill down into your logs, helping you better understand specific events and threats.


Correlation rules
  : This page contains preconfigured security correlation rules.
    When correlation rules are triggered, you’ll see the results on the Summary and Threats dashboards.
    You can also create your own custom rules.


To see your Security Analytics account, click the Logz.io logo (upper left corner), and then click **Security**.