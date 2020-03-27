---
layout: article
title: Advanced parsing 
permalink: /user-guide/log-shipping/custom-parsing.html
flags:
  admin: true
  logzio-plan: community 
tags:
  - log-shipping
  - log-types
  - parsing 
   
contributors:
    - shalper
---

### Enriching your data with advanced parsing 

Your data should be automatically parsed by Logz.io to help you find what you need faster. 
If you think a field isn't specific enough, and want to tweak its parsing, you can use the 



### How do I know if I need custom parsing?  

If you recognize unparsed or poorly parsed logs, you should consider custom parsing. 

Look at the log fields in your [Kibana Discover](https://app.logz.io/#/dashboard/kibana/discover). 
If fields are longer or contain multiple objects, this is a sign that your logs could be better parsed. 

For example, consider this `message` field. Compare the number of objects it contains to other fields, including `remoteIP`, `requestID`, `total_time`, etc.

![Example of unparsed message field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/parsing-and-mapping/unparsed_message_field.png)

### How do I apply custom parsing to my logs? 

It depends. Custom parsing covers a range of options so it depends on your use-case. 

* Refine and fine-tune 
  
  If your logs are parsed but you want to dive deeper and get a more granular JSON, you should consider using the [data parsing wizard]({{site.baseurl}}/user-guide/mapping-and-parsing/data-parsing-wizard.html).

  This is great when you want to further customize existing data mappings. You can use it to break up fields and GROK particulars out of longer strings. 
  
  For example, you can extract the HTTP response codes (200, 201, 404...). 


* Parsing 101  

  Anything unique such as application logs is likely to require extensive parsing that can't be done automatically. That is because the data is unique and unpredictable. 
  
  There's no need to face this monster alone :)
  Please <a class="intercom-launch" href="mailto:help@logz.io"> reach out to Logz.io Support</a> to request help. We will gladly parse the data for you. 
