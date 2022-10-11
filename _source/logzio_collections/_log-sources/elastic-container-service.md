---
title: Ship Elastic Container Service logs
logo:
  logofile: aws-ecs.svg
  orientation: vertical
open-source:
  - title: logzio-aws-ecs
    github-repo: logzio-aws-ecs
data-source: Elastic Container Service
data-for-product-source: Logs
templates: ["docker"]
contributors:
  - imnotashrimp
  - supereli
  - amosd92
  - idohalevi
  - mirii1994
  - shalper
  - nshishkin
shipping-tags:
  - aws
order: 440
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Manual deployment (AWS Classic Console)](#manual-deployment)
* [Automated CloudFormation deployment](#automated-cloudformation-deployment)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

This integration uses Fluentd in a Docker container to forward logs from your Amazon Elastic Container Service (ECS) cluster to Logz.io.

<!-- info-box-start:info -->
This integration refers to an EC2-based cluster. For Fargate-based cluster see [our Fargate documentation](https://docs.logz.io/shipping/log-sources/fargate.html).
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
Fluentd will fetch all existing logs, as it is not able to ignore older logs.
{:.info-box.note}
<!-- info-box-end -->

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="manual-deployment">

#### Manual deployment (AWS Classic Console)

<div class="tasklist">

##### Download the task definition JSON

```shell
wget https://raw.githubusercontent.com/logzio/logzio-aws-ecs/master/task-definition.json
```

##### Configure the task

In your prefered text editor, open the JSON you downloaded in the previous step and replace the following:

| Paramater | Details |
|---|---|
| `<<LOG-SHIPPING-TOKEN>>` | **Required**. Your Logz.io account token. Replace with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. |
| `<<LISTENER-HOST>>` | **Required**. Your Logz.io listener URL. Replace with your region's listener URL.|


##### Advanced settings (optional)

Since the Docker image is based on Logz.io's [fluentd-docker-logs](https://github.com/logzio/fluentd-docker-logs) image, any of the environment variables mentioned [here](https://github.com/logzio/fluentd-docker-logs#parameters) can be added to the task definition JSON.


##### Add your task definition

1. In your [Amazon ECS Classic Console](https://console.aws.amazon.com/ecs/) menu, go to **Task Definitions** and click on **Create new Task Definition**.

2. In the **Step 1: Select launch type compatibility** screen, choose **EC2** and click **Next step**.

3. In the **Step 2: Configure task and container definitions** screen, scroll down and click on the **Configure via JSON** button.

4. In the text-box, delete the existing text and paste your configured task definition JSON. Press **Save**, then press **Create**.

##### Run the task

1. After the task creation, click on the **Actions** button, then choose **Run Task**.

2. In the **Run Task** screen, choose **EC2** as your **Launch type**.

3. Choose the cluster you want to ship logs from.

4. For **Placement Templates**, choose **One Task Per Host**.

5. Click on **Run Task**.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="automated-cloudformation-deployment">

#### Automated CloudFormation deployment

<div class="tasklist">
  
##### Configure and create your stack

Click the button that matches your AWS region, then follow the instructions below:

| AWS Region | Launch button |
| --- | --- |
| `us-east-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/logzio-aws-ecs/1.0.0/auto-deployment.json&stackName=logzio-aws-ecs-auto-deployment&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) |

<!-- info-box-start:info -->
If your region is not on the list, let us know in the [repo's issues](https://github.com/logzio/logzio-aws-ecs/issues), or reach out to Logz.io support team!
{:.info-box.note}
<!-- info-box-end -->


###### In screen **Step 1 Specify template**:

Keep the defaults and click **Next**.

![Screen_1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/ecs/screen_01.png)

###### In screen **Step 2 Specify stack details**:

1. For **Stack name** you can either keep the default, or change the stack name.

2. For **LogzioListener** - choose your Logz.io listener from the list.

3. For **LogzioToken** - insert your Logz.io logs shipping token.

4. Click **Next**.

![Screen_2](https://dytvr9ot2sszz.cloudfront.net/logz-docs/ecs/screen_02.png)

###### In screen **Step 3 Configure stack options** (Optional):

If you want to, you can add your custom tags, or not. Click on **Next**.

###### In screen **Step 4 Review**:

Scroll down and click on **Create stack**.

##### Give your stack a few moments to launch.

##### Run the task

1. Go to your AWS ECS page, and on the left menu, click on **Task Definitions**, then choose the task you just created.

2. Click on the **Actions** button, then choose **Run Task**.

3. In the **Run Task** screen, choose **EC2** as your **Launch type**.

4. Choose the cluster you want to ship logs from.

5. For **Placement Templates** choose **One Task Per Host**.

6. Click on **Run Task**.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>
</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
