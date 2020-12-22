---
layout: article
title: Search wildcards
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

## Leading wildcards are disabled

Wildcard searches are extremely resource heavy, memory intensive, and slow to run.

For your protection, **leading wildcards are disabled**. This means your searches cannot begin with a wildcard. For example, you can run a free text search for `string` but not for `*string`. Similarly, you can run a search with a `field:value` such as `key: something` but not `key: *string`.

### Workarounds and alternatives

<div class="tasklist">

##### Change the field mapping to an **analyzed field**

If you want to search by partial field contents, you have the option to change the field mapping to **analyzed text**.

Analyzed fields support filtering for a value that contains a certain string and can replace the need for leading wildcards.

For example, say you are looking for a particular host, instead of searching with a leading wildcard for `host:*prod*`, you can use the filters to filter under the field `host` for a value that contains `prod`.

###### Analyzed text fields tokenize strings

Analyzed text fields tokenize longer strings to support fulltext search on individual terms. 

Tokenization can mean indexing the words in a sentence, or breaking up a complex naming structure into stand-alone naming components to support more robust filtering options.

The tokenizing processor can use different predefined characters as delimiters to cut up the string into shorter terms. These can be spaces, periods, slashes, underscores, etc.

To change a field mapping,
select [<i class="li li-gear"></i> > Tools > Field mapping](https://app.logz.io/#/dashboard/tools/field-mapping)
from the top menu. Search for the field name, hover over it, and select the **analyzed** mapping option. The field will be explicitly mapped.

![Explicit field mapping in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-mapping/kibana-field-mapping.png)

##### Contact support to request a custom configuration

If the above solutions do not satisfy your needs, please <a href="mailto:help@logz.io?subject=Requesting querying assistance &body= Hi! Please be in touch regarding leading wildcard support for specific fields. Thanks!">contact support</a> to request a customized solution.

</div>