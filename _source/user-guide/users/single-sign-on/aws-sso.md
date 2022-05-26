---
layout: article
title: Single sign-on with AWS
permalink: /user-guide/users/single-sign-on/google-workspace-sso.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: SSO with AWS for Logz.io accounts
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
contributors:
  - hidan
---

Logz.io offers a quick integration for SSO with AWS.


#### To set up single sign-on for Google Workspace

<div class="tasklist">

##### Request SSO access from Logz.io


Only account admins can request single sign-on access for their accounts.
{:.info-box.note}

To set up your AWS SSO, you'll first need to email [help@logz.io](mailto:help@logz.io) and write that you want to set up AWS SAML SSO for Logz.io.

Include these items in the message:

* Your Logz.io [account ID]({{site.baseurl}}/user-guide/accounts/finding-your-account-id.html)
* The last six characters of your [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

The Support team will respond with the connection information needed to set up your AWS SSO.

##### Set a custom SAML app in AWS

Log into your [AWS SSO dashboard](https://us-east-1.console.aws.amazon.com/singlesignon/identity/home).


In the sidebar, navigate to **Applications** > **Add a new application** > **Add a custom SAML application**.

///![Create SAML app](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/google-add-saml-app.png)

Name your application and give it a short description. Download the **AWS SSO certificate**.

///![Download certificate](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/download-certificate.png)

Under **Application properties** enter the **Application start URL** given to you by Logz.io, 


Continue to the next screen. Enter the ACS URL and Entity ID given to you by Logz.io support; change the Name ID format to **EMAIL**, and set the Name ID to **Basic Information > Primary email**.

![Set entity ID](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/service-provider.png)

Continue to the final screen. Edit the Google Directory attributes to **Basic Information - Primary email**, and set App attributes to **email**.

![Set entity ID](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/attribute-mapping.png)

Click on Finish to add the custom SAML app. You can now log into your Logz.io account through your Google Workspace account.


</div>

#### Google Workspace SSO groups


When [creating access groups for Google Workspace](https://support.google.com/a/answer/9050643?hl=en), you need to add a custom attribute to connect it to your Logz.io SAML application.

First, **[add a custom attribute](https://support.google.com/a/answer/6208725?hl=en)** and link it to your SAML app.

Open your SAML app, navigate to the **Add a new custom attribute** section, and add the following configuration:

* Name: groups
* Info type: Text
* Visibility: Visible to user and admin
* Number of values: Multi-value

![Set group SSO](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/add-custom-fields.png)

Next, configure the groups attribute to be sent across as part of the SAML login.

![Set group attribute](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/google/sent-group-sso.png)