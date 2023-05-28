---
title: "Querying from an Application"
slug: "querying-from-an-application"
hidden: false
createdAt: "2022-02-17T10:47:07.065Z"
updatedAt: "2023-03-03T14:30:41.398Z"
---
## Using GraphQL client

If you have used GraphQL endpoints before, then you can skip this section, which explains what GraphQL clients you can use to start querying this data. We will suggest two libraries but of course, there are a lot more and no single one is the best, pick the best one for your solution. 

- [Apollo client](doc:apollo-client) 
- [URQL](doc:urql) 

For all our code demos we will be using Apollo client to show you how you would call this with the client.

## Using LensClient SDK

We built a low-level TypeScript LensClient SDK to make the interactions with the API easier. You will find examples of how to use the LensClient SDK together with the description of each endpoint of the API and related GraphQL requests. The package is available on npm as `@lens-protocol/client`.

- [LensClient SDK](doc:lensclient-sdk)