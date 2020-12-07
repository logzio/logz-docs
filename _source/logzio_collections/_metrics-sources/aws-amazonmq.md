---
title: Ship Amazon MQ metrics
logo:
  logofile: aws-mq.svg
  orientation: vertical
data-source: Amazon MQ
templates: ["docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
  - yotamloe
shipping-tags:
  - aws
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Ship AmazonMQ metrics over Docker container](#AmazonMQ-docker)
* [Ship over self-hosted Metricbeat](#AmazonMQ-vanilla)
{:.branching-tabs}


<!-- tab:start -->
<div id="AmazonMQ-docker">

To simplify shipping metrics from one or many sources,
we created a Docker Metrics Collector. The
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

{% include /metric-shipping/docker-metricbeat-version.md %}


#### Configuration

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
--env AWS_ACCESS_KEY_ID="<<ACCESS-KEY>>" \
--env AWS_SECRET_ACCESS_KEY="<<SECRET-KEY>>" \
--env AWS_DEFAULT_REGION="<<AWS-REGION>>" \
--env AWS_NAMESPACES="<<NAMESPACES>>" \
logzio/docker-collector-metrics
```

###### Parameters for all modules

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| LOGZIO_MODULES <span class="required-param"></span> | Comma-separated list of Metricbeat modules to enable on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/modules`. |
| LOGZIO_REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls) table. |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value. <br> In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`). <br> To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
| HOSTNAME <span class="default-param">``</span> | Insert your host name if you want it to appear in the metrics' `host.name`. If null, host.name will show the container's ID. |
{% include metric-shipping/debug-param.html %}
{:.paramlist}

###### Parameters for the AWS module

Use these parameters if you prefer to explicitly name your access key ID and secret access key. If you are using a credentials file, skip to the relevant [section](#credentials).


| Parameter | Description |
|---|---|
| AWS_ACCESS_KEY_ID <span class="required-param"></span> | Your IAM user's access key ID. |
| AWS_SECRET_ACCESS_KEY <span class="required-param"></span> | Your IAM user's secret key. |
| AWS_DEFAULT_REGION <span class="required-param"></span> | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES <span class="required-param"></span> | Comma-separated list of namespaces of the metrics you want to collect. <br> For AmazonMQ, this is `AWS/AmazonMQ`. For the complete list of all valid namespaces, see this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html). |
{:.paramlist}

###### Parameters for the AWS module when using a credentials file {#credentials}

You can use a credential file instead of explicitly naming your access key ID and secret access key. You'll also need to set an ARN role either on your credential file or explicitly using the parameter `AWS_ROLE_ARN`.

[Learn more about configration options for AWS Credentials](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-aws.html#aws-credentials-config).

| Parameter | Description |
|---|---|
| AWS_DEFAULT_REGION <span class="required-param"></span> | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES <span class="required-param"></span> | Comma-separated list of namespaces of the metrics you want to collect. <br> For AmazonMQ, this is `AWS/AmazonMQ`. For the complete list of all valid namespaces, see this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html). |
| AWS_CREDENTIAL_PROFILE_NAME <span class="required-param"></span> | Your profile name in shared credentials file. |
| AWS_SHARED_CREDENTIAL_FILE <span class="required-param"></span> | Your directory of the shared credentials file, in your docker instance. <br> **Note:** If you're using this parameter, you'll have to mount your credentials folder. To mount your credentials folder, add the following line to your `docker run` command: <br> `-v /path/to/your/aws/credentials/folder:<<path/to/shared/credential/file/in/docker>>:ro`. |
| AWS_SESSION_TOKEN | Your IAM user's session token. |
| AWS_ROLE_ARN | Your IAM role to assume. Add this parameter only if your credential file doesn't include an ARN role. |
{:.paramlist}

{% include metric-shipping/open-dashboard.html title="Cloudwatch AWS/AmazonMQ" %}

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="AmazonMQ-vanilla">

You have the option to ship CloudWatch metrics directly over Metricbeat, without a Docker container.

**Recommended version**: Metricbeat version 7.5.x

#### Configuration

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

{% include log-shipping/certificate.md server="to your Metricbeat server" %}

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
for collecting metrics from AmazonMQ.
Paste the code block.
Then adjust it to match your AWS environment.

```yml
metricbeat.modules:
- module: aws
  period: 300s
  metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/AmazonMQ

  access_key_id: '<<access_key_id>>'
  secret_access_key: '<<secret_access_key>>'

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


One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.


{% include metric-shipping/open-dashboard.html title="Cloudwatch AWS/AmazonMQ" %}

</div>
<!-- tab:end -->


</div>