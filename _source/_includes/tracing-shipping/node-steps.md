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
npm install --save @opentelemetry/sdk-node
```

##### Create a tracer file

In the directory of your application file, create a file named `tracer.js` with the following configuration:

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