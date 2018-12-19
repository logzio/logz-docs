---
title: Ship Docker logs
logo:
  logofile: docker.svg
  orientation: horizontal
shipping-summary:
  data-source: Docker container
  log-shippers:
    - logzio-docker Docker image
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Docker-Logging
contributors:
  - imnotashrimp
---

**You'll need:** Docker 1.5 or higher

## Setup

{: .tasklist .firstline-headline }
1. Pull the Docker image

    Download the logzio/logzio-docker image:

    ```shell
    docker pull logzio/logzio-docker
    ```

2. Run the Docker image

    For a complete list of options, see the parameters and command flags below the code block.👇

    ```shell
    docker run -d --restart=always -v /var/run/docker.sock:/var/run/docker.sock logzio/logzio-docker -t <ACCOUNT-TOKEN> -z us -a env=prod
    ```

    Parameters
    {: .inline-header }

    {: .parameter-list }
    -t <span class="required-param"></span>
      : Your Logz.io account token.
        {% include log-shipping/replace-vars.html token=true %}
        <!-- logzio:account-token -->
    -z
      : Your account region.
        If your login URL is app.logz.io, use `us`.
        If your login URL is app-eu.logz.io, use `eu`. <br>
        <span class="default-param">`us`</span>

    -i / --statsinterval
      : Integer.
        Collect samples and average them before sending to Logz.io.

     -a
      : Add more fields to the log.
        Fore example, you can use this to tag a specific application or environment. <br />
        **Syntax:** `key=value` (e.g. `env=prod`)

     --matchByName /regex/
      : Forward logs or stats only for the containers whose name matches the given regex.

    --matchByImage /regex/
      : Forward logs or stats only for the containers whose image matches the given regex.

    --skipByName /regex/
      : Don't forward logs or stats for the containers whose name matches the given regex.

    --skipByImage /regex/
      : Don't forward logs or stats for the containers whose image matches the given regex.


    Command flags
    {: .inline-header }

    {: .parameter-list }
    --no-logs
      : Don't send container logs to Logz.io.

    --no-dockerEvents
      : Don't send Docker events to Logz.io.

    --no-stats
      : Don't send Docker stats.
        Required if your Docker version is less than 1.5.

    --privileged
      : Use this if you receive `Error: read EACCES`.

5. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).