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

Cloud SIEM cross references incoming logs against lists of known Indicators of Compromise (IOCs) to automatically detect threats. IOCs are sourced from recommended Threat Intelligence feeds that crowdsource and scrape the internet for malicious and suspected IPs, DNSs, and URLs.

When an IOC is detected, the original log is [enriched with the relevant details](/user-guide/cloud-siem/malicious-IPs.html#log-enrichment).

Threat severity is determined by the confidence of the source. The severity is ranked on a scale of 1-5, 5 being the highest, to help reduce false-positives and to promote response to higher-risk threats.


#### Review feeds

To open the list of feeds, go to **Threats > Threat Intelligence Feeds** from the top menu.

![TI feeds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/add-private-feed.png)

The list of feeds shows the feed name and a description of the feed, its IOC type, the calendar date when it was last synced, and includes the direct link to view the source feed.

Logz.io syncs each feed once daily to look for updates. The last sync date is shown.

There is also an option to add a private feed of malicious IPs. See [Adding a private feed](/user-guide/cloud-siem/private-feeds.html).

#### Research an IOC

If you are in need of researching a specific IP, URL, or domain, you can check if it is found in any of your feeds.

You can click the source link to research the indicator and look up additional details.

![Look up an IOC](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/look-up-ioc.png)


