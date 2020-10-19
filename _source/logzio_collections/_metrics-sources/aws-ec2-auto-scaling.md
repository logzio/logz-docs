---
title: Ship EC2 Auto Scaling metrics
logo:
  logofile: aws-ec2-auto-scaling.svg
  orientation: vertical
data-source: Amazon EC2 Auto Scaling
templates: ["docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
---

To simplify shipping metrics from one or many sources,
we created Docker Metrics Collector.
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

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
`cloudwatch:GetMetricData`,
`cloudwatch:ListMetrics`,
`ec2:DescribeInstances`,
`ec2:DescribeRegions`,
`iam:ListAccountAliases`,
`sts:GetCallerIdentity`

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

##### Enable EC2 Auto Scaling metrics

In the [EC2 console](https://console.aws.amazon.com/ec2/) left menu,
click **AUTO SCALING > Auto Scaling Groups**

Select the Auto Scaling group you want to monitor.
To do this, click the **Monitoring** tab,
and then click **Enable Group Metrics Collection**.

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
| LOGZIO_TOKEN <span class="required-param"></span> | {% include metric-shipping/replace-metrics-token.md %} |
| LOGZIO_MODULES <span class="required-param"></span> | Comma-separated list of Metricbeat modules to enable on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/modules`. |
| LOGZIO_REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls) table. |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value. <br> In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`). <br> To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
| HOSTNAME <span class="default-param">``</span> | Insert your host name if you want it to appear in the metrics' `host.name`. If null, host.name will show the container's ID. |
{% include metric-shipping/debug-param.md %}
{:.paramlist}

###### Parameters for the AWS module

| Parameter | Description |
|---|---|
| AWS_ACCESS_KEY <span class="required-param"></span> | Your IAM user's access key ID. |
| AWS_SECRET_KEY <span class="required-param"></span> | Your IAM user's secret key. |
| AWS_REGION <span class="required-param"></span> | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES <span class="required-param"></span> | Comma-separated list of namespaces of the metrics you want to collect. <br> For EC2 Auto Scaling, this is `AWS/AutoScaling`. |
{:.paramlist}

{% include metric-shipping/open-dashboard.md title="Cloudwatch AWS/Auto Scaling" %}
{:.paramlist}


</div>
