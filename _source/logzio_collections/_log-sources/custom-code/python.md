---
title: Ship Python logs
logo:
  logofile: python.svg
  orientation: vertical
shipping-summary:
  data-source: Python code
  appenders:
    - Logz.io Python Handler
    # - Logz.io Python Handler (Python or Django configuration)
contributors:
  - imnotashrimp
---

## Logz.io Python Handler setup

Logz.io Python Handler sends logs in bulk over HTTPS to Logz.io.
Logs are grouped into bulks based on their size.

If the main thread quits, the handler tries to consume the remaining logs and then exits.
If the handler can't send the remaining logs, they are written to the local file system for later retrieval.

### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
pip install logzio-python-handler
```

### Configure Logz.io Python Handler for a standard Python project

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```python
[handlers]
keys=LogzioHandler

[handler_LogzioHandler]
class=logzio.handler.LogzioHandler
formatter=logzioFormat

# Parameters must be set in order. Replace these parameters with your configuration.
args=('<ACCOUNT-TOKEN>', '<LOG-TYPE>', <TIMEOUT>, '<LISTENER-URL>:8071', <DEBUG-FLAG>)

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

{: .inline-header }
Parameters

<div class="info-box important">
  Arguments must be configured in the order shown.
  For example, to set debug-flag to `True`, you need to set every argument that comes before it.
</div>

account-token <span class="required-param"></span>
: Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). \\
  {%- include log-shipping/replace-vars.html token=true %}

log-type
: The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
  Used by Logz.io for consistent parsing.
  Can't contain spaces. \\
  <span class="default-param">`python`</span>

timeout
: Time to wait between log draining attempts, in seconds. \\
  <span class="default-param">`3`</span>

listener-url
: Listener URL and port. \\
  {%- include log-shipping/replace-vars.html listener=true %} \\
  <span class="default-param">`https://listener.logz.io:8071`</span>

debug-flag
: Debug flag.
  To print debug messages to stdout, `True`.
  Otherwise, `False`. \\
  <span class="default-param">`False`</span>

{: .inline-header }
Code sample

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

To add dynamic metadata to your logger other than the constant metadata from the formatter, you can use the `extra` parameter.
Key-value pairs passed in `extra` are shown as new fields in Logz.io.
Please note that you can't override default fields from the python logger, such as `lineno` or `thread`.

```python
logger.info('Warning', extra={'extra_key':'extra_value'})
```