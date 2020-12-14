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

Cloud SIEM cross references incoming logs against lists of known Indicators of Compromise (IOCs) to automatically detect threats. IOCs are sourced from recommended Threat Intelligence feeds that crowdsource and scrape the internet for malicious and suspected IPs, domains, URLs, and md5/sha1/sha256 hash signatures.

When an IOC is detected, the original log is [enriched with the relevant details](/user-guide/cloud-siem/malicious-IPs.html#log-enrichment).


#### Review feeds

To open the list of feeds, go to **Threats > Threat Intelligence Feeds** from the top menu.

![TI feeds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/add-private-feed.png)

The list of feeds shows the feed name and a description of the feed, its IOC type, the calendar date when it was last synced, and includes the direct link to view the source feed.

Logz.io syncs each feed once daily to look for updates. The last sync date is shown.

There is also an option to add a private feed of malicious IPs. See [Adding a private feed](/user-guide/cloud-siem/private-feeds.html).

#### Research an IOC

If you are in need of researching a specific IOC, you can check if it is found in any of your feeds. Search for the specific IOC to see in which feeds it is mentioned.

You can click the source link to research the IOC and look up additional details.

![Look up an IOC](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/look-up-ioc.png)


