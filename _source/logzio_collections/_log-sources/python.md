---
title: Ship Python logs
logo:
  logofile: python.svg
  orientation: vertical
short-description: Use the Logz.io Python Handler to send logs in bulk over HTTPS to Logz.io.
data-source: Python code
templates: ["library"]
open-source:
  - title: Logz.io Python Handler
    github-repo: logzio-python-handler
contributors:
  - mirii1994
  - shalper
  - imnotashrimp
shipping-tags:
  - from-your-code
order: 170
---

Logz.io Python Handler sends logs in bulk over HTTPS to Logz.io.
Logs are grouped into bulks based on their size.

If the main thread quits,
the handler tries to consume the remaining logs and then exits.
If the handler can't send the remaining logs,
they're written to the local file system for later retrieval.

#### Set up Logz.io Python Handler

<div class="tasklist">

**Supported versions**: Python 3.5 or newer. 

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
pip install logzio-python-handler
```

##### Configure Logz.io Python Handler for a standard Python project

Use the samples in the code block below as a starting point,
and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```python
[handlers]
keys=LogzioHandler

[handler_LogzioHandler]
class=logzio.handler.LogzioHandler
formatter=logzioFormat

# Parameters must be set in order. Replace these parameters with your configuration.
args=('<<LOG-SHIPPING-TOKEN>>', '<<LOG-TYPE>>', <<TIMEOUT>>, 'https://<<LISTENER-HOST>>:8071', <<DEBUG-FLAG>>)

[formatters]
keys=logzioFormat

[loggers]
keys=root

[logger_root]
handlers=LogzioHandler
level=INFO

[formatter_logzioFormat]
format={"additional_field": "value"}
```


###### Dict Config

This is an alternative configuration option recommended if you are using Python 3.8.

See Python's [documentation](https://docs.python.org/3/library/logging.config.html#configuration-file-format) regarding the `logging.config.dictConfig` method.

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'logzioFormat': {
            'format': '{"additional_field": "value"}',
            'validate': False
        }
    },
    'handlers': {
        'logzio': {
            'class': 'logzio.handler.LogzioHandler',
            'level': 'INFO',
            'formatter': 'logzioFormat',
            'token': '<<LOG-SHIPPING-TOKEN>>',
            'logs_drain_timeout': 5,
            'url': 'https://<<LISTENER-HOST>>:8071'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['logzio'],
            'propagate': True
        }
    }
}
```

{% include /general-shipping/replace-placeholders.html %}


##### Parameters

<!-- info-box-start:info -->
Order matters. The arguments _must_ be configured in the order shown here. For example, to set debug-flag to `true`, you need to set every argument that comes before it.
{:.info-box.important}
<!-- info-box-end -->

| Parameter | Description | Required/Default |
|---|---|---|
| account-token | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %} | Required |
| log-type | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `python` |
| timeout | Time to wait between log draining attempts, in seconds. | `3` |
| listener-url | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| debug-flag | Debug flag. To print debug messages to stdout, `True`. Otherwise, `False`. | `False` |
| backup-logs | If set to False, disables the local backup of logs in case of failure. | `True` |
| network-timeout | Timeout in seconds, int or float, for sending the logs to Logz.io. | `10` |



#### Serverless platforms

If you're using a serverless function, you'll need to import and add the LogzioFlusher annotation before your sender function. To do this, in the code sample below, uncomment the `import` statement and the `@LogzioFlusher(logger)` annotation line.


<!-- info-box-start:info -->
For the LogzioFlusher to work properly, you'll need to make sure that the Logz.io. handler is added to the root logger. See the configuration above for an example.
{:.info-box.important}
<!-- info-box-end -->




#### Code Example

```python
import logging
import logging.config
# If you're using a serverless function, uncomment.
# from logzio.flusher import LogzioFlusher

# Say I have saved my configuration as a dictionary in a variable named 'LOGGING' - see 'Dict Config' sample section
logging.config.dictConfig(LOGGING)
logger = logging.getLogger('superAwesomeLogzioLogger')

# If you're using a serverless function, uncomment.
# @LogzioFlusher(logger)
def my_func():
    logger.info('Test log')
    logger.warn('Warning')

    try:
        1/0
    except:
        logger.exception("Supporting exceptions too!")
```


To add dynamic metadata to your logger
other than the constant metadata from the formatter,
you can use the `extra` parameter.
Key-value pairs passed in `extra` are shown as new fields in Logz.io.
You can't override default fields from the python logger,
such as `lineno` or `thread`.

```python
logger.info('Warning', extra={'extra_key':'extra_value'})
```

</div>
