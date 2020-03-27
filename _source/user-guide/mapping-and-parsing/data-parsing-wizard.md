---
layout: article
title: The data parsing wizard
permalink: /user-guide/mapping-and-parsing/data-parsing-wizard.html
flags:
  admin: true
  logzio-plan: community
tags:
  - data-parsing
  - GROK
  - parsing
  - mappings  
contributors:
  - shalper
  - amosd92
  - tdelrios
  - imnotashrimp
---

### Enriching your data with advanced parsing 

All of your logs should be automatically parsed by Logz.io to help you find what you need fast. But sometimes, standard parsing just won't cut it. 

If you think a field isn't specific enough, you can use the 
**data parsing wizard** to break it up into more granular components. 

The wizard will allow you to test-run a GROK pattern and apply it to a specific log type. Once applied, your new GROK pattern will change your data mappings from that point forward. It's imporatant to keep in mind that the data will switch to a new index, so whenever your querying on the field that's changed, you'll need to do this separately for data that predates the change. 

Parsing changes never apply retroactively. Data is parsed before it's archived, so even if you're restoring data, the parsing change will cause a break in the data mappings. 

You can find the data parsing wizard by selecting [**<i class="li li-gear"></i> > Tools > Data Parsing**](https://app.logz.io/#/dashboard/data-parsing/step1) from the top menu.

![Data parsing wizard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing-and-mapping--data-parsing-wizard.png)


Logz.io automatically parses most log types. 
But if you use a custom or uncommon log type, you'll require custom parsing. 

You can analyze a set of sample logs in the data parsing wizard,
simplifying the process.

![Data parsing wizard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing-and-mapping--data-parsing-wizard.png)

You can find the data parsing wizard by selecting [**<i class="li li-gear"></i> > Tools > Data Parsing**](https://app.logz.io/#/dashboard/data-parsing/step1) from the top menu.

#### To use the data parsing wizard

##### Choose a data source

Choose the log type you want to parse from the **Select log type** list.

If the log type you want to parse is disabled,
Logz.io automatically parses it.
If you want to override the default parsing,
change the log type in your log shipper.
{:.info-box.note}

Click **Next** to continue.

##### Configure your parse settings

![Step 2: Parse](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing-and-mapping--step-2-parse.png)

If you want to change the sample log lines, click **Select**.
You can choose up to 5 sample lines.

Type your grok pattern in the **Parse method** text box.

<div class="info-box note notes">

* As you type, your parsed log lines are shown in the **Parse results** table.
  Use the colors to help you match the fields in the log lines
  with your parsing results.
* To omit data, do not name the fields.
* To override the log's existing message field,
  name one or more fields `message` in the grok pattern.
  If more than one is used,
  all message fields are concatenated into a single message field.
  If you don't use this field name,
  the log's existing message field will be used.
* After entering your grok pattern,
  you can define a field type for each field that you parse.
* You can let Logz.io detect each field's data type
  by leaving the default Automatic settings.
  Otherwise, you can define other data types,
  such as boolean, date, IP, and byte.
  _For example_:
  For geo-enrichment, you need to select the **Geo-Enrichment** field type.

</div>

To help make the best grok pattern for your logs,
use the [Grok Debugger](https://grokdebug.herokuapp.com/).
For reference,
see [grok patterns](https://github.com/elastic/logstash/blob/v1.4.2/patterns/grok-patterns)
from Elastic.
{:.info-box.tip}

Click **Next** to continue.

##### Enrich

![Step 3: Enrich](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing-and-mapping--step-3-enrich.png)

If any fields are parsed as geo IP,
choose which geo enrichment fields to add to your logs,
such as continent_code or country_name.

Configure any timestamp fields.
If there are more than one timestamp field, choose a **Leading timestamp**.

Click **Next** to continue.

##### Validate

![Step 4: Validate](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/parsing-and-mapping--step-4-validate.png)

In both of the tabs,
review **Unparsed logs** and **All logs**
to troubleshoot any problems with your grok pattern.

If everything looks good,
click **Apply** to parse future logs using these settings.
Otherwise, click **Back** to make changes to your settings.
