# Passwordless.ID Documentation

> Passwordless.ID is a "public" authentication service. It enables your users to register with a local account using Passkeys or delegate the sign-in to Microsoft, Google or Apple. It's free, without limits and simple to use.

Usage
-----

The service offers two client side protocols:

- OpenId: the widespread OAuth2 based protocol to identify users
- SimpleId: a simpler version of this protocol

### SimpleID

Redirecting to https://.../api/simpleid/auth

=> Will authenticate the user and return back the user to where it was

https://.../api/simpleid/id

{
  "id": "abc123...",
  "token": "...",
  "profile": {
    "nickname": "Johny Doe",
    "email": "john@example.com",
    "portrait": "https://..."
  }
}
    
