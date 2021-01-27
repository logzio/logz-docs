---
title: Ship Github events
logo:
  logofile: jenkins.png
  orientation: vertical
data-source: Github
templates: ["no-template"]
contributors:
  - doron-bargo
  - shalper
shipping-tags:
  - ci-cd
---

#### Ship Github Events to Logz.io
Capture GitHub events to:

* Track issues and PRs openned by your customers
* Track new features from code changes
* Identify when new code changes lead to system alerts or build failures



<div class="tasklist">

##### Open the webhook settings
1. On your project page go to Setting -> Webhook
2. On the payload url add your customer properties in the following format
https://<<Listener>>:8071?token=<<Log Token>>&type=github
{% include log-shipping/log-shipping-token.html %}

###### Choose events to send
You will have 3 options:
* Just the push event.
* Send me everything.
* Let me select individual events.

Choose the option that suite you well and save

##### Find your Github events in Logzio
To search for your Github event enter "type: github" in the search pannel on kibana

