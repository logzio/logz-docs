---
layout: article
title: Threat Intelligence feeds
permalink: /user-guide/cloud-siem/threat-intelligence.html
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
contributors:
  - shalper
---

Cloud SIEM syncs with industry-recommended Threat Intelligence (_TI_ for short) feeds to stay current with databases of known IOCs and malicious IPs, DNSs, and URLs.

Logz.io syncs each feed once daily to look for updates. The last sync time is shown in the table.

Cloud SIEM cross references incoming logs against Threat Intelligence feeds to identify malicious IPs, DNSs, and URLs. Logs are scanned for appearances of IOCs (Indicator of Compromise) and [enriched when they are found](/user-guide/cloud-siem/malicious-IPs.html#log-enrichment).

Threats are tagged by their level of severity as indicated by the confidence of the source, to help reduce false-positives and to promote response to higher-risk threats.


#### Review TI feeds

To open the list of feeds, go to **Threats > Threat Intelligence Feeds** from the top menu.

![TI feeds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/add-private-feed.png)

The list of TI feeds shows the feed name and a description of the feed, its IOC type, the calendar date when it was last synced, and includes the direct link to view the source feed.

#### Research an IOC

If you are in need of researching a specific IP, URL, or domain, you can check if it is found in any of your feeds.

You can click the source link to research the indicator and look up additional details.


![Look up an IOC](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/look-up-ioc.png)


