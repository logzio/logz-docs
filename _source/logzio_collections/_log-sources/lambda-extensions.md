---
title: Lambda extensions
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: Lambda extensions
data-for-product-source: Logs
templates: ["lambda-cloudwatch"]
open-source:
  - title: AWS Lambda extensions
    github-repo: logzio-lambda-extensions
contributors:
  - mirii1994
  - yberlinger
shipping-tags:
  - aws 
order: 255
---


<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Deploy with CLI](#cli)
* [Deploy with Console](#console)
* [Environment Variables & ARNs](#tables)
{:.branching-tabs}


<!-- tab:start -->
<div id="overview">


Lambda extensions enable tools to integrate deeply into the Lambda execution environment to control and participate in Lambda’s lifecycle.
To read more about Lambda Extensions, [click here](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-extensions-api.html).  
The Logz.io Lambda extension for logs, uses the AWS Extensions API and [AWS Logs API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-logs-api.html), and sends your Lambda Function Logs directly to your Logz.io account.

This repo is based on the [AWS lambda extensions sample](https://github.com/aws-samples/aws-lambda-extensions).
This extension is written in Go, but can be run with runtimes that support [extensions](https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html).

### Prerequisites
* Lambda function with [supported runtime](https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html) for extensions.
* AWS Lambda limitations: A function can use up to five layers at a time. The total unzipped size of the function and all layers cannot exceed the unzipped deployment package size limit of 250 MB.


### Important notes
  
* If an extension does not have enough time to receive logs from AWS Logs API, it may send the logs at the next invocation of the Lambda function.
If you want to send all the logs by the time your Lambda function stops running, you will need to add a sleep interval at the end of your Lambda function code. This will give the extension enough time to do the job.
* Due to [Lambda's execution environment lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html), the extension is invoked at two events - `INVOKE` and `SHUTDOWN`.
This means that if your Lambda function goes into the `SHUTDOWN` phase, the extension will start running and send all logs that are in the queue. 


### Extension deployment options

You can deploy the extension via the AWS CLI or via the AWS Management Console.
  
### Upgrading from v0.0.1 to v0.1.0
  
If you have Lambda extension v0.0.1 and you want to upgrade to v0.1.0+, to ensure that your logs are correctly sent to Logz.io:
  
1. Delete the existing extension layer, its dependencies, and environment variables as decribed below in this topic.
2. Deploy the new extension, its dependencies, and configuration as decribed below in this topic.

</div>
<!-- tab:end --> 

<!-- tab:start -->
<div id="cli">


#### Deploying Logz.io logs extension via the AWS CLI

<div class="tasklist">

##### Deploy the extension and configuration

If you haven't done it already, [install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [configure](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) the AWS CLI.

Add the layer to your function and configure the environment variables using the following command:

```shell
aws lambda update-function-configuration \
    --function-name <<FUNCTION-NAME>> \
    --layers <<LAYERS>> \
    --environment "Variables={<<ENV-VARS>>}"
```

<!-- info-box-start:info -->
This command overwrites the existing function configuration. If you already have your own layers and environment variables for your function, list them as well.
{:.info-box.note}
<!-- info-box-end -->

| Placeholder | Description | Required/Default|
|---|---|---|
| `<<FUNCTION-NAME>>` |  Name of the Lambda Function you want to monitor. |Required|
| `<<LAYERS>>` | A space-separated list of function layers to add to the function's execution environment. Specify each layer by its ARN, including the version.  For the ARN, see the [**Lambda extension versions** table]{% include log-shipping/lambda-xtension-tablink.md %} {% include log-shipping/lambda-xtension-tablink-indox.html %}.|  |
| `<<ENV-VARS>>`  | Key-value pairs containing environment variables that are accessible from function code during execution. Should appear in the following format: `KeyName1=string,KeyName2=string`.  For a list of all the environment variables for the extension, see the [**Lambda environment variables** table]{% include log-shipping/lambda-xtension-tablink.md %} {% include log-shipping/lambda-xtension-tablink-indox.html %}.|  |

##### Run the function

Use the following command. It may take more than one run of the function for the logs to start shipping to your Logz.io account.

```shell
aws lambda update-function-configuration \
    --function-name <<FUNCTION-NAME>> \
    --layers [] \
    --environment "Variables={}"
```


<!-- info-box-start:info -->
This command overwrites the existing function configuration. If you already have your own layers and environment variables for your function, include them in the list.
{:.info-box.note}
<!-- info-box-end -->
  

#### Deleting the extension

To delete the extension and its environment variables, use the following command:

```shell
aws lambda update-function-configuration \
    --function-name some-func \
    --layers [] \
    --environment "Variables={}"
```

<!-- info-box-start:info -->
This command overwrites the existing function configuration. If you already have your own layers and environment variables for your function, include them in the list.
{:.info-box.note}
<!-- info-box-end -->

</div>
</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="console">

#### Deploying Logz.io log extensions via the AWS Management Console

You'll have to add the extension

<div class="tasklist">

##### Add the extension to your Lambda Function

1. In the Lambda Functions screen, choose the function you want to monitor.
![Pick lambda function](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lambda_extensions/lambda-x_1-1.jpg)

2. In the page for the function, scroll down to the `Layers` section and choose `Add Layer`.
![Add layer](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lambda_extensions/lambda-x_1-2.jpg)

3. Select the `Specify an ARN` option, then choose the ARN of the extension with the region code that matches your Lambda Function region from the [**Lambda extension versions** table]{% include log-shipping/lambda-xtension-tablink.md %} {% include log-shipping/lambda-xtension-tablink-indox.html %}, and click the `Add` button.
![Add ARN extension](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lambda_extensions/lambda-x_1-3.jpg)

##### Configure the extension parameters

Add the environment variables to the function, according to the [**Environment variables** table]{% include log-shipping/lambda-xtension-tablink.md %} {% include log-shipping/lambda-xtension-tablink-indox.html %}.

##### Run the function

Run the function. It may take more than one run of the function for the logs to start shipping to your Logz.io account.

</div>

#### Deleting the extension

- To delete the **extension layer**: In your function page, go to the **layers** panel. Click `edit`, select the extension layer, and click `save`.
- To delete the extension's **environment variables**: In your function page, select the `Configuration` tab, select `Environment variables`, click `edit`, and remove the variables that you added for the extension.

#### Parsing logs

By default, the extension sends the logs as strings.  
If your logs are formatted, and you wish to parse them to separate fields, the extension will use the [grok library](https://github.com/vjeantet/grok) to parse grok patterns.
You can see all the pre-built grok patterns (for example `COMMONAPACHELOG` is already a known pattern in the library) [here](https://github.com/vjeantet/grok/tree/master/patterns).
If you need to use a custom pattern, you can use the environment variables `GROK_PATTERNS` and `LOGS_FORMAT`.

##### Example

For logs that are formatted like this:

```python
%(app_name)s : %(message)s
```

we will use `cool app` as the `app_name` and the `message` will have strings containing whitespaces, letters and numbers.

In Logz.io we wish to have `app_name`, `message` in their own fields, named `my_app` and `my_message`, respectively.
To do so, we'll set the environment variables as follows:

###### GROK_PATTERNS

The `GROK_PATTERNS` variable should be in a JSON format.
The key is used as the pattern name, and the value should be the regex that captures the pattern.  
In our case, while `app_name` always stays `cool app`, we don't know what `message` will be, so we need to set `GROK_PATTERNS` as: `{"app_name":"cool app","message":".*"}`

###### LOGS_FORMAT

The `LOGS_FORMAT` variable will contain the same format as the logs, according to the pattern names that we used in `GROK_PATTERNS`.  
The variable should be in a grok format for each pattern name: `${PATTERN_NAME:FIELD_NAME}` where `PATTERN_NAME` is the pattern name from `GROK_PATTERNS`, and `FIELD_NAME` is the name of the field you want the pattern to be parsed to.  
**Note** that the `FIELD_NAME` cannot contain a dot (`.`) in it.
In our case, we want `app_name` to appear under the field `my_app`, and `message` to appear under the field `my_message`. Since we know that the logs format is as mentioned above, we will set `LOGS_FORMAT` as: `%{app_name:my_app} : %{message:my_message}`.

The logs that match the configuration above will appear in Logz.io with the fields `lambda.record.my_app`, `lambda.record.my_message`.  
The log: `"cool app : The sky is so blue"`, will be parsed to look like this:
```
my_app: cool app
my_message: The sky is so blue
```

To learn more about grok, read the [grok library](https://github.com/vjeantet/grok), [Logz.io's blog post](https://logz.io/blog/logstash-grok/), or watch [this introduction to grok video](https://logz.io/learn/introduction-to-the-logstash-grok/).

### Nested fields

As of v0.2.0 the extension can detect if a log is in a JSON format, and to parse the fields to appear as nested fields in the Logz.io app.
For example, the following log:

```
{ "foo": "bar", "field2": "val2" }
```

Will appear under the fields:
```
message_nested.foo: bar
message_nested.field2: val2
```

**Note:** The user must insert a valid JSON. Sending a dictionary or any key-value data structure that is not in a JSON format will cause the log to be sent as a string.




</div>
<!-- tab:end -->



<!-- tab:start -->
<div id="tables">

### Environment Variables

| Name | Description |Required/Default|
| --- | --- | --- |
| `LOGZIO_LOGS_TOKEN` | Your Logz.io log shipping [token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping). | Required |
| `LOGZIO_LISTENER` |  Your  Logz.io listener address, with port 8070 (http) or 8071 (https). For example, for example: `https://listener.logz.io:8071`. {% include log-shipping/listener-var.md %} | Required |
| `LOGS_EXT_LOG_LEVEL` |  Log level of the extension. Can be set to one of the following: `debug`, `info`, `warn`, `error`, `fatal`, `panic`. |Default: `info` |
| `ENABLE_EXTENSION_LOGS` |  Set to `true` if you wish the extension logs will be shipped to your Logz.io account. | Default: `false` |
| `ENABLE_PLATFORM_LOGS` | The platform log captures runtime or execution environment errors. Set to `true` if you wish the platform logs will be shipped to your Logz.io account. | Default: `false` |
| `GROK_PATTERNS` | Must be set with `LOGS_FORMAT`. Use this if you want to parse your logs into fields. A minified JSON list that contains the field name and the regex that will match the field. To understand more see the [parsing logs](https://docs.logz.io/shipping/log-sources/lambda-extensions.html#parsing-logs) section. | - |
| `LOGS_FORMAT` | Must be set with `GROK_PATTERNS`. Use this if you want to parse your logs into fields. The format in which the logs will appear, in accordance to grok conventions. To understand more see the [parsing logs](https://docs.logz.io/shipping/log-sources/lambda-extensions.html#parsing-logs) section. | - |


### Lambda extension versions

| Version | Supported Runtimes | AWS ARN |
| --- | --- | --- |
| 0.2.0 | `.NET Core 3.1`, `Java 11`, `Java 8`, `Node.js 14.x`, `Node.js 12.x`, `Python 3.9`, `Python 3.8`, `Python 3.7`, `Ruby 2.7`, `Custom runtime` | `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogs:3` |
| 0.1.0| `.NET Core 3.1`, `Java 11`, `Java 8`, `Node.js 14.x`, `Node.js 12.x`, `Node.js 10.x`, `Python 3.8`, `Python 3.7`, `Ruby 2.7`, `Ruby 2.5`, `Custom runtime`| `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogs:2` |
| 0.0.1 | `Python 3.7`, `Python 3.8` | `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogs:1` |


### Available AWS regions

| Region Name | Region Code | Notes |
| --- | ---- | --- |
| US East (N. Virginia) | `us-east-1` | - |
| US East (Ohio) | `us-east-2` | - |
| US West (N. California) | `us-west-1` | - |
| US West (Oregon) | `us-west-2` | - |
| Europe (Frankfurt) | `eu-central-1`| - |
| Europe (Ireland) | `eu-west-1` | - |
| Europe (Stockholm) | `eu-north-1` | - |
| Asia Pacific (Sydney) | `ap-southeast-2` | Available from v0.1.0 |
| Canada (Central) ) | `ca-central-1` | Available from v0.1.0 |

### ARN for extension dependencies - DEPRECATED

|Compatible with extension versions | Imports | AWS ARN |
| --- | --- | --- |
| 0.0.1 | `requests` | `arn:aws:lambda:<<YOUR-AWS-REGION-CODE>>:486140753397:layer:LogzioLambdaExtensionLogsLibs:1` |


<!-- info-box-start:info -->
If your AWS region is not in the list, please reach out to Logz.io's support or open an issue in the [project's Github repo](https://github.com/logzio/logzio-lambda-extensions).
{:.info-box.note}
<!-- info-box-end -->

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
