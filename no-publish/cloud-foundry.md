<!-- MOVE TO _log-sources COLLECTION WHEN READY TO PUBLISH -->
---
title: Ship Cloud Foundry logs
logo:
  logofile: aws-rds.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon RDS (MySQL)
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/RDS
contributors:
  - imnotashrimp
shipping-tags:
---

########## Copied from original in-app docs ##############

# Instructions for adding a drain to Cloud Foundry

## [[Step 1]] Create the log drain service in Cloud Foundry

```
cf cups my-log-drain -l https://{{LOGZ_LISTENER}}:8081?token={{API_TOKEN}} 
```  

If you want to add custom fields to each log message for a specific logger, you can add fields to the drain url.  
For example, if you have two CF apps and want to add a field called app to each one to be able to identify their logs separately, you can add it like this :  

```
cf cups my-log-drain -l https://{{LOGZ_LISTENER}}:8081?token={{API_TOKEN}}&app=CF_App 
```
## [[Step 2]] Bind the service to an app

```
cf bind-service my-app my-log-drain
```

After a short delay, logs begin to flow automatically.