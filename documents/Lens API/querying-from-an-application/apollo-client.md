---
title: "Apollo client"
slug: "apollo-client"
hidden: false
createdAt: "2022-02-18T10:45:38.301Z"
updatedAt: "2022-11-09T10:33:08.461Z"
---
# Apollo client

[apollo client](https://www.apollographql.com/docs/) is an awesome library that supports all web frameworks like angular, react, and vue but it also supports mobile clients like IOS, Android, and react-native. It is super easy to use.

## Installing

open the terminal in your client and run:

```shell
$ npm install @apollo/client graphql
```



## Usage

### Exposing the client

You can create the `ApolloClient` which you then use for all public API queries like:

```typescript
import { ApolloClient, InMemoryCache } from '@apollo/client'

const APIURL = 'https://api-mumbai.lens.dev/';

export const apolloClient= new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})
```



### Querying the API

Then you can use it to query the Lens public API:

```typescript
import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const query  = `
  query {
    ping
  }
`

export const queryExample = async () => {
   const response = await apolloClient.query({
    query: gql(query),
  })
  console.log('Lens example data: ', response)
}
```



A lot of queries need variables to be passed in, this is super easy by using the `variables` argument in the query

```typescript
import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const query = `query($request: ChallengeRequest!) {
  challenge(request: $request) {
        text
    }
  }
`

export const queryExample = async () => {
   const response = await apolloClient.query({
    query: gql(query),
    variables: {
      request: {
         address: "0xdfd7D26fd33473F475b57556118F8251464a24eb"
      },
    },
  })
  console.log('Lens example data: ', response)
}
```



### Mutations using the API

While we use queries to fetch data, we use mutations to modify server-side data.

```typescript
import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const AUTHENTICATION = `
 mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const authenticate = (address, signature) => {
   return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}
```