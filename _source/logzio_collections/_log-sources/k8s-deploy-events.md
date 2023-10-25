---
title: Ship K8S deploy events logs with Helm
logo:
  logofile: kubernetes.svg
  orientation: vertical
short-description: Ship kubernetes deploy events logs with Helm
data-source: Kubernetes Deploy Events
data-for-product-source: Logs
open-source:
  - title: logzio-helm
    github-repo: logzio-helm
contributors:
  - ralongit
shipping-tags:
  - log-shipper
  - container
order: 430
---


The Kubernetes deploy events logs Helm sends data about deployment events in the cluster, and how they affect the cluster's resources. Currently supported resource kinds are Deployment, Daemonset, Statefulset, ConfigMap, Secret, Service Account, Cluster Role and Cluster Role Binding.

Helm is a tool for managing packages of pre-configured Kubernetes resources using Charts. You can use this Helm chart to ship kubernetes deploy events logs with Helm. 


###### Sending logs from nodes with taints

If you want to ship logs from any of the nodes that have a taint, make sure that the taint key values are listed in your in your daemonset/deployment configuration as follows:
  
```yaml
tolerations:
- key: 
  operator: 
  value: 
  effect: 
```
  
To determine if a node uses taints as well as to display the taint keys, run:
  
```
kubectl get nodes -o json | jq ".items[]|{name:.metadata.name, taints:.spec.taints}"
```

You need to use `Helm` client with version `v3.9.0` or above.


#### Standard configuration

<div class="tasklist">

##### Add `logzio-helm` repo
  
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```


###### Run the Helm deployment code

```shell
helm install --namespace=monitoring \
--set secrets.logzioShippingToken='<<LOG-SHIPPING-TOKEN>>' \
--set secrets.logzioListener='<<LISTENER-HOST>>' \
--set secrets.env_id='<<ENV-ID>>' \
logzio-k8s-events logzio-helm/logzio-k8s-events
```
  
{% include log-shipping/listener-var.html %} 
{% include log-shipping/log-shipping-token.html %} 

Replace `<<ENV-ID>>` with your Kubernetes cluster name.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>


####  Customizing Helm chart parameters


##### Optional Custom Listener
If you have a custom Logz.io listener, you can use the parameter `customListener` and override the Logz.io listener parameter and route the data to the custom listener. 

Replace `<<CUSTOM-HOST>>` with your custom endpoint URL. 

```shell
helm install --namespace=monitoring \
--set secrets.logzioShippingToken='<<SHIPPING-TOKEN>>' \
--set secrets.customListener='<<CUSTOM-HOST>>' \
--set secrets.env_id='<<ENV-ID>>' \
logzio-k8s-events logzio-helm/logzio-k8s-events
```

#### Deployment Events Versioning

In order to add an indication for the versioning in our K8S 360 and Service Overview UI, the following annotation should be added to the metadata of each resource you'd like to track its versioning. 
Commit URL structure: `https://github.com/<account>/<repository>/commit/<commit-hash>`

Example: `https://github.com/logzio/logzio-k8s-events/commit/069c75c95caeca58dd0776405bb8dfb4eed3acb2`

```yaml
metadata:
  annotations:
    logzio/commit_url: ""  
```

#### Uninstalling the Chart

The command removes all the k8s components associated with the chart and deletes the release.
To uninstall the `logzio-k8s-events` deployment:

```shell
helm uninstall --namespace=monitoring logzio-k8s-events
```