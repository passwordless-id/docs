---
title: Static website
---

> In this tutorial, we will create a simple page with a "Sign in" button.
> Once clicked, the user will be redirected to passwordless.ID to authenticate and return back to this page and show the user profile.

Steps:

- redirect to the Passwordless.ID authorization endpoint
- the user signs in/up
- the user gives your domain permission to access its profile
- Passwordless.ID redirects back to your website with an `id_token`
- this `id_token` is a signed Json Web Token containing the profile
- parse and verify the `id_token` to show the user profile

The authorization step
----------------------

Invoke https://passwordless.id/api/openid/authorize?client_id=<your-domain>&response_type=id_token&redirect_uri=...

The `redirect_uri` is the URL the user gets redirected to once authenticated.
For security reasons, it must belong to the same domain as your `client_id`.

A simple way to generate such a link is as follows:

```js
const client_id = encodeURIComponent(window.location.hostname)
const redirect_uri = encodeURIComponent(window.location.href)
const authUrl = `https://passwordless.id/api/openid/authorize?client_id=${client_id}&response_type=id_token&redirect_uri=${redirect_uri}`
```

Of course, `redirect_uri` can also be a fixed URL, like a welcome page or a dashboard.



Back to the page
----------------

Once the user is authenticated and returned to the provided `redirect_uri`, an `id_token` parameter will be added to the hash.

It looks like:

    https://example.org/mypage?foo=bar#id_token=...

This `id_token`

Create an HTML page
-------------------

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign in with Passwordless.ID demo</title>
    <script type="module" src="sign-in-with.js" defer></script>
</head>
<body>
    
    <button id="sign-in" class="btn btn-light" onclick="app.signIn()">Sign In</button>

    <section id="profile" class="card shadow" hidden>
        <div class="card-body">
            <img id="picture" style="height:100px" />
            <h3 id="nickname">Nickname</h3>
        </div>
    </section>

    <button id="sign-out" class="btn btn-light" onclick="app.signOut()" hidden>Sign Out</button>

    <footer>
        <a href="https://github.com/passwordless-id/demo">See the code on GitHub</a>
    </footer>
</body>
</html>
```


Trigger the sign-in
--------------------

It uses the OAuth2 / OpenID flow using the [@passwordless-id/connect](https://github.com/passwordless-id/connect) library.


The code for that looks as follows.

```js
import passwordless from 'https://unpkg.com/@passwordless-id/connect@1.2.0/dist/connect.min.js'

// the information requested from the profile
const scope = 'openid avatar email'

function onClickSignIn() => {
  // performs a redirect to let the user authenticate and/or authorize this app
  passwordless.auth({ scope })
}

function onClickSignOut = async () => {
  // performs a redirect to let the user sign out
  passwordless.logout()
}

async function init() {
  // retrieves the user profile and `id_token` if available
  const user = await passwordless.id({ scope })
  if (user.signedIn && user.scopeGranted)
    showUser(user)
  else
    showSignIn()
}
init()
```

Show the profile
----------------

The retrieved `user` has the following structure.

```json
{
 "signedIn": true,
 "scopeGranted": true,
 "id_token": "eyJ0eXAiOiJK...",
 "profile": {
  "nickname": "Johny",
  "picture": "https://ui.passwordless.id/avatars/sam.svg",
  "preferred_username": "johndoe",
  "...": "...more attributes depending on requested scope"
 }
}
```

Trigger the sign-out
--------------------

Using the token for API calls
-----------------------------

Once you obtain the user, you can also send the `token_id` to your server API as proof of the user's authenticity. This is a Json Web Token containing a signature that can be verified by common libraries.