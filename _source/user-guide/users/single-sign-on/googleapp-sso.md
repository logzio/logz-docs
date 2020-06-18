---
layout: article
title: Single sign-on with Google Apps
permalink: /user-guide/users/single-sign-on/googleapp-sso.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
  - google
contributors:
  - shalper
  - schwin007
  - moshekruger
---

Logz.io offers a quick integration for SSO with Google Apps.

#### To set up single sign-on for Google Apps

<div class="tasklist">

##### Request SSO access from Logz.io

Only account admins can request single sign-on access for their accounts.
{:.info-box.note}

To kick off this process, send an email to [help@logz.io](mailto:help@logz.io).
Write that you want to set up Google Apps SSO for Logz.io.
Include these items in the message:

* Your Logz.io [account ID]({{site.baseurl}}/user-guide/accounts/finding-your-account-id.html)
* Your [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

The Support team will respond with the connection information you'll need to give in Google.

##### Create a Google Apps connection in Auth0

Log into Autho0.

Click **Connections**.

Click **Enterprise**.

Create a new Google App.

##### Fill out the following details provided by the customer (under **Settings**)

* Google Apps Domain

* Domain Aliases (optional). Aliases must be divided by commas.

##### The customer creates an app in Google API Manager

(These steps are completed by the customer, or Google administrator.)

Navigate to: https://auth0.com/docs/connections/enterprise/google-apps#generate-the-google-client-id-and-client-secret

* For **Authorized JavaScript origins**, enter  https://logzio.auth0.com.

* For **Authorized redirect URIs**, enter  https://logzio.auth0.com/login/callback.

##### Fill out the remaining details provided by the customer

* Client ID

* Client secret

##### Save the connection

Go back into *Connections* by clicking **Manage**.

Find the new connection and click **Settings**.

Go to **Clients** and enable **Default App**.

Save the changes again.

##### Associate the connection for the account in the Logz.io admin console

The connection name will be "domain-com/co/io/net/org".
{:.info-box.note}

</div>

## Groups functionality with Google SSO

If the customer wants to limit access to specific Google groups that are configured through their directory, they need to have the SSO connection turned on for the account first.

Then they have the ability to add their Google Groups under the **Manage Users** tab in **Settings**.

Group names are space sensitive and case sensitive. Each sub-account can have multiple groups assigned for managing access.
{:.info-box.note}