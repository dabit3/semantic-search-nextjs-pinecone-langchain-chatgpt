---
title: "Followers"
slug: "followers"
hidden: false
createdAt: "2022-02-18T11:29:07.989Z"
updatedAt: "2023-03-14T10:33:41.716Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/followers.ts>

This query returns the wallet addresses which are following a profile

# API Design

```javascript Example operation
query Followers {
  followers(request: { 
             	profileId: "0x01",
              limit: 10
             }) {
       items {
      wallet {
        address
        defaultProfile {
          id
          name
          bio
          attributes {
            displayType
            traitType
            key
            value
          }
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
                url
                mimeType
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
                url
                mimeType
              }
            }
          }
          ownedBy
          dispatcher {
            address
            canUseRelay
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
              contractAddress
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
            }
            ... on RevertFollowModuleSettings {
             type
            }
          }
        }
      }
      totalAmountOfTimesFollowed
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
```
```javascript Example response
{
  "data": {
    "followers": {
      "items": [
        {
          "wallet": {
            "address": "0x2376e9C7C604D1827bA9aCb1293Dc8b4DA2f0DB3",
            "defaultProfile": {
              "id": "0x14",
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
              "followNftAddress": null,
          		"metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
              "isDefault": true,
              "handle": "no12",
              "picture": null,
              "coverPicture": null,
              "ownedBy": "0x2376e9C7C604D1827bA9aCb1293Dc8b4DA2f0DB3",
              "dispatcher": null,
              "stats": {
                "totalFollowers": 1,
                "totalFollowing": 4,
                "totalPosts": 0,
                "totalComments": 0,
                "totalMirrors": 0,
                "totalPublications": 0,
                "totalCollects": 0
              },
              "followModule": null
            }
          },
          "totalAmountOfTimesFollowed": 1
        },
        {
          "wallet": {
            "address": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
            "defaultProfile": null,
            "totalAmountOfProfiles": 0
          },
          "totalAmountOfTimesFollowed": 2
        },
        {
          "wallet": {
            "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
            "defaultProfile": {
              "id": "0x032f1a",
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
              "followNftAddress": null,
          		"metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
              "isDefault": true,
              "handle": "foobar222",
              "picture": null,
              "coverPicture": null,
              "ownedBy": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
              "dispatcher": {
                "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
                "canUseRelay": false
              },
              "stats": {
                "totalFollowers": 0,
                "totalFollowing": 1,
                "totalPosts": 4,
                "totalComments": 0,
                "totalMirrors": 0,
                "totalPublications": 4,
                "totalCollects": 0
              },
              "followModule": {
                "type": "FeeFollowModule",
                "contractAddress": "0xBc20957342419BE3449DB77f89DEAdcb95cb32f5",
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
            }
          },
          "totalAmountOfTimesFollowed": 3
        },
        {
          "wallet": {
            "address": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
            "defaultProfile": {
              "id": "0x02b047",
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
              "followNftAddress": null,
          		"metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
              "isDefault": true,
              "handle": "yoginth",
              "picture": null,
              "coverPicture": null,
              "ownedBy": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
              "dispatcher": null,
              "stats": {
                "totalFollowers": 3,
                "totalFollowing": 3,
                "totalPosts": 0,
                "totalComments": 0,
                "totalMirrors": 2,
                "totalPublications": 2,
                "totalCollects": 0
              },
              "followModule": null
            }
          },
          "totalAmountOfTimesFollowed": 3
        },
        {
          "wallet": {
            "address": "0x9260363c60A6782c2B6a702594B75F6e7CC096aC",
            "defaultProfile": {
              "id": "0x032e41",
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
              "followNftAddress": null,
          		"metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
              "isDefault": true,
              "handle": "gaming",
              "picture": null,
              "coverPicture": null,
              "ownedBy": "0x9260363c60A6782c2B6a702594B75F6e7CC096aC",
              "dispatcher": null,
              "stats": {
                "totalFollowers": 0,
                "totalFollowing": 4,
                "totalPosts": 0,
                "totalComments": 0,
                "totalMirrors": 0,
                "totalPublications": 0,
                "totalCollects": 0
              },
              "followModule": null
            }
          },
          "totalAmountOfTimesFollowed": 1
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":5}",
        "totalCount": 5
      }
    }
  }
}
```
```javascript Query interface
type Query {
  followers(request: FollowersRequest!): PaginatedFollowersResult!
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass the previous and next cursor in the request cursor property.



# 

# Using LensClient SDK

```typescript
const result = await lensClient.profile.allFollowers({
  profileId: "",
});

```