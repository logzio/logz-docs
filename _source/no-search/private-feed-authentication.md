---
layout: article
title: Encoding your authentication header
permalink: /user-guide/encoding-authentication-header.html
flags:
  alpha: true
tags:
  - threats
contributors:
  - shalper
---

If your private feed requires authorization headers, format them according to the [HTTP headers standard](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html).

The format for a single header is `headerKey:headerValue`.
For multiple headers, send one header per line. For example:

```
headerKey:headerValue
headerKey:headerValue
```

#### If the URL is password protected

If your feed is password protected, you'll need to encode the credentials in base64 and pass them as an authorization header.
You can use an online encoder such as https://www.base64encode.org/ to encode the credentials.

For example, if your username:password pair is `logzio:Aa123456!`, it would be `bG9nemlvOkFhMTIzNDU2IQ==` when encoded in base64.

![Encoding credentials in base64](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/encode-headers.png)

The authorization header you would put in the feed configuration form would look like this:
`Authorization: Basic bG9nemlvOkFhMTIzNDU2IQ==`

