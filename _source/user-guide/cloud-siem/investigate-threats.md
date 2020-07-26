---
layout: article
title: Investigate threats
permalink: /user-guide/cloud-siem/security-threats.html
flags:
  logzio-plan: enterprise
tags:
  - logz.io-security
  - siem
contributors:
  - shalper
---

Cloud SIEM scans logs for malicious IPs using threat feeds as intel sources.
The **Threat Overview** dashboard aggregates all suspected IPs from all sources in a single observation platform.

You can filter the dashboard by feed name, feed confidence, or country of origin. You can also filter by log type to select for logs written by specific security services.

Once you are ready to investigate a particular IP, click the IP drill down link. It will lead you to the **IP Investigation** dashboard for the selected IP. There you'll be able to see the details of its activity in your environments and investigate the original logs for further information.


<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/investigate_IP.mp4" type="video/mp4" />
</video>

### Log fields of interest

Logz.io enriches logs with appearances of malicious and suspected IPs to make them easier and faster to track, investigate, and remediate. Below is the list of enrichment fields.

|---|---|
| logzio_security.ioc.malicious_ip | The IP flagged by Logz.io. It is also a **drill down link** to the **IP Investigation** dashboard to help you quickly pull up the relevant logs involving the IP. |
| logzio_security.origin_feeds | The name of the feed which served as the source of the threat intel. To research the feed provider, the last time the feed was synced, and more, go to **Threats > Threat Intelligence Feeds** from the top menu and review the feed information. |
| logzio_security.severity | The severity of the threat is extrapolated by the confidence assigned to the feed. Feed confidence is determined by Logz.io and is not configurable. |
| logzio_security.context | Indicates when a malicious host is involved. |
| currentDate | | 
| timestamp | |
{:.paramlist}


### Other paths of investigation

You can click the **<i class="fas fa-angle-right"></i>** button to expand the document. You'll be able to view the full event log and view surrounding documents.
