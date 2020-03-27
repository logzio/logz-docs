---
layout: article
title: Rollups - compressing the data 
permalink: /user-guide/infrastructure-monitoring/rollups.html
flags:
  logzio-plan: pro
tags:
contributors:
  - shalper   
---

Infrastructure monitoring is focused on establishing standards and highlighting trends and deviations. For this purpose, data is needed at increasingly less granularity as it ages. There really isn't a need to know the exact CPU usage at 10 second intervals after a week has passed. Instead, you Logz.io Metrics account offers 18 months of retention by default. This requires a high degree of data compaction to balance cost and value. 

Data compaction is known as **data rollups**. Through this process, Logz.io keeps 4 indicators for each UDP (unique data point):
- Mean
- Max
- Min    
- 
