---
layout: article
title: Single sign-on with G Suite
permalink: /user-guide/users/single-sign-on/g-suite-sso/
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
  - g-suite
contributors:
  - boofinka
  - imnotashrimp
  - schwin007
---

Single sign-on is available for Pro plans.
To discuss switching to a Pro plan, please contact your account manager.

###### To set up single sign-on for G Suite

1.  Request SSO access from Logz.io

    Only account admins can request single sign-on access for their accounts.
    {:.info-box.note}

    To kick off this process, send an email to [help@logz.io](mailto:help@logz.io).
    Write that you want to set up G Suite SAML SSO for Logz.io.
    Include these items in the message:

    * Your Logz.io account ID
    * Your [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

    The Support team will respond with the connection information you'll need to give in G Suite.

2.  Add Logz.io to G Suite

    In the G Suite admin panel, go to [**Apps > SAML Apps**](https://admin.google.com/AdminHome#AppsList:serviceType=SAML_APPS).

    Click **+** in the bottom right corner, and then click **Setup my own custom app**.

3.  Get your endpoint information

    Copy the **Entity ID** to your text editor.
    Download the **Certificate** and zip it.
    You'll paste the Entity ID and attach this zip file to your next email to the Support team.

    Click **Next** to continue to the _Basic information_ panel.

4.  Name your app and paste the SAML information from Support

    Give your **Application Name** "Logz.io". Click **Next** to continue to _Service Provider Details_.

    ![Service Provider Details]({{site.baseurl}}/images/sso-providers/g-suite/service-provider-details.png)

    Paste the **ACS URL** and **Entity ID** from the Logz.io Support email message.

    In **Name ID**, select "Basic Information" and "Primary Email" from the left and right lists, respectively.

    Select "EMAIL" from the **Name ID Format** list.

    Click **Next** to continue to the _Attribute Mapping_ panel.

    ![Attribute Mapping]({{site.baseurl}}/images/sso-providers/g-suite/attribute-mapping.png)

    Type "email" in the text box on the left (this is the field you're mapping from).
    Select "Basic Information" and "Primary Email" from the left and right lists, respectively.

    Click **Finish** to save your app.

5.  TODO Configure G Suite to send user groups

    <!-- ![Group Attribute Statements]({{site.baseurl}}/images/sso-providers/okta/group-attribute-statements.png)

    In the Group Attribute Statements section:

    * Set **Name** to "groups"
    * Select "Unspecified" from **Name format**
    * Type an expression for the groups that you want to have access to Logz.io in **Filter value**.
      This field can't be blank. -->

6.  Send your SAML details to Logz.io

    Draft a new [email to Support](mailto:help@logz.io), and include these items from step 3:

    * Your Entity ID
    * Your zipped certificate

7.  _(Optional)_ Restrict Logz.io access to specific user groups

    ![Add group]({{site.baseurl}}/images/access-and-authentication/sso--manage-groups.png)

    By default, all G Suite users with Logz.io access can sign in to your Logz.io accounts.

    You can restrict this access from the [Manage users page](https://app.logz.io/#/dashboard/settings/manage-users) for each of your accounts.
    To do this, click **Add group**, and then paste your group's name from G Suite.
    Do this for each group that should have access to this account.

8.  Receive confirmation from Support

    When Support has created your G Suite + Logz.io connection, you're done!
    You can start logging in to Logz.io through your Apps portal.
{:.tasklist.firstline-headline}
