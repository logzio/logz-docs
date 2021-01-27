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

##### Set the webhook settings

* On your project page go to Setting -> Webhook

* Payload url: Insert your listener URL and token in the following format

For HTTPS shipping _(recommended)_, use this URL configuration:

```
https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=github
```

Otherwise, for HTTP shipping, use this configuration:

```
http://<<LISTENER-HOST>>:8070/?token=<<LOG-SHIPPING-TOKEN>>&type=github
```

{% include log-shipping/replace-vars.html listener=true %}

* Content Type: choose "application/json"

##### Choose events to send

You will have 3 options:

* Just the push event.

* Send me everything.

* Let me select individual events.

Choose the option that suite you well and press Save webhook

##### Find your Github events in Logz.io

To search for your Github events enter "type:github" in the search pannel on kibana

