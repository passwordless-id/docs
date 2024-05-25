---
title: Data stores
---

Basics
------

Passwordless.ID uses many distinct key-value "collections" to store its data.
However, neither the keys nor the values are stored directly.

- all keys are hashed (with a private salt)
- all value are encrypted (with a private key)

The reason for that is paranoid security.
That way, even if the data stores are somehow malicioulsy accessed, only giberish can be read.

Following collections are used:

- challenges: short-lived nonces used by the WebAuthn protocol during registration/authentication
- codes: short-lived nonces used by the OAuth2 protocol to exchange for tokens    
- emails:  verified email -> user id mapping
- otps: medium-lived One-Time-Passwords to authenticate for adding device or account recovery
- phones: verified phone -> user id mapping
- sessions: stores temporary stuff like callback URLs
- tokens: long-lived, to access OAuth2/OpenID endpoints