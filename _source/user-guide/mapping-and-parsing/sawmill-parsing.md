---
layout: article
title: Customize your log parsing with Sawmill
permalink: /user-guide/mapping-and-parsing/sawmill-parsing
flags:
  admin: true
  beta: true
  logzio-plan: pro
tags:
  - parsing
contributors:
  - yberlinger
---

Create your own parsing rule pipelines for logs that are being ingested to your Logz.io account. Once validated on your end and on ours, your rule pipelines will be applied to your Logz.io account to transform your logs. 

<!-- info-box-start:info -->
You must be an account admin to apply a parsing pipeline to an account.  
{:.info-box.note}
<!-- info-box-end -->


## What is Sawmill and what is the Logz.io Parsing editor?

The [Sawmill open source library](https://github.com/logzio/sawmill) is used for text transformations. 

A Sawmill pipeline is composed of a series of steps that are applied to a specific log type. Each step is a Sawmill processor which performs an action, a transformation, or includes some logic to enrich your logs. You set the processor step order according to the transformations and changes you need to apply to meet your parsing requirements.

The collection of Sawmill processors can be found in the [Github wiki for the project.](https://github.com/logzio/sawmill/wiki)  


### The Logz.io Parsing editor

The Logz.io Parsing editor tool works with the Logz.io public API and lets you: 

1. Create, access, and edit custom parsing rules for a log type, using Sawmill processors.
2. Build a parsing pipeline for your logs from the rules.
2. Test and validate the pipeline to examine how it impacts your logs.
3. Submit the pipeline to Logz.io so that it can be reviewed, validated, and then applied to your ingested logs.

The **Logz.io Parsing editor** is available [here](https://parsing.logz.io/).

#### Create a parsing rule pipeline with Sawmill

This process creates parsing rules (pipelines) for the specified log type. The log type is a field used to differentiate the source of each log. You need to select one of your existing log types for the parsing rules. When you submit a pipeline to be applied on the backend, only the logs of the selected log type are processed.

<div class="tasklist">

##### Prerequisites

To use the Parsing editor you need a Logz.io API token. To get an API token, you must be an admin of a Logz.io account and follow the instructions below: 

1. To work with the Logz.io public API, obtain or create an API token in the [Manage tokens page](https://app.logz.io/#/dashboard/settings/manage-tokens/api). <br>We recommend that you create a dedicated API token for parsing tasks. 
   
    ![Manage API Tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/manage-api-tokens3.png)

2. Select your region. You can look up your Logz.io account region in [**Settings > General settings > Account settings > Region**](https://app.logz.io/#/dashboard/settings/general).  


##### Set up the Parsing editor

In the [Parsing editor](https://sawmill-logz.herokuapp.com/), click **Editor setup**.  

![Sample log process](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/editor_setup.png)
The **Editor setup** screen opens.

![credentials and log info](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing_cred2.png)

##### Set up your credentials and sample log information

In the **Editor setup** screen:

1. Enter your API token and region information. 
2. Choose a log type from the list of log types that have been ingested into your Logz.io account.
3. Add a sample log to use to validate your parsing rules. <br> The sample log can be a text or JSON string. To test different log formats, you can change the sample at any time.    
4. Click **Start parsing** to save your changes and start building your pipeline.

#####  Write parsing rules

You create your Sawmill pipeline in the left panel of the editor screen, either by writing a new pipeline or by editing a predefined pipeline loaded to the panel. The created pipeline must be a valid JSON file.

The editor supports autocomplete for existing Sawmill processors: Enter the start of a processor name, scroll through the options, and select the relevant option to load the full processor template.  

![Processor autocomplete](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parse_autocomplete.png)

Use **Auto re-format** to clean up your indentations. 

![Processor autoreformat](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/reformat_parsing.png) 


##### Validate your pipeline

Once you're satisfied with your draft pipeline, click **Validate your pipeline** to execute your pipeline rules against the log sample you provided. 

<!-- info-box-start:info -->
The Logz.io backend has a sequence of pipelines that run on your logs: Some of the pipelines are system wide and may affect the final result you see. <br><br>  Once validation is complete, you'll  be able to see the results in the Parsed log tab of the right panel. Use the display in the right panel to verify that your results reflect the parsed logs you expect to see.
{:.info-box.note}
<!-- info-box-end -->

##### Test parsing rules
The right panel is where you view and modify your log sample, and test how your rules are applied. 
![Testing parsing rules](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing_logs2.gif)
   
##### Submit your pipeline for review

When you're done editing the parsing rules, add the email for the admin user associated with your Logz.io account, along with information about the parsing mechanism you created, and click **Submit** to send your pipeline to Logz.io.




<!-- info-box-start:info -->
The parsing rules you create can only be applied to the Logz.io account that matches your API token, and are only valid for the log type you chose. <br> <br> To apply the parsing rules you create, you must be an admin for the account. 
{:.info-box.note}
<!-- info-box-end -->
