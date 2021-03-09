---
title: Ship Azure Blob logs
logo:
  logofile: azure-blob.svg
  orientation: vertical
data-source: Azure Blob logs
open-source:
  - title: logzio-client-side
    github-repo: logzio-client-side
contributors:
  - ronish31
  - shalper
shipping-tags:
  -  azure
---

## Logzio Client-side Logger

The Logz.io client-side logger is a secured way to log info, debug, error and warning messages from your front-end.
This logger will send all your front-end logs to your backend and then to Logz.io.

![client-side-architecture](https://github.com/logzio/logzio-client-side/blob/master/clientside-logger-archi.png)

## Install

```shell
npm logzio-client-side
```

## Setting up the client-side logger

Import and build the logger on your client-side. For example:

```javascript
import * as logzioLogger from 'logzio-client-side'

const logger = logzioLogger.Logger({
  url: `http://<<your url>>api/log`
});
```

### Parameters

| Parameter | Description |
|---|---|
| url (required)| Url to send logs to. |
| prefix | prefix to add to all logs, delete if not needed |
| log Level | Log level to display in the browser console, from: ERROR, WARN, INFO. Defaults to 'WARN' and 'ERROR' |
| flushInterval | Interval to flush logs to server |

For an example of an elaborate logger configuration see our [app demo](https://github.com/logzio/logzio-client-side/blob/master/demo/app.html).

Usage of the logger on the client-side:
```javascript
    logger.info('this is an info log');
    logger.debug('this is a debug log');
    logger.warn('this is a warning log');
    logger.error('this is an error log');
    logger.flush();
```

## Setting up the server-side logger

Add the following code to your server side and change the parameters below:

```javascript
const logzioServerLogger = require('logzio-client-side/server');
const app = logzioServerLogger.app;
const bodyParser = logzioServerLogger.bodyParser;
const port = <<port>>;

 const logzioShipper = logzioServerLogger.logzioLogger.createLogger({
    token: <<logzio-shipping-token>>,
    host: <<logzio-host>>,
    type: "logzio-client-side",
    debug: true
 });

app.use(bodyParser.json());

app.use(logzioServerLogger.expressEndpoint({
    uri: '/api/log', // Just an example
    logger: logzioShipper,
    enableCors: true
}));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

```
### Parameters

#### General
| Parameter | Description |
|---|---|
| port (required)| The port you are sending your logs to. |

#### Logzio Shipper

| Parameter | Description |
|---|---|
| logs-shipping-token (required)| Add the [log shipping token](https://app.logz.io/#/dashboard/settings/general) for the relevant Logz.io account. This is the account you want to ship to. |
| logzio-host (required)| Use the listener URL specific to the region of your Logz.io account. You can look it up [here](https://docs.logz.io/user-guide/accounts/account-region.html). |

#### Logzio Server Logger

| Parameter | Description |
|---|---|
| uri (required)| URI to recieve logs at |
| enableCors | Enable cross-origin requests to your logging endpoint |


For more configuration of the logzio-nodejs logger go to our [docs](https://docs.logz.io/shipping/log-sources/nodejs.html).
For an example of an elaborate logger configuration see our [server demo](https://github.com/logzio/logzio-client-side/blob/master/demo/server.js).

