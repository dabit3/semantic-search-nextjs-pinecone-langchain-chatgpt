---
title: "Explore publications"
slug: "explore-publications"
hidden: false
createdAt: "2022-02-18T11:29:23.848Z"
updatedAt: "2023-03-14T10:19:13.211Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/explore/explore-publications.ts>

This query returns a list of publications based on the top collected or top comments. It randomizes it so it is never the same content you see twice similar to how Instagram works when you refresh their explore section. 

For now, this uses basic explore logic on basic data the protocol has. We will be greatly increasing this when we start doing AI on the explore feeds and endpoints. If you integrate this API into your application you will be inheriting all of these improvements with no code changes. 

# API Design

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is you have a schema that should explain how the request and response schema should look at what properties exist in that. In these docs we explore code examples and explain key concepts but we will not explain each property that exists in the response for example, as the schema already does that!

```graphql Example operation
query ExplorePublications {
  explorePublications(request: {
    sortCriteria: TOP_COMMENTED,
    publicationTypes: [POST, COMMENT, MIRROR],
    limit: 10
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
       ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
    small {
      ...MediaFields
    }
    medium {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}


```
```javascript Example response
{
  "data": {
    "explorePublications": {
      "items": [
        {
          "__typename": "Post",
          "id": "0x03b0-0x01",
          "profile": {
            "id": "0x03b0",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": true,
            "handle": "jojay",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmcKD5Zxic7JAum22jKRnT3ENY4tCCp7qQSPJTCLkHAApm",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x0c0E611A29b339D8c1048F2Edf9d4160A5fb8F22",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 4,
              "totalPosts": 1,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": {
              "type": "FeeFollowModule",
              "amount": {
                "asset": {
                  "name": "Wrapped Matic",
                  "symbol": "WMATIC",
                  "decimals": 18,
                  "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
                },
                "value": "10.0"
              },
              "recipient": "0x0c0E611A29b339D8c1048F2Edf9d4160A5fb8F22"
            }
          },
          "stats": {
            "totalAmountOfMirrors": 0,
            "totalAmountOfCollects": 0,
            "totalAmountOfComments": 3
          },
          "metadata": {
            "name": "Post by @jojay",
            "description": "Hello Josh :)",
            "content": "Hello Josh :)",
            "media": [],
            "attributes": [
              {
                "displayType": null,
                "traitType": "type",
                "value": "post"
              }
            ]
          },
          "createdAt": "2022-04-16T08:33:25.000Z",
          "collectModule": {
            "__typename": "RevertCollectModuleSettings",
            "type": "RevertCollectModule"
          },
          "referenceModule": null,
          "appId": "Lenster",
          "hidden": false,
          "reaction": null,
          "mirrors": [],
          "hasCollectedByMe": false
        },
        {
          "__typename": "Post",
          "id": "0x0f-0xa0",
          "profile": {
            "id": "0x0f",
            "name": null,
            "bio": null,
            "attributes": [],
            "followNftAddress": "0x8A8bd1E37b099aE3386D13947b6a90d97675e9a1"
            "metadata": null,
            "isDefault": true,
            "handle": "wagmi.lens",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 111,
              "totalFollowing": 15,
              "totalPosts": 89,
              "totalComments": 64,
              "totalMirrors": 15,
              "totalPublications": 168,
              "totalCollects": 215
            },
            "followModule": null
          },
          "stats": {
            "totalAmountOfMirrors": 0,
            "totalAmountOfCollects": 0,
            "totalAmountOfComments": 6
          },
          "metadata": {
            "name": "Post by @yoginth",
            "description": "Testing hashflags\n\n#lenster #Lenster #LENSTER #lens #ethereum #Bitcoin",
            "content": "Testing hashflags\n\n#lenster #Lenster #LENSTER #lens #ethereum #Bitcoin",
            "media": [],
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "value": "post"
              }
            ]
          },
          "createdAt": "2022-04-20T06:26:56.000Z",
          "collectModule": {
            "__typename": "RevertCollectModuleSettings",
            "type": "RevertCollectModule"
          },
          "referenceModule": null,
          "appId": "Lenster",
          "hidden": false,
          "reaction": null,
          "mirrors": [],
          "hasCollectedByMe": false
        }
      ],
      "pageInfo": {
        "prev": "{\"timestamp\":1649942608500,\"offset\":0,\"randomizer\":5}",
        "next": "{\"timestamp\":1649942608500,\"offset\":10,\"randomizer\":5}",
        "totalCount": 2
      }
    }
  }
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

## Request

Let's look at the query options we can use here to get a lot of data for different things. 

```json get explore by top comments
// This returns you a random array back of the top commented publications on
// the protocol. Each time you call it a new set of random publications will return
{
    "sortCriteria": "TOP_COMMENTED",
    // you can filter by publication type
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    "limit": 10
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
    // you can also pass in from which date you wish to start the explore from
    // if nothing is passed it will use a week before
    // "timestamp": 1645469133705
    // if you do not want it to be random each time
    // "noRandomize": true
    // if you want to exclude certain profiles from appearing in results
    // "excludeProfileIds": ["0x01"]
 }
```
```json get explore by top collected
// This returns you a random array back of the top collected publications on
// the protocol. Each time you call it a new set of random publications will return
{
    "sortCriteria": "TOP_COLLECTED",
    // you can filter by publication type
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    "limit": 10
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
    // you can also pass in from which date you wish to start the explore from
    // if nothing is passed it will use a week before
    // "timestamp": 1645469133705
    // if you do not want it to be random each time
    // "noRandomize": true
    // if you want to exclude certain profiles from appearing in results
    // "excludeProfileIds": ["0x01"]
 }
```
```javascript get explore by top mirrored
// This returns you a random array back of the top collected publications on
// the protocol. Each time you call it a new set of random publications will return
{
    "sortCriteria": "TOP_MIRRORED",
    // you can filter by publication type
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    "limit": 10
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
    // you can also pass in from which date you wish to start the explore from
    // if nothing is passed it will use a week before
    // "timestamp": 1645469133705
    // if you do not want it to be random each time
    // "noRandomize": true
    // if you want to exclude certain profiles from appearing in results
    // "excludeProfileIds": ["0x01"]
 }
```
```javascript get latest
// This returns you a random array back of the top collected publications on
// the protocol. Each time you call it a new set of random publications will return
{
    "sortCriteria": "LATEST",
    // you can filter by publication type
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    "limit": 10
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
    // you can also pass in from which date you wish to start the explore from
    // if nothing is passed it will use a week before
    // "timestamp": 1645469133705
    // if you do not want it to be random each time
    // "noRandomize": true
    // if you want to exclude certain profiles from appearing in results
    // "excludeProfileIds": ["0x01"]
 }
```
```Text get by curated profiles
// This returns you a random array back of the top curated profiles publications on
// the protocol. Each time you call it a new set of random publications will return
{
    "sortCriteria": "CURATED_PROFILES",
    // you can filter by publication type
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    "limit": 10
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
    // you can also pass in from which date you wish to start the explore from
    // if nothing is passed it will use a week before
    // "timestamp": 1645469133705
    // if you do not want it to be random each time
    // "noRandomize": true
    // if you want to exclude certain profiles from appearing in results
    // "excludeProfileIds": ["0x01"]
 }
```



## 

## 

## Using LensClient SDK

```typescript
import { PublicationSortCriteria } from "@lens-protocol/client";

lensClient.explore.publications({
  sortCriteria: PublicationSortCriteria.TopCommented
})
```