has_kubectl=$(kubectl 2>&1)
if [[ $has_kubectl == *"command not found"* ]]; then
  echo "kubectl not found! please install and configure kubectl first"
  exit 1
fi

has_jq=$(jq --version 2>&1)
if [[ $has_jq == *"command not found"* ]]; then
  brew install jq
fi

has_kube_stat_metrics=$(kubectl get deployments --all-namespaces | grep kube-state-metrics)
if [[ -z $has_kube_stat_metrics ]]; then
  git clone https://github.com/kubernetes/kube-state-metrics.git
  kubectl --namespace=kube-system apply -f kube-state-metrics/examples/standard
  rm  -rf kube-state-metrics
fi

kube_stat_ns=$(kubectl get deployments --all-namespaces -o json | jq '.items[] | select(.metadata.name == "kube-state-metrics")' | jq -r '.metadata.namespace')
kube_stat_port=$(kubectl get deployments --all-namespaces -o json | jq '.items[] | select(.metadata.name == "kube-state-metrics")' | jq '.spec.template.spec.containers[0].ports[] | select(.name == "http-metrics")' | jq '.containerPort')

read -esp "Enter your Logz.io Metrics Shipping Token:" metrics_token
printf "\n"
read -ep "Enter your Logz.io region [us]:" logzio_region
if [[ ! -z $logzio_region ]] && [[ $logzio_region != "us" ]]; then
  logzio_region="-${logzio_region}"
else
  logzio_region=""
fi
listener_host="listener${logzio_region}.logz.io"

read -ep "Enter Kubelet shipping protocol [https]:" shipping_protocol
shipping_protocol=${shipping_protocol:-"https"}
shipping_port="10250"
if [[ $shipping_protocol == "http" ]]; then
  shipping_port="10255"
fi

kubectl --namespace=kube-system create secret generic logzio-metrics-secret \
  --from-literal=logzio-metrics-shipping-token=$metrics_token \
  --from-literal=logzio-metrics-listener-host=$listener_host

cluster_name=$(kubectl config current-context)
if [[ $cluster_name == *"cluster/"* ]]; then
  cluster_name=${cluster_name#*"cluster/"}
fi
read -ep "Enter your cluster name [${cluster_name}]:" real_cluster_name
real_cluster_name=${real_cluster_name:-"${cluster_name}"}

echo "your cluster: ${real_cluster_name}"
echo "your shipping_port: ${shipping_port}"
echo "your shipping_protocol: ${shipping_protocol}"
echo "your listener_host: ${listener_host}"
echo "your kube_stat_port: ${kube_stat_port}"
echo "your kube_stat_ns: ${kube_stat_ns}"
echo "your metrics_token: ${metrics_token}"

kubectl --namespace=kube-system create secret generic cluster-details \
  --from-literal=kube-state-metrics-namespace=$kube_stat_ns \
  --from-literal=kube-state-shipping-protocol=$shipping_protocol \
  --from-literal=kube-state-shipping-port=$shipping_port \
  --from-literal=kube-state-metrics-port=$kube_stat_port \
  --from-literal=cluster-name=$cluster_name


kubectl --namespace=kube-system apply -f https://raw.githubusercontent.com/logzio/logz-docs/kube-metrics-script/shipping-config-samples/k8s-metricbeat.yml
