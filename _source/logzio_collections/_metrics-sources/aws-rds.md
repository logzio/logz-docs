---
title: Ship RDS metrics
logo:
  logofile: aws-rds.svg
  orientation: vertical
data-source: Amazon RDS
templates: ["docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
order: 840
---
#### NEW BUTTON
456
<!-- logzio-inject:install:grafana:dashboards ids=['4Tk1cgkBEnyrOjTuhKILto','4F0PJis1p02ZyMtuMflYyo'] -->

To simplify shipping metrics from one or many sources,
we created Docker Metrics Collector.
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



{% include metric-shipping/aws-run-container.md %}

{% include metric-shipping/aws-metrics.md namespace="RDS" %}

{% include metric-shipping/open-dashboard.md title="Cloudwatch AWS/RDS" %}


</div>
