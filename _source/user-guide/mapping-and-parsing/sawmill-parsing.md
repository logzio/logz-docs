---
layout: article
title: Creating parsing rules for your logs with Sawmil Editor
permalink: /user-guide/mapping-and-parsing/sawmill-parsing.md
beta: yes
plan: community
tags:
  - parsing
contributors:
  - yberlinger
  - afishler
---

### External parsing process overview

Use the Sawmill editor to write parsing pipelines, validate the pipelines, then apply those customized rules to logs ingested by your Logz.io account.  

The typical parsing pipeline creation flow includes the follwing steps:  
1. Creating new rules.
2. Editing existing rules.
3. Testing how the rules transform your logs. 
4. Validating your pipeline.
5. Submitting the rules to Logz.io for review.
6. Applying the validated rules to ingested logs. 

The parsing tool is available [here.](https://sawmill-logz.herokuapp.com/)

### What is Sawmill?

The [Sawmill open source library](https://github.com/logzio/sawmill) is used for JSON text transformations. 

A Sawmill pipeline is composed of a series of steps that are applied to a specific log type. Each step is a Sawmill processor which performs an action, transformation, or includes some logic to enrich your logs.

You set the processor step order according to the transformations and changes needed to meet your parsing requirements.

The collection of Sawmill processors can be found in the [Github wiki for the project.](https://github.com/logzio/sawmill/wiki)  

### The Sawmill parsing editor

The Sawmill parsing editor tool works with the Logz.io public API and lets you
access and edit your existing parsing rules, test and validate the rules to examine how they act on your logs and eventually submit the rules so that they are applied on your logs.

### Before you begin

Prerequisites

* To use the Sawmill parsing editor, to access the Logz.io API tokens, you must be an admin user for the relevant Logz.io account.
* Obtain or create an API token to work with the Logz.io public API. We recommend that you create a dedicated API token for parsing tasks. Navigate to the Manage tokens page. <!-- add the relevant link or include snippet --->