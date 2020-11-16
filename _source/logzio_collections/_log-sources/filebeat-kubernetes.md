---
title: Ship Kubernetes logs
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
templates: ["no-template", "no-template"]
shipping-tags:
  - container
---
<!-- tabContainer:start -->
<div class="branching-container">

<!-- tab:start -->
This implementation uses a Filebeat DaemonSet to collect Kubernetes logs from your cluster and ship them to Logz.io.

You have 3 ways to deploy this Daemonset:

* Standard configuration - standard built-in configuration.
* Autodiscover configuration - built-in configuration that uses Filebeat's autodiscover and hints system.
* Custom configuration - upload logz.io Daemonset with your own configuration.

For For further information about Filebeat's autodiscover please see [Autodiscover documentation](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover.html).

<div id="standard-config">

**Before you begin, you'll need**:

* Destination port 5015 open on your firewall for outgoing traffic

#### Deploy


#### 1. Store your Logz.io credentials

Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

Replace `<<LISTENER-HOST>>` associated to your region (for example, `listener.logz.io` is associated to `US East` region  ). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

Replace `<<CLUSTER-NAME>>` with your cluster's name. If you manage Kubernetes in AWS or Azure,
you can find it in your admin console. Otherwise, you can run this command: `kubectl cluster-info`

```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<SHIPPING-TOKEN>>' \
  --from-literal=logzio-logs-listener='<<LISTENER-HOST>>' \
  --from-literal=cluster-name='<<CLUSTER-NAME>>' \
  -n kube-system
```

#### 2. deploy

##### For standard configuration deployment:
```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-filebeat.yaml -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/filebeat-standard-configuration.yaml
```

##### For autodiscover configuration deployment:
Autodiscover allows you to adapt settings as changes happen. By defining configuration templates, the autodiscover subsystem can monitor services as they start running.

```shell
 kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-filebeat.yaml -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/filebeat-autodiscovery-configuration.yaml
```

##### If you want to apply  your one custom configuration:
Download standard-configmap.yaml and apply your changes there, make sure that you will have the same structure of the file.

```shell
wget https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/filebeat-standard-configuration.yaml
```

**Note:** You suppose to make changes only to the content of the field 'filebeat.yml' (witch contains a basic Filebeat configuration),for more information about configuring filebeat see [Configure Filebeatedit](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html)

```
filebeat.yml: |-
  
  # ...
  # Start editing your configuration here 
  filebeat.inputs:
  - type: container
    paths:
      - /var/log/containers/*.log
    processors:
      - add_kubernetes_metadata:
          host: ${NODE_NAME}
          matchers:
          - logs_path:
              logs_path: "/var/log/containers/"

  processors:
    - add_cloud_metadata: ~
  # ...
  # End editing your configuration here (you are not suppose to change 'fields' and 'output' )

  fields:
    logzio_codec: ${LOGZIO_CODEC}
    token: ${LOGZIO_LOGS_SHIPPING_TOKEN}
    cluster: ${CLUSTER_NAME}
    type: ${LOGZIO_TYPE}
  fields_under_root: true
  ignore_older: ${IGNORE_OLDER}
  output:
    logstash:
      hosts: ["${LOGZIO_LOGS_LISTENER_HOST}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt']
---
```

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/k8s-filebeat.yaml -f <<Your-custom-configuration-file.yaml>>
```

#### 3. Check Logz.io for your logs
Give your logs some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/).


</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
