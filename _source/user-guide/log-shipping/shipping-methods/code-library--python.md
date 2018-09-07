---
layout: article
title: Python data
permalink: /user-guide/log-shipping/shipping-methods/code-library--python.html
shipping-summary:
  data-source: Python code
  appenders:
    - Logz.io Python Handler (Python or Django configuration)
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs}
  * [Python configuration (logs)](#python-config)
  * [Django configuration (logs)](#django-config)

## Logz.io Python Handler

Logz.io Python Handler sends logs in bulk over HTTPS to Logz.io. Logs are grouped into bulks based on their size.

If the main thread quits, the handler tries to consume the remaining logs and then exit. If the handler can't send the remaining logs, they are written to the local file system for later retrieval.

### Installation in your code

#### Dependency

Add Logz.io Python Handler from pip.

```shell
pip install logzio-python-handler
```

<div id="python-config">

#### Python configuration

For a complete list of all options, see the configuration arguments below this code block. 👇

```python
[handlers]
keys=LogzioHandler

[handler_LogzioHandler]
class=logzio.handler.LogzioHandler
formatter=logzioFormat

# args must be set in order. See the configuration arguments below this code block.
args=('{account-token}', '{log-type}', {timeout}, '{listener-url}:8071', {debug-flag})

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

##### Configuration arguments

<div class="info-box important">
  Arguments must be configured in the order shown. If you want to set the debug flag (which is the last option) to `True`, you'll need to set every argument that comes before it.
</div>

{: .parameter-list }
account-token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). {% include log-shipping/your-account-token.html %}

log-type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. <br /> <span class="sm bold">Default:</span> `python`

timeout
  : Time to wait between log draining attempts, in seconds. <br /> <span class="sm bold">Default:</span> `3`

listener-url
  : Listener URL. <br /> {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io:8071`

debug-flag
  : Debug flag. To print debug messages to stdout, `True`. Otherwise, `False`. <br /> <span class="sm bold">Default:</span> `False`

</div>

<div id="django-config">

#### Django configuration

For a complete list of all options, see the configuration arguments below this code block. 👇

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
      'token': '{account-token}',
      'logzio_type': "django",
      'logs_drain_timeout': 5,
      'url': '{listener-url}:8071',
      'debug': True
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

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). {% include log-shipping/your-account-token.html %}

logzio_type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. <br /> <span class="sm bold">Default:</span> `python`

logs_drain_timeout
  : Time to wait between log draining attempts, in seconds. <br /> <span class="sm bold">Default:</span> `3`

url
  : Listener URL. <br /> {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io:8071`

debug
  : Debug flag. To print debug messages to stdout, `True`. Otherwise, `False`. <br /> <span class="sm bold">Default:</span> `False`

</div>

</div>

##### Code sample

```python
import logging
import logging.config

# If configuration is stored at ./myconf.conf:
logging.config.fileConfig('myconf.conf')

logger = logging.getLogger('superAwesomeLogzioLogger')

logger.info('Test log')
logger.warn('Warning')

try:
    1/0
except:
    logger.exception("Supporting exceptions too!")
```

To add dynamic metadata to your logger other than the constant metadata from the formatter, you can use the `extra` parameter. Key-value pairs passed in `extra` are shown as new fields in Logz.io. Please note that you can't override default fields from the python logger, such as `lineno` or `thread`.

```python
logger.info('Warning', extra={'extra_key':'extra_value'})
```