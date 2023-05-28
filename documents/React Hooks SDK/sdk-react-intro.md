---
title: "Introduction"
slug: "sdk-react-intro"
excerpt: "The official React Hooks to interact with the Lens Protocol"
hidden: false
createdAt: "2022-12-22T20:56:24.192Z"
updatedAt: "2023-05-17T12:28:15.064Z"
---
The Lens SDK includes a collection of React Hooks containing all you need to interact with the Lens Protocol.

It provides a foundation that abstracts away the complexity of some low-level concepts of the Lens Protocol and Lens API.

Some of the key aspects:

### Type Safe

The SDK is written in TypeScript and shipped with all the type definitions you need. It generates its underlying type definitions from the Lens API GraphQL schema so you can rely on end-to-end type safety.

> 👍 Good to know
> 
> Although it is based on the Lens GraphQL API, you don't need to learn GraphQL to use it.

### Authentication

The SDK takes care of the initial authentication handshake, persistence of auth tokens, renew of expired tokens and transparently retries unauthorized requests.

### Persistence

The SDK takes care of storing relevant informations for subsequent user sessions. It comes with out-of-the box adapters for common storage providers and will enable developers to define the storage provider solution that works best for their application needs.

### It will guide you through breaking changes

The core logic of the Lens SDK has been developed side-by-side with the Lens Protocol and Lens API. It is the result of early integration efforts and encapsulates the knowledge of past technical decisions as well as future development direction.

It's the perfect place to provide support and migration strategies for protocol and API breaking changes.

## Resources

- [Lens SDK Reference](https://lens-protocol.github.io/lens-sdk/)
- [Lens SDK Monorepo](https://github.com/lens-protocol/lens-sdk)
- [Examples](https://github.com/lens-protocol/lens-sdk/tree/main/examples)