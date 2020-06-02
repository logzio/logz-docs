---
layout: article
title: Single sign-on with Azure
permalink: /user-guide/users/single-sign-on/azure-sso.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
  - azure
contributors:
  - shalper
  - schwin007
---

Logz.io offers a quick integration for SSO with Azure.

#### To set up single sign-on for Azure

<div class="tasklist">

##### Request SSO access from Logz.io

Only account admins can request single sign-on access for their accounts.
{:.info-box.note}

To kick off this process, send an email to [help@logz.io](mailto:help@logz.io).
Write that you want to set up Azure SAML SSO for Logz.io.
Include these items in the message:

* Your Logz.io [account ID]({{site.baseurl}}/user-guide/accounts/finding-your-account-id.html)
* Your [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

The Support team will respond with the connection information you'll need to give in Azure.

##### Add Logz.io as a gallery application in Azure

Log into your [Azure Portal](https://portal.azure.com/) and follow the instructions in [Azure's docs](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/logzio-cloud-observability-for-engineers-tutorial) for adding the **Logz.io - Azure AD Integration** from the  Gallery.

##### Configure the integration

When you get to the step **Set up single sign-on with SAML**, you'll need the SAML information you received from Logz.io Support's email.

* The _Audience URI_ from Logz.io is the SAML **Identifier (Entity ID)**.
* The _Single sign on URL_ from Logz.io is the SAML **Reply URL (Assertion Consumer Service URL)**.

##### Zip the SAML certificate

In the SAML Signing Certificate section of the page,
click the **Certificate (Base64)** download link (next to the certificate).

Download the certificate file and zip it.
You'll need to email this zip file to the Logz.io Support team in the next step.

Save your configuration.

##### Send your SAML details to Logz.io

Draft a new [email to Support](mailto:help@logz.io), and include these items:

* Your zipped SAML Signing Certificate (from the previous step).
* Your SAML-P SIGN-ON ENDPOINT.
  This is your Azure **Login URL**.

##### Configure Azure to send user groups

Return to the App registrations page in your [Azure Portal](https://portal.azure.com/).
If you don't see Logz.io, click **View all applications**.

Open the **Logz.io** application, and then click **Manifest**.
In the manifest JSON, set groupMembershipClaims to `"All"`.
Click **Save** (top of the page).

##### _(Optional)_ Restrict access to Logz.io to specific user groups

![Add group](https://dytvr9ot2sszz.cloudfront.net/logz-docs/access-and-authentication/sso--manage-groups.png)

By default, all Azure users with Logz.io access can sign in to your Logz.io accounts.

You can restrict this access from the [Manage users page](https://app.logz.io/#/dashboard/settings/manage-users) for each of your accounts.
Click **Add group**, and then paste the group's **Object ID** from Azure for each group that should have access to the account in Logz.io.

##### Receive confirmation from Support

When Support has created your Azure + Logz.io connection, you're done!
You can start logging in to Logz.io through your Azure Apps portal.

</div>
