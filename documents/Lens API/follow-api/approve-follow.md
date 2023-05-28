---
title: "Approve follow"
slug: "approve-follow"
hidden: true
createdAt: "2022-02-18T11:28:21.409Z"
updatedAt: "2022-08-16T19:56:54.953Z"
---
> 📘 full code repo <https://github.com/lens-protocol/lens-api-examples>

> ❗️ open PR
> 
> We have a PR to fix this contract side with events once that comes this will be swapped out for the contract change which will be supported in the API as well.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

To get around the issues with people being able to spam other people with a follower NFT we have brought in approval follows server-side logic. 

Look at this situation:

- @josh follows @dodgy.profile
- @josh gets a follower NFT for @dodgy.profile
- @josh sends the follower NFT to @coolshoes wallet owner
- @coolshoes wallet owner now looks like they follow @dodgy.profile

You can see from the above how this could be a huge issue and with spam already a major thing on cheap transaction chains we do see this being a problem from day 1. 

To solve this for now we have a server approach but we have an open PR to allow this to be traceable onchain with events which we hope to merge soon. 

The approach we are taking to solve this is:

- @josh follows @dodgy.profile
- @josh gets a follower NFT for @dodgy.profile
- @josh sends the follower NFT to @coolshoes
- The server removes that @josh follows @dodgy.profile from the indexer
- The server moves @coolshoes follows @dodgy.profile in an approval list 
- This now means @coolshoes needs to approve that they approve to follow this profile

This mutation approves the follow and now on the API side, it looks like you follow this profile from your wallet.

API Design
==========

returns a `VoidScalar` which means no response is returned if you do look at the response data it will be data.approveFollow = null but you do not need to look at the response for anything which returns `void`. If it does not throw it is successful. 

```javascript Example operation
mutation ApproveFollow {
  approveFollow(request: { profileId: "0x01" })
}
```
```javascript Query interface
type Mutation {
   approveFollow(request: ApproveFollowsRequest!): Void
}
```
```javascript Request
input ApproveFollowsRequest {
  profileId: ProfileId!
}
  
# ProfileId custom scalar type
scalar ProfileId
```

Full code example
-----------------

```javascript approve-follow.js
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'

const APPROVE_FOLLOW = `
  mutation($request: ApproveFollowsRequest!) { 
   approveFollow(request: $request)
 }
`

export const approveFollow = (profileId) => {
   return apolloClient.mutate({
    mutation: gql(APPROVE_FOLLOW),
    variables: {
      request: {
        profileId,
      },
    },
  })
}
```
```javascript apollo-client.js
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'

const httpLink = new HttpLink({ uri: 'https://api-mumbai.lens.dev/' });

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
```