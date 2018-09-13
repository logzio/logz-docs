---
layout: article
title: Go data shipping
permalink: /user-guide/log-shipping/shipping-methods/code-library--go.html
shipping-summary:
  data-source: Go code
  log-shippers:
    - Logz.io Golang API client
contributors:
  - imnotashrimp
---

## Logz.io Golang API client

This shipper uses goleveldb and goqueue as a persistent storage implementation of a persistent queue, so the shipper backs up your logs to the local file system before sending them. Once you send a log, it is queued in the buffer and 100% non-blocking. A background Go routine ships the logs every 5 seconds.

### Installation in your code

**You'll need:** Go 1.x

#### Dependency

Add Logz.io Golang API client to your project.

```shell
go get -u github.com/logzio/logzio-go
```

#### Configuration

For a complete list of all options, see the configuration parameters below this code block. 👇

```go
package main
import (
  "fmt"
  "github.com/logzio/logzio-go"
  "os"
  "time"
)
func main() {
  l, err := logzio.New(
    "{account-token}",
    SetDebug(os.Stderr),
    SetUrl("{listener-url}"),
    SetDrainDuration(time.Minute*10),
    SetTempDirectory("myQueue"),
    SetDrainDiskThreshold(99)
  )
  msg := fmt.Sprintf("{ \"%s\": \"%s\"}", "message", time.Now().UnixNano())
  err = l.Send([]byte(msg))
  if err != nil {
     panic(err)
  }
  l.Stop() // Drains the log buffer
}
```

##### Configuration parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general) {% include log-shipping/your-account-token.html %}

SetDebug
  : Debug flag. <br /> <span class="sm bold">Default:</span> `false`

SetUrl
  : Listener URL.  {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io:8071`

SetDrainDuration
  : Time to wait between log draining attempts. <br /> <span class="sm bold">Default:</span> `5 * time.Second`

SetTempDirectory
  : Filepath where the logs are buffered.

SetCheckDiskSpace
  : To enable `SetDrainDiskThreshold`, set to `true`. Otherwise, `false`. <br /> <span class="sm bold">Default:</span> `true`

SetDrainDiskThreshold
  : Maximum file system usage, in percent. Used only if `SetCheckDiskSpace` is set to `true`. <br /> If the file system storage exceeds this threshold, buffering stops and new logs are dropped. Buffering resumes if used space drops below the threshold. <br /> <span class="sm bold">Default:</span> `70.0`


