---
layout: article
title: Configure SIEM to automatically create JIRA tickets by alert
permalink: /user-guide/cloud-siem/create-jira-ticket-alert.html
flags:
  logzio-plan: pro
tags:
  - siem
contributors:
  - nshishkin
---

You can configure the notification endpoint to create a JIRA ticket in your preferred board, every time there is a new altert.

### Pre-requisites

* Make sure that you have permissions to create a task in the required JIRA board.

* Create an API token for your [Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

* Convert the API token using the following command:

  ```shell
  echo -n {{your-email}}:{{jira-token}} | base64
  ```


### Add a JIRA notification endpoint

To add a pre-configured notification endpoint:

1. Sign in to Logz.io as an administrator user.

2. Go to **Settings > Notification endpoints**.

   ![Notification](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-quick-start/endpoint-1.png)

3. Select **+ Add endpoint**.

   ![Notification](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-quick-start/endpoint-2.png)


3. Select **Custom** from the **Type** menu.

   ![Notification](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-quick-start/endpoint-3.png)


   * Add a name for this endpoint.

   * If required, add a description for the endpoint.

   * Provide the URL to your JIRA board as follows: https://<tenantname>.atlassian.net/rest/api/3/issue. Replace `<tenantname>` with the name of your JIRA domain.

   * Select **POST** from the **Method** menu.

   * Enter the following header into the **Headers** field: `content-type=application/json,x-token=<YOUR-ATLASSIAN-API-TOKEN>`. Replace `<YOUR-ATLASSIAN-API-TOKEN>` with the API token to your Atlassian account.

   * Add the following code as the payload:

   ```json
   {
       "fields": {
           "project": {
               "key": "SECTAR"
           },
           "summary": "{{alert_title}}",
           "issuetype": {
               "name": "Alert"
           },
           "description": {
               "type": "doc",
               "version": 1,
               "content": [
                   {
                       "type": "paragraph",
                       "content": [
                           {
                               "type": "text",
                               "text": "{{alert_description}}"
                           }
                       ]
                   }
               ]
           }
       }
   }
   ```

4. Select **Add endpoint**.


