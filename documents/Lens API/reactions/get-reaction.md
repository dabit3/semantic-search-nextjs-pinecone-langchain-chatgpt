---
title: "Get reaction"
slug: "get-reaction"
hidden: false
createdAt: "2022-06-20T12:25:44.249Z"
updatedAt: "2022-09-23T11:56:20.215Z"
---
To get the reaction you have to use the field resolver `reaction` passing in a `profileId`. 

Below is a publications query that gets all the publications for profile `0x09`. In the reaction field resolver you can pass in a `profileId` you wish to know the reaction state for, most apps would use the logged in users selected profile they are browsing on.

# API design

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
        reaction(request: { profileId: "0x01" })
      }
      ... on Comment {
        reaction(request: { profileId: "0x01" })
      }
      ... on Mirror {
        reaction(request: { profileId: "0x01" })
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



`profileId` for `reaction` can pass in as a variable easily enough as well. You can imagine passing the logged-in users profile they are browsing on to see if they have reacted to the publication. This can be hooked in like this for every query which returns a publication type (Post or Comment or Mirror)

```javascript Example operation
query Publications($publicationsRequest: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest) {
  publications(request: $publicationsRequest) {
    items {
      __typename 
      ... on Post {
        reaction(request: $reactionRequest)
      }
      ... on Comment {
        reaction(request: $reactionRequest)
      }
      ... on Mirror {
        reaction(request: $reactionRequest)
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