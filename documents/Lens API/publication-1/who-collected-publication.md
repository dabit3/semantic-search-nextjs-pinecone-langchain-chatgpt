---
title: "Who collected publication"
slug: "who-collected-publication"
hidden: false
createdAt: "2022-04-21T10:57:03.765Z"
updatedAt: "2023-03-16T16:09:52.455Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/who-collected-publication.ts>

This query returns to you all the wallets which collected the publication.

# API Design

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

```javascript Example operation
query WhoCollectedPublication {
  whoCollectedPublication(request: { publicationId: "0x0f-0x01" }) {
    items {
      address
      defaultProfile {
        id
        name
        bio
        isDefault
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        handle
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            chainId
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
            chainId
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
    "whoCollectedPublication": {
      "items": [
        {
          "address": "0xD93a672802806e129410B070F206f1e4fFdeebD4",
          "defaultProfile": {
            "id": "0x95",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "followNftAddress": null,
            "metadata": null,
            "handle": "cherrytree503",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmY9LvouQF5jX64sSHF31RL5oUER9hFsaCUShwU1EytsMc",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0xD93a672802806e129410B070F206f1e4fFdeebD4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 2,
              "totalFollowing": 6,
              "totalPosts": 6,
              "totalComments": 11,
              "totalMirrors": 3,
              "totalPublications": 20,
              "totalCollects": 2
            },
            "followModule": {
              "type": "FeeFollowModule",
              "contractAddress": "0x286c330beFfC157139ffCc32e97aC2f1fC7D1092",
              "amount": {
                "asset": {
                  "name": "Wrapped Matic",
                  "symbol": "WMATIC",
                  "decimals": 18,
                  "address": "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"
                },
                "value": "0.0001"
              },
              "recipient": "0xD93a672802806e129410B070F206f1e4fFdeebD4"
            }
          }
        },
        {
          "address": "0xc5Aabb752A6A55FAa7040cA12046fd62D3C52193",
          "defaultProfile": {
            "id": "0xf4",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "hebochang",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/Qmc2BvR9pUo5N8iVhd6N3TuB3EqQaMr6oqSxrupuHG1qgM",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0xc5Aabb752A6A55FAa7040cA12046fd62D3C52193",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 2,
              "totalPosts": 4,
              "totalComments": 1,
              "totalMirrors": 1,
              "totalPublications": 6,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "address": "0xCbDcF67DF1C4aA7431a6d8710fD7241b52Bc7b6a",
          "defaultProfile": {
            "id": "0x0e",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "catcat",
            "picture": null,
            "coverPicture": null,
            "ownedBy": "0xCbDcF67DF1C4aA7431a6d8710fD7241b52Bc7b6a",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 5,
              "totalFollowing": 1,
              "totalPosts": 5,
              "totalComments": 1,
              "totalMirrors": 1,
              "totalPublications": 7,
              "totalCollects": 1
            },
            "followModule": null
          }
        },
        {
          "address": "0xB8189417c4B63c3F093fC0df72F64D983E904aF4",
          "defaultProfile": {
            "id": "0x2e",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "tastix",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/tastix.svg",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0xB8189417c4B63c3F093fC0df72F64D983E904aF4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 2,
              "totalFollowing": 9,
              "totalPosts": 6,
              "totalComments": 3,
              "totalMirrors": 5,
              "totalPublications": 14,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "address": "0x2BB2Cd55BE34Eb2D3Cd29Cf7c881aB313961bFC1",
          "defaultProfile": {
            "id": "0x20",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "excusiux",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmVJ2PjGXjuWa3MRB9x3d4odsBn6E6G85cpWcLDDfBDgme",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0x2BB2Cd55BE34Eb2D3Cd29Cf7c881aB313961bFC1",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 5,
              "totalFollowing": 4,
              "totalPosts": 1,
              "totalComments": 2,
              "totalMirrors": 1,
              "totalPublications": 4,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "address": "0xe5AB0dDf6704BB1f1918c23D10B316DD41F3a349",
          "defaultProfile": {
            "id": "0x1e",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "alice",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmY7WEGzavjdh9zmLyFTdGj4FvTgjB58Mdvaky9p3NvdiF",
                "mimeType": null
              }
            },
            "coverPicture": null,
            "ownedBy": "0xe5AB0dDf6704BB1f1918c23D10B316DD41F3a349",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 53,
              "totalFollowing": 18,
              "totalPosts": 5,
              "totalComments": 46,
              "totalMirrors": 1,
              "totalPublications": 52,
              "totalCollects": 39
            },
            "followModule": null
          }
        },
        {
          "address": "0x5545c35680fA583a8320bDBb76e3e57912c09423",
          "defaultProfile": null
        },
        {
          "address": "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3",
          "defaultProfile": {
            "id": "0x0f",
            "name": null,
            "bio": null,
            "isDefault": true,
            "attributes": [],
            "metadata": null,
            "handle": "yoginth",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                "mimeType": null
              }
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
          }
        }
      ],
      "pageInfo": {
        "prev": "{\"entityIdentifier\":\"0x0f-0x010xD93a672802806e129410B070F206f1e4fFdeebD40x0b\",\"timestamp\":0,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"entityIdentifier\":\"0x0f-0x010x3A5bd1E37b099aE3386D13947b6a90d97675e5e30x01\",\"timestamp\":0,\"cursorDirection\":\"AFTER\"}",
        "totalCount": 8
      }
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.allWalletsWhoCollected({
  publicationId: "0x01-0x01",
});
```