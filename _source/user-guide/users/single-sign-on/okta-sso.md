---
layout: article
title: Single sign-on with Okta
permalink: /user-guide/users/single-sign-on/okta-sso.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: SSO with Okta
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
  - okta
contributors:
  - schwin007
---

#### Okta SSO Setup
<div class="tasklist">

##### Request SSO access from Logz.io

Only account admins can request single sign-on access for their accounts.
{:.info-box.important}

To configure SSO, send an email to [help@logz.io](mailto:help@logz.io) or open a live chat once logged in.
The message to Logz.io should include that you are looking to set up SAML SSO via Okta for Logz.io.
Please make sure to include these items in the message:

* Your Logz.io [account ID]({{site.baseurl}}/user-guide/accounts/finding-your-account-id.html)
* The last six characters of your [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

The Support team will provide the following connection details needed in Okta to configure the Logzio SAML Application.

* **Single sign-on URL**: https://logzio.auth0.com/login/callback?connection={CONNECTION-NAME}
* **Audience URI (SP Entity ID)**: urn:auth0:logzio:{CONNECTION-NAME}

Each SSO group can be assigned to only one Logz.io account. To associate similar permissions with multiple Logz.io accounts, duplicate your SSO groups within your provider and assign these duplicates to the respective accounts.
{:.info-box.important}

##### Create Okta SAML Application for Logz.io

In Okta, click **Admin** button in top right corner. This will bring you to the Admin portal

Once in Admin portal, click **Applications > Applications** in the left hand navigation menu.
![Applications Menu](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/applications-menu.png)

On the left side of the window, click **Create App Integration**.

![Create a New Application Integration panel](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/create-app-integration.png)

Select **SAML 2.0** option, and click **Next**.

![SAML2.0 image](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/SAML-app.png)

Set your **App name** to "Logz.io" and add optional logo. Click **Next** to continue to the SAML Settings.

##### Paste the SAML information from Support
In Step 1, Logz.io support provided details needed within the SAML Settings. Please paste the following into your settings:

* **Single sign-on URL**: https://logzio.auth0.com/login/callback?connection={CONNECTION-NAME}
* **Audience URI (SP Entity ID)**: urn:auth0:logzio:{CONNECTION-NAME}

Do not change the **Default RelayState, Name ID format, or Application username**
{:.info-box.important}

![SAML settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/saml-settings.png)

Next, please set **Attribute Statements (optional)** as follows:

* Set **Name** to "email"
* Set **Name Format** to "Unspecified"
* Set **Value** to "${user.email}"

![Attribute Statements](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/attr-statement.png)

##### Zip the SAML certificate

Once the SAML Application has been created, scroll down to **SAML Signing Certificates**.

Download the certificate file labeled "SHA-2" and click the **Actions** dropdown. Please then download the certificate.

![SAML Cert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/download-cert.png)

##### Provide Logz.io Support the SAML information

Navigate to the **Sign on methods**, and under *"Metadata URL"* click **More Details**. Please copy the Sign on URL as this will be needed in the next step!

![SAML setup instructions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/signon-url.png)

##### Send your SAML details to Logz.io

Either in the existing chat or email with Logz.io Support, respond with the following items:

* Zipped certificate (from step 4)
* Okta Single Sign-On URL (from step 5)

Once these items are provided, the team will apply the SSO connection to the accounts of your choosing. If a new thread is needed, please contact [support](mailto:help@logz.io).

##### _(Optional)_ Restrict Logz.io access to specific groups

Using groups can help simplify user management as changes to group access are automatically applied to all members of the group in Okta. Follow the steps below to get started.

###### 7A. Create new group in Okta

1. In the left hand navigation menu of the Okta Admin portal, click **Directory > Groups**
2. Click **Add Group**
3. Name your group (ex: Logzio-Admins, Logzio-Users)

###### 7B. Assign users to group
1. After creating new group, click in and select **Assign People**
2. After adding all users to group, select **Done**

###### 7C. Assign Group to Logz.io Application
1. Still in **Directory > Groups** select **Applications**
2. Select **Assign Applications**
3. Assign Logzio SAML App created in steps 1-3 above

###### 7D. Modify Logzio SAML App to accept groups
1. In the left hand navigation menu of the Okta Admin portal, click **Applications > Applications**
2. Click on Logzio SAML Application created in steps 1-3
3. Click "General" and edit the **SAML Settings**
4. In Step 2 "Configure SAML", scroll down to **Group Attribute Statements (optional)**
5. Enter the following:

![SSO groups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/group-assignment.png)

###### 7E. Configure User Group in Logz.io
1. In the left hand navigation menu of Logz.io, click **Settings > Manage Users**
2. Toggle into "SSO Groups" and click **+ New SSO Group**
3. Add the group name from okta in step 7A.

![SSO groups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/okta/user-groups-logz.png)

</div>
