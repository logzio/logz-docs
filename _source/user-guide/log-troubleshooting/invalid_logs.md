---
layout: article
title: Understanding invalid log errors
permalink: /user-guide/invalid_logs/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn about invalid logs and the error tags that help you resolve issues
flags:
  logzio-plan: community
tags:
  - invalid-logs
contributors:
  - yberlinger
---

## What causes an invalid log? 

When a log that includes specific issues is received, the log is flattened and ingested, the **`type`** field is changed to **`logzio-invalid-log`**,  and the **`tags`** field is added to the log to identify the issue.

![Invalid log example](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/invalid_log_eg-dec2021.png)

## Invalid log tags

The tags in the table below identify the character or field limitations that may result in a log being labeled with the **`logzio-invalid-log`** field.

|Tag|Description|
|---|---|
| MAX_LOG_LINE_LENGTH | Exceeded the maximum of 500K characters per log|
| MAX_FIELD_KEY_SIZE *-or-*<br> INVALID_FIELD_VALUE_LENGTH | Exceeded the maximum of 32700 characters per field|
| MAX_JSON_DEPTH | Exceeded the maximum of 10 field nesting levels per log message |
| MAX_FIELDS_NUMBER *-or-*<br> INVALID_FIELDS_NUMBER | Exceeded the maximum of 1000 fields per log message|
| FIELDS_MISSING | This error is related to required fields that are missing from your logs: For example, `@timestamp`.<br> Check if the parsing rules remove or rename the relevant fields. |
| ARRAY_INDEX_OUT_OF_BOUNDS_EXCEPTION | One of the field names in the log includes a dot (**`.`**): To resolve the issue, flatten the field that the **`.`** is nested under. <br>If the field is inside an array, you'll need to flatten the array field. <br><br> For  example, you'd need to flatten the field `xxx.yyy` |

