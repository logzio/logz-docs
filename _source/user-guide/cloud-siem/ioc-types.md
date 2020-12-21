---
layout: article
title: Preparing a feed
permalink: /user-guide/siem/ioc-types/
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

You can enrich threat detection with your own private feeds of IOCs.

This page explains the requirements to help you prepare your feeds so they can be pulled by Logz.io. For help configuring the sync, see [Adding a private feed](/user-guide/cloud-siem/private-feeds.html).

## Supported IOC types

Supported IOC types include:

* IPs
* Md5/sha1/sha256 hash signatures
* Domains
* URLs
* User-Agent headers
* Custom indicators (Generally, used to create a list of usernames or email addresses.)


### General guidelines

* **IOC-specific**

  Each feed should be a list of IOCs of a similar type. This is important to meet the validation requirements, as explained below.

* **Max number of entities**

  Your feed can contain as many as 10K entities.

* **Default or custom format**
  
  The default format requires that every IOC appear on a new line, with no delimiters,  separators, or additional notes or comments.

  Here's an example for what a feed of malicious IPs might look like:

  ```
  1.1.1.1
  2.2.2.2
  3.3.3.3
  ```
  
  If you would like to add a private feed of another format, please <a class="intercom-launch" href="mailto:help@logz.io">contact our Support team</a> and they will be happy to assist.


### Validated format by IOC type

| IOC type | Format |
| IP | valid IP address |
| DNS | valid domain name (string) |
| URL  | valid URL |
| MD5 | 32 characters |
| SHA1 | 40 characters |
| SHA256 | 64 characters |
| USER-AGENT | max size 2 KB (string)  |
| CUSTOM | max size 64 characters (string)  |
