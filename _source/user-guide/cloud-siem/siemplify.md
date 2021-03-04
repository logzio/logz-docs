---
layout: article
title: Integrate with Siemplify
permalink: /user-guide/cloud-siem/integration/siemplify/
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-rules
  - siemplify
  - third party integrations
contributors:
  - shalper
---

Integrate your Logz.io Cloud SIEM with [Siemplify](https://www.siemplify.co/) to automatically remediate security incidents identified by Logz.io and increase observability into incident details. 

Siemplify is an industry-leading Security Orchestration, Automation & Response (SOAR) solution. The integration allows Siemplify users to implement playbooks to automatically remediate incidents identified by Logz.io Cloud SIEM.

In addition, users working in Siemplify can run Logz.io queries as Siemplify playbook actions to investigate events directly from the Siemplify interface. By integrating with Siemplify users can run Lucene queries on their Logz.io Cloud SIEM account to investigate open questions.

accounts or investigate specific events to retrieve the logs responsible for triggering security rules.

## Advantages of the integration

* Siemplify can automatically fetch Logz.io security events as new cases.
  If you prefer to be selective about event fetching, filter Logz.io security events by rule severity and/or rule name.

* Siemplify playbooks can trigger automated responses to cases originating in security events identifed by Logz.io.

* Get event details for a specific case. Any Siemplify playbook can use Logz.io actions to increase observability by querying logs for additional details.

* Implement the Logz.io out-of-the-box **Threat Investigation Playbook** for guidance and best practices for conducting an investigation.

#### To set up the integration in Siemplify

In Siemplify, click **Settings > Integrations** and search for Logz.io. Click the cogswheel to configure a new instance and open the integration panel.

Fill in the Logz.io integration panel. Instructions are provided directly in the panel and Siemplify help page.



* **Incident fetching**

  A security event is logged by Logz.io whenever a security rule triggers in your Logz.io Cloud SIEM account. The event log contains details about the rule that was triggered and its conditions.

  If enabled, the integration will fetch security events from Logz.io as incidents in Siemplify. The import command runs every minute to fetch new incidents based on the filtering configurations set in the integration panel.

  The maximum number of incidents returned per query is configurable, but capped at 50. By default, the results are returned sorted by date ascending (earliest first).

  Events from the last 3 minutes are excluded from incident fetching to allow for sufficient log processing time.
  {:.info-box.important}


