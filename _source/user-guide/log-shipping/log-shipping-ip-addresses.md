---
layout: article
title: Log shipping IP addresses
contributors:
  - sboroda
  - jschnitzer
---

When you're shipping logs, you'll need to open your firewall to Logz.io servers in the United States or Europe. Be sure to open your firewall to all the IP addresses for your region. 

<div class="info-box note">
  Ship logs to the listener URL, and don't ship directly to any single IP address. This ensures that logs are properly balanced on our listener servers, and that your logs will be available to you as quickly as possible.
</div>


<div class="accordion">

### listener.logz.io (United States)

<div>

If you're shipping logs to listener.logz.io, open your firewall to all of these IP addresses:

23.22.183.192 \\
34.196.246.79 \\
34.198.121.5 \\
34.198.165.82 \\
34.198.180.160 \\
34.198.249.114 \\
34.198.80.79 \\
34.199.22.38 \\
34.199.36.125  \\
34.203.20.169 \\
52.20.49.54 \\
52.21.71.179 \\
52.70.60.216 \\
52.87.10.17 \\
52.87.4.83 \\
54.210.40.1

</div>

### listener-eu.logz.io (Europe)

<div>

If you're shipping logs to listener-eu.logz.io, open your firewall to all of these IP addresses:

35.157.100.82 \\
35.157.104.194 \\
35.157.126.82  \\
35.157.19.97  \\
35.157.71.116  \\
52.28.67.139 \\
52.57.102.144 \\
52.57.139.219 \\
52.57.23.254 \\
52.57.24.166

</div>