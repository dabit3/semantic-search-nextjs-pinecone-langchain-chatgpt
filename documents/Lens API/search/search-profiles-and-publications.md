---
title: "Search profiles or publications"
slug: "search-profiles-and-publications"
hidden: false
createdAt: "2022-02-18T11:33:01.520Z"
updatedAt: "2023-03-14T13:51:21.463Z"
---
> 📘 Full code example
> 
> Search profiles - <https://github.com/lens-protocol/api-examples/blob/master/src/search/search-profiles.ts>
> 
> Search publications - <https://github.com/lens-protocol/api-examples/blob/master/src/search/search-publications.ts>

This query allows you to search across hashtags on publications or profile handles. This query returns either a `Post` and `Comment` or `Profile`. 

Querying the protocol publications for content and profiles is fundamental for social visibility and something we will continue to improve on.

# API details

You can search against profile handles or search against hashtags. Both will be explained in detail below. 

> 📘 Hot tip
> 
> If you do not know GraphQL that well remember things can be nullable if defined as so in the schema how GraphQL knows its nullable is without the `!` at the end here is an example:
> 
> Not nullable: 
> 
> ownedBy: EthereumAddress!
> 
> Nullable:
> 
> ownedBy: EthereumAddress
> 
> It's always worth generating the TypeScript types for the schema if your application is TypeScript here is a reference to how you would do that - <https://www.apollographql.com/blog/tooling/apollo-codegen/typescript-graphql-code-generator-generate-graphql-types/>

You will see the paging result behavior repeated a lot in the API.  This is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result, you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

## Search across profiles

 You can use the `type` property on the request which allows you to search on the same endpoint to define the type of search you want.

```javascript Example operation
query Search {
  search(request: {
    query: "josh",
    type: PROFILE,
    limit: 10
  }) {
    ... on ProfileSearchResult {
      __typename 
      items {
        ... on Profile {
          ...ProfileFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  profileId: id,
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
}
```
```javascript Example response
{
  "data": {
    "search": {
      "__typename": "ProfileSearchResult",
      "items": [
        {
          "profileId": "0x032f1a",
          "name": "josh stevens",
          "bio": "hey this is my profile",
          "attributes": [
            {
              "displayType": null,
              "traitType": null,
              "key": "custom_field",
              "value": "yes this is custom"
            }
          ],
          "isFollowedByMe": false,
					"isFollowing": false,
          "followNftAddress": null,
          "metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          "isDefault": false,
          "handle": "joshworld",
          "picture": null,
          "coverPicture": null,
          "ownedBy": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
          "dispatcher": {
            "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
          },
          "stats": {
            "totalFollowers": 0,
            "totalFollowing": 2,
            "totalPosts": 4,
            "totalComments": 0,
            "totalMirrors": 1,
            "totalPublications": 5,
            "totalCollects": 0
          },
          "followModule": {
            "type": "FeeFollowModule",
            "amount": {
              "asset": {
                "name": "WETH",
                "symbol": "WETH",
                "decimals": 18,
                "address": "0x3C68CE8504087f89c640D02d133646d98e64ddd9"
              },
              "value": "0.01"
            },
            "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
          }
        },
        {
          "profileId": "0x02f5f4",
          "name": null,
          "bio": null,
          "attributes": [
            {
              "displayType": null,
              "traitType": null,
              "key": "custom_field",
              "value": "yes this is custom"
            }
          ],
          "isFollowedByMe": false,
					"isFollowing": false,
          "followNftAddress": null,
          "metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          "isDefault": false,
          "handle": "josh2184zlpd",
          "picture": null,
          "coverPicture": null,
          "ownedBy": "0x667E0ecA80f283b5417588034b3C0bAb8deed505",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 0,
            "totalFollowing": 0,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "profileId": "0x1d27",
          "name": null,
          "bio": null,
          "attributes": [
            {
              "displayType": null,
              "traitType": null,
              "key": "custom_field",
              "value": "yes this is custom"
            }
          ],
          "isFollowedByMe": false,
					"isFollowing": false,
          "followNftAddress": null,
          "metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          "isDefault": false,
          "handle": "joshfundz",
          "picture": null,
          "coverPicture": null,
          "ownedBy": "0x85c49F70AA4EaC48892917bD0cedCD4E8EE9c754",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 0,
            "totalFollowing": 0,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "totalCount": 3,
        "next": "{\"offset\":10}"
      }
    }
  }
}
```



### Using LensClient SDK

```typescript
const result = await lensClient.search.profiles({
  query: 'josh',
  limit: 10,
});
```



## Search across publications

For now, the search will search across anything which has hashtags and tags, this will be expanded to a full-text search soon. So if someone posted #foo that can be searched but if someone posted "I like #foo" only "foo" would be searchable and not "like". A full-text search API is under active development and will be released at a later point. 

```javascript Example operation
query Search {
  search(request: {
    query: "hello",
    type: PUBLICATION,
    limit: 10
  }) {
    ... on PublicationSearchResult {
       __typename 
      items {
        __typename 
        ... on Comment {
          ...CommentFields
        }
        ... on Post {
          ...PostFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
    }
    ... on ProfileSearchResult {
      __typename 
      items {
        ... on Profile {
          ...ProfileFields
        }
      }
      pageInfo {
        prev
        totalCount
        next
      }
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
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

fragment ProfileFields on Profile {
  profileId: id,
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
  metadataUrl: metadata
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
    "search": {
      "__typename": "PublicationSearchResult",
      "items": [
        {
          "__typename": "Post",
          "id": "0x5181-0x15",
          "profile": {
            "profileId": "0x5181",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "metadataUrl": null,
            "isDefault": false,
            "handle": "0x5181.burned",
            "picture": {
              "original": {
                "url": "https://cdn.stamp.fyi/avatar/eth:0xd53e135f063740af88f71c776fe6d53d703bcab4?s=250",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0x0000000000000000000000000000000000000000",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 3,
              "totalFollowing": 0,
              "totalPosts": 34,
              "totalComments": 4,
              "totalMirrors": 0,
              "totalPublications": 38,
              "totalCollects": 1
            },
            "followModule": null
          },
          "stats": {
            "totalAmountOfMirrors": 0,
            "totalAmountOfCollects": 0,
            "totalAmountOfComments": 0
          },
          "metadata": {
            "name": "Post by @olofandersson2.test",
            "description": "hello #foo #bar #web3 #hej_hoj #lol_ #123 #TestFoo tag#hello tag. #hello",
            "content": "hello #foo #bar #web3 #hej_hoj #lol_ #123 #TestFoo tag#hello tag. #hello",
            "media": [],
            "attributes": [
              {
                "displayType": "string",
                "traitType": "type",
                "value": "text_only"
              }
            ]
          },
          "createdAt": "2022-11-12T15:06:16.000Z",
          "collectModule": {
            "__typename": "FreeCollectModuleSettings",
            "type": "FreeCollectModule",
            "followerOnly": false,
            "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
          },
          "referenceModule": null,
          "appId": "lenster",
          "hidden": false,
          "reaction": null,
          "mirrors": [],
          "hasCollectedByMe": false
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "totalCount": 7,
        "next": "{\"offset\":7}"
      }
    }
  }
}
```



### Using LensClient SDK

```typescript
const result = await lensClient.search.publications({
  query: 'hello',
  limit: 10,
});
```