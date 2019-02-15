---
layout: article
title: Multi-factor authentication
permalink: /user-guide/users/multi-factor-authentication.html
flags:
  admin: true
  logzio-plan: community
tags:
  - multi-factor-authentication
contributors:
  - boofinka
  - imnotashrimp
---

Logz.io supports multi-factor authentication for all users on a main account or sub account.
To enable this feature, an account admin needs to contact the Support team.

<div class="info-box important">
  All users in your account must have Google Authenticator installed on their phones to be able to sign in.
  Logz.io emails users to tell them when multi-factor authentication is enabled.
</div>

###### To set up multi-factor authentication for your account

{: .tasklist .firstline-headline}
1. Request multi-factor authentication from Logz.io

    <a class="intercom-launch" href="mailto:help@logz.io">Contact the Support team</a>.
    Write that you want to enable multi-factor authentication (MFA).

    MFA is applied to your main account and each sub account separately.
    Include the [account token](https://app.logz.io/#/dashboard/settings/manage-accounts) for each account that you want MFA enabled on.

    The Support team will tell you when multi-factor authentication is enabled.

2. Log out of Logz.io

    Once Support enables MFA, log out of Logz.io.
    The next time you log in, you'll see a QR code.

    <!-- Do yourself a favor and scan the QR code in this image. You won't be disappointed. -->
    ![QR code]({{site.baseurl}}/images/access-and-authentication/mfa--qr-code.png)

3. Scan the QR code

    Scan the QR code using Google Authenticator, type your verification code, and click **Verify**.

    In future logins, Logz.io will prompt you to enter your Google Authenticator verification code.