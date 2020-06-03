---
title: Ship system metrics
logo:
  logofile: gauge.svg
  orientation: vertical
data-source: System
templates: ["metricbeat", "docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - os
  - container
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Using Metricbeat <span class="sm ital">(recommended)</span>](#metricbeat-config)
* [Using Docker](#docker-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="metricbeat-config">

#### Metricbeat setup

**Before you begin, you'll need**:
[Metricbeat 7.1](https://www.elastic.co/guide/en/beats/metricbeat/7.1/metricbeat-installation.html) or higher

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### Add Logz.io configuration

Replace the General configuration with Logz.io settings.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ===== General =====
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ===== Outputs =====
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
    ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### _(If needed)_ Enable the system module

The system module is enabled by default.
If you've disabled it for any reason, re-enable it now.

```shell
sudo metricbeat modules enable system
```

You can change the metrics collected by Metricbeat by modifying `modules.d/system.yml`.
If you installed Metricbeat from a package manager, this directory is under `/etc/metricbeat`.

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker-config">

## Docker setup

To simplify shipping metrics from one or many sources,
we created Docker Metrics Collector.
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

This Docker container monitors Linux system metrics only.
For other OSes, we recommend running Metricbeat locally on the system itself.
{:.info-box.note}

#### Configuration

If you’re not already running Docker Metrics Collector, follow these steps.

Otherwise, stop the container, add
`system`
to the `LOGZIO_MODULES` environment variable,
and restart.
You can find the `run` command and all parameters
in this procedure.

<div class="tasklist">

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
--env LOGZIO_MODULES="system" \
--volume="/var/run/docker.sock:/var/run/docker.sock:ro" \
--volume="/sys/fs/cgroup:/hostfs/sys/fs/cgroup:ro" \
--volume="/proc:/hostfs/proc:ro" \
--volume="/:/hostfs:ro" \
--net=host \
logzio/docker-collector-metrics
```

###### Parameters for all modules

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| LOGZIO_MODULES <span class="required-param"></span> | Comma-separated list of Metricbeat modules to be enabled on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/logzio_modules`. |
| LOGZIO_REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls) table. |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value. <br> In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`). <br> To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
{% include metric-shipping/debug-param.html %}
{:.paramlist}

{% include metric-shipping/open-dashboard.html title="System Metrics" %}

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
