---
layout: article
title: Ship Node.js data
permalink: /user-guide/log-shipping/shipping-methods/code-library--nodejs.html
shipping-summary:
  data-source: Node.js code
  appenders:
    - logzio-nodejs
    - winston-logzio
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [logzio-nodejs (logs)](#logzio-nodejs-config)
  * [winston-logzio (logs)](#winston-config)

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

### Configure your project

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```js
// Replace these parameters with your configuration
var logger = require('logzio-nodejs').createLogger({
    token: '{account-token}',
    host: '{listener-url}',
    type: 'YourLogType'
});
```

##### Parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). {% include log-shipping/your-account-token.html %}

type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
  Used by Logz.io for consistent parsing.
  Can't contain spaces. <br />
  <span class="sm bold">Default:</span> `nodejs`

protocol
  : `http`, `https`, or `udp`.
  If using UDP, see [Notes on using UDP](#notes-on-using-udp), below. <br />
  <span class="sm bold">Default:</span> `http`

host
  : Listener URL. {% include log-shipping/your-listener-url.html %} <br />
  <span class="sm bold">Default:</span> `https://listener.logz.io`

port
  : Destination port.
  Default port depends on protocol. <br />
  <span class="sm bold">Default for UDP:</span> `5050` <br />
  <span class="sm bold">Default for HTTP:</span> `8070` <br />
  <span class="sm bold">Default for HTTPS:</span> `8071`

sendIntervalMs
  : Time to wait between retry attempts, in milliseconds. <br />
  <span class="sm bold">Default:</span> `2000` (2 seconds)

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br />
  If you're sending logs over UDP, bulk is not available.
  See notes on UDP [buffering](#buffering), below. <br />
  <span class="sm bold">Default:</span> `100`

numberOfRetries
  : Maximum number of retry attempts. <br />
  <span class="sm bold">Default:</span> `3`

debug
  : To print debug messsages to the console, `true`.
  Otherwise, `false`. <br />
  <span class="sm bold">Default:</span> `false`

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
  <span class="sm bold">Default:</span> `false`

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


<div id="winston-config">

## winston-logzio setup

winston-logzio is a winston plugin and wrapper for the logzio-nodejs appender.
With winston-logzio, you can take advantage of the winston logger framework with your Node.js app.

### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install winston-logzio --save
```

### Configure your project

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```js
var winston = require('winston');
var logzioWinstonTransport = require('winston-logzio');

// Replace these parameters with your configuration
var loggerOptions = {
    token: '{account-token}',
    host: '{listener-url}',
    type: 'YourLogType'
};

winston.add(logzioWinstonTransport, loggerOptions);
```

##### Parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). {% include log-shipping/your-account-token.html %}

type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
  Used by Logz.io for consistent parsing.
  Can't contain spaces. <br />
  <span class="sm bold">Default:</span> `nodejs`

protocol
  : `http`, `https`, or `udp`.
  If using UDP, see [Notes on using UDP](#notes-on-using-udp), below. <br />
  <span class="sm bold">Default:</span> `http`

host
  : Listener URL.  {% include log-shipping/your-listener-url.html %} <br />
  <span class="sm bold">Default:</span> `https://listener.logz.io`

port
  : Destination port.
  Default port depends on protocol. <br />
  <span class="sm bold">Default for UDP:</span> `5050` <br />
  <span class="sm bold">Default for HTTP:</span> `8070` <br />
  <span class="sm bold">Default for HTTPS:</span> `8071`

sendIntervalMs
  : Time to wait between retry attempts, in milliseconds. <br />
  <span class="sm bold">Default:</span> `2000` (2 seconds)

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br />
  If you're sending logs over UDP, bulk is not available.
  See notes on UDP [buffering](#buffering), below. <br />
  <span class="sm bold">Default:</span> `100`

numberOfRetries
  : Maximum number of retry attempts. <br />
  <span class="sm bold">Default:</span> `3`

debug
  : To print debug messsages to the console, `true`.
  Otherwise, `false`. <br />
  <span class="sm bold">Default:</span> `false`

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
  <span class="sm bold">Default:</span> `false`

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

### Notes on using UDP {#notes-on-using-udp}

#### Limitations

If you send data over UDP, there is no confirmation in your system that Logz.io received the logs.
Each message is sent separately, as UDP doesn't use the bulk API.
Because of these limitations, we don't recommend using the UDP protocol.

#### Buffering {#buffering}

UDP doesn't use the bulk API, so the `bufferSize` parameter doesn't behave the same as when you use HTTP or HTTPS.

If you set `bufferSize` higher than 1, the messages will still be sent separately, but the logger will wait for the buffer to reach the size specified before sending out all the messages.

If you want each message to be sent out immediately, then set `bufferSize` to 1.