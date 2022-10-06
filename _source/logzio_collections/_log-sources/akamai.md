---
title: Akamai logs
logo:
  logofile: akamai-logo2.png
  orientation: vertical
data-source: Akamai
data-for-product-source: Logs
templates: ["lambda-cloudwatch"]
contributors:
  - nshishkin
shipping-tags:
  - platform-service
order: 255
---

Akamai is a content delivery network (CDN) services provider for media and software delivery, and cloud security solutions.


**Before you begin, you'll need**:

* Akamai account
* Logz.io account

<div class="tasklist">

##### Create a data stream

1. In the main menu, navigate to **COMMON SERVICES > DataStream**.
2. Click **+Create stream**.
   ![1](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-1.png)
3. Enter a name for the stream.
4. In the **Group** dropdown menu, select the Akamai resource group that you need to send logs from.
4. In the **Include properties** section, select the logging properties that you need to include in the logs sent to Logz.io.
5. Click **Next**.
6. In the **Data sets** section, select the fields that you need to include in the logs.
   ![2](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-2.png)
7. Select **Json** as the **Log format**.
8. Click **Next**.

##### Set up the logs destination

In the **Destination** section, set the parameters as follows:
   ![3](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-3.png)
   
1. In the **Destination** dropdown, select **Custom Https**.
2. In the **Display name** field, enter the name for the destination that will be shown in Akamai.
3. In the **Authentication** dropdown, select **NONE**.
4. In the **Endpoint URL** section, enter `https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=<<LOG-TYPE>>`

   {% include log-shipping/listener-var.html %}
   {% include /log-shipping/log-shipping-token.html %}
   Replace `<<LOG-TYPE>>` with the tag that you want to use to identify the logs in Logz.io.
   
5. Click **Validate & Save**.

##### Enable the data stream for each selected property

In this step, we need to add the newly created data stream to each property that was included in the data stream.

1. In the main menu, navigate to **CDN > Properties**.
2. In the **Property Groups** section, select the required property name.
3. In the **Active Production Version** section, click the version name.
   ![4](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-4.png)
4. Click **Edit New Version**.
   ![8](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-4.png)
5. Scroll down to the **Property Configuration Settings** section.
6. Locate the **DataStream** section.
   ![5](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-5.png)
7. If the section is not present, click **Add Rule** and select **DataStream** from the **Available Rules** dropdown menu.
   ![6](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-6.png)
   ![7](https://dytvr9ot2sszz.cloudfront.net/logz-docs/akamai/akamai-7.png)
8. In the **Stream version** dropdown menu, select **DataStream 2**.
9. Set **Enabled** to **On**.
10. In the **Stream names** dropdown, select the stream that was created in the previous steps.
11. In the **Sampling rate** section, set the required sampling rate.
12. Click **Save**.

##### Activate the data stream for each selected property

In the **Property Manager Editor** section, navigate to the **Activate** tab and activate the data stream for this property.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>
