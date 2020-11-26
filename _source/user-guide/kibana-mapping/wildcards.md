---
layout: article
title: Wildcards
permalink: /user-guide/kibana/wildcards/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
---

Wildcards can be useful when you need to run a search on an indefinite term.

But you'll need to keep in mind that wildcard searches are very heavy and memory intensive.

* Use **<i class="fas fa-question"></i>** to replace a single character

  For example, run
* Use **<i class="fas fa-asterisk"></i>** to replace any number of characters (even 0)





Lucene query syntax

No leading wildcards, *MEM ,
Contact our support to index
Different Tokenization
Contact support to allow leading wildcards
Send the data
Hostname *prod* but if it’s



### Limitations


Leading wildcards are forbidden
you can change your field to be analyzed
otherwise, you can contact support


### Workarounds and alternatives

1. If you are looking for a field, regardless of the value it contains as long as it is not null, search for `_exists_:field_title`.

For example, search for `_exists_:error_code` to return logs with any error code.

1. If you need to search for part of the field contents, you can change its [mapping](/user-guide/kibana/mapping/) to be an analyzed field.

Analyzed fields tokenize longer strings. Tokenization is the process of breaking a text into terms based on pre-defined characters, such as a space, a period, and underscore, etc.


 which is in a defined set.   a field  tokenize  down you can change your field to be analyzed

ou can use the exists query. any value where the field title has any non-null value:



[Field mapping](https://app.logz.io/#/dashboard/tools/field-mapping) page.