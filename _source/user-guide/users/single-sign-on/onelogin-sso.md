---
layout: article
title: Set up OneLogin single sign-on
permalink: /user-guide/users/single-sign-on/onelogin-sso.html
flags:
  admin: true
  logzio-plan: enterprise
contributors:
  - schwin007
---

Single sign-on is available for Enterprise plans.
To discuss switching to an Enterprise plan, please contact your account manager.

###### To set up single sign-on for OneLogin

{: .tasklist .firstline-headline }
1. Request SSO access from Logz.io

    To kick off this process, send an email to [help@logz.io](mailto:help@logz.io).
    Write that you want to set up OneLogin SAML SSO for Logz.io, and include your Logz.io account ID in the message.

    The Support team will respond with the connection information you'll need to give in OneLogin.

2. Add Logz.io to OneLogin

    In the OneLogin top menu, browse to **Apps > Add Apps**.

    In the Find Applications page, search for "SAML Test Connector". Select **SAML Test Connector (IdP w/attr)** from the apps list.

    On the Configuration page, set the **Display Name** to "Logz.io" and click **Save**.

3. Paste the SAML information from Support

    Click the **Configuration** tab.
    Fill in these details from the Logz.io Support email message:

    * In **Audience**, paste _Audience URI_ from the email

    * In **Recipient**, paste _Single sign on URL_ from the email

    * In **ACS (Consumer) URL Validator**, paste `[a-z]{5}:\/\/[a-z.0]{16}\/[a-z]{5}\/[a-z?=-]*`

    * In **Single sign on URL**, paste _Single sign on URL_ from the email

4. Zip the SAML certificate

    Click the **SSO** tab.

    Under X.509 Certificate, click **View Details**. The Standard Strength Certificate page is shown.

    ![X.509 certficiate details]({{site.baseurl}}/images/sso-providers/onelogin/x509-certificate-details.png)

    In the X.509 section, click **Download**.

    Download the file and zip it. You'll attach this zip file to an email to the Support team.

    Click <i class="fas fa-long-arrow-alt-left"></i> to return to the SSO tab.

5. Get your endpoint information

    In the SSO tab, copy the **SAML 2.0 Endpoint (HTTP)**.
    Paste this in the email that you'll send to the Support team.

6.  Send your SAML details to Logz.io

    Draft a new [email to Support](mailto:help@logz.io).
    Write that you want to set up OneLogin SSO, and include these items in the message:

    * Your Logz.io account ID

    * Your zipped certificate (from step 4)

    * Your SAML 2.0 Endpoint (from step 5)

7.  Receive confirmation from Support

    When Support has created your OneLogin + Logz.io connection, you're done!
    You can start logging in to Logz.io through your Apps portal.