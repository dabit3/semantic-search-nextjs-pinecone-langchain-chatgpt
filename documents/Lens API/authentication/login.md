---
title: "Login"
slug: "login"
hidden: false
createdAt: "2022-02-18T07:09:55.578Z"
updatedAt: "2023-03-14T10:11:54.195Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/authentication/login.ts>

To login it takes two server actions: the first is to generate a challenge from the server, and the second is to sign that challenge with your Ethereum wallet and send the signature to our server to generate a valid JWT access token, and refresh token. 

## Challenge

To get a JWT token, you must first request a challenge from the server, which will return you some text to sign with the wallet to prove ownership. Please note the challenge will only last 5 minutes before it expires, if it expires you must generate a new challenge. Once you have used the challenge to generate a JWT token it will not work again.  

### API details

```graphql Example operation
query Challenge {
  challenge(request: { address: "0xdfd7D26fd33473F475b57556118F8251464a24eb" }) {
    text
  }
}
```
```javascript Example response
{
  "data": {
    "challenge": {
      "text": "I want to authenticate with lens and generate a JWT token at timestamp - 1645102996447. Auth request id - 6a01ffa229be678f03d705eb9b4c454554e2cef4be2c273fc0c9ed5be8762625"
    }
  }
}
```



## Authenticate

Once you get the challenge text from the server you need to sign the challenge with your ethereum wallet and then pass that signature to the `authentication` endpoint, this will generate you an `accessToken` and a `refreshToken`. 

- `accessToken` - This lasts 30 minutes before needed to be refreshed
- `refreshToken` - This lasts 7 days to allow you to keep them logged in and generate a new `accessToken` when they come back without them having to sign a challenge again. 

### API details

```graphql Example operation
mutation Authenticate {
  authenticate(request: {
    address: "0xdfd7D26fd33473F475b57556118F8251464a24eb",
    signature: "0x8f82e1a2c2cc35a2963c60eeb0a76aecc100686c4ffcb98fd522a90cba2f0b2642067c79cd6d0c9d239ed28a6882818f77bf546e774410236c730988bd14de5d1c"
  }) {
    accessToken
    refreshToken
  }
}
```
```javascript Example response
{
  "data": {
    "authenticate": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
    }
  }
}
```