---
layout: article
title: Authorization headers
permalink: /user-guide/encoding-authorization-header.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io Distributed Tracing Flamegraph view
flags:
  logzio-plan: pro
tags:
  - threats
contributors:
  - shalper
---

If your private feed requires authorization headers, format them according to the HTTP headers standard.

The format for a single header is `headerKey:headerValue`. <br>
For multiple headers, send one header per line. For example:

```
headerKey:headerValue
headerKey:headerValue
```

#### If the URL is password protected

If your feed is password protected (aka Basic Authentication), you'll need to encode the credentials in base64 and pass them as an authorization header.
You can use an online tool, for example [base64encode.org](https://www.base64encode.org/) to encode the credentials.

Base64 encoding is the HTTP standard for username-password protected sites. It is not needed for other authorization headers.
{:.info-box.note}


For example, if your username:password pair is `logzio:Aa123456!`, it would be `bG9nemlvOkFhMTIzNDU2IQ==` when encoded to base64. Here's how to encode it using the [base64encode.org](https://www.base64encode.org/) online tool.

![Encoding credentials in base64](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/encode-headers.png)

When configuring the private feed connection, use an authorization header. <br> The format is `Authorization: Basic {encoded_username:password}`.

In our example, the header should be: `Authorization: Basic bG9nemlvOkFhMTIzNDU2IQ==`

![Authorization header](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/configure-private-feed.png)