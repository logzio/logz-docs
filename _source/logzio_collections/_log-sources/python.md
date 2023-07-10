---
title: Ship Python logs
logo:
  logofile: python.svg
  orientation: vertical
short-description: Use the Logz.io Python Handler to bulk send logs to Logz.io via HTTPS.
data-source: Python code
data-for-product-source: Logs
templates: ["library"]
open-source:
  - title: Logz.io Python Handler
    github-repo: logzio-python-handler
contributors:
  - mirii1994
  - shalper
  - imnotashrimp
  - refaelmi
  - ralongit
shipping-tags:
  - from-your-code
order: 170
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup](#setup)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Logz.io Python Handler sends logs in bulk over HTTPS to Logz.io.
Logs are grouped into bulks based on their size.

If the main thread quits,
the handler tries to consume the remaining logs and then exits.
If the handler can't send the remaining logs,
they're written to the local file system for later retrieval.

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="setup">

#### Set up Logz.io Python Handler

<div class="tasklist">

**Supported versions**: Python 3.5 or newer. 

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
pip install logzio-python-handler
```

If you'd like to use [Trace context](#trace-context) then you need to install the OpenTelemetry logging instrumentation dependecy by running the following command:

```shell
pip install logzio-python-handler[opentelemetry-logging]
```

##### Configure Logz.io Python Handler for a standard Python project

Use the samples in the code block below as a starting point,
and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration [parameters](#parameters) below the code block.👇

###### File Config

```python
[handlers]
keys=LogzioHandler

[handler_LogzioHandler]
class=logzio.handler.LogzioHandler
formatter=logzioFormat

# Parameters must be set in order. Replace these parameters with your configuration.
args=('<<LOG-SHIPPING-TOKEN>>', '<<LOG-TYPE>>', <<TIMEOUT>>, 'https://<<LISTENER-HOST>>:8071', <<DEBUG-FLAG>>,<<NETWORKING-TIMEOUT>>,<<RETRY-LIMIT>>,<<RETRY-TIMEOUT>>)

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

This is an alternative configuration option recommended if you are using Python 3.8 or above.

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
            'logzio_type': '<<LOG-TYPE>>',
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


#### Parameters

<!-- info-box-start:info -->
Order matters. The arguments _must_ be configured in the order shown here. For example, to set debug-flag to `true`, you need to set every argument that comes before it.
{:.info-box.important}
<!-- info-box-end -->

| Parameter | Description | Required/Default |
|---|---|---|
| token | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %} | Required |
| logzio_type | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `python` |
| timeout | Time to wait between log draining attempts, in seconds. | `3` |
| url | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| debug | Debug flag. To print debug messages to stdout, `True`. Otherwise, `False`. | `False` |
| backup-logs | If set to False, disables the local backup of logs in case of failure. | `True` |
| network-timeout | Timeout in seconds, int or float, for connecting to Logz.io. | `10` |
| logs_drain_timeout | Timeout in seconds, int or float, for sending the logs to Logz.io. | `5` |
| add_context | Set to `True` if you're using OpenTelemetry instrumentation and wish to inject trace context into your logs. For more info, see the **Trace context** section. | `False` |




#### Serverless platforms

If you're using a serverless function, you'll need to import and add the LogzioFlusher annotation before your sender function. To do this, in the code sample below, uncomment the `import` statement and the `@LogzioFlusher(logger)` annotation line.


<!-- info-box-start:info -->
For the LogzioFlusher to work properly, you'll need to make sure that the Logz.io. handler is added to the root logger. See the configuration above for an example.
{:.info-box.important}
<!-- info-box-end -->



#### Dynamic Extra Fields
If you prefer, you can add extra fields to your logs dynamically, and not pre-defining them in the configuration.
This way, you can allow different logs to have different extra fields.
Example in the code below. 

#### Code Example

```python
import logging
import logging.config
# If you're using a serverless function, uncomment.
# from logzio.flusher import LogzioFlusher

# If you'd like to leverage the dynamic extra fields feature, uncomment.
# from logzio.handler import ExtraFieldsLogFilter

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

# Example additional code that demonstrates how to dynamically add/remove fields within the code, make sure class is imported.

    logger.info("Test log")  # Outputs: {"message":"Test log"}
    
    extra_fields = {"foo":"bar","counter":1}
    logger.addFilter(ExtraFieldsLogFilter(extra_fields))
    logger.warning("Warning test log")  # Outputs: {"message":"Warning test log","foo":"bar","counter":1}
    
    error_fields = {"err_msg":"Failed to run due to exception.","status_code":500}
    logger.addFilter(ExtraFieldsLogFilter(error_fields))
    logger.error("Error test log")  # Outputs: {"message":"Error test log","foo":"bar","counter":1,"err_msg":"Failed to run due to exception.","status_code":500}
    
    # If you'd like to remove filters from future logs using the logger.removeFilter option:
    logger.removeFilter(ExtraFieldsLogFilter(error_fields))
    logger.debug("Debug test log") # Outputs: {"message":"Debug test log","foo":"bar","counter":1}

```

#### Extra Fields
In case you need to dynamic metadata to a speific log and not [dynamically to the logger](#dynamic-extra-fields), other than the constant metadata from the formatter, you can use the "extra" parameter.
All key values in the dictionary passed in "extra" will be presented in Logz.io as new fields in the log you are sending.
Please note, that you cannot override default fields by the python logger (i.e. lineno, thread, etc..)
For example:

```python
logger.info('Warning', extra={'extra_key':'extra_value'})
```

#### Trace context

If you're sending traces with OpenTelemetry instrumentation (auto or manual), you can correlate your logs with the trace context.
That way, your logs will have traces data in it, such as service name, span id and trace id.

Make sure to install the OpenTelemetry logging instrumentation dependecy by running the following command:

```shell
pip install logzio-python-handler[opentelemetry-logging]
```
To enable this feature, set the `add_context` param in your handler configuration to `True`, like in this example:

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
            'token': '<<LOGZIO-TOKEN>>',
            'logzio_type': 'python-handler',
            'logs_drain_timeout': 5,
            'url': 'https://<<LOGZIO-URL>>:8071',
            'retries_no': 4,
            'retry_timeout': 2,
            'add_context': True
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

##### Django configuration
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'logzioFormat': {
            'format': '{"additional_field": "value"}'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
            'formatter': 'verbose'
        },
        'logzio': {
            'class': 'logzio.handler.LogzioHandler',
            'level': 'INFO',
            'formatter': 'logzioFormat',
            'token': 'token',
            'logzio_type': "django",
            'logs_drain_timeout': 5,
            'url': 'https://listener.logz.io:8071',
            'debug': True,
            'network_timeout': 10,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', ],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO')
        },
        'appname': {
            'handlers': ['console', 'logzio'],
            'level': 'INFO'
        }
    }
}

```

{% include /general-shipping/replace-placeholders.html %}


Note that this feature is only available from version 4.0.0.

</div>

For troubleshooting this solution, see our [Python troubleshooting guide](https://docs.logz.io/user-guide/log-troubleshooting/python-troubleshooting.html).

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
