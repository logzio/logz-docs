---
title: Ship EC2 metrics
logo:
  logofile: aws-ec2.svg
  orientation: vertical
data-source: EC2
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
---


<!-- tabContainer:start -->
<div class="branching-container">

* [Ship EC2 over Docker container](#ec2-docker)
* [Ship over self-hosted Metricbeat](#ec2-vanilla)
{:.branching-tabs}



<!-- tab:start -->
<div id="ec2-docker">

To simplify shipping metrics from one or many sources,
we created a Docker Metrics Collector. The
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

#### Configuration

{% include trust-chain-warning.html msg='docker' %}

If you're not already running Docker Metrics Collector,
follow these steps.

Otherwise, stop the container, add
`aws`
to the `LOGZIO_MODULES` environment variable, and restart.
You can find the `run` command and all parameters
in this procedure.

<div class="tasklist">

##### Set up your IAM user

You'll need an [IAM user](https://console.aws.amazon.com/iam/home)
with these permissions:

* `cloudwatch:GetMetricData`
* `cloudwatch:ListMetrics`
* `ec2:DescribeInstances`
* `ec2:DescribeRegions`
* `iam:ListAccountAliases`
* `sts:GetCallerIdentity`

If you don't have one, set that up now.

Create an **Access key ID** and **Secret access key** for the IAM user,
and paste them in your text editor.

You'll need these for your Metricbeat configuration later.

##### Get your metrics region

You'll need to specify the AWS region you're collecting metrics from.

![AWS region menu](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/region-menu.png)

Find your region's slug in the region menu
(in the top menu, on the right side).

For example:
The slug for US East (N. Virginia)
is "us-east-1",
and the slug for Canada (Central) is "ca-central-1".

Paste your region slug in your text editor.
You'll need this for your Metricbeat configuration later.

##### Pull the Docker image

Download the Docker Metrics Collector image:

```shell
docker pull logzio/docker-collector-metrics
```

##### Run the container

You'll set your configuration using environment variables
in the `docker run` command.
Each parameter is formatted like this:
`--env ENV_VARIABLE_NAME="value"`.

For a complete list of options, see the parameters below the code block.👇

```shell
docker run --name docker-collector-metrics \
--env LOGZIO_TOKEN="<<SHIPPING-TOKEN>>" \
--env LOGZIO_MODULES="aws" \
--env AWS_ACCESS_KEY="<<ACCESS-KEY>>" \
--env AWS_SECRET_KEY="<<SECRET-KEY>>" \
--env AWS_REGION="<<AWS-REGION>>" \
--env AWS_NAMESPACES="<<NAMESPACES>>" \
logzio/docker-collector-metrics
```

###### Parameters for all modules

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| LOGZIO_MODULES <span class="required-param"></span> | Comma-separated list of Metricbeat modules to enable on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/logzio_modules`. |
| LOGZIO_REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls) table. |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value. <br> In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`). <br> To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
{% include metric-shipping/debug-param.html %}
{:.paramlist}

###### Parameters for the AWS module

| Parameter | Description |
|---|---|
| AWS_ACCESS_KEY <span class="required-param"></span> | Your IAM user's access key ID. |
| AWS_SECRET_KEY <span class="required-param"></span> | Your IAM user's secret key. |
| AWS_REGION <span class="required-param"></span> | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES <span class="required-param"></span> | Comma-separated list of namespaces of the metrics you want to collect. <br> For EC2, this is `AWS/EC2`. For the complete list of all valid namespaces, see this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html). |
{:.paramlist}


##### Monitor advanced EC2 metrics (_Optional_)

If you want, you can also monitor advanced EC2 metrics, including disk memory and swap memory. 

To enable this option, you’ll need to install and configure a CloudWatch agent on your machine and specify the **CWAgent** namespace under the AWS_NAMESPACES parameter. For example:

```yml
metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/EC2
    - namespace: CWAgent
```

For additional instructions, see more about [installing the CloudWatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html) and [configuring it](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html).


{% include metric-shipping/open-dashboard.html title="Cloudwatch AWS/EC2" %}

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="ec2-vanilla">

You have the option to ship CloudWatch metrics directly over Metricbeat, without a Docker container.

**Recommended version**: Metricbeat version 7.5.x

#### Configuration

{% include trust-chain-warning.html msg='docker' %}

<div class="tasklist">

##### Set up your IAM user

You'll need an [IAM user](https://console.aws.amazon.com/iam/home)
with these permissions:

* `cloudwatch:GetMetricData`
* `cloudwatch:ListMetrics`
* `ec2:DescribeInstances`
* `ec2:DescribeRegions`
* `iam:ListAccountAliases`
* `sts:GetCallerIdentity`

If you don't have one, set that up now.

Create an **Access key ID** and **Secret access key** for the IAM user,
and paste them in your text editor.

You'll need these for your Metricbeat configuration later.

##### Get your metrics region

You'll need to specify the AWS region you're collecting metrics from.

![AWS region menu](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/region-menu.png)

Find your region's slug in the region menu
(in the top menu, on the right side).

For example:
The slug for US East (N. Virginia)
is "us-east-1",
and the slug for Canada (Central) is "ca-central-1".

Paste your region slug in your text editor.
You'll need this for your Metricbeat configuration later.

##### Download the Logz.io public certificate to your Metricbeat server

{% include trust-chain-warning.html %}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### _(Optional)_ Disable the system module

By default, Metricbeat ships system metrics from its host.
If you don't need these metrics,
disable the system module:

```shell
sudo metricbeat modules disable system
```

##### Configure Metricbeat

If you're working with the default configuration file,
(`/etc/metricbeat/metricbeat.yml`), clear the contents and start with a fresh file.

This code block lays out the default options
for collecting metrics from EC2.
Paste the code block.
Then adjust it to match your AWS environment.

```yml
metricbeat.modules:
- module: aws
  period: 300s
  metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/EC2

  access_key_id: '<<access_key_id>>'
  secret_access_key: '<<secret_access_key>>'
default_region: <<YOUR-AWS-REGION>>

fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in your Metricbeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

* Replace the namespaces you want to ship from. You can refer to this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for the complete list of valid AWS namespaces.

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Monitor advanced EC2 metrics (_Optional_)

If you want, you can also monitor advanced EC2 metrics, including disk memory and swap memory. 

To enable this option, you’ll need to install and configure a CloudWatch agent on your machine and specify the **CWAgent** namespace under the metrics section. For example:

```yml
metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/EC2
    - namespace: CWAgent
```

For additional instructions, see more about [installing the CloudWatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html) and [configuring it](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html).

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.


{% include metric-shipping/open-dashboard.html title="Cloudwatch AWS/EC2" %}

</div>
<!-- tab:end -->


</div>
