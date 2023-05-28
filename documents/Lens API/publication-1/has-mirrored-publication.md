---
title: "Has mirrored publication"
slug: "has-mirrored-publication"
hidden: false
createdAt: "2022-02-18T11:30:21.134Z"
updatedAt: "2023-03-16T15:57:51.807Z"
---
You need to know if a user has mirrored a certain publication, to do this you need to look at the `mirrors` property on the publication response.

This returns an array of publications ids of the mirrored publication as a profile can mirror a publication many times. In the mirrors field resolver you can pass in a `profileId` you wish to know the mirrrors state for, most apps would use the logged in users selected profile they are browsing on.

# API design basic

please note the example below doesn't pick all the content out of the publication it just shows you the field used to get that back.

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
        mirrors(by: "0x01")
      }
      ... on Comment {
        mirrors(by: "0x01")
      }
      ... on Mirror {
        mirrors(by: "0x01")
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



`profileId` for `mirrors` can pass in as a variable easily enough as well. You can imagine passing the logged-in users profile they are browsing on to see if they have mirrored the publication. This can be hooked in like this for every query which returns a publication type (Post or Comment or Mirror)

```javascript Example operation
query Publications($publicationsRequest: PublicationsQueryRequest!, $profileId: ProfileId) {
  publications(request: $publicationsRequest) {
    items {
      __typename 
      ... on Post {
        mirrors(by: $profileId)
      }
      ... on Comment {
        mirrors(by: $profileId)
      }
      ... on Mirror {
        mirrors(by: $profileId)
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



Or, for a specific publication:

```graphql
query Publication {
  publication(request: {
    publicationId: "0x01-0x01"
  }) {
   __typename 
    ... on Post {
      mirrors(by: "0x01")
    }
  }
}
```



# 

# Using LensClient SDK

Provide `observerId` as an argument to get results in the context of the observer profile.

```typescript
const observerId = "0x01"

const result = await lensClient.publication.fetchAll(request, observerId);

const result = await lensClient.publication.fetch(request, observerId);
```