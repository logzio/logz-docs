---
layout: article
title: EZKonnect
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ssimplify the process of instrumenting Kubernetes applications with OpenTelemetry auto-instrumentation and configurable log types
permalink: /user-guide/log-shipping/ezkonnect.html
flags: 
  logzio-plan: community
tags:
  - log-shipping
contributors:
  - nshishkin
---

EZKonnect is a deployment and configuration tool designed to assist you in effectively instrumenting Kubernetes applications with OpenTelemetry auto-instrumentation and configurable log types.

At the heart of EZKonnect is the `logzio-ezkonnect` Helm chart, which functions synergistically with the `logzio-monitoring` Helm chart.

EZKonnect comprises three principal components:

* **Kubernetes Instrumentor** - Provides auto-instrumentation and manages log type control for Kubernetes applications.
* **EZKonnect Server** - Facilitates communication between the user and the Kubernetes Instrumentor.
* **EZKonnect UI** - Offers an intuitive graphical interface for managing and viewing your instrumentation data.

The EZKonnect UI enables you to enhance your Logz.io Open 360 Observability platform by identifying and assigning log, metrics, and trace types in their pods. Simply click on the 'Add' button to select their desired type, and then click 'Deploy' to implement the changes to your Logz.io account. The UI facilitates the management of various components, such as logs, traces, applications, namespace, and log types, thereby providing comprehensive control of the observability platform.

![UI](https://dytvr9ot2sszz.cloudfront.net/logz-docs/ezkonnect/ezkonnect.png)

EZKonnect supports several programming languages, including:

* Java
* Node.js
* Python
* .NET


## Installation

To install the EZKonnect Helm chart, run the following commands:

```shell
helm repo update
helm install logzio-ezkonnect logzio-helm/ezkonnect -n ezkonnect --create-namespace
```

Afterwards, use `kubectl port-forward` to access the user interface in your browser:

```shell
kubectl port-forward svc/ezkonnect-ui -n ezkonnect 8080:8080
```

Then, navigate to `http://localhost:8080`.

## Configuration

The EZKonnect chart has several configurable parameters and their default values. Below is a table detailing these parameters:

| Parameter | Description | Default |
| --- | --- | --- |
| `kubernetesInstrumentor.serviceAccount` | Service account name of the instrumentor deployment | "kubernetes-instrumentor" |
| `kubernetesInstrumentor.image.repository` | Repository of the instrumentor image | "logzio/instrumentor" |
| `kubernetesInstrumentor.image.tag` | Tag of the instrumentor image | "v1.0.3" |
| `kubernetesInstrumentor.instrumentationDetectorImage.repository` | Repository of the instrumentation detector image | "logzio/instrumentation-detector" |
| `kubernetesInstrumentor.instrumentationDetectorImage.tag` | Tag of the instrumentation detector image | "v1.0.3" |
| `kubernetesInstrumentor.javaAgentImage.repository` | Repository of the Java agent image | "logzio/otel-agent-java" |
| `kubernetesInstrumentor.javaAgentImage.tag` | Tag of the Java agent image | "v1.0.3" |
| `kubernetesInstrumentor.dotnetAgentImage.repository` | Repository of the .Net agent image | "logzio/otel-agent-dotnet" |
| `kubernetesInstrumentor.dotnetAgentImage.tag` | Tag of the .Net agent image | "v1.0.3" |
| `kubernetesInstrumentor.nodejsAgentImage.repository` | Repository of the Node.js agent image | "logzio/otel-agent-nodejs" |
| `kubernetesInstrumentor.nodejsAgentImage.tag` | Tag of the Node.js agent image | "v1.0.3" |
| `kubernetesInstrumentor.pythonAgentImage.repository` | Repository of the Python agent image | "logzio/otel-agent-python" |
| `kubernetesInstrumentor.pythonAgentImage.tag` | Tag of the Python agent image | "v1.0.3" |
| `kubernetesInstrumentor.ports.metricsPort` | Metrics port for the instrumentor | 8080 |
| `kubernetesInstrumentor.ports.healthProbePort` | Health probe port for the instrumentor | 8081 |
| `kubernetesInstrumentor.resources.limits.cpu` | CPU limit for the instrumentor | "500m" |
| `kubernetesInstrumentor.resources.limits.memory` | Memory limit for the instrumentor | "128Mi" |
| `kubernetesInstrumentor.resources.requests.cpu` | CPU request for the instrumentor | "10m" |
| `kubernetesInstrumentor.resources.requests.memory` | Memory request for the instrumentor | "64Mi" |
| `kubernetesInstrumentor.env.monitoringServiceEndpoint` | Endpoint of the monitoring service | "logzio-monitoring-otel-collector.monitoring.svc.cluster.local" |
| `kubernetesInstrumentor.service.name` | Name of the instrumentor service | "kubernetes-instrumentor-service" |
| `kubernetesInstrumentor.service.port` | Service port for the instrumentor | 8080 |
| `kubernetesInstrumentor.service.targetPort` | Target port for the instrumentor service | 8080 |
| `ezkonnectServer.serviceAccount` | Service account name of the instrumentor deployment | "ezkonnect-server" |
| `ezkonnectServer.image.repository` | Repository of the server image | "logzio/ezkonnect-server" |
| `ezkonnectServer.image.tag` | Tag of the server image | "v1.0.4" |
| `ezkonnectServer.ports.http` | HTTP port for the server | 5050 |
| `ezkonnectServer.service.name` | Name of the server service | "ezkonnect-server" |
| `ezkonnectServer.service.port` | Service port for the server | 5050 |
| `ezkonnectServer.service.targetPort` | Target port for the server service | 5050 |
| `ezkonnectUi.image.repository` | Repository of the UI image | "logzio/ezkonnect-ui" |
| `ezkonnectUi.image.tag` | Tag of the UI image | "v0.0.3" |
| `ezkonnectUi.ports.http` | HTTP port for the UI | 8080 |
| `ezkonnectUi.service.name` | Name of the UI service | "ezkonnect-ui-service" |
| `ezkonnectUi.service.type` | Type of the UI service | "LoadBalancer" |
| `ezkonnectUi.service.port` | Service port for the UI | 8080 |
| `ezkonnectUi.service.targetPort` | Target port for the UI service | 8080 |
| `rbac.clusterRoles...` | Configure the RBAC cluster roles | Refer to values.yaml |
| `rbac.clusterRoleBindings...` | Configure the RBAC cluster role bindings | Refer to values.yaml |


You can override the default values by creating your own `values.yaml` file and passing the `--values` or `-f` option to the Helm command. For example:

```shell
You can override the default values by creating your own values.yaml file and passing the --values or -f option to the Helm command. For example:
```
