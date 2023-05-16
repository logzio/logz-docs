---
title: Ship logs from Carbon Black
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship logs from Carbon Black to Logz.io
logo:
  logofile: carbon-black.png
  orientation: vertical
data-source: Carbon Black
data-for-product-source: Cloud SIEM
short-description: Send Carbon Black logs stored in S3 Bucket to Logz.io via a Lambda function
open-source:
  - title: s3-hook
    github-repo: s3-hook
contributors:
  - mirii1994
shipping-tags:
  - aws
---

<!-- tab:start -->

With this integration, you can collect Logs from Carbon Black and forward them to Logz.io.

<div class="tasklist">

##### Set Carbon Black Event Forwarder
  
Follow [Carbon Black instructions](https://developer.carbonblack.com/reference/enterprise-response/event-forwarder/event-forwarder-s3-bucket-configuration/) for forwarding events to S3 bucket

{% include log-shipping/stack.md %}


</div>
<!-- tab:end -->
