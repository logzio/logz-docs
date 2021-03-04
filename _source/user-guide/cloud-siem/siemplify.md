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

#### Setting up the integration in Siemplify

<div class="tasklist">

##### Add a Logz.io instance to your Siemplify workspace

To set up an integration with Logz.io as a **Default Environment**, you can add Logz.io directly from the Siemplify Marketplace.

In Siemplify, open the **Marketplace** and search for Logz.io. Select the cogswheel to configure a new instance.

![Add Logz.io from the Siemplify Marketplace](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-marketplace.png)


Alternatively, if you prefer to add Logz.io as a **Shared Instance**, select the **cogswheel <i class="fas fa-cog"></i> > Integrations** from the top right menu. Select **Shared Instance** from the left menu, then select the plus ➕ to add a new instance. Select the **Logz.io integration** and save.

![Add Logz.io as a Shared Instance to your Siemplify workspace](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-shared-instance.png)

##### Fill in the Logz.io integration panel

Fill in the Logz.io integration panel:

1. **Logz.io Security Token** - Enter the token for your selected Security account.
2. **Logz.io Region** - Enter the 2-letter region code for your Logz.io account. [Look up your Logz.io account region code](https://docs.logz.io/user-guide/accounts/account-region.html).
3. **Logz.io Operations Token** - Enter the token for your selected Log Management account.
4. **Logz.io Custom Endpoint** - (Optional) Only relevant if you use a custom URL with the Logz.io API.
    * Enter the base url, without the direct path to the method
    * Relevant if your Logz.io endpoint is _NOT_ in the standard format of `api(region_code).logz.io/`.
    * Overrides `logzio_region`
5. Test your connection and save it!

![Logz.io integration panel for Siemplify](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-configure-instance.png)

##### Create the Logz.io connector

Configure the Logz.io connector `LOGZ.IO fetch-security-events` to create cases in your Siemplify workspace from Logz.io security events.

Logz.io writes a security event log whenever a security rule triggers in your Logz.io Cloud SIEM account. The event log contains details about the rule that was triggered and its conditions.


![Siemplify Logz.io connector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-connector.png)

Provide the The import command runs every minute to fetch new incidents based on the filtering configurations set in the integration panel.

![Configure a Siemplify Logz.io connector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-integrations-panel.png)

Enable the connector and save it to fetch security events from Logz.io as cases in Siemplify.

##### Use Logz.io Actions and Playbooks



![Sample playbook for threat hunting with Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-playbook.png)

