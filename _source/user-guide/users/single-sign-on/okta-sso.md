---
layout: article
title: Set up Okta single sign-on
permalink: /user-guide/users/single-sign-on/okta-sso.html
flags:
  admin: true
  logzio-plan: enterprise
contributors:
  - schwin007
---

Single sign-on is available for Enterprise plans.
To discuss switching to an Enterprise plan, please contact your account manager.

###### To set up single sign-on for Okta

{: .tasklist .firstline-headline }
1. Request SSO access from Logz.io

    To kick off this process, send an email to [help@logz.io](mailto:help@logz.io).
    Write that you want to set up Okta SAML SSO for Logz.io, and include your Logz.io account ID in the message.

    The Support team will respond with the connection information you'll need to give in Okta.

2. Add Logz.io to Okta

    In Okta, click **Admin**.

    In the Shortcuts panel (on the right), click **Add Applications**.

    On the left side of the window, click **Create New App**.
    The "Create a New Application Integration" panel is displayed.

    ![Create a New Application Integration panel]({{site.baseurl}}/images/sso-providers/okta/create-a-new-application-integration.png)

    Select **Web** from the Platform list, click **SAML 2.0** option, and click **Create**.
    The Create SAML Integration page is displayed.

    Set your **App name** to "Logz.io". Click **Next** to continue to the Configure SAML tab.

3.  Paste the SAML information from Support

    ![SAML settings]({{site.baseurl}}/images/sso-providers/okta/saml-settings.png)

    Paste **Single sign on URL** and **Audience URI** from the Logz.io Support email message.

    Don't change **Default RelayState**, **Name ID format**, or **Application username**.

    ![Attribute Statements]({{site.baseurl}}/images/sso-providers/okta/attribute-statements.png)

    In the Attribute Statements section:

    * Set **Name** to "email"

    * Select "Unspecified" from **Name format**

    * Set **Value** to "${user.email}"

4. Zip the SAML certificate

    On the right side of the page, click **Download Okta Certificate**.

    Download the certificate file and zip it.
    You'll attach this zip file to your next email to the Support team.

    Click **Next**, select **I'm an Okta customer adding an internal app**, and then click **Finish**.

5.  Get your endpoint information

    ![SAML setup instructions]({{site.baseurl}}/images/sso-providers/okta/view-setup-instructions.png)

    Browse to the Sign On tab, and then click **View Setup Instructions**.

    Copy the **Identity Provider Single Sign-On URL**, and paste this in the email that you'll send to the Support team.

6.  Send your SAML details to Logz.io

    Draft a new [email to Support](mailto:help@logz.io), and include these items:

    * Your zipped certificate (from step 4)

    * Your Identity Provider Single Sign-On URL (from step 5)

7.  Receive confirmation from Support

    When Support has created your Okta + Logz.io connection, you're done!
    You can start logging in to Logz.io through your Apps portal.
