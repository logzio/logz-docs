---
layout: article
title: IOC types
permalink: /user-guide/siem/ioc-types/
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

You can enrich threat detection with your own private feed of IOCs.
This page explains the requirements to help you prepare the feed so it can be pulled by Logz.io.

### Supported types

Supported IOC types include: IPs, md5/sha1/sha256 hash signatures, domains, URLs, user-agent headers, and other custom indicators.

Custom IOCs are generally useful for creating a list of usernames or email addresses. Keep in mind that each feed needs to contain entities of the same type and stick to a single format so that they can be automatically parsed by the system.

### General requirements

* Maintain IOC-specific feeds. Each list can contain a single type and must meet the validation requirements for the type, as explained below.
* The feed should not exceed 10K entities. (Keep your list to 10,000 IOC entities or fewer.)
* The default format requires that every IOC appears on a new line. This means you should avoid using separators or adding explanations or comments.

  Here's an example for what a feed of malicious IPs should look like:

  ```
  1.1.1.1
  2.2.2.2
  3.3.3.3
  ```
* If you want to use a feed that is formatted differently, <a class="intercom-launch" href="mailto:help@logz.io">contact our Support team</a> and they will be happy to assist.
### Validated format by IOC type

| IOC type | Format |
| IP | valid IP address |
| DNS | any format (string) |
| URL  | valid URL |
| MD5 | 32 characters |
| SHA1 | 40 characters |
| SHA256 | 64 characters |
| USER-AGENT | any format (string)  |
| CUSTOM | any format (string)  |
