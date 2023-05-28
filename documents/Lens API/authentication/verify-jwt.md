---
title: "Verify JWT"
slug: "verify-jwt"
hidden: false
createdAt: "2022-02-18T07:17:17.149Z"
updatedAt: "2023-01-18T11:26:19.444Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/authentication/verify.ts>

You may wish to use the same authentication on your server-side to save you having to do authentication yourself as the claims hold the Ethereum address in it; the issue you would face is verifying that token is actually signed by the server and the user or if it has just been generated and is not secure. This endpoint solves this for you.

### API details

```graphql Example operation
query Query {
  verify(request: {
    accessToken: "eyJhbGmiOiJIUzI1NiIsInR5cCI2IkpXVCJ9.eyJpZCI6IjB4RUVBMEMxZjVhYjAxNTlkYmE3NDlEYzBCQWVlNDYyRTVlMjkzZGFhRiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxODg5OTQsImV4cCI6MTY2MzE4ODk5NH0.dgO9L5NxlVG_8Mc7H-1VFTIYQDRm_I-KCe2nvkLpx5o"
  })
}
```
```javascript Example response
{
  "data": {
    "verify": false
  }
}
```