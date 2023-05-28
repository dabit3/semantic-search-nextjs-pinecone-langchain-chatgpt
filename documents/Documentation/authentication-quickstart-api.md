---
title: "Authentication Quickstart - Lens API"
slug: "authentication-quickstart-api"
hidden: false
metadata: 
createdAt: "2022-10-27T22:40:52.852Z"
updatedAt: "2023-05-25T20:38:42.840Z"
---
In this guide you'll learn how to implement user authentication with the Lens API in a full stack web application using React and Next.js.

While this tutorial is written in React and using React APIs, the general concepts should be easy to understand and implement across any JavaScript framework.

### Why Authentication?

While reading data from the Lens API is as simple as sending a GraphQL query, in order to post to the network you need to either be authenticated or write a transaction directly to the Lens smart contracts.

This includes any state change, like following, unfollowing, creating a post, and creating a mirror.

While there is quite a bit of documentation out there for writing transactions to a blockchain, we thought it would be helpful to provide a full stack guide for authenticating with the Lens API for developers enabling state changing functionality in their apps.

It's also important to understand how to implement authentication in order to be able to take advantage of Lens API features like [typed data](https://eips.ethereum.org/EIPS/eip-712) (a way to show the users what they are signing in a more readable format), [gasless transactions](https://docs.lens.xyz/docs/proxy-action-gasless), or to use the [dispatcher](https://docs.lens.xyz/docs/dispatcher).

### Getting started

To get started, first create a new Next.js application:

```shell
npx create-next-app lens-app

✔ Would you like to use TypeScript with this project? No
✔ Would you like to use ESLint with this project? Yes
✔ Would you like to use Tailwind CSS with this project?  Yes
✔ Would you like to use `src/` directory with this project? No
✔ Use App Router (recommended)? Yes
✔ Would you like to customize the default import alias? No
```

Next, change into the new directory and install the following dependencies:

```
npm install @apollo/client graphql ethers@5.7.2
```

## Setting up the API

Next, we'd like to configure the GraphQL client. This is what we'll use to send requests to the Lens API.

Create a file named `api.js` in the root of the project and add the following code:

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})
```

### Defining the GraphQL queries and mutations

In GraphQL, read operations are known as `queries`, and write operations (create, update, delete, etc) are known as `mutations`.

Now that we've created the GraphQL client, let's define the queries and mutations we'll need to authenticate.

To authenticate takes two server actions. The first is to generate a challenge from the server ([`challenge`](https://docs.lens.xyz/docs/login#challenge)). The second is for the user to sign that challenge with their Ethereum wallet and send the signature to the Lens server to generate a valid JWT access token and refresh token ([`authenticate`](https://docs.lens.xyz/docs/login#authenticate)).

Add the following code to `api.js`:

```javascript
export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`

export const authenticate = gql`
  mutation Authenticate(
    $address: EthereumAddress!
    $signature: Signature!
  ) {
    authenticate(request: {
      address: $address,
      signature: $signature
    }) {
      accessToken
      refreshToken
    }
  }
`
```

## Building the authentication flow

Now that the GraphQL client is configured, let's build out the authentication flow. Update `app/page.js` with the following code:

```javascript
'use client' 
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { client, challenge, authenticate } from '../api'

export default function Home() {
  /* local state variables to hold user's address and access token */
  const [address, setAddress] = useState()
  const [token, setToken] = useState()
  useEffect(() => {
    /* when the app loads, check to see if the user has already connected their wallet */
    checkConnection()
  }, [])
  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()
    if (accounts.length) {
      setAddress(accounts[0])
    }
  }
  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts')
    if (account.result.length) {
      setAddress(account.result[0])
    }
  }
  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address }
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address, signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const { data: { authenticate: { accessToken }}} = authData
      console.log({ accessToken })
      setToken(accessToken)
    } catch (err) {
      console.log('Error signing in: ', err)
    }
  }

  return (
    <div>
      { /* if the user has not yet connected their wallet, show a connect button */ }
      {
        !address && <button onClick={connect}>Connect</button>
      }
      { /* if the user has connected their wallet but has not yet authenticated, show them a login button */ }
      {
        address && !token && (
          <div onClick={login}>
            <button>Login</button>
          </div>
        )
      }
      { /* once the user has authenticated, show them a success message */ }
      {
        address && token && <h2>Successfully signed in!</h2>
      }
    </div>
  )
}
```

Next, run the app to test it out:

```javascript
npm run dev
```

When the app loads, you should be able to sign in and the `accessToken` should be logged out to the console upon success.

🎉 Congratulations, you've successfully implemented user authentication in a Lens application!

## Sending authenticated requests

Once the user has been authenticated, you can send the access token in the headers to make authenticated requests.

For example, this is what it might look like with the Apollo client:

```javascript
const result = await client.mutate({
  mutation: createPostTypedData,
  variables: {
    request,
  },
  context: {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
})
```

### Apollo Link

You can also consider using Apollo Link to automatically add an authorization header to every HTTP request. This would change the way you configure your client:

```javascript
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('your-storage-key')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const httpLink = createHttpLink({
  uri: API_URL
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
```

## Next steps

Now that you've learned how to implement authentication, it's time to explore more of [the Lens API!](https://docs.lens.xyz/docs/introduction)

Consider diving into [modules](https://docs.lens.xyz/docs/module-interfaces), the [dispatcher](https://docs.lens.xyz/docs/dispatcher), or learning about [gasless transactions](https://docs.lens.xyz/docs/proxy-action-gasless). Also check out [this](https://github.com/dabit3/lens-create-publication-example) example project showing how to authenticate a user and then post a publication to the network.

Also consider adding the following features to your app:

1. Following a user
2. Searching for users
3. Creating a post