---
title: Ship Fargate logs
logo:
  logofile: aws-fargate.svg
  orientation: vertical
data-source: Fargate
templates: ["no-template"]
contributors:
  - ronish31
  - imnotashrimp
shipping-tags:
  - aws
  - container
---

This integration will send your AWS Fargate to Logz.io
using FireLens.

#### Configuration

<div class="tasklist">

##### Build the task execution role

[Create a new role](https://console.aws.amazon.com/iam/home#/roles$new?step=type)
in the IAM console.

Make sure **AWS service** is selected at the top of the page.
In the _Choose a use case_ section,
click **Elastic Container Service**,
and then scroll to the bottom of the page and click **Elastic Container Service Task**.

Click **Next: Permissions** to continue.

Select **AmazonECSTaskExecutionRolePolicy**.

Click **Next: Tags** and then **Next: Review**

Set **Role name** to "logzioEcsTaskExecutionRole",
and click **Create role** to save.

Click the newly created role to go to its _Summary_ page.
Copy the **Role ARN** (at the top of the page) to your text editor
so you can paste it in the deployment JSON.

##### Create a Fluent Bit task definition

In the ECS console
[_Task Definitions_](https://eu-central-1.console.aws.amazon.com/ecs/home?region=eu-central-1#/taskDefinitions)
page,
click **Create new Task Definition**.

Choose **Fargate**,
and click **Next step** to continue.

Scroll to the _Volumes_ section
(near the bottom of the page)
and click
**Configure via JSON**.

Replace the default JSON
with this code block.

You'll need to replace the values in between angle brackets
(`<< >>`)
using the parameters below the code block. 👇

When you're done, click **Save**,
and then click **Create**.

```json
{
  "family": "logzio-fargate-task",
  "requiresCompatibilities": [ "FARGATE" ],
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
          "URI": "/?token=<<SHIPPING-TOKEN>>&type=fargate",
          "Port": "8071",
          "tls": "on",
          "tls.verify": "off",
          "Format": "json_lines"
        }
      }
    }
  ],
  "cpu": "256",
  "executionRoleArn": "arn:aws:iam::<<AWS-ACCOUNT-ID>>:role/logzioEcsTaskExecutionRole",
  "memory": "512",
  "volumes": [ ],
  "placementConstraints": [ ],
  "networkMode": "awsvpc",
  "tags": [ ]
}
```

###### Parameters in "logzio-log-router"

| Parameter | Description |
|---|---|
| logConfiguration.options.awslogs-group | In the CloudWatch left menu, select **Logs > Log groups**, and then click **Actions > Create log group**. Give the **Log Group Name** "/aws/ecs/logzio-fargate-logs". |
| logConfiguration.options.awslogs-region | The [AWS region](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) of your cluster. |
{:.paramlist}

###### Parameters in "app"

| Parameter | Description |
|---|---|
| image | Replace `<<YOUR-APP-IMAGE>>` with the name of the image you want to ship logs from. |
| logConfiguration.options.Host | Your region's listener host. For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| logConfiguration.options.URI | {% include log-shipping/replace-vars.html token=true %} |
{:.paramlist}

###### Remaining parameters

| Parameter | Description |
|---|---|
| executionRoleArn | Replace `<<AWS-ACCOUNT-ID>>` with your [AWS account Id](https://console.aws.amazon.com/billing/home?#/account). |
{:.paramlist}

##### Run the task on your cluster

Go back to your new task's definition page,
and click **Actions > Run Task**.

Click **Switch to launch type**, and fill in these details:

* For **Launch Type**, choose **FARGATE**.
* For **Cluster**, choose your cluster.
* For **Subnets**, choose a subnet from your cluster.

Click **Run task**.

The logs created by the Fluent Bit shipper are in Cloudwatch
under the `/aws/ecs/logzio-fargate-logs` log group.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

You'll be able to find these logs by searching for `type:"fargate"`.

</div>
