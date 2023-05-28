---
title: "Profile publication revenue"
slug: "profile-publication-revenue"
hidden: false
metadata: 
createdAt: "2022-02-18T11:32:18.193Z"
updatedAt: "2023-03-14T13:47:29.400Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/revenue/profile-publications-revenue.ts>

This query returns the amounts earned on the requested profile for all publications. It will only return publications that have earned any fees. 

# API Design

```javascript Example operation
query Revenue {
  profilePublicationRevenue(request: { profileId: "0x41", limit: 10 }) {
    items {
      publication {
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
      revenue {
        total {
          asset {
            name
            symbol
            decimals
            address
          }
          value
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
    "profilePublicationRevenue": {
      "items": [
        {
          "publication": {
            "__typename": "Post",
            "id": "0x41-0x03",
            "profile": {
              "id": "0x41",
              "name": "carle",
              "bio": "cool",
              "attributes": [
                {
                  "displayType": null,
                  "traitType": "string",
                  "key": "website",
                  "value": "https://twitter.com/Liao15904673"
                },
                {
                  "displayType": null,
                  "traitType": "string",
                  "key": "twitter",
                  "value": "@Liao15904673"
                },
                {
                  "displayType": null,
                  "traitType": "boolean",
                  "key": "isBeta",
                  "value": "true"
                },
                {
                  "displayType": null,
                  "traitType": "string",
                  "key": "app",
                  "value": "Lenster"
                }
              ],
              "metadata": "https://lens.infura-ipfs.io/ipfs/QmQojajzy28PoCMVyfvm2RY9tLSAQWUBAfHVXTmgN8rfR2",
              "isDefault": true,
              "handle": "crypto.test",
              "picture": {
                "original": {
                  "url": "https://lens.infura-ipfs.io/ipfs/QmW5LJEgu4CaFntjj4gKFL74Z2rZ3bHXVTLUqxL2j2JgGa",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              },
              "coverPicture": null,
              "ownedBy": "0x9D6AfD3Dd7cbe2429764788c2ef3a607D57943d6",
              "dispatcher": null,
              "stats": {
                "totalFollowers": 0,
                "totalFollowing": 1,
                "totalPosts": 3,
                "totalComments": 0,
                "totalMirrors": 0,
                "totalPublications": 3,
                "totalCollects": 3
              },
              "followModule": null
            },
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 3,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "亏钱dao",
              "description": "",
              "content": "",
              "media": [],
              "attributes": [
                {
                  "displayType": null,
                  "traitType": "string",
                  "value": "crowdfund"
                },
                {
                  "displayType": null,
                  "traitType": "string",
                  "value": "100"
                }
              ]
            },
            "createdAt": "2022-05-11T16:28:12.000Z",
            "collectModule": {
              "__typename": "FeeCollectModuleSettings",
              "type": "FeeCollectModule",
              "amount": {
                "asset": {
                  "name": "Wrapped Matic",
                  "symbol": "WMATIC",
                  "decimals": 18,
                  "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
                },
                "value": "0.1"
              },
              "recipient": "0x9D6AfD3Dd7cbe2429764788c2ef3a607D57943d6",
              "referralFee": 10
            },
            "referenceModule": null,
            "appId": "lenster crowdfund"
          },
          "revenue": {
            "total": {
              "asset": {
                "name": "Wrapped Matic",
                "symbol": "WMATIC",
                "decimals": 18,
                "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
              },
              "value": "0.3"
            }
          }
        }
      ],
      "pageInfo": {
        "prev": "{\"entityIdentifier\":\"0x41-0x03\",\"timestamp\":1652286492,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"entityIdentifier\":\"0x41-0x03\",\"timestamp\":1652286492,\"cursorDirection\":\"AFTER\"}",
        "totalCount": 1
      }
    }
  }
}
```



You will see the paging result behavior repeated a lot in the API.  This is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result, you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

The request also takes in:

- `sources` which allows you to pass in an array of `appIds`
- `types` which allows you to filter the revenue on `[COMMENT, MIRROR, POST]` aka if you only wanted to get back comments and mirrors you would do `types: [COMMENT, MIRROR]`

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

# 

# Using LensClient SDK

```typescript
const result = await lensClient.revenue.profilePublication({ profileId: '0x0185' });
```