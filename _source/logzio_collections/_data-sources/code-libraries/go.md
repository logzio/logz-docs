---
layout: article
title: Ship Go data
logo:
  logofile: go.svg
  orientation: horizontal
shipping-summary:
  data-source: Go code
  log-shippers:
    - Logz.io Golang API client
contributors:
  - imnotashrimp
---

## Logz.io Golang API client setup

This shipper uses goleveldb and goqueue as a persistent storage implementation of a persistent queue, so the shipper backs up your logs to the local file system before sending them.
Logs are queued in the buffer and 100% non-blocking.
A background Go routine ships the logs every 5 seconds.

**You'll need:** Go 1.x or higher

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
    "{account-token}",
    logzio.SetDebug(os.Stderr),
    logzio.SetUrl("{listener-url}:8071"),
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

##### Parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). {% include log-shipping/your-account-token.html %}

SetDebug
  : Debug flag. <br /> <span class="sm bold">Default:</span> `false`

SetUrl
  : Listener URL and port.  {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io:8071`

SetDrainDuration
  : Time to wait between log draining attempts. <br /> <span class="sm bold">Default:</span> `5 * time.Second`

SetTempDirectory
  : Filepath where the logs are buffered.

SetCheckDiskSpace
  : To enable `SetDrainDiskThreshold`, set to `true`. Otherwise, `false`. <br /> <span class="sm bold">Default:</span> `true`

SetDrainDiskThreshold
  : Maximum file system usage, in percent. Used only if `SetCheckDiskSpace` is set to `true`. <br /> If the file system storage exceeds this threshold, buffering stops and new logs are dropped. Buffering resumes if used space drops below the threshold. <br /> <span class="sm bold">Default:</span> `70.0`

##### Code sample

```go
msg := fmt.Sprintf("{\"%s\": \"%d\"}", "message", time.Now().UnixNano())
err = l.Send([]byte(msg))
if err != nil {
  panic(err)
}

l.Stop() // Drains the log buffer
```