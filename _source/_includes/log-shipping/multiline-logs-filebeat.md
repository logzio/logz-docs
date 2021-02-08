###### Multiline logs

Filebeat's basic configuration is set to split longer, multiline logs into multiple logs - 1 log per line.

This behavior can be managed in 2 ways:

* Using an explicit configuration. See [Manage multiline messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html) from Elastic for details.
* Using Filebeat’s autodiscover hints. See [Hints based autodiscover](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html#_co_elastic_logsmultiline) from Elastic for details.