---
title: Sending traces from Node.js applications via auto instrumentation with OpenTelemetry
logo:
  logofile: nodejs.svg
  orientation: vertical
data-source: Automatic Node.js instrumentation
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
{:.branching-tabs} 

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your Node.js application using OpenTelemetry. 

### Architecture overview

This integration includes:

* Installing the OpenTelemetry Node.js instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your Node.js application in conjunction with the OpenTelemetry instrumentation

On deployment, the Node.js instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Node.js application and send traces to Logz.io

**Before you begin, you'll need**:

* A Node.js application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
npm install --save @opentelemetry/api
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/tracing
npm install --save @opentelemetry/exporter-collector
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/auto-instrumentations-node

```

##### Create a tracer file

Create a file named `tracer.js` with the following configuration:

```javascript
'use strict';

const opentelemetry = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
const { Resource } = require('@opentelemetry/resources');
const { ResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');


module.exports = (serviceName) => {

const exporter = new CollectorTraceExporter({
});

const provider = new BasicTracerProvider({
  resource: new Resource({
    [ResourceAttributes.SERVICE_NAME]: serviceName,
  }),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
    instrumentations: [
      new getNodeAutoInstrumentations(),
    ],
  });

return opentelemetry.trace.getTracer('logzio-collector-exporter-node');

};
```


##### Enable instrumentation in the application code

Add the following configuration to the beginning of your application Node.js file:

```javascript
const tracer = require('./tracer.js')('logzio-collector-exporter-node');
```

Add the following configuration to the same file:

```javascript
app.get('/', async (req, res) => {
  // This outgoing HTTP request should be captured by Trace
  try {
    const {body} = await got(DISCOVERY_URL, {responseType: 'json'});
    const names = body.items.map(item => item.name);
    res.status(200).send(names.join('\n')).end();
    // res.status(200).send(body).end();
  } catch (err) {
    console.error(err);
  }
});
```


##### Download and configure OpenTelemetry collector

{% include tracing-shipping/otel_bug_june2021.md %}

Create a dedicated directory on the host of your Node.js application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.23.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application to generate traces:

```shell
node --require './tracer.js' <YOUR-APPLICATION-FILE-NAME>.js
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
