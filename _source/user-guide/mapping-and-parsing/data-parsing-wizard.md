---
layout: article
title: The data parsing wizard (deprecated)
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Log data parsing wizard for Community (free) accounts
permalink: /user-guide/mapping-and-parsing/data-parsing-wizard.html
flags:
  logzio-plan: community
tags:
  - data-parsing
contributors:
  - amosd92
  - tdelrios
  - imnotashrimp
---

Parsing is the process of breaking down your log message into smaller chunks of data,
placing each chunk into its own specific named field,
and enriching data with additional information such as geolocation.
Parsed logs can be more easily analyzed than raw data,
allowing you to create rich visualizations and helpful alerts.

Parsing is not necessary for all types of logs.
But if you use a custom or uncommon log type,
parsing can be an invaluable tool.

You can analyze a set of sample logs for a Community (free) account in the data parsing wizard,
to simplify the process.

When you're logged into a Community account, you can find the data parsing wizard by selecting [**Logs > Data Parsing**](https://app.logz.io/#/dashboard/data-parsing/step1) from the menu.


<!-- info-box-start:info -->
**Deprecation notice**<br>
With the release of [Logz.io Data Parsing](https://docs.logz.io/user-guide/mapping-and-parsing/sawmill-parsing.html), **the parsing wizard is deprecated for trial and paid accounts.** 
<br>
The parsing wizard is only available for Community (free) accounts.
{:.info-box.note}
<!-- info-box-end -->

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
see [grok patterns](https://github.com/elastic/elasticsearch/blob/master/libs/grok/src/main/resources/patterns/grok-patterns)
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
