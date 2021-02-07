###### Multiline logs

Filebeat's basic configuration is set to split longer, multiline logs into multiple logs - 1 log per line. This behavior can be managed using Filebeat's multiline configuration option: `multiline.type: pattern`.

* See [Manage multiline messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html) from Elastic for details.
* For Filebeat Autodiscover, see also [Hints based autodiscover](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html#_co_elastic_logsmultiline) from Elastic.