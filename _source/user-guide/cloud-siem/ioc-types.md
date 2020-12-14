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

Supported IOC types include: IPs, md5/sha1/sha256 hash signatures, domains, URLs, user-agent headers, and other custom indicators.

To connect , you will need to maintain a private feed of malicious or suspected IOCs and host it where it can be fetched by Logz.io.

### Required formats by IOC type

| IOC type | Format |
| IP | x.x.x.x |
| DNS | any format (string) |
| URL  | valid URL |
| MD5 | 32 characters |
| SHA1 | 40 characters |
| SHA256 | 64 characters |
| USER-AGENT | any format (string)  |
| CUSTOM | any format (string)  |

### About hashes and custom IOCs

MD5, SHA1, SHA256 hash signatures are useful for identifying attacks over email and phishing. Hashes that appear in logs can flag malicious files including images, documents, compressed files (rar & zip), and text files.

Custom IOCs may be other indicators such as a list of usernames or email addresses. The key thing to keep in mind is that they will all need to have a similar format so that they can be automatically parsed by the system.
