---
layout: article
title: Create and integration with StatusPage
permalink: /user-guide/integrations/status-page.html
tags:
  - alerts
  - endpoints
  - integrations
contributors:
  - rhershenhoren 
  - yberlinger
---


Use this StatusPage integration to notify StatusPage when there are service degradations that impact your platform. 

To implement the integration, you will:

1. Create a pair of alerts: 
   + An alert configured with a condition to trigger a StatusPage update
   + An alert configured with the opposite trigger condition, to update the StatusPage when the conditions return to normal

2. Create a pair of custom endpoints to update a specific component, then attach each endpoint to the relevant alert:
   + An endpoint to update the component with the triggered status 
   + An endpoint to update the component with the status **_Operational_** 




#### Creating a custom endpoint to update StatusPage components

<div class="tasklist">

##### Allow firewall access

See [Custom Endpoints](/user-guide/integrations/custom-endpoints.html) for general instructions on setting up firewall access for Logz.io notifications.

This may include whitelisting Logz.io IPs and/or creating a verification token.

##### Look up your `page_id`

To find your `page_id`: 
1. Log in to your StatusPage account.
2. Click your profile picture.
3. Select **API info** from the menu.
4. Find your `page_id`.

##### Look up your `component_id`
1. Log in to your StatusPage account.
2. In the left menu, click  `Components` and select the component you want to update.
3. Scroll to the bottom to see your **Component API ID**.

##### Look up your StatusPage API key
1. Log in to your StatusPage account.
2. Click your profile picture.
3. Select **API info** from the menu.
4. Find your account API key.

##### Create the endpoint

1. Use the API at the following URL: [https://developer.statuspage.io/#operation/putPagesPageIdComponentsComponentId](https://developer.statuspage.io/#operation/putPagesPageIdComponentsComponentId).
2. Replace the placeholder values for {page_id} and {component_id} with the values you looked up in steps 2 and 3. 

1. To add a new custom endpoint, click **Add endpoint**.
2. **Type**: Select the option **Custom**.
3. **URL**: Use this [StatusPage API -  https://developer.statuspage.io/#operation/putPagesPageIdComponentsComponentId](https://developer.statuspage.io/#operation/putPagesPageIdComponentsComponentId).
4. **Method**: Select the **PUT** method. 
5. **Headers**: Add `Authentication=OAuth {{API key}}` and replace the {{API key}} with the StatusPage API key you determined in step 4.
3. **body**: Add your body message. See the next step for details.

{{screen capture placeholder}}

##### Add your message
The body should be: 

```json
{
    "component": {
        "status": "partial_outage"
    }
}
```

###### Status values
Status values can be
+ `operational`
+ `degraded_performance`
+ `partial_outage`
+ `major_outage`
+ `under_maintenance`

###### Example payload


##### Test the endpoint (_Optional_)

Click **Run the test** to test your endpoint. Logz.io shows if the message was successfully sent.

Check that the message arrived at the target endpoint.

##### Save the endpoint

**Save** your endpoint.


</div>