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
shipping-tags:
  - from-your-code
order: 170
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup](#setup)
* [Troubleshooting](#troubleshooting)
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


##### Parameters

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
| debug-flag | Debug flag. To print debug messages to stdout, `True`. Otherwise, `False`. | `False` |
| backup-logs | If set to False, disables the local backup of logs in case of failure. | `True` |
| network-timeout | Timeout in seconds, int or float, for connecting to Logz.io. | `10` |
| logs_drain_timeout | Timeout in seconds, int or float, for sending the logs to Logz.io. | `5` |




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

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="troubleshooting">

This section contains some guidelines for handling errors that you may encounter when trying to collect Python logs.

## Problem: No logs received

No logs are observed in your Logz.io account.

### Possible cause - Incorrect token and/or listener URL

Your Logz.io token and/or listener URL may be incorrect.

#### Suggested remedy

1. Navigate to  **[Manage tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/shared) > [Data shipping tokens - Logs](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs)** and verify your account's log shipping token and listener URL.

2. Check in the integration code whether the token and listener URL are specified correctly.


## Problem: Exception while sending logs to Logz.io

The following error message appears:

```shell
Got exception while sending logs to Logz.io, Try (1/4). Message: HTTPSConnectionPool(host='listener.logz.io', port=8071): Max retries exceeded with url: /?token=<<LOG-SHIPPING-TOKEN>> (Caused by NewConnectionError('<urllib3.connection.HTTPSConnection object at 0x0000017839B4FD30>: Failed to establish a new connection: [WinError 10013] An attempt was made to access a socket in a way forbidden by its access permissions.
```

### Possible cause - Shipper connectivity failure

Your host/server may not be connected to your Logz.io listener.


#### Suggested remedy

Verify connectivity of your host/server as follows.

* For Linux and Mac servers, use `telnet`:

  ```shell
  telnet listener.logz.io <<PORT>>
  ```


* For Windows servers running Windows 8/Server 2012 and later, use the following command in PowerShell:

  ```shell
  Test-NetConnection listener.logz.io -Port <<PORT>>
  ```

  Replace `<<PORT>>` with the appropriate port nummber. For HTTPS communication use port 8053. For HTTP communication use port 8052.


If you see `Connected to listener-group.logz-data.com` the shipper can connect to the Logz.io listener. Enter `ctrl`+`c` and type `quit` to exit Telnet.

If you see `Trying xxx.xxx.xxx.xxx...` for more than 10 seconds, your machine is having trouble connecting to the Logz.io listener.



### Possible cause - Cannot connect to Logz.io listener

Your host/server cannot connect to Logz.io listener and you see `Trying xxx.xxx.xxx.xxx...` for more than 10 seconds, when testing the connection.

#### Suggested remedy

Confirm that your firewall and network settings allow communication with the correct outbound port and the Logz.io listener IP addresses for your region.



### Possible cause - Timeout parameter is too short


You can connect to Logz.io listener, but still see no logs.

#### Suggested remedy

Make sure you have the timeout setting increased as follows:

```yaml
network-timeout:20
timeout:10
logs_drain_timeout:10
```




</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
