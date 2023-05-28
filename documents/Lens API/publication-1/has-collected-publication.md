---
title: "Has collected publication"
slug: "has-collected-publication"
hidden: false
createdAt: "2022-03-14T12:54:32.201Z"
updatedAt: "2023-03-16T16:01:27.565Z"
---
You need to know if the logged-in user has collected a publication it's viewing, to do this you need to look at the `hasCollectedByMe` property on the publication response. This is shown in the examples when fetching back a publication.

It will always be false if calling when not logged in, but **_when passing in the auth header it will work_** if that wallet has collected it already.

# API Design basic

Please note the example below doesn't pick all the content out of the publication it just shows you the field used to get that back.

```javascript Example operation
query Publications {
  publications(request: {
    profileId: "0x09",
    publicationTypes: [POST, COMMENT, MIRROR],
    limit: 10,
  }) {
    items {
      __typename 
      ... on Post {
        hasCollectedByMe
      }
      ... on Comment {
        hasCollectedByMe
      }
      ... on Mirror {
        hasCollectedByMe
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
```



For a single publication:

```graphql
query Publication {
  publication(request: {
    publicationId: "0x01-0x01"
  }) {
   __typename 
    ... on Post {
      hasCollectedByMe
    }
  }
}
```



# 

# Using LensClient SDK

The authorization header is always passed with the API request if the lensClient is authenticated.

```typescript
const isAuthenticated = await lensClient.authentication.isAuthenticated();

// if isAuthenticated === true 
// then results from publication queries will contain valid value for hasCollectedByMe

const result = await lensClient.publication.fetch(request);
```