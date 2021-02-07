###### Multiline logs

Filebeat's basic configuration is set to split longer, multiline logs to into multiple logs - 1 log per line. This behavior can be managed using Filebeat's multiline configuration option: `multiline.type: pattern`.

* See [Manage multiline messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html) from Elastic for details.
* For managing multiline messages with Filebeat Autodiscover, see [Hints based autodiscover](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html) from Elastic.