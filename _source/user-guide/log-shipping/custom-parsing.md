---
layout: article
title: Custom parsing 
permalink: /user-guide/log-shipping/custom-parsing.html
flags:
  admin: true
  logzio-plan: community 
tags:
  - log-shipping
  - log-types
  - parsing 
  - custom parsing 
  
contributors:
    - shalper
---
### What is custom parsing? 

Here at Logz.io, any parsing scheme that doesn't follow Logz.io's out-of-the-box auto-parsing exactly, is considered custom parsing. 

Your logs will need to be custom parsed when auto-parsing is not enough. 

### How do I know if I need custom parsing?  

If you recognize unparsed or poorly parsed logs, you should consider custom parsing. 

Look at the log fields in your [Kibana Discover](https://app.logz.io/#/dashboard/kibana/discover). 
If fields are longer or contain multiple objects, this is a sign that your logs could be better parsed. 

For example, consider this `message` field. Compare the number of objects it contains to other fields, including `remoteIP`, `requestID`, `total_time`, etc.

![Example of unparsed message field](https://dytvr9ot2sszz.cloudfront.net/logz-docs/shipping/unparsed-message-field.png)  

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
