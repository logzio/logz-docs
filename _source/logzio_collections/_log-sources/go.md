---
title: Ship Go logs
logo:
  logofile: go.svg
  orientation: horizontal
open-source:
  - title: Logzio Golang API client
    github-repo: logzio-go
data-source: Go code
templates: ["library"]
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
order: 660
---

This shipper uses goleveldb and goqueue as a persistent storage implementation of a persistent queue, so the shipper backs up your logs to the local file system before sending them.
Logs are queued in the buffer and 100% non-blocking.
A background Go routine ships the logs every 5 seconds.

#### Set up the Logz.io Golang API client

**Before you begin, you'll need**:
Go 1.x or higher

<div class="tasklist">

##### Add the dependency to your project

Navigate to your project's folder in the command line, and run this command to install the dependency.

```shell
go get -u github.com/logzio/logzio-go
```

##### Configure the client

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
    "<<LOG-SHIPPING-TOKEN>>",
    logzio.SetDebug(os.Stderr),
    logzio.SetUrl("https://<<LISTENER-HOST>>:8071"),
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

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| token | {% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} | Required |
| SetUrl | Listener URL and port.    {% include log-shipping/listener-var.html %}  |Required (default:  `https://listener.logz.io:8071`) |
| SetDebug | Debug flag. | `false` |
| SetDrainDuration  | Time to wait between log draining attempts. | `5 * time.Second` |
| SetTempDirectory | Filepath where the logs are buffered. | -- |
| SetCheckDiskSpace  | To enable `SetDrainDiskThreshold`, set to `true`. Otherwise, `false`. | `true` |
| SetDrainDiskThreshold  | Maximum file system usage, in percent. Used only if `SetCheckDiskSpace` is set to `true`. If the file system storage exceeds this threshold, buffering stops and new logs are dropped. Buffering resumes if used space drops below the threshold. | `70.0` |


###### Code sample

```go
msg := fmt.Sprintf("{\"%s\": \"%d\"}", "message", time.Now().UnixNano())
err = l.Send([]byte(msg))
if err != nil {
  panic(err)
}

l.Stop() // Drains the log buffer
```

</div>
