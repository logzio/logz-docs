---
title: Ship Node.js logs
logo:
  logofile: nodejs.svg
  orientation: vertical
shipping-summary:
  data-source: Node.js code
  appenders:
    - logzio-nodejs
    - winston-logzio
contributors:
  - imnotashrimp
---

<div class="branching-container">

{% include log-shipping/tabs.html %}

<div id="logzio-nodejs-config">

## logzio-nodejs setup

logzio-nodejs collects log messages in an array, which is sent asynchronously when it reaches its size limit or time limit (100 messages or 10 seconds), whichever comes first.
It contains a simple retry mechanism which upon connection reset or client timeout, tries to send a waiting bulk (2 seconds default).
It's asynchronous, so it doesn't block other messages from being collected and sent.
The interval increases by a factor of 2 between each retry until it reaches the maximum allowed attempts (3).

By default, any error is logged to the console.
You can change this by using a callback function.

### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install logzio-nodejs
```

### Configure logzio-nodejs

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```js
// Replace these parameters with your configuration
var logger = require('logzio-nodejs').createLogger({
  token: '{ACCOUNT-TOKEN}',
  protocol: 'https',
  host: '{LISTENER-URL}',
  port: '8071',
  type: 'YourLogType'
});
```

##### Parameters

{: .parameter-list }
token <span class="required-param"></span>
  : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br />
    {%- include log-shipping/replace-vars.html token=true %} <br />

type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
    Used by Logz.io for consistent parsing.
    Can't contain spaces. <br />
    <span class="default-param">`nodejs`</span>

protocol
  : `http` or `https`. <br />
    <span class="default-param">`http`</span>

host
  : Listener URL. <br />
    {%- include log-shipping/replace-vars.html listener=true %} <br />
    <span class="default-param">`https://listener.logz.io`</span>

port
  : Destination port.
    Default port depends on protocol. <br />
    <span class="sm bold">Default for HTTP:</span> `8070` <br />
    <span class="sm bold">Default for HTTPS:</span> `8071`

sendIntervalMs
  : Time to wait between retry attempts, in milliseconds. <br />
    <span class="default-param">`2000` (2 seconds)</span>

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br />
    <span class="default-param">`100`</span>

numberOfRetries
  : Maximum number of retry attempts. <br />
    <span class="default-param">`3`</span>

debug
  : To print debug messsages to the console, `true`.
    Otherwise, `false`. <br />
    <span class="default-param">`false`</span>

callback
  : A callback function to call when the logger encounters an unrecoverable error.
    The function API is `function(err)`, where `err` is the Error object.

timeout
  : Read/write/connection timeout, in milliseconds.

addTimestampWithNanoSecs
  : Boolean. Adds `@timestamp_nano` field, which is a timestamp that includes nanoseconds.
    To add this field, `true`.
    Otherwise, `false`. <br />
    If you're sending multiple logs per second, we recommend setting to `true` in order to preserve the log sequence. <br />
    <span class="default-param">`false`</span>

##### Code sample

You can send log lines as a raw string or as an object.
For more consistent and reliable parsing, we recommend sending logs as objects.


To send an object (recommended):

  ```js
  var obj = {
      message: 'Some log message',
      param1: 'val1',
      param2: 'val2'
  };
  logger.log(obj);
  ```


To send raw text:

  ```js
  logger.log('This is a log message');
  ```


Include this line if you're using logzio-nodejs in a severless environment, such as AWS Lambda, Azure Functions, or Google Cloud Functions:

  ```js
  logger.sendAndClose();
  ```

</div>


<div id="winston-logzio-config">

## winston-logzio setup

winston-logzio is a winston plugin and wrapper for the logzio-nodejs appender.
With winston-logzio, you can take advantage of the winston logger framework with your Node.js app.

### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install winston-logzio --save
```

### Configure winston-logzio

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```js
var winston = require('winston');
var logzioWinstonTransport = require('winston-logzio');

// Replace these parameters with your configuration
var loggerOptions = {
    token: '{ACCOUNT-TOKEN}',
    protocol: 'https',
    host: '{LISTENER-URL}',
    port: '8071',
    type: 'YourLogType'
};

winston.add(logzioWinstonTransport, loggerOptions);
```

##### Parameters

{: .parameter-list }
token <span class="required-param"></span>
  : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br />
    {%- include log-shipping/replace-vars.html token=true %} <br />

type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
    Used by Logz.io for consistent parsing.
    Can't contain spaces. <br />
    <span class="default-param">`nodejs`</span>

protocol
  : `http` or `https` <br />
    <span class="default-param">`http`</span>

host
  : Listener URL. <br />
    {%- include log-shipping/replace-vars.html listener=true %} <br />
    <span class="default-param">`https://listener.logz.io`</span>

port
  : Destination port.
    Default port depends on protocol. <br />
    <span class="sm bold">Default for HTTP:</span> `8070` <br />
    <span class="sm bold">Default for HTTPS:</span> `8071`

sendIntervalMs
  : Time to wait between retry attempts, in milliseconds. <br />
    <span class="default-param">`2000` (2 seconds)</span>

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br />
    <span class="default-param">`100`</span>

numberOfRetries
  : Maximum number of retry attempts. <br />
    <span class="default-param">`3`</span>

debug
  : To print debug messsages to the console, `true`.
    Otherwise, `false`. <br />
    <span class="default-param">`false`</span>

callback
  : A callback function to call when the logger encounters an unrecoverable error.
    The function API is `function(err)`, where `err` is the Error object.

timeout
  : Read/write/connection timeout, in milliseconds.

addTimestampWithNanoSecs
  : Boolean. Adds `@timestamp_nano` field, which is a timestamp that includes nanoseconds.
    To add this field, `true`.
    Otherwise, `false`. <br />
    If you're sending multiple logs per second, we recommend setting to `true` in order to preserve the log sequence. <br />
    <span class="default-param">`false`</span>

##### Code samples

To send a log line:

```js
winston.log('info', 'winston logger configured with logzio transport');
```

winston sends logs to the console by default.
To disable this behavior:

```js
winston.remove(winston.transports.Console);
```

To log the last UncaughtException before Node exits:

```js
var logzIOTransport = new (winstonLogzIO)(loggerOptions);
var logger = new(winston.Logger)({
  transports: [
    logzIOTransport
  ],
  exceptionHandlers: [
    logzIOTransport
  ],
  exitOnError: true    // set this to true
});

process.on('uncaughtException', function (err) {
  logger.error("UncaughtException processing: %s", err);
  logzIOTransport.flush( function(callback) {
    process.exit(1);
  });
});
```

</div>

</div>