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

"use strict";

const {
	BasicTracerProvider,
	ConsoleSpanExporter,
	SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");
const { Resource } = require("@opentelemetry/resources");
const {
	SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const exporter = new CollectorTraceExporter({});

const provider = new BasicTracerProvider({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]:
			"logzio-collector-exporter-node-app-a",
	}),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
const sdk = new opentelemetry.NodeSDK({
	traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk
	.start()
	.then(() => {
		console.log("Tracing initialized");
	})
	.catch((error) => console.log("Error initializing tracing", error));

process.on("SIGTERM", () => {
	sdk
		.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0));
});

```


##### Enable instrumentation in the application code

Add the following configuration to the beginning of your application Node.js file:

```javascript
const tracer = require('./tracer.js')('logzio-collector-exporter-node');
```
