---
title: Ship Fargate logs
logo:
  logofile: aws-fargate.svg
  orientation: vertical
data-source: Fargate
contributors:
  - imnotashrimp
  - ronish31
shipping-tags:
  - aws
  - container
---

This integration will send your AWS Fargate logs to FireLens.
From there, Fluent Bit ships to Logz.io.

#### Configuration

**Before you begin, you'll need**:
A cluster in a VPC with [Container Insights](https://docs.aws.amazon.com/AmazonECS/latest/userguide/cloudwatch-container-insights.html) enabled

<div class="tasklist">

##### Build IAM roles:

TODO Permissions needed?

* Execution Role Arn -
* Task Role Arn -

##### Create a Fluent Bit task definition

In the ECS
[_Task Definitions_](https://eu-central-1.console.aws.amazon.com/ecs/home?region=eu-central-1#/taskDefinitions)
page,
click **Create new Task Definition**.

<div class="fpo fpo-1"></div>

Choose **Fargate**,
and click **Next step** to continue.

Scroll to the _Volumes_ section
(near the bottom of the page)
and click
**Configure via JSON**.

<div class="fpo fpo-2"></div>

Replace the default JSON
with this code block.

You'll need to replace some of the values
using the parameters below the code block. 👇

When you're done, click **Save**,
and then click **Create**.

```json
{
  "family": "logzio-fargate-task",
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "containerDefinitions": [
    {
      "name": "logzio-log-router",
      "image": "amazon/aws-for-fluent-bit:latest",
      "essential": true,
      "firelensConfiguration": {
        "type": "fluentbit",
        "options": { "enable-ecs-log-metadata": "true" }
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/aws/ecs/logzio-fargate-logs",
          "awslogs-region": "<<AWS-REGION>>",
          "awslogs-stream-prefix": "aws/ecs"
        }
      }
    },
    {
      "name": "app",
      "essential": true,
      "image": "<<YOUR-APP-IMAGE>>",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "Name": "Http",
          "Host": "listener.logz.io",
          "URI": "/?token=<<SHIPPING-TOKEN>>&type=FARGATE",
          "Port": "8071",
          "tls": "on",
          "tls.verify": "off",
          "Format": "json_lines"
        }
      }
    }
  ],
  "cpu": "256",
  "executionRoleArn": "arn:aws:iam::<<AWS-ACCOUNT-ID>>:role/ecsTaskExecutionRole",
  "memory": "512",
  "volumes": [ ],
  "placementConstraints": [ ],
  "taskRoleArn": "arn:aws:iam::<<AWS-ACCOUNT-ID>>:role/ecsTaskRoleTest",
  "networkMode": "awsvpc",
  "tags": [ ]
}
```

###### Parameters in "logzio-log-router"

| Parameter | Description |
|---|---|
| logConfiguration.awslogs-group | In the CloudWatch left menu, select **Logs > Log groups**, and then click **Actions > Create log group**. Give the **Log Group Name** "/aws/ecs/logzio-fargate-logs". |
| logConfiguration.awslogs-region | The [AWS region](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) of your cluster. |
{:.paramlist}

###### Parameters in "app"

| Parameter | Description |
|---|---|
| image | Replace `<<YOUR-APP-IMAGE>>` with the name of the image/app you are deploying. TODO - which one? |
| logConfiguration.options.Host | Your region's listener host. For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| logConfiguration.options.URI | {% include log-shipping/replace-vars.html token=true %} |
{:.paramlist}

###### Remaining parameters

| Parameter | Description |
|---|---|
| executionRoleArn | Replace `<<AWS-ACCOUNT-ID>>` with your [AWS account Id](https://console.aws.amazon.com/billing/home?#/account). |
| taskRoleArn | Replace `<<AWS-ACCOUNT-ID>>` with your [AWS account Id](https://console.aws.amazon.com/billing/home?#/account). |
{:.paramlist}

##### Run the task on your cluster

* On the your task definition page press 'Actions' and choose 'Run Task'.

* Press 'Switch to launch type' and fill in the following:
-'Launch Type': Choose 'FARGATE'.
-'Cluster': Choose your cluster.
-'Subnets': Choose one subnet from your given options.

Press 'Run task' and THAT'S IT!

The logs that are created by your image will be sent to logz.io.
The logs that are created by the Fluent Bit shipper will be sent to Cloudwatch under log group: "/aws/ecs/logzio-fargate-logs".

</div>
