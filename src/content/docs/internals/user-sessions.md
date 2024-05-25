---
title: User sessions
---

When talking about user sessions for "clients" (the various websites using Passwordless.ID), there are two relevant questions:

- Is the user considered online or offline for all clients? Or can each user sign in and out from clients independently?
- If the latter is the case, can a person also sign-in using different accounts per client? 

This is more of a design choice. Of course it has deep implications, from technical, to security and UX, but it fundamentally a design choice.

Passwordless.ID opted for the following:

- Only one account can be active at a time. You cannot be signed in with two different accounts (in the same browser).
- Each client can sign in and out independently, resulting in a separate "session" per client.
- Changing the user account results in all remaining client sessions being signed out.

Sessions
--------

There are two kind of sessions:

- the internal ones, for passwordless.id
- the external ones, holding ongoing sessions of "client websites"
- the client's session itself, with its own lifecycle

This distinction is very important to understand.
You can for example be signed-in with a website *foo.org* using passwordless.id,
while at the same time be signed out from *bar.com* also using passwordless.id.
Meanwhile *foobar.xyz* might choose to keep the session alive indefinitely using its own cookies and storage.

Since users have distinct IDs for each website (the `sub` in OpenID), it is straightforward to keep their session information apart.
In particular, this is done using cookies.

The session cookie, named `session-id` contains a random UUID. This UUID, hashed, leads to the session information looking as follows:

```ts
type OpenIdFlow = {
    scope :string
    state ?:string
    nonce ?:string
    redirect_uri :string
}

type ClientId = string

type ClientSession = {
    access_token: string, 
    started_at ?:number      // when the user signed in
    openid_flow ?:OpenIdFlow // session in the process of being initialized
}

export type Session = {
    username :string,
    started_at :number,
    client_sessions ?:Record<ClientId, ClientSession>
}
```