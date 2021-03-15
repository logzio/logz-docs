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
  - playbook
contributors:
  - shalper
---

Integrate your Logz.io Cloud SIEM with [Siemplify](https://www.siemplify.co/) to automatically remediate incidents identified by Logz.io Cloud SIEM and increase observability into incident details.

Siemplify is an industry-leading Security Orchestration, Automation & Response (SOAR) solution that gives SOC teams the ability to manage Security Operations from a single platform.

## Advantages of the Logz.io <> Siemplify integration

* Siemplify can automatically fetch Logz.io security events as new cases.
  If you prefer to be selective about event fetching, filter Logz.io security events by rule severity and/or rule name. Retroactive fetching is fully supported.

* Siemplify playbooks can trigger automated responses to cases originating in security events identifed by Logz.io.

* Get event details for a specific case. Any Siemplify playbook can use Logz.io actions to increase observability by querying logs for additional details. Siemplify users will be able to run log queries on their Logz.io data within Siemplify playbook actions and investigate events directly from the Siemplify interface.

* Implement the out-of-the-box **Logz.io Indicator Hunting Playbook** for guidance and best practices for conducting an investigation.

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

Logz.io writes a security event log whenever a security rule triggers in your Logz.io Cloud SIEM account. The event log contains details about the rule that was triggered and the conditions it met.


![Siemplify Logz.io connector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-connector.png)


1. Configure the connector to open new Siemplify cases based on security events triggered in Logz.io Cloud SIEM. You can make use of the filtering options to be selective about the events.

2. Enable the connector.

3. Save the connector. Siemplify will now fetch security events from Logz.io and open new cases accordingly.

    If you have configured retroactive fetching, there may be many cases created all at once, when you first enable the connector.

![Configure a Siemplify Logz.io connector](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-integrations-panel.png)


##### Use Logz.io Actions and Playbooks

The Logz.io integration offers a sample indicator hunting playbook for Siemplify. The playbook can be used to investigate and hunt Indicators of Compromise (IOCs), such as file hashes, suspicious IP addresses, domains, and URLS.

The playbook makes use of Logz.io actions that investigate events and output related information concerning the events, including involved users, IP addresses, host names, etc. that can be used to further research the indicators. Learn more about [investigating security events in Logz.io](/user-guide/cloud-siem/security-events.html) and by [API](/api/#operation/searchSecurityRuleEventLogs).


![Sample playbook for threat hunting with Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-playbook.png)

</div>


#### Logz.io Actions for Siemplify

Logzio-search-logs


| Parameter | Type | Default | Description |
|---|---|---|---|
| from_time |
| to_time |
| query | 
| size |  







#### Initializing the Logz.io playbook in Siemplify

<div class="tasklist">

##### Add the Logz.io Playbook

In your Siemplify workspace, import the playbook **Logz.io Indicator Hunting**.

The playbook makes use of the following actions:

* logzio-search-logs
* logzio Json-adapter
* Trigger - custom value
* Blocks
* Previous action conditions
* Instruction
* Case tag
* Create entity relationship


##### Initialize the block parameters

The playbook offers 4 use-cases (aka _branches_), each specific to a single indicator type: hash, URL, IP, and domain.


![Logz.io Indicator Hunting playbook for Siemplify should be initialized for a single indicator type](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-initialize-block.png)


Configure the input parameter that will initialize the playbook.

| Action | Field | Description |
|---|---|---|
| Hash_initialize_block| PB_Hash | Initializes hash input parameters |
| URL_initialize_block| PB_Url | Initializes URL input parameters |
| IP_initialize_block| PB_IP | Initializes IP input parameters |
| Domain_initialize_block| PB_Domain | Initializes domain input parameters |

![Initialize the input block for the Logz.io playbook for Siemplify](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/siemplify-initialize-block2.png)


##### Initialize the json-adapter parameters

Whenever the initializing block is triggered, the `Logzio-search-logs` action will automatically run a search query in your Logz.io account for logs that match the output of the initializing block.

The action returns an array of relevant logs that matched the query in JSON format. The results are designed to help SOC analysts investigate the context surrounding the indicator.

The `Logzio-json-adapter` action translates Logz.io output into entities that conform to the Siemplify schema and can be reused by any Siemplify playbook and action.

In the example below, the action searches for `sourceHostName` in all the logs and extracts the results to a Siemplify entity.


You can provide more than 1 field, regardless of the log type.
{:.info-box.note}


![Initialize the Logz.io json adapter for Siemplify](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/hash-json-adapter.png)


##### Investigate the indicator

In our example, the playbook ran an action to extract the field `sourceHostName` from all logs. As a result, the playbook identified another `hostname` affected by the same hash indicator. The red color indicates that the new station is involved and was discovered by the playbook.


![Output example for the Logz.io incident hunting playbook for Siemplify](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siemplify-integration/playbook-output-example.png)


##### Repeat for other indicator types


The **Logz.io Indicator Hunting Playbook** can help you track several indicator types. You'll need to repeat the process to initialize the playbook for each indicator type, as relevant.


The set of actions for each branch are indicator-specific, yet equivalent.
{:.info-box.note}
