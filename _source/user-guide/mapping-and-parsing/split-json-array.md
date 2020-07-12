---
layout: article
title: Split an array
permalink: /user-guide/mapping-and-parsing/split-json-array.html
flags:
  logzio-plan: community
tags:
  - data-parsing
contributors:
  - yyyogev
  - shalper
---

Logs that are received as a JSON array cannot be properly parsed or mapping into fields.
This will impede your ability to search your logs efficienty.

Log data sent in an array cannot be used for configuring alerts or creating visualizations. This is why it's important to parse arrays into multiple log documents.

#### Shipping methods that support arrays

1. The Logz.io Kinesis Lambda function supports the option to parse an array of JSON objects into discrete events. That way, the logs can be fully parsed and mapped by Logz.io.

#### Parsed array: before & after

Here's an example of a log document that contains an array in the `messages` field:

```yml
{
   "eventID": "shardId-000000000000:495451152434977345683475644582180062593244200961",
   "level": "warning",
   "eventVersion": "1.0",
   "eventSource": "aws:kinesis",
   "type": "kinesis_lambda",
   "timestamp":"time",
   "messages":[
      {
         "message":"something went wrong in service A",
         "level":"error"
      },
      {
         "message":"something went wrong also in service B",
         "level":"error"
      },
      {
         "message":"something totally normal happened in service C",
         "level":"info"
      }
   ]
}
```

If the option to split the array is enabled, the array will be split into separate logs, with identical metadata. (Note that the field `level` became duplicate, and as a result the field taken from the array overrides the metadata).

In this example, the original log will be split into the following 3 logs. These are the ones that will be mapped in Logz.io:

```
{
   "eventID": "shardId-000000000000:495451152434977345683475644582180062593244200961",
   "level": "error",
   "eventVersion": "1.0",
   "eventSource": "aws:kinesis",
   "type": "kinesis_lambda",
   "timestamp":"time",
   "message":"something went wrong in service A"
}
{
   "eventID": "shardId-000000000000:495451152434977345683475644582180062593244200961",
   "level": "error",
   "eventVersion": "1.0",
   "eventSource": "aws:kinesis",
   "type": "kinesis_lambda",
   "timestamp":"time",
   "message":"something went wrong also in service B"
}
{
   "eventID": "shardId-000000000000:495451152434977345683475644582180062593244200961",
   "level": "info",
   "eventVersion": "1.0",
   "eventSource": "aws:kinesis",
   "type": "kinesis_lambda",
   "timestamp":"time",
   "message":"something totally normal happened in service C"
}
```
