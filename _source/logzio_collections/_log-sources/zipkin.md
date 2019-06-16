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
  - yyyogev
  - imnotashrimp
shipping-tags:
  - platform-service
  - server-app
---

Zipkin-Logz.io Trace Storage is a storage option for Zipkin distributed traces on your Logz.io account.
It functions as both a collector and a span store.

<div class="info-box note">
  This integration requires Logz.io API access.
  The Logz.io API is available for all Enterprise accounts.
  If you're on a Pro account, reach out to your account manager or the <a class="intercom-launch" href="mailto:sales@logz.io">Sales team</a> to request API access.
</div>

### Limitations

When you use the Zipkin UI to find traces stored in Logz.io, there are a couple limitations.
For most users, these won't be an issue, but they're still good to know:

* **Lookback** must be 2 days or less
* **Limit** must be 1000 traces or less

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
    LOGZIO_ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
    LOGZIO_LISTENER_HOST=<<LISTENER-HOST>> \
    LOGZIO_API_TOKEN=<<API-TOKEN>> \
    LOGZIO_API_HOST=<<API-URL>> \
    java -Dloader.path='zipkin-logzio.jar,zipkin-logzio.jar!lib' -Dspring.profiles.active=logzio -cp zipkin.jar org.springframework.boot.loader.PropertiesLauncher
    ```

    <div class="info-box tip">

      You can optionally run two discrete Zipkin-Logzio Trace Storage instances if you want to separate shipping and reading of your traces.

      If you do, then the required fields change a bit from what's shown in the Parameters list:

      * The **shipping instance** uses `STORAGE_TYPE=logzio`, `LOGZIO_ACCOUNT_TOKEN`, and `LOGZIO_LISTENER_HOST`.
      * The **reading instance** uses `STORAGE_TYPE=logzio`, `LOGZIO_API_TOKEN`, and `LOGZIO_API_HOST`.

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
    : Required to read back traces from Logz.io. \\
      Replace `<<API-TOKEN>>` with an [API token](https://app.logz.io/#/dashboard/settings/api-tokens) from the account you want to use.

    LOGZIO_LISTENER_HOST <span class="default-param">`listener.logz.io`</span>
    : {% include log-shipping/replace-vars.html listener=true %}
      <!-- logzio-inject: listener-url -->

    LOGZIO_API_HOST <span class="default-param">`api.logz.io`</span>
    : Required to read back spans from Logz.io. \\
      Replace `<<API-URL>>` with your region's base API URL.
      For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

    STRICT_TRACE_ID <span class="default-param">`true`</span>
    : Use `false` if your version of Zipkin server generates 64-bit trace IDs (version 1.14 or lower).
      If `false`, spans are grouped by the rightmost 16 characters of the trace ID.
      For version 1.15 or later, we recommend leaving the default.

    SENDER_DRAIN_INTERVAL <span class="default-param">`5`</span>
    : Time interval, in seconds, to send the traces accumulated on the disk.

    CLEAN_SENT_TRACES_INTERVAL <span class="default-param">`30`</span>
    : Time interval, in seconds, to clean sent traces from the disk.

3. Check Logz.io for your traces

    Give your traces some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).