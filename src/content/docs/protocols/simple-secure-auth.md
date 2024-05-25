---
title: Simple Secure Authentication
---

Usage
-----

This custom protocol, abbreviated SSA, is offered as alternative to OpenID and OAuth2.
It's not only much simpler but also more secure, in the sense that you cannot do something wrong.

> If you wonder why OpenID/OAuth2 is so complex and how this protocol can be so simple, I recommend reading this article **TODO!**.
> It dives into the history of the protocols, which explains how the present day situation came to be.

The protocol has three endpoints:

- `{base-url}/sign-in`
- `{base-url}/profile`
- `{base-url}/sign-out`

> On one hand, some endpoints and parameters have been especially chosen to differ from OpenID/OAuth2 to avoid confusion.
> On the other hand, some parameters or responses serving the same purpose are identical. 

---

### For static websites


Just redirect to `{base-url}/sign-in` to let the user sign-in/up.
By default, once authenticated, the user will be redirected back to the `Referer`, the website it comes from.

```mermaid
example.com --redirects to--> /sign-in
/sign-in --User signs in/up--> /sign-in
example.com <--redirects to-- /sign-in

example.com --GET--> /profile
example.com <-- /profile


example.com --redirects to--> /sign-out
/sign-out --User confirms--> /sign-out
example.com <--redirects to-- /sign-out
```

Now, the are a couple of interesting things in this flow.

First, the authentication state is kept by a cookie. In particular a cookie with the flags `HTTP-Only`, `Secure`, `Path=/profile` and `Same-Site=None`.
Each of these flags is important to ensure proper security.

Likewise, the call to `/profile` must send the cookie.

```js
const res = await fetch(`${base_url}/profile`, {credentials: "include"})
```

Note that this requires special [cross-origin request handling](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#requests_with_credentials) server-side in order to set the CORS correctly.

By default, the profile contains only `sub`, the anonymized user ID, `nickname` and `picture` which is an url to the user portrait.

```json
{
    "sub": "an anonymous user id",
    "nickname": "John Doe",
    "picture": "absolute or data url to user portrait"
}
```

However, more information can be requested using a "scope"?

Likewise, you may want the user to a land on a specific page after signing in. To do that, use the `goto` parameter.


---

### For web servers

For this flow, use the `callback` parameter. Once signed in, the `callback` will be invoked to provide a ticket which can be exchanged for a user profile.

    GET /sign-in?scope=avatar+email+phone+address+identity&callback=https...

    POST /callback
    application/x-www-form-urlencoded
    ticket=...

    GET /profile
    Authorization: Bearer [ticket]

    Server possibly redirects back to somewhere else

Note that the `ticket` is consumed upon usage.
You give a `ticket`, you receive the user profile in exchange, that's it.
The ticket cannot be used anymore afterwards.

*For security reasons, the `callback` URL must belong to the same domain as the `Referer`.*


> Note that unlike OpenID / OAuth2, you do not to first exchange the "code" for a "token", before accessing the "userinfo" using the "token". Instead, you fetch the "profile" directly using the "ticket".
>
> Also, the callback itself is a POST and not a GET.
> This improves security by avoiding having the ticket being exposed in the URL,
> since URLs tend to easely eavesdropped and manipulated.


---

### For terminals / native clients


Native apps, "smart devices" and terminals/shells might not be able to receive incoming requests like a server does, and therefore cannot use the back-end flow.
Sometimes, it might not even be possible to show a browser, yet authentication is possible with this flow.

- GET /ticket
       `{"name":"something-without-a-dot", "scope":"..."}`
       => `{"code": ..., "ticket": ..., "valid_until": ...}`
- Device/user opens browser at /sign-in?code=...
    - If `code` is empty, the user will have to enter the code in an input field first
    - Otherwise, the user will be prompted to authorize the client to access your profile
    - Note that permissions will be asked each time since is no means to proove the client's authenticity
- GET /profile
  Authorization: Bearer [ticket]

---

### Differences to OpenID


Unlike OpenID allowing global user IDs (the `sub`), the SSA protocol imposes the user ID to be "pseudonymous pairwise identifiers".
In other words, they must differ for each website/client requesting the profile. This is to ensure privacy and it also improves security.

Also, you cannot request a different scope with the avatar. It's meant to be what is used by default in frontends.

> Basically, front-ends are more vulnerable to code injection attacks and client malware.
> If you want more user information, it should be obtained from the back-end. 

---

Reference
---------


    GET /sign-in

    scope=...
    goto=...
    callback=...
    code=...
    max_age=...
    state=...


    GET /profile
    Authorization: Bearer [ticket]
    
    GET /sign-out

    goto=...
    callback=...

Additional scopes:

    `avatar`: the default scope, containing the claims `sub`, `nickname` and `picture`