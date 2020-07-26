---
layout: article
title: Investigate malicious IPs
permalink: /user-guide/cloud-siem/malicious-IPs.html
flags:
  logzio-plan: enterprise
tags:
  - logz.io-security
  - siem
  - threat
contributors:
  - shalper
---

Cloud SIEM scans logs for malicious IPs using threat feeds as threat intelligence sources and enriches the original logs.
The **Threats Overview** dashboard aggregates all suspected IPs from all sources in a single observability platform.

You can filter the dashboard by feed name, feed confidence, or country of origin. You can also filter by log type to check for malicious IPs reported by a specific security product.

Once you are ready to investigate a particular IP, click the IP drilldown link. It will lead you to the **IP Investigation** dashboard for the selected IP. There you'll be able to see the details of its activity in your environments and investigate the original logs for further information.


<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/investigate_IP.mp4" type="video/mp4" />
</video>

### Log enrichment

Logz.io enriches logs with appearances of malicious and suspected IPs (as well as DNSs and URLs) to make them easier and faster to track, investigate, and remediate. Below is the list of enrichment fields.

![Attacker IP list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/malicious-ip-logs.png)

|---|---|
| logzio_security.ioc.malicious_ip | The malicious or suspected IP. It is also a **drilldown link**. Click on it to open the **IP Investigation** dashboard and quickly pull up the relevant logs and a summary of the IP's activity. |
| logzio_security.origin_feeds | The feed is the threat intelligence source. To research the feed provider, the last time the feed was synced, and more, go to **Threats > Threat Intelligence Feeds** from the top menu and review the feed information. |
| logzio_security.severity | The severity is extrapolated from the confidence assigned to the feed. Feed confidence is determined by Logz.io and is not configurable. |
| logzio_security.context | Additional context as provided by the threat intelligence feed. |
{:.paramlist}
