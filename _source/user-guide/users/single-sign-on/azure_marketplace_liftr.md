---
layout: article
title: Single sign-on with Azure Marketplace++
permalink: /user-guide/users/single-sign-on/azure-marketplace_liftr.html
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
This topic provides guidance for admins on how to set up SSO for users who will access Logz.io resources via the Microsoft Azure/Liftr Marketplace++.

# -- _< notes CAPTCHA_

<!-- info-box-start:info -->
Prepare SSO before setting up the Azure resource for Logz.io. You'll need the SSO to create the resource. 
{:.info-box.tip}
<!-- info-box-end -->

## Prerequisite: 
User must be defined in the Azure account to be able to use and have access to the resource SSO link which is defined in the resource.

### _notes_

 + Admin user creates a Logz.io resource account (this process happens on the MS Azure side: The Logz.io resource name is automatically populated as you type)
 + Seamless access from portal to Azure account.
 + Logz.io Azure resource =Logz.io account.
 + The Logz.io SSO link opens Logz.io

## Benefits
The advantages of providing your users access to the Logz.io Azure resource via SSO: 

+ No need to create a unique username and password for each user
+ Better user control: A user must be defined in the Azure account to be able to use and have access to the resource SSO link which is defined in the resource.

## Procedure overview: _notes_
1. Choose an infrastructure template to create a new application, give the new object a meaningful name, and click **Create**.
2. Copy the Application ID.
3. Set up SSO for the application: 2nd card.
4. Choose SAML option and edit the BASIC SAML configuration: 
   a. Identifier - Modiffy urn:auth0logz.io[copied appID]
   b. url = paste tje appID
      connection-Name ==> ==> [AppID]
   c. SAVE and close the window
5. Go to Properties: 
   - User assignment required: No  
      There is no need to predefine users: Any user with access to the SSO link can sign in to the application.    



_end notes_ -->

### Creating SSO connectivity for your Logz.io account/resource on Marketplace++  

You'll create an Azure Active Directory (AD) Enterprise application and enabble SSO to connect Logz.io as a resource. 

How to set up SSO

1. In the Azure AD Gallery, browse to the Logz.io - Azure AD Integration  infrastructure template and select it.
2. Rename the integration to something relevant and click **Create**.
   ![Rename the integration]()
3. In **AD app for a logz.io resource | Overview > Properties**, copy the **Application ID** property
   ![Copy Application ID]()
4. In  **AD app for a logz.io resource | Overview > Getting Started**, in **2. Set up single sign on**, click **Get started** to open **Single sign-on**
   xx opens
   ![Set up SSP]()
5. In **AD app for a logz.io resource | Single sign-on**, select the **SAML** method.
   ![Select SAML SSO method]()
6. In **AD app for a logz.io resource | SAML-based Sign-on**, edit the basic SAML configuration: 
   ![Edit basic SAML]()
  a. **Identifier (Entity ID)**: After the field prefix `urn:auth0:logzio:*`, replace the `*` with the **Application ID** you copied in step 3. 

  b. **Reply URL (Assertion Consumer Service URL)**: Update the field to `https://logzio.auth0
7.    

