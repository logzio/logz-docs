---
title: Ship Go logs
logo:
  logofile: go.svg
  orientation: horizontal
open-source:
  - title: Logzio Golang API client
    github-repo: logzio-go
data-source: Go code
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
---

## Logz.io Golang API client setup

This shipper uses goleveldb and goqueue as a persistent storage implementation of a persistent queue, so the shipper backs up your logs to the local file system before sending them.
Logs are queued in the buffer and 100% non-blocking.
A background Go routine ships the logs every 5 seconds.

**You'll need**:
Go 1.x or higher

### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
go get -u github.com/logzio/logzio-go
```

### Configure Logz.io Golang API client

Use the sample in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

```go
package main

import (
  "fmt"
  "os"
  "time"
  "github.com/logzio/logzio-go"
)

func main() {
  // Replace these parameters with your configuration
  l, err := logzio.New(
    "<<SHIPPING-TOKEN>>",
    logzio.SetDebug(os.Stderr),
    logzio.SetUrl("<<LISTENER-HOST>>:8071"),
    logzio.SetDrainDuration(time.Second * 5),
    logzio.SetTempDirectory("myQueue"),
    logzio.SetDrainDiskThreshold(99),
  )
  if err != nil {
    panic(err)
  }

  // Because you're configuring directly in the code,
  // you can paste the code sample here to send a test log.
  //
  // The code sample is below the parameters list. 👇
}
```

Parameters
{:.inline-header}

token <span class="required-param"></span>
: Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). \\
  {% include log-shipping/replace-vars.html token=true %}

SetUrl <span class="default-param">`https://listener.logz.io:8071`</span>
: Listener URL and port. \\
  {% include log-shipping/replace-vars.html listener=true %}

SetDebug <span class="default-param">`false`</span>
: Debug flag.

SetDrainDuration <span class="default-param">`5 * time.Second`</span>
: Time to wait between log draining attempts.

SetTempDirectory
: Filepath where the logs are buffered.

SetCheckDiskSpace <span class="default-param"></span> `true`
: To enable `SetDrainDiskThreshold`, set to `true`. Otherwise, `false`.

SetDrainDiskThreshold <span class="default-param">`70.0`</span>
: Maximum file system usage, in percent.
  Used only if `SetCheckDiskSpace` is set to `true`. \\
  If the file system storage exceeds this threshold, buffering stops and new logs are dropped.
  Buffering resumes if used space drops below the threshold.

Code sample
{:.inline-header}

```go
msg := fmt.Sprintf("{\"%s\": \"%d\"}", "message", time.Now().UnixNano())
err = l.Send([]byte(msg))
if err != nil {
  panic(err)
}

l.Stop() // Drains the log buffer
```