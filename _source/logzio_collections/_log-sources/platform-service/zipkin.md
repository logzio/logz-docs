---
title: Ship Zipkin traces
logo:
  logofile: zipkin.svg
  orientation: vertical
open-source:
  - title: Zipkin-Logz.io Trace Storage
    github-repo: zipkin-logzio
shipping-summary:
  data-source: Zipkin traces
contributors:
  - imnotashrimp
---

Zipkin-Logz.io Trace Storage is a storage option for Zipkin distributed traces on your Logz.io account.
It can function as both a collector and a span store.

<div class="info-box note">
  This integration requires Logz.io API access.
  The Logz.io API is available for all Enterprise accounts.
  If you're on a Pro account, reach out to your account manager or the <a class="intercom-launch" href="mailto:sales@logz.io">Sales team</a> to request API access.
</div>

## To integrate Zipkin server and Logz.io

{: .tasklist .firstline-headline}
1. Download Zipkin server and Zipkin-Logz.io Trace Storage

    Download [Zipkin server](https://search.maven.org/remote_content?g=io.zipkin.java&a=zipkin-server&v=LATEST&c=exec).

    ```shell
    wget -O zipkin.jar 'https://search.maven.org/remote_content?g=io.zipkin.java&a=zipkin-server&v=LATEST&c=exec'
    ```

    Download the [Zipkin-Logz.io Trace Storage](https://github.com/logzio/zipkin-logzio/releases) jar to the same directory.

2. Run Zipkin server with the Logz.io extension

    You can configure the Logz.io extension with shell variables or environment variables.

    For a complete list of options, see the parameters below the code block.👇

    ```bash
    STORAGE_TYPE=logzio \
    LOGZIO_ACCOUNT_TOKEN=<ACCOUNT-TOKEN> \
    LOGZIO_LISTENER_HOST=<LISTENER-URL> \
    LOGZIO_API_TOKEN=<API-TOKEN> \
    LOGZIO_API_HOST=<API-URL> \
    java -Dloader.path='zipkin-logzio.jar,zipkin-logzio.jar!lib' -Dspring.profiles.active=logzio -cp zipkin.jar org.springframework.boot.loader.PropertiesLauncher
    ```

    <div class="info-box tip">
      You can optionally run two Zipkin-Logzio Trace Storage instances if you want to separate shipping and reading of your traces.

      If you do, then the required fields change a bit from what's shown in the Parameters list:

      * The **shipping instance** requires `STORAGE_TYPE=logzio`, `LOGZIO_ACCOUNT_TOKEN`, and `LOGZIO_LISTENER_HOST` (if you're not shipping to the default listener).
      * The **reading instance** requires `STORAGE_TYPE=logzio`, `LOGZIO_API_TOKEN`, and `LOGZIO_API_HOST`.
    </div>

    {: .inline-header }
    Parameters

    STORAGE_TYPE=logzio <span class="required-param"></span>
    : We wish there was a way to include this as a default.
      Alas, Zipkin needs it, so you'll need to include this bit.

    LOGZIO_ACCOUNT_TOKEN <span class="required-param"></span>
    : Required when using as a collector to ship logs to Logz.io. \\
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject: account-token -->

    LOGZIO_API_TOKEN <span class="required-param"></span>
    : Required to read back spans from Logz.io. \\
      Replace `<API-TOKEN>` with an [API token](https://app.logz.io/#/dashboard/settings/api-tokens) from the account you want to use.

    LOGZIO_LISTENER_HOST <span class="default-param">`listener.logz.io`</span>
    : {% include log-shipping/replace-vars.html listener=true %}
      <!-- logzio-inject: listener-url -->

    LOGZIO_API_HOST <span class="default-param">`api.logz.io`</span>
    : Required to read back spans from Logz.io. \\
      Replace `<API-URL>` with your region's base API URL.
      For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

    STRICT_TRACE_ID <span class="default-param">`true`</span>
    : Use `false` if your version of Zipkin server generates 64-bit trace IDs.
      If `false`, spans are grouped by the rightmost 16 characters of the trace ID.

3. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).