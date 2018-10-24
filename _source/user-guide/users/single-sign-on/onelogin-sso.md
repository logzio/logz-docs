---
layout: article
title: OneLogin single sign-on
permalink: /user-guide/users/single-sign-on/onelogin-sso.html
flags:
  admin: true
  logzio-plan: enterprise
contributors:
  - schwin007
---

You can configure OneLogin as a single sign-on (SSO) identity provider for your Logz.io accounts.

Single sign-on is available for Enterprise plans.
To discuss switching to an Enterprise plan, please contact your account manager.

###### To set up single sign-on for OneLogin

{: .tasklist .firstline-headline }
1. Add Logz.io to OneLogin

    In the OneLogin top menu, browse to **Apps > Add Apps**.

    In the Find Applications page, search for "SAML Test Connector". Select **SAML Test Connector (IdP w/attr)** from the apps list.

    On the Configuration page, set the **Display Name**  to "Logz.io", click **Save**, and then click the **SSO** tab.

2. Zip the SAML certificate

    Under X.509 Certificate, click **View Details**. The Standard Strength Certificate page is shown.

    ![X.509 certficiate details]({{site.baseurl}}/images/sso-providers/onelogin/x509-certificate-details.png)

    In the X.509 section, click **Download**.

    Download the file and zip it. You'll attach this zip file to an email to the Support team.

    Click <i class="fas fa-long-arrow-alt-left"></i> to return to the SSO tab.

3. Get your endpoint information

    In the SSO tab, copy the **SAML 2.0 Endpoint (HTTP)**.
    Paste this in the email that you'll send to the Support team.

4.  Send your SAML details to Logz.io

    Draft a new [email to Support](mailto:help@logz.io).
    Write that you want to set up OneLogin SSO, and include these items in the message:

    * Your Logz.io account ID

    * Your zipped certificate (from step 2)

    * Your SAML 2.0 Endpoint (from step 3)

5.  Receive confirmation from Support

    When Support has created your OneLogin + Logz.io connection, you're done!
    You can start logging in to Logz.io through your Apps portal.