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
  
Logzio golang api client offers two queue implementations that you can use:
## Disk queue
Logzio go client uses [goleveldb](https://github.com/syndtr/goleveldb) and [goqueue](github.com/beeker1121/goque) as a persistent storage.
Every 5 seconds logs are sent to logz.io (if any are available)

## In memory queue
You can see the logzio go client queue implementation in `inMemoryQueue.go` file. The in memory queue is initialized with 500k log count limit and 20mb capacity by default.
You can use the `SetinMemoryCapacity()` and `SetlogCountLimit()` functions to override default settings.


## Quick Start

### Disk queue
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
  		"fake-token",
	  logzio.SetDebug(os.Stderr),
	  logzio.SetUrl("http://localhost:12345"),
	  logzio.SetDrainDuration(time.Minute*10),
	  logzio.SetTempDirectory("myQueue"),
	  logzio.SetDrainDiskThreshold(99),
  	) // token is required
  if err != nil {
    panic(err)
  }
  msg := fmt.Sprintf("{ \"%s\": \"%s\"}", "message", time.Now().UnixNano())

  err = l.Send([]byte(msg))
  if err != nil {
     panic(err)
  }

  l.Stop() //logs are buffered on disk. Stop will drain the buffer
}
```

### In memory queue
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
  		"fake-token",
	  logzio.SetDebug(os.Stderr),
	  logzio.SetUrl("http://localhost:12345"),
	  logzio.SetInMemoryQueue(true),
	  logzio.SetinMemoryCapacity(24000000),
	  logzio.SetlogCountLimit(6000000),
  	) // token is required
  if err != nil {
    panic(err)
  }
  msg := fmt.Sprintf("{ \"%s\": \"%s\"}", "message", time.Now().UnixNano())

  err = l.Send([]byte(msg))
  if err != nil {
     panic(err)
  }

  l.Stop() 
}
```

## Usage

- Set url mode:
    `logzio.New(token, SetUrl(ts.URL))`

- Set drain duration (flush logs on disk):
    `logzio.New(token, SetDrainDuration(time.Hour))`

- Set debug mode:
    `logzio.New(token, SetDebug(os.Stderr))`

- Set queue dir:
    `logzio.New(token, SetSetTempDirectory(os.Stderr))`

- Set the sender to check if it crosses the maximum allowed disk usage:
    `logzio.New(token, SetCheckDiskSpace(true))`

- Set disk queue threshold, once the threshold is crossed the sender will not enqueue the received logs:
    `logzio.New(token, SetDrainDiskThreshold(99))`

- Set the sender to Use in memory queue:
  `logzio.New(token, SetInMemoryQueue(true))`

- Set the sender to Use in memory queue with log count limit and capacity:
  `logzio.New(token,
  SetInMemoryQueue(true),
  SetinMemoryCapacity(500),
  SetlogCountLimit(6000000),
  )`
  
## Data compression
All bulks are compressed with gzip by default to disable compressing initialize the client with `SetCompress(false)`:
```go
  logzio.New(token, SetCompress(false),)
```

## Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| token | {% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} | Required |
| SetUrl | Listener URL and port.    {% include log-shipping/listener-var.html %}  |Required (default:  `https://listener.logz.io:8071`) |
| SetDebug | Debug flag. | `false` |
| SetDrainDuration  | Time to wait between log draining attempts. | `5 * time.Second` |
| SetTempDirectory | Filepath where the logs are buffered. | -- |
| SetCheckDiskSpace  | To enable `SetDrainDiskThreshold`, set to `true`. Otherwise, `false`. | `true` |
| SetDrainDiskThreshold  | Maximum file system usage, in percent. Used only if `SetCheckDiskSpace` is set to `true`. If the file system storage exceeds this threshold, buffering stops and new logs are dropped. Buffering resumes if used space drops below the threshold. | `70.0` |
| SetDrainDuration  | Time to wait between log draining attempts. | `5 * time.Second` |
| SetInMemoryQueue  | Set to `true` to use in memory queue | `false` |
| SetinMemoryCapacity  | In memory queue capacity in bytes. | `20 * 1024 * 1024` 20mb |
| SetlogCountLimit  | In memory queue max length. | `500000` |
| SetCompress  | Set to `true` to compress bulks with gzip. | `true` |

</div>
