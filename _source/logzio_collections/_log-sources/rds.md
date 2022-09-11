---
title: Ship RDS logs
logo:
  logofile: aws-rds-logo.png
  orientation: horizontal
data-source: RDS
data-for-product-source: Logs
templates: [beats-logs, "docker"]
open-source:
  - title: mysql-logs
    github-repo: logzio-mysql-logs#rds-usage-docker-run
contributors:
  - nshishkin
shipping-tags:
  - database
  - aws
order: 280
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Docker](#rds)
* [Kubernetes](#kubernetes)
{:.branching-tabs}

<!-- tab:start -->
<div id="rds">

#### Deploying logzio-mysql-logs directly via Docker

**Before you begin, you'll need**:

* MySQL database hosted on Amazon RDS
* An active account with Logz.io


<div class="tasklist">

##### Pull Docker image

```shell
docker pull logzio/mysql-logs
```

##### Run the container

<!--
```
docker run -d --name logzio-mysql-logs -e LOGZIO_TOKEN=<<LOG-SHIPPING-TOKEN>> [-e LOGZIO_LISTENER=<<LISTENER-HOST>>] \
          -e RDS_IDENTIFIER=<<YOUR_DB_IDENTIFIER>> [-e AWS_ACCESS_KEY=<<YOUR_ACCESS_KEY>>] [-e AWS_SECRET_KEY=<<YOUR_SECRET_KEY>>] [-e AWS_REGION=<<YOUR_REGION>>] \
          [-e RDS_ERROR_LOG_FILE=<<PATH-TO-ERROR-LOG-FILE>>] [-e RDS_SLOW_LOG_FILE=<<PATH-TO-SLOW-LOG-FILE>>] [-e RDS_LOG_FILE=<<PATH-TO-LOG-FILE>>] \
          -v path_to_directory:/var/log/logzio -v path_to_directory:/var/log/mysql \
          logzio/mysql-logs:latest
```
-->

```shell
docker run -d --name logzio-mysql-logs \
-e LOGZIO_TOKEN="<<LOG-SHIPPING-TOKEN>>" \
-e LOGZIO_LISTENER_HOST="<<LISTENER-HOST>>" \
-v /var/log/logzio:/var/log/logzio \
-v /var/log/mysql:/var/log/mysql \
logzio/mysql-logs:latest
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| `<<LOG-SHIPPING-TOKEN>>` | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}   | Required |
| `<<LISTENER-HOST>>` | Your Logz.io account listener URL. {% include log-shipping/listener-var.html %} | Required. Default: `listener.logz.io` |
| `<<YOUR_DB_IDENTIFIER>>` | The RDS identifier of the host from which you want to read logs from. | Required |
| `<<YOUR_ACCESS_KEY>>` | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Optional |
| `<<YOUR_SECRET_KEY>>` | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Optional |
| `<<YOUR_REGION>>` | Your AWS region | Optional. `us-east-1` |
| `<<PATH-TO-ERROR-LOG-FILE>>` | The path to the RDS error log file. | Optional. `error/mysql-error.log` |
| `<<PATH-TO-SLOW-LOG-FILE>>` | The path to the RDS slow query log file. | Optional. `slowquery/mysql-slowquery.log` |
| `<<PATH-TO-LOG-FILE>>` | The path to the RDS general log file. | Optional. `general/mysql-general.log` |

Below is an example configuration for running the Docker container:

```bash
docker run -d \
  --name logzio-mysql-logs \
  -e LOGZIO_TOKEN=<<LOG-SHIPPING-TOKEN>> \
  -e AWS_ACCESS_KEY=<<YOUR_ACCESS_KEY>> \
  -e AWS_SECRET_KEY=<<YOUR_SECRET_KEY>> \
  -e AWS_REGION=<<YOUR_REGION>> \
  -e RDS_IDENTIFIER=<<YOUR_DB_IDENTIFIER>> \
  -e RDS_ERROR_LOG_FILE=error/mysql-error.log \
  -e RDS_SLOW_LOG_FILE=slowquery/mysql-slowquery.log \
  -e RDS_LOG_FILE=general/mysql-general.log \
  -v /var/log/logzio:/var/log/logzio \
  -v /var/log/mysql:/var/log/mysql \
  logzio/mysql-logs:latest
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="kubernetes">

#### Deploying logzio-mysql-logs directly via Kubernetes

{% include /general-shipping/agent-note.md %}


**Before you begin, you'll need**:

* MySQL database hosted on Amazon RDS
* Destination port 5015 open on your firewall for outgoing traffic.
* An active account with Logz.io

<!-- info-box-start:info -->
This is a basic deployment. If you need to apply advanced configurations, adjust and edit the deployment accordingly.
{:.info-box.note}
<!-- info-box-end -->

<div class="tasklist">


##### Create monitoring namespace:

If you don't already have a **monitoring** namespace in your cluster, create one using the following command:

```sh
kubectl create namespace monitoring
```

The `logzio-mysql-logs` will be deployed under this namespace.

##### Store your credentials:

Save your Logz.io shipping credentials as a Kubernetes secret using the following command:


```sh
kubectl create secret generic logzio-logs-secret -n kube-system \
--from-literal=logzio-logs-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
--from-literal=logzio-logs-listener='<<LISTENER-HOST>>' \
--from-literal=rds-identifier='<<RDS-IDENTIFIER>>' \
# Uncomment the lines below if you wish to insert any of the following variables:
#--from-literal=aws-access-key='<<AWS-ACCESS-KEY>>' \
#--from-literal=aws-secret-key='<<AWS-SECRET-KEY>>' \
#--from-literal=rds-error-log-file='<<RDS-ERROR-LOG-FILE-PATH>>' \
#--from-literal=rds-slow-log-file='<<RDS-SLOW-LOG-FILE-PATH>>' \
#--from-literal=rds-log-file='<<RDS-LOG-FILE-PATH>>' \
-n monitoring
```

<!-- info-box-start:info -->
If you're deploying to EKS cluster, and it has the appropriate IAM role permissions, you don't need to specify your AWS keys.
{:.info-box.note}
<!-- info-box-end -->



Replace the placeholders to match your specifics. (They are indicated by the double angle brackets `<< >>`):


| Parameter | Description | Required/Default |
|---|---|---|
| logzio-logs-shipping-token | Your Logz.io account token. Replace `<<LOG-SHIPPING-TOKEN>>` with the token of the account you want to ship to. | Required |
| logzio-logs-listener | Listener URL. Replace `<<LISTENER-HOST>>` with the host [for your region](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions). For example, `listener.logz.io` if your account is hosted on AWS US East, or `listener-nl.logz.io` if hosted on Azure West Europe. | Required. Default: `listener.logz.io` |
| rds-identifier | The RDS identifier of the host from which you want to read logs from. | Required |
| aws-access-key | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Optional |
| aws-secret-key | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Optional |
| rds-error-log-file | The path to the RDS error log file. | Optional. `error/mysql-error.log` |
| rds-slow-log-file | The path to the RDS slow query log file. | Optional. `slowquery/mysql-slowquery.log` |
| rds-log-file | The path to the RDS general log file. | Optional. `general/mysql-general.log` |



##### Deploy

Run the following command:

```sh
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-mysql-logs/master/k8s/logzio-deployment.yaml
```

<!-- info-box-start:info -->
If you chose to use one of the optional parameters in the previous step, you'll have to edit the [deployment file](https://raw.githubusercontent.com/logzio/logzio-mysql-logs/master/k8s/logzio-deployment.yaml) - download it, and uncomment the environment variables that you wish to use.
{:.info-box.note}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
