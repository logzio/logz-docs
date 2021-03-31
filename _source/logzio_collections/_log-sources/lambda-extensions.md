---
title: Lambda extensions
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: Amazon Lambda
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/
templates: ["lambda-cloudwatch"]
open-source:
  - title: AWS Lambda extensions
    github-repo: 
contributors:
  - mirii1994
  - yberlinger
shipping-tags:
  - aws
---


<!-- tabContainer:start -->

* [Deploy with CLI](#cli)
* [Deploy with Console](#console)
* [Environment Variables & ARNs](#tables)
{:.branching-tabs}

# Logz.io Logs Lambda Extensions

Extensions enable tools to integrate deeply into the Lambda execution environment to control and participate in Lambda’s lifecycle.
To read more about Lambda Extensions, [click here](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html).  
The Logz.io Lambda extension for logs, uses the AWS Extensions API and [AWS Logs API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-logs-api.html), and sends your Lambda Function Logs directly to your Logz.io account.

This repo is based on [AWS lambda extensions sample](https://github.com/aws-samples/aws-lambda-extensions/tree/main/python-example-logs-api-extension/extensions).

### Prerequisites:
* Lambda function with supported runtime for extensions (`python 3.7`, `python 3.8`).
* AWS Lambda limitations: A function can use up to five layers at a time. The total unzipped size of the function and all layers can't exceed the unzipped deployment package size limit of 250 MB.

#### You have to ways to deploy the extension:
* [AWS CLI](#cli).
* [AWS Management Console](#console).

<!-- tab:start -->
<div id="cli">
### Deploying Logz.io logs extension via AWS CLI

#### Step 1: Deploy the extension, dependencies and configuration
Use the following command to add the layer to your function and configure the environment variables:

```shell
aws lambda update-function-configuration \
    --function-name <<FUNCTION-NAME>> \
    --layers <<LAYERS>> \
    --environment "Variables={<<ENV-VARS>>}"
```

**Note:** this command overwrites the existing function configuration. If you already have your own layers and environment variables for your function, list them as well.

| Placeholder | Description |
| --- | --- |
| `<<FUNCTION-NAME>>` | **Required**. Name of the Lambda Function you'd like to monitor. |
| `<<LAYERS>>` | A space-separated list of function layers to add to the function's execution environment. Specify each layer by its ARN, including the version. Check out the [Lambda extension versions table](#tables) for the ARN. You may need to add another layer that has the extensions dependencies. See the [extensions dependencies table](#tables) for the libraries that your extension requires. If your function doesn't already has those libraries under `/opt/python`, you'll need to add the dependencies as a layer, too. |
| `<<ENV-VARS>>`  | Key-value pairs containing environment variables that are accessible from function code during execution. Should appear in the following format: `KeyName1=string,KeyName2=string`. For a list of all the environment variables for the extension, see the [environment variables table](#tables).|

#### Step 2: Run the function
Run the function. Note that it may take more than one run of the function for the logs to start shipping to your Logz.io account.

```shell
aws lambda update-function-configuration \
    --function-name <<FUNCTION-NAME>> \
    --layers [] \
    --environment "Variables={}"
```

**Note:** this command overwrites the existing function configuration. If you already have your own layers and environment variables for your function, list them in.

#### Deleting the extension
To delete the extension, its dependencies and environment variables, use the following command:

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="console">
### Deploying Logz.io logs extension via AWS Management Console
#### Step 1: Add the extension to your Lambda Function

1. In the Lambda Functions screen, choose the function you wish to monitor.
[Insert screenshot 1-1]

2. In the function's page, scroll down to the `Layers` section, then choose `Add Layer`.
[Insert screenshot 1-2]

3. Select the `Specify an ARN` option, then select from our [Lambda extension versions table](#tables) the ARN of the extension, with the region code that matches your Lambda Function region, then click the `Add` button.
[Insert screenshot 1-3]

4. *Optional*. This step adds the python libraries the extension needs to run. Check out the [dependencies table](#tables) - If your Lambda function already has those libraries under `/opt/python` you can skip this step. If not, you'll need it for the extension to run.

    4.1. Repeat step 2 to add another layer.

    4.2. Select the `Specify an ARN` option, then select from the [dependencies table](#tables) the ARN that's compatible with the extension version you chose and paste it in the textbox. Click the `Add` button.

#### Step 2: Configure the extension parameters

Add the environment variables from the [environment variables table](#tables) to the function.

#### Step 3: Run the function
Run the function. Note that it may take more than one run of the function for the logs to start shipping to your Logz.io account.

#### Deleting the extension

- To delete the **extension layer**, in your function page, go to the **layers** panel. Click on `edit`, then select the extension layer and click `save`.
- To delete the **extension dependencies layer**, in your function page go to the **layers** panel Click on `edit`, then select the extension dependencies layer and click `save`.
- To delete the extension's **environment variables**, in your function page select the `Configuration` tab. Choose `Environment variables`, click on `edit`, and then remove the variables that you added for the extension.

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="tables">
### Environment Variables

| Name | Description |
| --- | --- |
| `LOGZIO_LOGS_TOKEN` | **Required**. Your Logz.io logs shipping [token](https://app.logz.io/#/dashboard/settings/general). |
| `LOGZIO_REGION` | **Default: `us`**. Two-letter region code, or blank for US. This determines your listener URL. You can find your region code in the [Regions and URLs table](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls). |
| `LOGS_EXT_LOG_LEVEL` | **Default: INFO**. Log level of the extension. Can be set to one of the following: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`. |
| `ENABLE_EXTENSION_LOGS` | **Default: false**. Set to `true` if you wish the extension logs will be shipped to your Logz.io account. |
| `ENABLE_PLATFORM_LOGS` | **Default: false**. The platform log captures runtime or execution environment errors. Set to `true` if you wish the platform logs will be shipped to your Logz.io account. |
| `THREAD_TIMEOUT` | **Default: 5 (seconds)**. Execution timeout for the threads that parse and send the logs. |
| `LOGZIO_CUSTOM_LISTENER` | **Optional**. Use if you have a custom Logz.io listener endpoint). Will override `LOGZIO_REGION`. |

### Lambda extension versions:

| Version | Supported Runtimes | AWS ARN |
| --- | --- | --- |
| 0.0.1 | python 3.7, python 3.8 | `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogs:1` |

### ARN for extension dependencies:
Compatible with extensions versions | Imports | AWS ARN |
| --- | --- | --- |
| `0.0.1` | `requests` | `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogsLibs:1` |

### Available AWS regions:

| Region Name | Region Code |
| --- | ---- |
| US East (N. Virginia) | `us-east-1` |

**NOTE:** If your AWS region is not in the list, please reach out to Logz.io's support or open an issue in the [project's Github repo](https://github.com/logzio/logzio-lambda-extensions).
<!-- tabContainer:end -->