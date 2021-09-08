---
title: Ship Node.js logs
short-description: Add this library to your code to begin shipping logs from your Node.js applications.
logo:
  logofile: nodejs.svg
  orientation: vertical
data-source: Node.js code
templates: ["library"]
open-source:
  - title: logzio-nodejs
    github-repo: logzio-nodejs
  - title: winston-logzio
    github-repo: winston-logzio
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
  - popular
order: 90
---

<!-- tabContainer:start -->
<div class="branching-container">

* [logzio-nodejs](#logzio-nodejs-config)
* [winston-logzio](#winston-logzio-config)
* [winston-logzio with Typescript](#winston-typescript)
{:.branching-tabs}

<!-- tab:start -->
<div id="logzio-nodejs-config">

## logzio-nodejs setup

logzio-nodejs collects log messages in an array, which is sent asynchronously when it reaches its size limit or time limit (100 messages or 10 seconds), whichever comes first.
It contains a simple retry mechanism which upon connection reset or client timeout, tries to send a waiting bulk (2 seconds default).

It's asynchronous, so it doesn't block other messages from being collected and sent.
The interval increases by a factor of 2 between each retry until it reaches the maximum allowed attempts (3).

By default, any error is logged to the console.
You can change this by using a callback function.

#### Configure logzio-nodejs

<div class="tasklist">

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install logzio-nodejs
```

##### Configure logzio-nodejs

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```js
// Replace these parameters with your configuration
var logger = require('logzio-nodejs').createLogger({
  token: '<<LOG-SHIPPING-TOKEN>>',
  protocol: 'https',
  host: '<<LISTENER-HOST>>',
  port: '8071',
  type: 'YourLogType'
});
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| token | Your Logz.io log shipping token securely directs the data to your [Logz.io account](https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping). {% include log-shipping/log-shipping-token.html %} | Required |
| protocol | `http` or `https`. The value of this parameter affects the default of the `port` parameter. | `http` |
| host  |  {% include log-shipping/listener-var.md %} {% include log-shipping/listener-var.html %} | `listener.logz.io` |
| port | Destination port. The default port depends on the `protocol` parameter: `8070` (for HTTP) or `8071` (for HTTPS) | `8070` / `8071` |
| type | {% include /log-shipping/type.md %} | `nodejs` |
| sendIntervalMs  | Time to wait between retry attempts, in milliseconds. | `2000` (2 seconds) |
| bufferSize  | Maximum number of messages the logger accumulates before sending them all as a bulk. | `100` |
| numberOfRetries | Maximum number of retry attempts. | `3` |
| debug | Set to `true` to print debug messsages to the console.  | `false` |
| callback | A callback function to call when the logger encounters an unrecoverable error. The function API is `function(err)`, where `err` is the Error object. | -- |
| timeout | Read/write/connection timeout, in milliseconds. | -- |
| addTimestampWithNanoSecs | Boolean. Set to `true` to add the `@timestamp_nano` field, which include nanoseconds in the timestamp. If you're sending multiple logs per second, we recommend setting this parameter to `true` to preserve the log sequence. | `false` |
| extraFields | JSON format. Adds your custom fields to each log. Format: `extraFields : { field_1: "val_1", field_2: "val_2" , ... }` | -- |


###### Code sample

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

Include this line at the end of the run if you're using logzio-nodejs in a severless environment, such as AWS Lambda, Azure Functions, or Google Cloud Functions:

  ```js
  logger.sendAndClose();
  ```

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="winston-logzio-config">

## winston-logzio setup

This winston plugin is a wrapper for the logzio-nodejs appender, which basically means it just wraps our nodejs logzio shipper.
With winston-logzio, you can take advantage of the winston logger framework with your Node.js app.


#### Configure winston-logzio

**Before you begin, you'll need**: Winston 3 (If you're looking for Winston 2, checkout v1.0.8). If you need to run with Typescript, follow the procedure to set up winston with Typescript.

<div class="tasklist">

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install winston-logzio --save
```

##### Configure winston-logzio

Here's a sample configuration that you can use as a starting point.
Use the samples in the code block below or replace the sample with a configuration that matches your needs.

```js
const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: '<<LOG-SHIPPING-TOKEN>>',
  host: '<<LISTENER-HOST>>',
});


const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [logzioWinstonTransport],
});

logger.log('warn', 'Just a test message');
```

If winston-logzio is used as part of a serverless service (AWS Lambda, Azure Functions, Google Cloud Functions, etc.), add `logger.close()` at the end of the run.

{% include /general-shipping/replace-placeholders.html %}



##### Parameters

For a complete list of your options, see the configuration parameters below.👇



| Parameter | Description | Required/Default |
|---|---|---|
| LogzioWinstonTransport | This variable determines what will be passed to the logzio nodejs logger itself. If you want to configure the nodejs logger, add any parameters you want to send to winston when initializing the transport. | -- |
| token | Your Logz.io log shipping token securely directs the data to your [Logz.io account](https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping). {% include log-shipping/log-shipping-token.html %} | Required |
| protocol | `http` or `https`. The value here affects the default of the `port` parameter. | `http` |
| host  |  {% include log-shipping/listener-var.md %} {% include log-shipping/listener-var.html %} | `listener.logz.io` |
| port | Destination port. The default port depends on the `protocol` parameter: `8070` (for HTTP) or `8071` (for HTTPS) | `8070` / `8071` |
| type | {% include /log-shipping/type.md %} | `nodejs` |
| sendIntervalMs  | Time to wait between retry attempts, in milliseconds. | `2000` (2 seconds) |
| bufferSize  | Maximum number of messages the logger will accumulate before sending them all as a bulk. | `100` |
| numberOfRetries | Maximum number of retry attempts. | `3` |
| debug | To print debug messsages to the console, `true`. Otherwise, `false`. | `false` |
| callback | A callback function to call when the logger encounters an unrecoverable error. The function API is `function(err)`, where `err` is the Error object. | -- |
| timeout | Read/write/connection timeout, in milliseconds. | -- |
| addTimestampWithNanoSecs | Boolean. Adds `@timestamp_nano` field, which is a timestamp that includes nanoseconds. To add this field, `true`. Otherwise, `false`. If you're sending multiple logs per second, we recommend setting to `true` to preserve the log sequence. | `false` |
| extraFields | JSON format. Adds your custom fields to each log. Format: `extraFields : { field_1: "val_1", field_2: "val_2" , ... }` | -- |


##### Additional configuration options

* If winston-logzio is used as part of a serverless service (AWS Lambda, Azure Functions, Google Cloud Functions, etc.), add this line at the end of the configuration code block.

  ```js
  logger.close()
  ```

* The winston logger by default sends all logs to the console. You can easily disable this by adding this line to your code:

  ```js
  winston.remove(winston.transports.Console);
  ```
* To send a log line:

  ```js
  winston.log('info', 'winston logger configured with logzio transport');
  ```

* To log the last UncaughtException before Node exits:

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

* Another configuration option

  ```js
  var winston = require('winston');
  var logzioWinstonTransport = require('winston-logzio');

  // Replace these parameters with your configuration
  var loggerOptions = {
      token: '<<LOG-SHIPPING-TOKEN>>',
      protocol: 'https',
      host: '<<LISTENER-HOST>>',
      port: '8071',
      type: 'YourLogType'
  };

  winston.add(logzioWinstonTransport, loggerOptions);
  ```



</div>

</div>
<!-- tab:end -->


<!-- tab:start -->

<div id="winston-typescript">

## winston-logzio setup with Typescript

This winston plugin is a wrapper for the logzio-nodejs appender that runs with Typescript, which basically means it just wraps our nodejs logzio shipper.
With winston-logzio, you can take advantage of the winston logger framework with your Node.js app.


#### Configure winston-logzio

**Before you begin, you'll need**: Winston 3 (If you're looking for Winston 2, checkout v1.0.8)

<div class="tasklist">

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
npm install winston-logzio --save
```

##### Configure winston-logzio with Typescript

If you don't have a `tsconfig.json` file, you'll need to add it first. Start by running:

```js
tsc --init
```

On your `tsconfig.json` file, under the parameter `compilerOptions` make sure you have the `esModuleInterop` flag set to `true` or add it:

```js
"compilerOptions": {
  ...
  "esModuleInterop": true
}
```

Here's a sample configuration that you can use as a starting point.
Use the samples in the code block below or replace the sample with a configuration that matches your needs.

```js
import winston from 'winston';
import LogzioWinstonTransport from 'winston-logzio';
const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: '<<LOG-SHIPPING-TOKEN>>',
  host: '<<LISTENER-HOST>>',
});
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [logzioWinstonTransport],
});
logger.log('warn', 'Just a test message');
```

If winston-logzio is used as part of a serverless service (AWS Lambda, Azure Functions, Google Cloud Functions, etc.), add this line at the end of the configuration code block.

```js
logger.close()
```

{% include /general-shipping/replace-placeholders.html %}

### Troubleshooting

To fix errors related to `esModuleInterop` flag make sure you run the relevant `tsconfig` file.
These might help:
```
tsc <file-name>.ts --esModuleInterop
```
or
```
tsc --project tsconfig.json  
```
</div>
</div>
<!-- tab:end -->


<!-- tabContainer:end -->
