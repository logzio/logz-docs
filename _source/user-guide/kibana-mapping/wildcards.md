---
layout: article
title: Wildcards
permalink: /kibana/wildcards/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
---

Wildcards can be useful when you need to run a search on an indefinite term or a partial string.

In Lucene query syntax:

* Use **<i class="fas fa-question"></i>** to replace a single character
* Use **<i class="fas fa-asterisk"></i>** to replace any number of characters (even 0)

### Leading wildcards are disabled

Wildcard searches are extremely resource heavy, memory intensive, and slow to run. For your protection, **leading wildcards are disabled**. This means your searches cannot begin with a wildcard.

### Workarounds and alternatives

<div class="tasklist">

##### Change the field mapping to an **analyzed field**

If you want to search by partial field contents, you have the option to change a field's mapping to **analyzed text**.

Analyzed fields support filtering for a value that contains a certain string. For example, if you are looking for a host instead of searching with a wildcard for `host:*


Analyzed text fields tokenize longer strings to support fulltext search on individual terms. For example, a sentence can be tokenized into words, or a complex naming structure can be tokenized into stand-alone naming components. 

The tokenizing processor can use different pre-defined characters to cut up the string into shorter terms. These characters may be spaces, periods, slashes, underscores, etc. 

By mapping a field as an analyzed text field, you should be able to substitute your need to search with leading wildcards with trailing wildcards.

For example, if your hosts have long, complex naming conventions, you can map the field twice, once as analyzed text, in addition to its default mapping. As an analyzed field, you will be able to search by parts of the host names or filter by partial host names.

To explicitly change a field mapping,
select [<i class="li li-gear"></i> > Tools > Field mapping](https://app.logz.io/#/dashboard/tools/field-mapping)
from the top menu. Search for the field name, hover over it, and change its mapping to **analyzed**.

![Explicit field mapping in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-mapping/kibana-field-mapping.png)

##### Contact support to request a custom configuration

Leading wildcards can be enabled for specific fields upon request.

If the above solutions do not satisfy your needs, please <a href="mailto:help@logz.io?subject=Requesting querying assistance &body= Hi! Please be in touch regarding leading wildcard support for specific fields. Thanks!">contact support</a> to request a customized solution.

</div>