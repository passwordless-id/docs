---
title: OpenID / OAuth2
---

<style>
      .props strong {
            color: var(--pid-color-primary);
      }
      .props em {
            color: var(--pid-color-secondary);
      }
      .props blockquote {
            color: gray;
            font-size: 0.8rem;
      }
</style>

OpenId Configuration
--------------------

A discovery document describing the endpoints and cpabilities of the provider should be available at `https://{issuer}/.well-known/openid-configuration`

In the case of Passwordless.ID: [https://api.passwordless.id/.well-known/openid-configuration](https://api.passwordless.id/.well-known/openid-configuration)

The content is a JSON payload with following properties.

<div class="props">

**issuer** *REQUIRED*

> URL using the https scheme with no query or fragment components that the OP asserts as its Issuer Identifier. If Issuer discovery is supported (see Section 2), this value MUST be identical to the issuer value returned by WebFinger. This also MUST be identical to the iss Claim value in ID Tokens issued from this Issuer.

**authorization_endpoint** *REQUIRED* 

> URL of the OP's OAuth 2.0 Authorization Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.

**token_endpoint** *REQUIRED*

> URL of the OP's OAuth 2.0 Token Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.

**jwks_uri** *REQUIRED*

> URL of the OP's JWK Set [JWK] document, which MUST use the https scheme. This contains the signing key(s) the RP uses to validate signatures from the OP. The JWK Set MAY also contain the Server's encryption key(s), which are used by RPs to encrypt requests to the Server. When both signing and encryption keys are made available, a use (public key use) parameter value is *REQUIRED* for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT *RECOMMENDED*, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate. The JWK Set MUST NOT contain private or symmetric key values.

**response_types_supported** *REQUIRED* 

> JSON array containing a list of the OAuth 2.0 response_type values that this OP supports. Dynamic OpenID Providers MUST support the code, id_token, and the id_token token Response Type values.

**subject_types_supported** *REQUIRED* 

> JSON array containing a list of the Subject Identifier types that this OP supports. Valid types include pairwise and public.

**id_token_signing_alg_values_supported** *REQUIRED* 

> JSON array containing a list of the JWS signing algorithms (alg values) supported by the OP for the ID Token to encode the Claims in a JWT. The algorithm RS256 MUST be included. The value none MAY be supported but MUST NOT be used unless the Response Type used returns no ID Token from the Authorization Endpoint (such as when using the Authorization Code Flow).

**userinfo_endpoint** *RECOMMENDED* 

> URL of the OP's UserInfo Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.

**registration_endpoint** *RECOMMENDED* 

> URL of the OP's Dynamic Client Registration Endpoint [OpenID.Registration], which MUST use the https scheme.

**scopes_supported** *RECOMMENDED* 

> JSON array containing a list of the OAuth 2.0 [RFC6749] scope values that this server supports. The server MUST support the openid scope value. Servers MAY choose not to advertise some supported scope values even when this parameter is used, although those defined in [OpenID.Core] SHOULD be listed, if supported.

**claims_supported** *RECOMMENDED* 

> JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list.

**response_modes_supported** *OPTIONAL* 

> JSON array containing a list of the OAuth 2.0 response_mode values that this OP supports, as specified in OAuth 2.0 Multiple Response Type Encoding Practices [OAuth.Responses]. If omitted, the default for Dynamic OpenID Providers is ["query", "fragment"].

**grant_types_supported** *OPTIONAL* 

> JSON array containing a list of the OAuth 2.0 Grant Type values that this OP supports. Dynamic OpenID Providers MUST support the authorization_code and implicit Grant Type values and MAY support other Grant Types. If omitted, the default value is ["authorization_code", "implicit"].

**acr_values_supported** *OPTIONAL* 

> JSON array containing a list of the Authentication Context Class References that this OP supports.

**id_token_encryption_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (alg values) supported by the OP for the ID Token to encode the Claims in a JWT.

**id_token_encryption_enc_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT.

**userinfo_signing_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWS signing algorithms (alg values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT. The value none MAY be included.

**userinfo_encryption_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (alg values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT.

**userinfo_encryption_enc_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT.

**request_object_signing_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWS signing algorithms (alg values) supported by the OP for Request Objects, which are described in Section 6.1 of OpenID Connect Core 1.0 [OpenID.Core]. These algorithms are used both when the Request Object is passed by value (using the request parameter) and when it is passed by reference (using the request_uri parameter). Servers SHOULD support none and RS256.

**request_object_encryption_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (alg values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.

**request_object_encryption_enc_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.

**token_endpoint_auth_methods_supported** *OPTIONAL* 

> JSON array containing a list of Client Authentication methods supported by this Token Endpoint. The options are client_secret_post, client_secret_basic, client_secret_jwt, and private_key_jwt, as described in Section 9 of OpenID Connect Core 1.0 [OpenID.Core]. Other authentication methods MAY be defined by extensions. If omitted, the default is client_secret_basic -- the HTTP Basic Authentication Scheme specified in Section 2.3.1 of OAuth 2.0 [RFC6749].

**token_endpoint_auth_signing_alg_values_supported** *OPTIONAL* 

> JSON array containing a list of the JWS signing algorithms (alg values) supported by the Token Endpoint for the signature on the JWT [JWT] used to authenticate the Client at the Token Endpoint for the private_key_jwt and client_secret_jwt authentication methods. Servers SHOULD support RS256. The value none MUST NOT be used.

**display_values_supported** *OPTIONAL* 

> JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core].

**claim_types_supported** *OPTIONAL* 

> JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims.

**service_documentation** *OPTIONAL* 

> URL of a page containing human-readable information that developers might want or need to know when using the OpenID Provider. In particular, if the OpenID Provider does not support Dynamic Client Registration, then information on how to register Clients needs to be provided in this documentation.

**claims_locales_supported** *OPTIONAL* 

> Languages and scripts supported for values in Claims being returned, represented as a JSON array of BCP47 [RFC5646] language tag values. Not all languages and scripts are necessarily supported for all Claim values.

**ui_locales_supported** *OPTIONAL* 

> Languages and scripts supported for the user interface, represented as a JSON array of BCP47 [RFC5646] language tag values.

**claims_parameter_supported** *OPTIONAL* 

> Boolean value specifying whether the OP supports use of the claims parameter, with true indicating support. If omitted, the default value is false.

**request_parameter_supported** *OPTIONAL* 

> Boolean value specifying whether the OP supports use of the request parameter, with true indicating support. If omitted, the default value is false.

**request_uri_parameter_supported** *OPTIONAL* 

> Boolean value specifying whether the OP supports use of the request_uri parameter, with true indicating support. If omitted, the default value is true.

**require_request_uri_registration** *OPTIONAL* 

> Boolean value specifying whether the OP requires any request_uri values used to be pre-registered using the request_uris registration parameter. Pre-registration is *REQUIRED* when the value is true. If omitted, the default value is false.

**op_policy_uri** *OPTIONAL* 

> URL that the OpenID Provider provides to the person registering the Client to read about the OP's requirements on how the Relying Party can use the data provided by the OP. The registration process SHOULD display this URL to the person registering the Client if it is given.

**op_tos_uri** *OPTIONAL* 

> URL that the OpenID Provider provides to the person registering the Client to read about the OpenID Provider's terms of service. The registration process SHOULD display this URL to the person registering the Client if it is given.

</div>

See [specifications](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata) for further details. 

---

WTF
---

OpenId Configuration
====================

A discovery document describing the endpoints and cpabilities of the provider should be available at https://{issuer}/.well-known/openid-configuration

In the case of Passwordless.ID: [https://api.passwordless.id/.well-known/openid-configuration](https://api.passwordless.id/.well-known/openid-configuration)

Here are the parameters it can contain.

<style>
      .props-table td:nth-child(2),
      .props-table td:nth-child(3) {
            font-size: 0.8rem;
      }
</style>

<div class="props-table">

### Required properties

Parameter | Description
----------|------------
`issuer`  | URL using the https scheme with no query or fragment components that the OP asserts as its Issuer Identifier. If Issuer discovery is supported (see Section 2), this value MUST be identical to the issuer value returned by WebFinger. This also MUST be identical to the iss Claim value in ID Tokens issued from this Issuer.
`authorization_endpoint` | URL of the OP's OAuth 2.0 Authorization Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.
`token_endpoint` | URL of the OP's OAuth 2.0 Token Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.
`jwks_uri` | URL of the OP's JWK Set [JWK] document, which MUST use the https scheme. This contains the signing key(s) the RP uses to validate signatures from the OP. The JWK Set MAY also contain the Server's encryption key(s), which are used by RPs to encrypt requests to the Server. When both signing and encryption keys are made available, a use (public key use) parameter value is **REQUIRED** for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT *RECOMMENDED*, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate. The JWK Set MUST NOT contain private or symmetric key values.
`response_types_supported` | JSON array containing a list of the OAuth 2.0 response_type values that this OP supports. Dynamic OpenID Providers MUST support the code, id_token, and the id_token token Response Type values.
`subject_types_supported` | JSON array containing a list of the Subject Identifier types that this OP supports. Valid types include pairwise and public.
`id_token_signing_alg_values_supported` | JSON array containing a list of the JWS signing algorithms (alg values) supported by the OP for the ID Token to encode the Claims in a JWT. The algorithm RS256 MUST be included. The value none MAY be supported but MUST NOT be used unless the Response Type used returns no ID Token from the Authorization Endpoint (such as when using the Authorization Code Flow).

### Recommended properties

Parameter | Description
----------|------------
`userinfo_endpoint` | URL of the OP's UserInfo Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.
`registration_endpoint` | URL of the OP's Dynamic Client Registration Endpoint [OpenID.Registration], which MUST use the https scheme.
`scopes_supported` | JSON array containing a list of the OAuth 2.0 [RFC6749] scope values that this server supports. The server MUST support the openid scope value. Servers MAY choose not to advertise some supported scope values even when this parameter is used, although those defined in [OpenID.Core] SHOULD be listed, if supported.
`claims_supported` | JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list.

### Optional properties

Parameter | Description
----------|------------
`response_modes_supported` | JSON array containing a list of the OAuth 2.0 response_mode values that this OP supports, as specified in OAuth 2.0 Multiple Response Type Encoding Practices [OAuth.Responses]. If omitted, the default for Dynamic OpenID Providers is ["query", "fragment"].
`grant_types_supported` | JSON array containing a list of the OAuth 2.0 Grant Type values that this OP supports. Dynamic OpenID Providers MUST support the authorization_code and implicit Grant Type values and MAY support other Grant Types. If omitted, the default value is ["authorization_code", "implicit"].
`acr_values_supported` | JSON array containing a list of the Authentication Context Class References that this OP supports.
`id_token_encryption_alg_values_supported` | JSON array containing a list of the JWE encryption algorithms (alg values) supported by the OP for the ID Token to encode the Claims in a JWT.
`id_token_encryption_enc_values_supported` | JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT.
`userinfo_signing_alg_values_supported` | JSON array containing a list of the JWS signing algorithms (alg values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT. The value none MAY be included.
`userinfo_encryption_alg_values_supported` | JSON array containing a list of the JWE encryption algorithms (alg values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT.
`userinfo_encryption_enc_values_supported` | JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT.
`request_object_signing_alg_values_supported` | JSON array containing a list of the JWS signing algorithms (alg values) supported by the OP for Request Objects, which are described in Section 6.1 of OpenID Connect Core 1.0 [OpenID.Core]. These algorithms are used both when the Request Object is passed by value (using the request parameter) and when it is passed by reference (using the request_uri parameter). Servers SHOULD support none and RS256.
`request_object_encryption_alg_values_supported` | JSON array containing a list of the JWE encryption algorithms (alg values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.
`request_object_encryption_enc_values_supported` | JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.
`token_endpoint_auth_methods_supported` | JSON array containing a list of Client Authentication methods supported by this Token Endpoint. The options are client_secret_post, client_secret_basic, client_secret_jwt, and private_key_jwt, as described in Section 9 of OpenID Connect Core 1.0 [OpenID.Core]. Other authentication methods MAY be defined by extensions. If omitted, the default is client_secret_basic -- the HTTP Basic Authentication Scheme specified in Section 2.3.1 of OAuth 2.0 [RFC6749].
`token_endpoint_auth_signing_alg_values_supported` | JSON array containing a list of the JWS signing algorithms (`alg` values) supported by the Token Endpoint for the signature on the JWT [JWT] used to authenticate the Client at the Token Endpoint for the `private_key_jwt` and `client_secret_jwt` authentication methods. Servers SHOULD support RS256. The value none MUST NOT be used.
`display_values_supported` | JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core].
`claim_types_supported` | JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims.
`service_documentation` | URL of a page containing human-readable information that developers might want or need to know when using the OpenID Provider. In particular, if the OpenID Provider does not support Dynamic Client Registration, then information on how to register Clients needs to be provided in this documentation.
`claims_locales_supported` | Languages and scripts supported for values in Claims being returned, represented as a JSON array of BCP47 [RFC5646] language tag values. Not all languages and scripts are necessarily supported for all Claim values.
`ui_locales_supported` | Languages and scripts supported for the user interface, represented as a JSON array of BCP47 [RFC5646] language tag values.
`claims_parameter_supported` | Boolean value specifying whether the OP supports use of the claims parameter, with true indicating support. If omitted, the default value is false.
`request_parameter_supported` | Boolean value specifying whether the OP supports use of the request parameter, with true indicating support. If omitted, the default value is false.
`request_uri_parameter_supported` | Boolean value specifying whether the OP supports use of the request_uri parameter, with true indicating support. If omitted, the default value is true.
`require_request_uri_registration` | Boolean value specifying whether the OP requires any request_uri values used to be pre-registered using the request_uris registration parameter. Pre-registration is **REQUIRED** when the value is true. If omitted, the default value is false.
`op_policy_uri` | URL that the OpenID Provider provides to the person registering the Client to read about the OP's requirements on how the Relying Party can use the data provided by the OP. The registration process SHOULD display this URL to the person registering the Client if it is given.
`op_tos_uri` | URL that the OpenID Provider provides to the person registering the Client to read about the OpenID Provider's terms of service. The registration process SHOULD display this URL to the person registering the Client if it is given.

<div>


See [specifications](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata) for further details. 

---

`/authorize` enpoint
--------------------

The authorization endpoint triggers the authentication and authentication on provider side. Once the user is authenticated and has authorized access to the resources, it will be redirected back to the client "callback" URL.

If the user is already authenticated and has already granted permissions, the callback might be instantly called, resulting in SSO without user interaction.

### Mandatory Parameters

| Parameter      | Description                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| `client_id`    | The unique identifier assigned to the client application by the authorization server.        |
| `redirect_uri` | The URI to which the authorization server will redirect the user after successful authentication and authorization. |
| `response_type` | Specifies the type of response the application expects. For the Authorization Code Flow, this should be set to "code" to indicate that the application is requesting an authorization code. |

### *OPTIONAL* Parameters

| Parameter      | Description                                                                                               |
|----------------|-----------------------------------------------------------------------------------------------------------|
| `state`        | *Recommended*. An opaque value used by the client to maintain state between the request and callback. This value is included when redirecting the user-agent back to the client. It also helps to prevent cross-site-request-forgery, where an attacker sends its own authorization code to induce the user in manipulating the wrong resource. [More information here](https://datatracker.ietf.org/doc/html/rfc6749#section-10.12) |
| `acr_values`   | Specifies the level of authentication and attribute requirements. Largely unused/unsupported in practice. | 
| `claims`       | Requests specific user claims to be included in the ID Token or UserInfo response.                        |
| `code_challenge` | Used when implementing PKCE (Proof Key for Code Exchange) for added security.                           |
| `code_challenge_method` | The method used to transform the "code verifier" when implementing PKCE.                         |
| `display`      | Indicates how the authorization server displays the authentication and consent page to the user.          |
| `id_token_hint` | Provides the ID Token previously issued for the user.                                                    |
| `login_hint`   | Suggests a preferred user account to log in.                                                              |
| `max_age`      | Sets the maximum allowable age of authentication for the user.                                            |
| `nonce`        | Used to mitigate replay attacks on the ID Token.                                                          |
| `prompt`       | Used to customize the user authentication and consent experience.                                         |
| `response_mode` | Specifies how the authorization server returns the authorization response.                               |
| `scope`        | Defines the scope of access requested by the client application.                                          |
| `ui_locales`   | Specifies the preferred language and locale for the authorization server's UI.                            |

> Please note that while the mandatory parameters must be included for a successful authorization process, 
> the *OPTIONAL* parameters can be included based on the application's specific requirements *and the authorization server's capabilities*.


### Sample request

    GET /authorize
          ?response_type=code
          &client_id=YOUR_CLIENT_ID
          &redirect_uri=https://yourapp.com/callback
          &scope=openid email
          &state=UNIQUE_STATE_VALUE
          &code_challenge=YOUR_CODE_CHALLENGE
          &code_challenge_method=S256


    ...user signs in...
    ...user grants `YOUR_CLIENT_ID` permission to access `openid email`...

    HTTP 302 - https://yourapp.com/callback
                  ?code=...
                  &state=...

---

`/token` endpoint
-----------------

RFC: https://datatracker.ietf.org/doc/html/rfc6749

**Authorization code**

| Parameter     | Description                                          |
| ------------- | ---------------------------------------------------- |
| `grant_type`  | The type of grant requested (e.g., "authorization_code", "password", "client_credentials"). |
| `redirect_uri` | The redirection URI to which the authorization server will send the user-agent after the user grants/denies consent. |
| `code`        | The authorization code received from the authorization server (for the "authorization_code" grant type). |

**Refresh token**

| Parameter     | Description                                          |
| ------------- | ---------------------------------------------------- |
| `grant_type`  | `refresh_token`  |
| `client_id`   | The unique identifier of the client making the request. |
| `client_secret` | The secret key or password associated with the client, used for client authentication. |
| `scope`       | The scope of access requested by the client. Specifies what resources the client intends to access. |
| `refresh_token` | A refresh token used to obtain a new access token when the original access token expires (for grant types that support refresh tokens). |

**Other grants**

| Parameter     | Description                                          |
| ------------- | ---------------------------------------------------- |
| `grant_type`  | `password`  |
| `username`    | The resource owner's username. |
| `password`    | The resource owner's password. |

`/userinfo` endpoint
--------------------

Scopes & claims
---------------


`/revoke` endpoint
------------------