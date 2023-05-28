---
title: "Mutual profile follows"
slug: "mutual-profile-follows"
hidden: false
createdAt: "2022-09-23T11:35:49.418Z"
updatedAt: "2023-03-15T18:18:55.198Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/mutual-profile-follows.ts>

This will return you mutual profiles based on the 2 profiles following. It will return to you all profiles that the profile you are viewing is followed by the profiles you follow.

# API Design

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is you have a schema that should explain how the schema should look at what properties exist in that. In these docs we explore code examples and explain key concepts but we will not explain each property that exists in the response for example, as the schema already does that!

```Text Example operation
query MutualFollowersProfiles {
  mutualFollowersProfiles(request: { viewingProfileId: "0x01", yourProfileId: "0x02" }) {
    items {
      ...ProfileFields
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
```
```Text Example response
{
  "data": {
    "mutualFollowersProfiles": {
      "items": [
        {
          "id": "0x03c5",
          "name": null,
          "bio": null,
          "attributes": [],
          "isFollowedByMe": false,
          "isFollowing": false,
          "followNftAddress": null,
          "metadata": null,
          "isDefault": true,
          "handle": "piedpiper.test",
          "picture": {
            "original": {
              "url": "https://avatar.tobi.sh/0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464_piedpiper.png",
              "width": null,
              "height": null,
              "mimeType": null
            },
            "small": null,
            "medium": null
          },
          "coverPicture": null,
          "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
          "dispatcher": null,
          "stats": {
            "totalFollowers": 0,
            "totalFollowing": 15,
            "totalPosts": 0,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 0,
            "totalCollects": 0
          },
          "followModule": null
        },
        {
          "id": "0x15",
          "name": "Yoginth",
          "bio": "요기 • Creator of @lenster 🌸 • Bullish on Ξ • BTS Fanboi ⟬⟭ • he/him 🌳",
          "attributes": [
            {
              "displayType": "string",
              "traitType": "website",
              "key": "website",
              "value": "https://yogi.codes"
            },
            {
              "displayType": "string",
              "traitType": "location",
              "key": "location",
              "value": "India"
            },
            {
              "displayType": "string",
              "traitType": "twitter",
              "key": "twitter",
              "value": "yogicodes"
            },
            {
              "displayType": "string",
              "traitType": "app",
              "key": "app",
              "value": "lenstube"
            }
          ],
          "isFollowedByMe": true,
          "isFollowing": false,
          "followNftAddress": "0x519B98aCFe0d13161aE75E6aEA8C4C60f6418055",
          "metadata": "https://arweave.net/WmAKdos7EbiH86mYXdhC9Js1YhgdlGNMw3ZOL6b38sM",
          "isDefault": true,
          "handle": "yoginth.test",
          "picture": {
            "original": {
              "url": "https://lens.infura-ipfs.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
              "width": null,
              "height": null,
              "mimeType": null
            },
            "small": null,
            "medium": null
          },
          "coverPicture": {
            "original": {
              "url": "https://lens.infura-ipfs.io/ipfs/QmR7vBHZm78hsymxYFkQBV4UC42Y4iGyHgyFwisMu9S66B",
              "width": null,
              "height": null,
              "mimeType": null
            },
            "small": null,
            "medium": null
          },
          "ownedBy": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
          "dispatcher": {
            "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
          },
          "stats": {
            "totalFollowers": 157,
            "totalFollowing": 56,
            "totalPosts": 150,
            "totalComments": 151,
            "totalMirrors": 68,
            "totalPublications": 369,
            "totalCollects": 115
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
              "value": "1.0"
            },
            "recipient": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"
          }
        },
        {
          "id": "0x18",
          "name": null,
          "bio": null,
          "attributes": [],
          "isFollowedByMe": true,
          "isFollowing": false,
          "followNftAddress": "0xBA8bB58FcF87f3E5089ccF28ee9d83B44588011E",
          "metadata": "ipfs://QmeKBfKjQbzxN4d1woMtDruVPYS2xkwWyArEtjzjszmGU8",
          "isDefault": true,
          "handle": "devjoshstevens.test",
          "picture": {
            "original": {
              "url": "https://lens.infura-ipfs.io/ipfs/QmZ2Y6NrwvCst88S6V6eQVocUqkL9Zbmw6MqpNWZwYt4op",
              "width": null,
              "height": null,
              "mimeType": null
            },
            "small": null,
            "medium": null
          },
          "coverPicture": null,
          "ownedBy": "0xD8c789626CDb461ec9347f26DDbA98F9383aa457",
          "dispatcher": {
            "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
          },
          "stats": {
            "totalFollowers": 27,
            "totalFollowing": 38,
            "totalPosts": 26,
            "totalComments": 13,
            "totalMirrors": 5,
            "totalPublications": 44,
            "totalCollects": 10
          },
          "followModule": null
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":3}",
        "totalCount": 3
      }
    }
  }
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

## Request

### viewingProfileId - required

The profile id you are viewing

### yourProfileId - required

The profile id the user is looking from



# 

# Using LensClient SDK

```typescript
const mutualFollowers = await lensClient.profile.mutualFollowers({
  viewingProfileId,
  yourProfileId,
});
```