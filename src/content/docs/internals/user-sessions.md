There are two kind of sessions:

- the internal ones, for passwordless.id
- the external ones, holding ongoing sessions of "client websites"

This distinction is very important to understand.
You can for example be signed-in with a website *foo.org* using passwordless.id,
while at the same time be signed out from *bar.com* also using passwordless.id.

Since users have distinct IDs for each website (the `sub` in OpenID), it is straightforward to keep their session information apart.
In particular, this is done using cookies.

A cookie named `s-sha256(domain)` wil be set, containing a session id, which in turns goes to a session object containing username and more.
