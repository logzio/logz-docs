---
layout: article
title: Integrate with Cortex xSOAR
permalink: /user-guide/cloud-siem/demisto-xsoar-integration.html
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

Integrate your Logz.io Cloud SIEM with [Cortex XSOAR](https://www.paloaltonetworks.com/cortex/xsoar) (formerly Demisto) to automatically remediate security incidents identified by Logz.io and increase observability into incident details. Cortex XSOAR is an industry-leading Security Orchestration, Automation & Response (SOAR) solution. The integration allows Cortex xSOAR users to implement playbooks to automatically remediate incidents identified by Logz.io Cloud SIEM. In addition, Cortex xSOAR users can query Logz.io directly from Cortex xSOAR to investigate open questions or retrieve the logs responsible for triggering security rules.

In addition, users working in Cortex xSOAR can use Logz.io commands to run queries and investigate logs directly from the Cortex xSOAR interface. 
The log data is parsed, indexed, managed, and stored in your Logz.io Log Management account (i.e. the Operations account).

## Advantages of the integration

* Cortex xSOAR can automatically fetch security events logged by Logz.io Cloud SIEM as incidents.
  If you prefer to be selective about incident fetching, filter Logz.io security events by rule severity and/or rule name.

* Cortex xSOAR playbooks can trigger automated responses to incidents originating in security events logged by Logz.io.

* Get event details for a specific incident. Any Cortex xSOAR playbook can use Logz.io commands to increase observability by querying logs for additional details. 

* Cortex xSOAR analysts can query logs directly from the Cortex xSOAR interface.


#### To set up the integration in Cortex xSOAR

In Cortex xSOAR, click **Settings > Integrations** and search for Logz.io. Click the cogswheel to configure a new instance and open the integration panel. 

Fill in the Logz.io integration panel:

1. **Fetches incidents**
   Enable this field if you want this integration to fetch triggered rules from Logz.io. If enabled, Demisto runs a command to import new incidents every minute based on the filtering configurations defined below. The maximum number of incidents returned per query is set to 50, and sorting is done by Date ascending (earliest first).

2. **API token for Logz.io Security account**
   To get the token, log into you Security account and access this [link](https://app.logz.io/#/dashboard/settings/api-tokens). You'll need to have an active API token for your Logz.io Cloud SIEM or you'll need to create one.

3. **API token for Logz.io Operations account**
   To get the token, log into you Operations account and access this [link](https://app.logz.io/#/dashboard/settings/api-tokens). You'll need to have an active API token for your Logz.io Log Management account or you'll need to create one.
   
4. **Region code of your Logz.io account**
   To identify your region code, follow the instructions under “How do I find my Region” [here](https://docs.logz.io/user-guide/accounts/account-region.html).

5. **Filter on rule names (Lucene syntax)**
   If you add this filter, only Logz.io security events that match this filter will be fetched as incidents by Cortex xSOAR. You can test a filter on the rule names in this [page](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC). Make sure you’re logged into your Logz.io Security account.

6. **Filter by rule severity**
   If you add this filter, only Logz.io security events that match this filter will be fetched as incidents by Cortex xSOAR. Rule severities are listed on this [page](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC). Make sure you’re logged into your Logz.io Security account.

7. **First-time retroactive fetch**
   Fetches rules that triggered before the integration was established. This is a one-time retroactive fetch. 
   
   Valid format:  <number> <time unit> in minutes/hours/months/years. E.g., 12 hours, 7 days (with a space).

8. For the remaining options, keep the defaults or adjust as instructed by Cortex xSOAR:

    * Trust any certificate (not secure) - Enable if the server does not have valid certification.
    * Use system proxy settings - Enable to communicate with Logz.io via a system proxy server.
    * Do not use by default
    * Reset the "last run" timestamp
    * Use single engine: No engine / Use Load-Balancing Group
