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

Automate your security responses to the security threats flagged by Logz.io using Cortex XSOAR (formerlly Demisto), a 3rd party tool.  

If you're working with both Cortex XSOAR and Logz.io Cloud SIEM, you can set up the integration in Cortex XSOAR, the industry-leading Security Orchestration, Automation & Response (SOAR) solution. 

Logz.io is a fully-managed observability platform powered by open-source technologies that assures scalability, availability, and security.

Logz.io Cloud SIEM is an extension aimed at securing distributed cloud workloads with simplified, DevOps-native threat detection and security analytics. It runs security analytics and compliance tests on the log data managed by Logz.io. It is accessed from the Logz.io Security account.

The integration of Logz.io with Demisto is a two-way integration. The integration is focused on retrieving security alerts from Logz.io and allowing Demisto users to search across the logs stored in the Logz.io platform to increase observability into incident details. .

The integration allows Demisto to automatically:
Fetch an incident when a security rule triggers in the Logz.io Security account. Fetching can be set by rule severity and/or search query.
Trigger responses in Playbooks following incidents originating in triggered Logz.io security rules.
Run a command to query a Logz.io Operations account for the original logs that triggered Logz.io security rules.
In addition, Demisto analysts can query and investigate logs from a Logz.io Operations account directly from the Demisto interface. This is done using the xxxxx command.



Use Cases
Demisto can automatically fetch incidents when security alerts trigger in Logz.io. Fetching can be limited by filtering Logz.io security alerts by severity and contents.
Demisto Playbooks can query for logs in Logz.io to retrieve the specific events that triggered the alerts.
Demisto analysts can query the Logz.io logging database directly from the Demisto interface.


Logz.io is a fully-managed observability platform powered by open-source technologies that assures scalability, availability, and security.

Logz.io Cloud SIEM is an extension aimed at securing distributed cloud workloads with simplified, DevOps-native threat detection and security analytics. It runs security analytics and compliance tests on the log data managed by Logz.io. It is accessed from the Logz.io Security account.

The integration of Logz.io with Demisto is a two-way integration. The integration is focused on retrieving security alerts from Logz.io and allowing Demisto users to search across the logs stored in the Logz.io platform to increase observability into incident details. .

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

