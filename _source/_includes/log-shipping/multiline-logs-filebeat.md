###### Multiline logs

Filebeat's basic configuration is set to split longer, multiline logs into multiple logs - 1 log per line.

This behavior can be managed in 2 ways:

* Using an explicit configuration. See [Manage multiline messages](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html) from Elastic for details.
* Using Filebeat’s autodiscover hints. See [Hints based autodiscover](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html#_co_elastic_logsmultiline) from Elastic for details.


## Filebeat:
For Filebeat, you can use either configuration, or Autodiscover hints & annotations.

### Configuration:

In `filebeat.yml`, under `filebeat.input`, we can add a multiline configuration to concatenate the lines, like in the following configuration sample:

```shell
filebeat.inputs:
- type: container
  paths:
    - /var/log/containers/*.log
  processors:
    - add_kubernetes_metadata:
        host: ${NODE_NAME}
        matchers:
        - logs_path:
            logs_path: "/var/log/containers/"
  multiline.type: pattern
  multiline.pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
  multiline.negate: true
  multiline.match: after
```

The above configuration ensures that filebeat will look for logs that match the regex under `multiline.pattern`. This will be the log's first line. It will concatenate all the logs after it, until it will find a new log that matches the regex.

For more details about configuring multiline for filebeat, go [here](https://www.elastic.co/guide/en/beats/filebeat/current/multiline-examples.html#multiline-examples).

### Hints & annotations:

If you're using Filebeat Autodiscover feature, you can use annotations to concatenate the logs.
In this option, you'll have to configure Filebeat, and also add annotations to the relevant components you're deploying to your cluster. 
First, you'll need to enable Filebeat's hints system. In `filebeat.yml`, make sure that your `filebeat.autodiscover` enables the hints system, like in the following configuration sample:

```shell
filebeat.autodiscover:
	providers:
	  - type: kubernetes
	    node: ${NODE_NAME}
	    hints.enabled: true # This part enables the hints
	    hints.default_config:
	      type: container
	      paths:
	        - /var/log/containers/*-${data.kubernetes.container.id}.log
```

Then, when you deploy a component to your cluster, and want the hints system to detect the multiline logs, you'll need to add elastic's multiline annotations.
For this example, we'll add to our deployment the following annotations:
```shell
annotations:
  co.elastic.logs/multiline.type: 'pattern'
  co.elastic.logs/multiline.pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
  co.elastic.logs/multiline.negate: 'true'
  co.elastic.logs/multiline.match: 'after'
```
The above configuration ensures that filebeat will look for logs that match the regex under `multiline.pattern`. This will be the log's first line. It will concatenate all the logs after it, until it will find a new log that matches the regex.
To learn more about Hints and annotations, go [here](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html).
