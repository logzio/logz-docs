## Multiline logs


If your original logs span multiple lines, you may find that they arrive in your Logz.io account split into several partial logs. You have the option to use either an explicit configuration or an annotation to configure Filebeat to concatenate multiline logs and avoid having them separated into multiple log documents.

You will need to provide a regex expression that can identify the first log in a multiline log. Filebeat will concatenate the log lines that follow until it identifies the next log that matches the regex expression. In other words, there is no explicit regex expression to demarcate the _end_ of a multiline log.

This behavior is managed differently depending on your deployment method:

* If you are using autodiscover hints & annotations, add an annotation to your deployment.
* If you are not using autodiscover, use an explicit configuration.



### Using an explicit configuration to concatenate multiline logs

Open your `filebeat.yml` configuration file in a text editor. Under `filebeat.input`, add a multiline configuration to identify the first line in a multiline log. Filebeat will concatenate all subsequent lines until the `multiline.pattern` identifies the next match. For example:



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

### Using hints & annotations to concatenate multiline logs

If you're using Filebeat autodiscover hints, you can use annotations to identify multiline logs and concatenate them.

You will need to first configure Filebeat to enable the hints system, and add annotations to the relevant components when you deploy them to your cluster.


<div class="tasklist">

##### Enable Filebeat's hints system

First, enable Filebeat's hints system. In your `filebeat.yml` file, set `hints.enabled: true` under the `filebeat.autodiscover` section. For example:


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

##### Add multiline annotations to your deployment

Whenever you plan to deploy a component to your cluster and want the hints system to detect the multiline logs, you'll need to add multiline annotations.

For example, you can add the following annotations to your deployment:

```shell
annotations:
  co.elastic.logs/multiline.type: 'pattern'
  co.elastic.logs/multiline.pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
  co.elastic.logs/multiline.negate: 'true'
  co.elastic.logs/multiline.match: 'after'
```


The above configuration ensures that Filebeat will look for log lines that match the regex under `multiline.pattern` and concatenate all subsequent lines, until it reaches the next regex match.

</div>