---
layout: article
title: Multi-factor authentication
permalink: /user-guide/users/multi-factor-authentication.html
flags:
  admin: true
  logzio-plan: community
contributors:
  - boofinka
  - imnotashrimp
---

Logz.io supports multi-factor authentication for all users on a main account or sub account. To enable this feature, an account admin needs to contact the Support team.

<div class="info-box important">
  All users in your account must have Google Authenticator installed on their phones to be able to sign in. Logz.io emails users to tell them when multi-factor authentication is enabled.
</div>

###### To set up multi-factor authentication for your account

1. Contact the Support team ([help@logz.io](mailto:help@logz.io) or the chat icon in your browser). Ask to enable multi-factor authentication (MFA).

    MFA is applied to your main account and each sub account separately. Include the [account token](https://app.logz.io/#/dashboard/settings/manage-accounts) for each account that you want MFA enabled on.

2. Once Support enables MFA, log out and log back in to Logz.io. A QR code is displayed.

    ![QR code]({{site.baseurl}}/images/access-and-authentication/mfa--qr-code.png)

3. Scan the QR code using Google Authenticator, type your verification code, and click **Verify**.

In future logins, Logz.io will prompt you to enter your Google Authenticator verification code.