---
title: "Can mirror publication"
slug: "can-mirror-publication"
hidden: false
createdAt: "2022-09-23T08:45:26.093Z"
updatedAt: "2023-03-16T16:02:31.784Z"
---
Reference modules allow you to place criteria on the comment and mirror commands on who is actually allowed to do it. For example, a publication could set only their followers can comment and mirror. You need a way to quickly look this up for the selected profile the user is browsing on. In the `canMirror` field resolver you can pass in a `profileId`If you wish to know if they can mirror or not, most apps would use the logged-in user's selected profile they are browsing on.

# API design basic

please note the example below doesn't pick all the content out of the publication it just shows you the field used to get that back. Also, note you can use `canMirror` anytime it returns a `Post`, `Comment` or `Mirror`.

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
        canMirror(profileId: "0x01") {
          result
        }
      }
      ... on Comment {
        canMirror(profileId: "0x01") {
          result
        }
      }
      ... on Mirror {
        canMirror(profileId: "0x01") {
          result
        }
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



`profileId` for `canMirror` can pass in as a variable easily enough as well. You can imagine passing the logged-in user's profiles they are browsing on to see if they can comment on the publication. This can be hooked in like this for every query which returns a publication type (Post or Comment or Mirror)

```javascript Example operation
query Publications($publicationsRequest: PublicationsQueryRequest!, $profileId: ProfileId) {
  publications(request: $publicationsRequest) {
    items {
      __typename 
      ... on Post {
        canMirror(profileId: $profileId) {
        	result
        }
      }
      ... on Comment {
        canMirror(profileId: $profileId) {
        	result
        }
      }
      ... on Mirror {
        canMirror(profileId: $profileId) {
        	result
        }
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



# 

# Using LensClient SDK

Provide `observerId` as an argument to get results in the context of the observer profile.

```typescript
const observerId = "0x01"

const result = await lensClient.publication.fetchAll(request, observerId);

const result = await lensClient.publication.fetch(request, observerId);
```