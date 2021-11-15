---
layout: article
title: Retrieve security rules using filtered and unfiltered requests
permalink: /api/cookbook/filtered-unfiltered-security-rule.html
flags:
  logzio-plan: pro
tags:
  - api
  - api-cookbook
contributors:
  - nshishkin
---

The endpoint for retrieving security rules supports two query formats: filtered request and unfiltered request.

The filtered request query has the following format:

```json
{
  "filter": {
    "search": "string",
    "severities": [
      "SEVERE",
      "HIGH"
    ],
    "updatedBy": [
      "string"
    ],
    "createdBy": [
      "string"
    ],
    "enabledState": [
      true
    ],
    "emailNotifications": [
      "string"
    ],
    "tags": [
      "string"
    ]
  },
  "sort": {
    "sortByField": "SEVERITY",
    "descending": true
  },
  "pagination": {
    "pageNumber": 2,
    "pageSize": 100
  }
}
```

The unfiltered request query has the following format:

```json
{
	"query": {
		"bool": {
			"must": [{
				"match_all": {}
			}]
		}
	}
}
```
