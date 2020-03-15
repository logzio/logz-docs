---
title: Ship RDS metrics
logo:
  logofile: aws-rds.svg
  orientation: vertical
data-source: RDS
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
`ec2:DescribeRegions`,
`iam:ListAccountAliases`,
`rds:DescribeDBInstances`,
`sts:GetCallerIdentity`

If you don't have one, set that up now.

Create an **Access key ID** and **Secret access key** for the IAM user,
and paste them in your text editor.

You'll need these for your Metricbeat configuration later.

##### Get your metrics region

You'll need to specify the AWS region you're collecting metrics from.

![AWS region menu]({{site.baseurl}}/images/aws/region-menu.png)

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
| LOGZIO_REGION | Your Logz.io account's region. Omit for US East. For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value. <br> In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`). <br> To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
{:.paramlist}

###### Parameters for the AWS module

| Parameter | Description |
|---|---|
| AWS_ACCESS_KEY <span class="required-param"></span> | Your IAM user's access key ID. |
| AWS_SECRET_KEY <span class="required-param"></span> | Your IAM user's secret key. |
| AWS_REGION <span class="required-param"></span> | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES <span class="required-param"></span> | Comma-separate list of namespaces of the metrics you want to collect. <br> For RDS, this is `AWS/RDS`. |
{:.paramlist}

##### Check Logz.io for your metrics

Give your metrics a few minutes to get from your system to ours,
and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

You can view your metrics on the
AWS RDS
dashboard in Grafana.
Just click **<i class="fas fa-th-large"></i> > Manage** in the left menu,
then click
**Logz.io Dashboards >**
**AWS RDS**.

</div>
