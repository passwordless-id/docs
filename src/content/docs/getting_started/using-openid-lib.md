---
title: Using an OpenID/OAuth2 Lib
---

There are plenty of libraries and frameworks offering integrations with OpenID and/or OAuth2.
In order to use these, some configuration is needed, as shown here.

- Discovery URL
- Client ID: `your-domain-name.xyz`
- Client Secret: none
- PKCE: supported & recommended

There is no secret in the configuration. Instead, we have a strong constraint: the `redirect_uri` must belong to the same domain as the provided `client_id`. It is also recommend to enable/use the PKCE protocol. While the PKCE protocol was mainly developed for mobile apps which could not store private secrets, it is perfectly usable for servers too.

Compatible libraries
--------------------

### TS

### JS

### Java

### Python

### C#

### PHP