---
layout: article
title: Single sign-on with Azure Marketplace++
permalink: /user-guide/users/single-sign-on/azure_marketplace_liftr.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
  - azure
contributors:
  - afishler
  - yberlinger
---

Logz.io offers an integration for SSO with Azure Marketplace++. 
This topic provides guidance for admins on how to set up SSO for the Logz.io-Azure AD integration, for users who will access Logz.io resources via the Microsoft Azure Liftr/Marketplace++.

### Benefits
The advantages of providing your users access to the Logz.io Azure resource via SSO: 

+ No need to predefine a unique username and password for each user: Any user who has the SSO link can sign in to the application.
+ Better user control: A user must be defined in the Azure account to be able to use the SSO link.

<!-- info-box-start:info -->
Prepare SSO connectivity before setting up the Azure resource for Logz.io. You'll need the credentials you create in this process to set up the resource. 
{:.info-box.tip}
<!-- info-box-end -->


## Creating SSO connectivity for your Logz.io resource in Azure Active Directory 

You'll create an Azure Active Directory (AD) Enterprise application and enable SSO to connect to Logz.io as a Marketplace/Liftr resource. 

### Prerequisites: 
To get started, you need the following subscriptions: 
* An Azure AD subscription. If you don't have a subscription, you can get a free account.
* Logz.io - Azure AD Integration single sign-on (SSO) enabled subscription.

Each user must be defined in the Azure account to be able to use and access the SSO link which is defined for the resource.

#### Setting up an SSO link for the Logz.io-Azure AD Integration

<div class="tasklist">

##### Add the Logz.io-Azure Active Directory Integration from the gallery

To configure the Logz.io - Azure AD Integration in Azure AD, you need to add the Logz.io - Azure AD Integration from the gallery to your list of managed SaaS apps.

1. Sign in to the Azure portal using a Microsoft account.
2. In the Azure Active Directory Gallery, navigate to the Logz.io - Azure AD Integration template and select it.
2. Rename the integration to with a relevant name and click **Create**.
![Rename the integration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-rename_logzio-ad_integration.png)

##### Copy the Application ID



In **AD app for a logz.io resource | Overview > Properties**, copy the **Application ID** property.
![Copy Application ID](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-copy_application_id2.png)

##### Configure Azure AD SSO

1. In  **AD app for a logz.io resource | Overview > Getting Started**, in **2. Set up single sign on**, click **Get started** to open **Single sign-on**.
![Set up SSO](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-set-up_sso.png)
2. In **AD app for a logz.io resource | Single sign-on**, select the **SAML** method.
![Select SAML SSO method](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-select_saml.png)

##### Basic SAML configuration   

1. In **AD app for a logz.io resource | SAML-based Sign-on**, click **Edit** to open the **Basic SAML Configuration** panel.
![Edit basic SAML](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-edit_basic_saml.png)

2. In the **Identifier (Entity ID)** text box, type a value using the pattern `urn:auth0:logzio:*`: Replace the `*` with the **Application ID** you copied in procedure 2, and click the **Default** option. 

3. In the **Reply URL (Assertion Consumer Service URL)**, text box, type a URL using the pattern `https://logzio.auth0.com/login/callvack?connection=`: Replace `CONNECTION_NAME` with the **Application ID** you copied in procedure 2.

3. Click **Save** at the top of the panel.
![Set SML](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-basic-saml-config.png)

##### Configure the user assignment option    

In **AD app for a logz.io resource|Properties  (Manage > Properties)**, set **User assignment required?** to **No** and click **Save**.  
This step enables users with access to the SSO link to sign in to Logz.io via Microsoft Azure Liftr, without requiring that you predefine each user in Active Directory.
![User assignment not required](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-user-assignment-required-no.png)

</div>

## Enable SSO for your Logz.io resource via Azure Active Directory

When you create a Logz.io account, use the AD app you created for the Logz.io resource to enable single sign-on with Azure Active Directory.  

The Logz.io AAD app resource name is automatically populated as you type.
![Select your Logz AAD app to enable SSO](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-select-logz-aad-app.png)


The SSO link is displayed when you sign into your Logz.io resource. <br>
Click the link to access your account in Logz.io. 

You'll have to configure your logs in Azure to ensure they're sent to Logz.io.
![One click SSO to Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/sso-providers/azure/liftr-logzio-sso-link.png)
