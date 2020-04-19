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

Automate your security responses to the security threats flagged by Logz.io using [Cortex XSOAR](https://www.paloaltonetworks.com/cortex/xsoar) (formerly Demisto), the industry-leading Security Orchestration, Automation & Response (SOAR) solution. 

Integrate your Logz.io Cloud SIEM with Cortex xSOAR (formerly Demisto) to automatically remediate security incidents identified by Logz.io and increase observability into incident details. The integration allows Cortex xSOAR users to implement playbooks to automatically remediate incidents identified by Logz.io Cloud SIEM. In addition, Cortex xSOAR users can query Logz.io directly from Cortex xSOAR to investigate open questions or retrieve the logs responsible for triggering security rules.

In addition, users working in Cortex xSOAR can use Logz.io commands to run queries and investigate logs directly from the Cortex xSOAR interface. 
The log data is parsed, indexed, managed, and stored in your Logz.io Log Management account (i.e. the Operations account).


Use Cases
* Cortex xSOAR can automatically fetch incidents when security alerts trigger in Logz.io. Fetching can be limited by filtering Logz.io security alerts by severity and contents.
* Cortex xSOAR Playbooks can query for logs in Logz.io to retrieve the specific log details that triggered as security events
* Cortex xSOAR analysts can query the Logz.io logging database directly from the Cortex xSOAR interface.

The integration of Logz.io with Cortex xSOAR allows Cortex xSOAR to do the following automatically:
* Fetch an incident when a security rule triggers in the Logz.io Security account. Fetching can be set by rule severity and/or search query.
* Trigger responses in Playbooks following incidents originating in triggered Logz.io security rules.
* Run a command to query a Logz.io Operations account for the original logs that triggered Logz.io security rules.

The integration allows Demisto to automatically:
Fetch an incident when a security rule triggers in the Logz.io Security account. Fetching can be set by rule severity and/or search query.
Trigger responses in Playbooks following incidents originating in triggered Logz.io security rules.
Run a command to query a Logz.io Operations account for the original logs that triggered Logz.io security rules.
In addition, Demisto analysts can query and investigate logs from a Logz.io Operations account directly from the Demisto interface. This is done using the xxxxx command.




Playbooks
Logz-Get-Events-From-Alert

This Playbook gets the related logs from the Logz.io platform related to a specific Alert that was retrieved via fetch_incidents. The input covers the Logz.io Alert with all its metadata.
Note: This playbook must use the GenericPolling mechanism : https://demisto.pan.dev/docs/generic-polling

Logzio Malware Found Playbook(Demo)
A Playbook that we are working on as part of our Demo
Alert coming from Logz.io via our fetch command
Mandatory fields are mapped and some unique fields from McAfee in the alert are mapped as well
Playbook triggered if the alert comes from Logz.io which we have a fields for it
Since its a malware found :
Checking the hash in VT _ Hybrid analysis
At the same time fetching the RAW Logs from Logz.io with our Task(command) we developed - will fetch the logs that triggered the alert, can be several logs
Checking if the result from VT and Hybrid are passing our “detected engines “ for the specific hash came in
IF result > 1 detections - go to next step
IF NOT - assign to analyst and send Email
(Next Step) Saving the results from VT/Hybrid/Logzio RAW Logs as evidence
Since its a McAfee we can also try and fetch information from endpoint
Searching the Raw Logs from Logz.io command for some fields that are related to the alert such as: path/name/action/result/errors/etc
Filling relevant information in incident fields accordingly
Assigning to human analyst for further investigation
Playbook targets are to perform first analysis in an automated approach while also having the Raw Logs that triggered the Alert that came to Demisto and use those results as part of the next tasks in the playbook like every other field that contains result
The Use :
First automated response to Logz.io customers who uses Demisto as SOAR solution
Collecting Data throw Demisto on the alert came in and order all the information collected inside the incident
Having the option to communicate with your Logz.io account in order to fetch specific logs that related to the alert or even before the alert happened
Setting up the ground in terms of static information for human analyst to take action
Use Logz.io fields in other commands and tasks for escalated actions for example

