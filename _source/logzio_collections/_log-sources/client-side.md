---
title: Ship Node.js client-side logs
logo:
  logofile: node-js-icon-11.jpg
  orientation: vertical
data-source: Node.js Client-Side
open-source:
  - title: logzio-client-side
    github-repo: logzio-client-side
  - title: logzio-nodejs
    github-repo: logzio-nodejs
  - title: winston-logzio
    github-repo: winston-logzio
contributors:
  - ronish31
  - shalper
shipping-tags:
  - from-your-code
---


The Logz.io client-side logger offers a secure method to log messages from your front-end.
The logger will send all your front-end logs to your backend and then to Logz.io. You can use the logger to send info, debug, error, and warning messages.

![client-side-architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/clientside-logger-archi.png)



#### Configuration

<div class="tasklist">

##### Install the client-side logger

```shell
npm logzio-client-side
```

##### Configure the client-side logger

Import and build the logger on your client-side. For example:

```javascript
import * as logzioLogger from 'logzio-client-side'

const logger = logzioLogger.Logger({
  url: `http://<<your url>>api/log`
});
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| url | Url to send logs to. | Required |
| prefix | Adds a fixed prefix to all the logs. (Can be deleted if not needed.) | -- |
| log Level | Log level to display in the browser console. Available options: ERROR, WARN, INFO. |  'WARN'/'ERROR' |
| flushInterval | Interval to flush logs to server. | -- |

<!-- info-box-start:info -->
Visit our [app demo](https://github.com/logzio/logzio-client-side/blob/master/demo/app.html) for an example of a more elaborate logger configuration.
{:.info-box.note}
<!-- info-box-end -->

##### Send logs using the client-side logger

Once you've installed the logger, you can run it on your client-side to send logs to Logz.io. For example:

```javascript
    logger.info('sending an info log');
    logger.debug('sending a debug log');
    logger.warn('sending a warning log');
    logger.error('sending an error log');
    logger.flush();
```

##### Configure the server-side logger

Add the following code on your server side and configure the parameters, as per your requirements:

```javascript
const logzioServerLogger = require('logzio-client-side/server');
const app = logzioServerLogger.app;
const bodyParser = logzioServerLogger.bodyParser;
const port = <<PORT>>;

 const logzioShipper = logzioServerLogger.logzioLogger.createLogger({
    token: <<LOG-SHIPPING-TOKEN>>,
    host: <<LISTENER-HOST>>,
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
    console.log(`Listening at http://<<LISTENER-HOST>>:$<<PORT>>`)
})

```


###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| Token | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}   | Required |
| Port | The port you are sending your logs to. | Required |
| Logz.io Host | Your Logz.io listener URL and port. {% include log-shipping/listener-var.html %}  | Required |
| uri | Receiving URI. This is where the logs are sent to | Required |
| enableCors | If `true`, enables cross-origin requests for your logging endpoint. | -- |



<!-- info-box-start:info -->
Visit our [server demo](https://github.com/logzio/logzio-client-side/blob/master/demo/server.js) for an example of a more elaborate logger configuration, or our [logzio-nodejs logger documentation](https://docs.logz.io/shipping/log-sources/nodejs.html) for the complete configuration guide.
{:.info-box.note}
<!-- info-box-end -->


