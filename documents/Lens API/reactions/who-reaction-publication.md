---
title: "Who reacted publication"
slug: "who-reaction-publication"
hidden: false
createdAt: "2022-09-23T11:45:54.462Z"
updatedAt: "2023-03-14T13:31:41.065Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/reaction/who-reacted-publication.ts>

This query returns all the profiles who reacted to the publication. 

# API Design

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is you have a schema that should explain how the schema should look at what properties exist in that. In these docs we explore code examples and explain key concepts but we will not explain each property that exists in the response for example, as the schema already does that!

```javascript Example operation
query WhoReactedPublication {
  whoReactedPublication(request: { publicationId: "0x01-0x01" }) {
    items {
      reactionId
      reaction
      reactionAt
      profile {
        ...ProfileFields
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
    "whoReactedPublication": {
      "items": [
        {
          "reactionId": "UPVOTE-0x45da-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-09-12T23:11:29.091Z",
          "profile": {
            "id": "0x45da",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0xDe516501d9d3D71e6aF555115E75583b49f7C883",
            "metadata": null,
            "isDefault": false,
            "handle": "web3wes.test",
            "picture": {
              "original": {
                "url": "https://media-exp1.licdn.com/dms/image/C5603AQE6pH_bmNbVOg/profile-displayphoto-shrink_800_800/0/1651855193308?e=1668643200&v=beta&t=ofhjxGqOgUfLMp5l9RMQdOpKozLZf9ejex5mnssAhQg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x4B297bdAf5aC6FEdD1166706D65F6f8fb70d2B9A",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 1,
              "totalPosts": 5,
              "totalComments": 0,
              "totalMirrors": 1,
              "totalPublications": 6,
              "totalCollects": 1
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x45ba-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-09-10T09:42:37.136Z",
          "profile": {
            "id": "0x45ba",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0xa6f36BB2885bDa7a6A7D541c25e98b03c576b133",
            "metadata": null,
            "isDefault": false,
            "handle": "gabrielaxy.test",
            "picture": {
              "original": {
                "url": "ipfs://bafybeidya62ib6dxmflnr63drbzncs6hejwxohluxwakx2javrw6ioxok4",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x2787a5fDD79939A0ee191F8Ec4989fD1e337Da7B",
            "dispatcher": {
              "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
            },
            "stats": {
              "totalFollowers": 2,
              "totalFollowing": 5,
              "totalPosts": 3,
              "totalComments": 1,
              "totalMirrors": 1,
              "totalPublications": 5,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x3675-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-07-08T17:03:44.539Z",
          "profile": {
            "id": "0x3675",
            "name": "Ram's channel",
            "bio": "Creating contents on web development @ramtest.test",
            "attributes": [
              {
                "displayType": "string",
                "traitType": "website",
                "key": "website",
                "value": "https://writeonce.dev"
              },
              {
                "displayType": "string",
                "traitType": "twitter",
                "key": "twitter",
                "value": "ram00759595"
              },
              {
                "displayType": "string",
                "traitType": "app",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x8CEd7e4DE83116697bC3B60984C99cc70686FAdB",
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmR3J4bYsNmaajxgf92Zs4ghz6z2b6ZH5RPW8RjYZB4ZNY",
            "isDefault": false,
            "handle": "ramtest.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmXJH9BiQ8tkv2rmQU98Rh1y33KT5yvFQvFkCkaWXpdBpv",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmNbkUtYACajuKk7zTyw5V1u6aQCaA3YUCi49u6kYqzrx6",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x81FE4D2f3348E5422B649706df64466Ad0Ac65cB",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 5,
              "totalFollowing": 20,
              "totalPosts": 43,
              "totalComments": 14,
              "totalMirrors": 2,
              "totalPublications": 59,
              "totalCollects": 12
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
                "value": "2.0"
              },
              "recipient": "0x81FE4D2f3348E5422B649706df64466Ad0Ac65cB"
            }
          }
        },
        {
          "reactionId": "UPVOTE-0x2f-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-07-08T15:06:47.006Z",
          "profile": {
            "id": "0x2f",
            "name": "Sasi",
            "bio": "creator of lenstube.xyz",
            "attributes": [
              {
                "displayType": "string",
                "traitType": "website",
                "key": "website",
                "value": "https://sasi.codes"
              },
              {
                "displayType": "string",
                "traitType": "twitter",
                "key": "twitter",
                "value": "sasicodes"
              },
              {
                "displayType": "string",
                "traitType": "app",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x892f2077f1fAc7044FaA236A9530F38CF53206f6",
            "metadata": "https://arweave.net/WG2jrPK2h7cDSitAzwu8PspxFDFp2hLYNFU0wOL9KrQ",
            "isDefault": false,
            "handle": "sasicodes.test",
            "picture": {
              "original": {
                "url": "ipfs://bafkreicoufxi7em44m3z2rbgebr3ewrawovnewmprnncnsnubnrtrr5x64",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
            "dispatcher": {
              "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
            },
            "stats": {
              "totalFollowers": 53,
              "totalFollowing": 15,
              "totalPosts": 364,
              "totalComments": 185,
              "totalMirrors": 78,
              "totalPublications": 627,
              "totalCollects": 191
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
              "recipient": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464"
            }
          }
        },
        {
          "reactionId": "UPVOTE-0x380c-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-30T10:33:21.487Z",
          "profile": {
            "id": "0x380c",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "fantomdegen.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/fantomdegen.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x2a06913D5b8748b222E1236768C24ca19198B374",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 6,
              "totalPosts": 0,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 0,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x3708-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-29T06:55:18.814Z",
          "profile": {
            "id": "0x3708",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "rjann.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/rjann.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x66bE827847F68cbb6C2C0D25BA187AF06E7da2CD",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 0,
              "totalComments": 2,
              "totalMirrors": 0,
              "totalPublications": 2,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x3435-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-25T03:20:49.632Z",
          "profile": {
            "id": "0x3435",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x4a8Aa78950aBeF17C4F6F181Deb00A16CA35Cc33",
            "metadata": null,
            "isDefault": false,
            "handle": "lensweb3.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/lensweb3.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x9010F1450aDF66B099cbD8BE193dF2488CF3fA1F",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 1,
              "totalPosts": 2,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 3,
              "totalCollects": 1
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x341b-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-24T15:55:17.050Z",
          "profile": {
            "id": "0x341b",
            "name": "Z Series",
            "bio": "for fun",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmQErYdEu3ZEnRKHrP8Afi6uPDaX4NZ38XSCS5QozLut2R",
            "isDefault": false,
            "handle": "epics.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmPTTGJYRvqXq94umbe7rXqxSGCrUmjykKQAAg8xTHrJvN",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmXGHyD9nbznjXWZPt1VU2o3QpSTKrBrMZkuHNpTVF7Jkk",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x3c89C10490368f2180d583a530E4d2DE8e35e4EE",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 1,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x3414-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-24T15:32:04.788Z",
          "profile": {
            "id": "0x3414",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "vladyan.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/vladyan.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0xA734a2DE4578b49749Ff1D17F23D37a31c9C9955",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 0,
              "totalPosts": 1,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x33ca-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-24T07:52:35.783Z",
          "profile": {
            "id": "0x33ca",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "ayaan.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/ayaan.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x758825be077634172956158482E7Fbff4Fc5679B",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 2,
              "totalPosts": 0,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x2ea1-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-24T06:48:13.389Z",
          "profile": {
            "id": "0x2ea1",
            "name": "0xTang",
            "bio": "动漫爱好者！",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "website",
                "value": "https://twitter.com/CryptoTangCN"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "twitter",
                "value": "https://twitter.com/CryptoTangCN"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x608477A091D949D1Cc32baB8b7A2c67A3B856571",
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmYb8WvZxUUbAJtVrCTXLPYMhbLMkm7P6rL17qoK337eTQ",
            "isDefault": false,
            "handle": "0xtang.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/0xtang.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x4cc395AB5546E2Bb42a5454A53c86370EE084A52",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 4,
              "totalPosts": 2,
              "totalComments": 1,
              "totalMirrors": 1,
              "totalPublications": 4,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x097c-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-24T05:47:55.532Z",
          "profile": {
            "id": "0x097c",
            "name": null,
            "bio": "Some random stuff",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "twitter",
                "value": "@Axpoker"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "Lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmRGrpRyuNEY9pr6KXcNcUWK72cG3vwTstPB1cRJk6f34A",
            "isDefault": false,
            "handle": "soyjeff.test",
            "picture": {
              "original": {
                "url": "https://avatars.dicebear.com/api/bottts/soyjeff.svg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmfZWk1dvGsT5ZHuGRbN8og3VM3uR4Xo12GrYP83KidrYb",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x109028eC6F566402A921dE2785636d246d0c1a0c",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 2,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 3,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x33a9-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T23:45:49.888Z",
          "profile": {
            "id": "0x33a9",
            "name": "eloweten",
            "bio": "MY CHNL",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmXfY6d4iNzMyuCuNEw3hghgfwZes86QwcrV5phAHtQZgQ",
            "isDefault": false,
            "handle": "eloweten.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmWhnmGLfP4ke94xcuJchXkzgKvb6bFmBLF7hWBTKNTuJS",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmTZYa8cVvFMvEP9T1xXE6sDba2HAsh4JDywTm4ubCNxrF",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x01DDB26F7C215eD317B83cF0c0023DB7BD36117a",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 1,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 2,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x339d-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T18:04:26.237Z",
          "profile": {
            "id": "0x339d",
            "name": "xyfyn",
            "bio": "random videos.",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "twitter",
                "value": "@xyfyn"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmauHY4Vr2vUvdcdJgz1EJHTwjp64MeyFhrYzZcUskfhh2",
            "isDefault": false,
            "handle": "xyfyn.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmUv9zCGZnzEkkPcyaTzkwL4zBxq8NkLH3XsVTMsvn6Gvr",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmemHS2dpeNmJfNVVf8zXHTxiB3ccwKVGW4q7cLA2qjcw6",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x1c0243788F08b0eC6c0977d564fe0c64F13e0C9b",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 4,
              "totalPosts": 2,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 3,
              "totalCollects": 1
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x338e-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T16:05:45.205Z",
          "profile": {
            "id": "0x338e",
            "name": "Uncle bear",
            "bio": "To find about something new",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmZ9Tg8ShxCPLujCxPw6rrgCifJQdAzk7k3cGANa1p9L18",
            "isDefault": false,
            "handle": "bounce.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/Qmd4HDHXEixUngZ8RUL4oZzSpexKPG1kjkAw2bCcpKNQPe",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmdR3jtNAUKpkXynhK18iQEX9JCtNghYs9jLza7vSoL9ob",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x83aFc53f479Ca6b7AB634F1f815FF3f0E0dca096",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 1,
              "totalComments": 2,
              "totalMirrors": 0,
              "totalPublications": 3,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x1c1c-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T14:11:23.537Z",
          "profile": {
            "id": "0x1c1c",
            "name": null,
            "bio": "Trader",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "website",
                "value": "http://twitter.com/Giang45067283"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "twitter",
                "value": "@Giang45067283"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "Lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmWpUTWVHLrx6j2YJyeYoHZ71F79W8vqzbpyqa3yKGqMGx",
            "isDefault": false,
            "handle": "clearlove.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/clearlove.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x2F2b1DE6fe0f64b20Bc02E0D135724C64Ae509dC",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 0,
              "totalPosts": 4,
              "totalComments": 2,
              "totalMirrors": 0,
              "totalPublications": 6,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x2e-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T13:45:48.682Z",
          "profile": {
            "id": "0x2e",
            "name": "sasi.eth",
            "bio": "https://testnet.lenstube.xyz/sasidharan.test",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "website",
                "value": "https://sasi.codes"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "twitter",
                "value": "sasicodes"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x02ba79D5C54Cecef46483b987fAcF91700547019",
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmTmbQYpVCubcRnQfTnRwmZcJ76iAqjPdT9RBMuCscG63a",
            "isDefault": false,
            "handle": "sasidharan.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmXGoeBsAyaFXaz3Z1CDtGWczakhaWPcDbBqCM4YqgkXpw",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0xa8535b8049948bE1bFeb1404daEabbD407792411",
            "dispatcher": {
              "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
            },
            "stats": {
              "totalFollowers": 4,
              "totalFollowing": 1,
              "totalPosts": 23,
              "totalComments": 5,
              "totalMirrors": 3,
              "totalPublications": 31,
              "totalCollects": 4
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x32ff-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T08:03:34.889Z",
          "profile": {
            "id": "0x32ff",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "sarfarazahmed.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/sarfarazahmed.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x4aB4bcA921FEf23A34c700d9E2f20a68401bF049",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 0,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x32e5-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T06:54:42.579Z",
          "profile": {
            "id": "0x32e5",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": "0x0d9d34995EFf3f144A1A2BDC7a0a9A1762E12D88",
            "metadata": null,
            "isDefault": false,
            "handle": "dgreatest.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/dgreatest.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0xe3a244EecFBC928e12B83252224B48F84E0a27C4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 1,
              "totalFollowing": 2,
              "totalPosts": 2,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 2,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x32df-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T06:40:26.209Z",
          "profile": {
            "id": "0x32df",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "coolajay.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/coolajay.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x4074d42Cee2EcAa011414Ddb2D36EFfee4D23dA9",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 2,
              "totalPosts": 0,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x1e9b-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T06:36:37.284Z",
          "profile": {
            "id": "0x1e9b",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "lenschanel.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/lenschanel.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0xBaa94A36Da956390207521DcA8493Bab196b9DD4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 4,
              "totalPosts": 4,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 5,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x329b-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T04:52:52.266Z",
          "profile": {
            "id": "0x329b",
            "name": "Salo",
            "bio": "Crypto trader, investor",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmWFsaRdW3XzszNK6DUwhoqRtopJnL83chvzsWjt4yfhai",
            "isDefault": false,
            "handle": "kriptomankalens.test",
            "picture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmUmd2gh9U2nZ9wyMHUuh6GXfb5QaFpiQSauu91USQnDGZ",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://lens.infura-ipfs.io/ipfs/QmdSY2vMLCcJrvLy95KKX1LpHQz8b4FaaphEY7AKFNWNk1",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x5371CAD18FE79EFecDf093f498719439fe9E53E4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 4,
              "totalPosts": 1,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 1,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x329c-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T04:49:32.353Z",
          "profile": {
            "id": "0x329c",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "motivate.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/motivate.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0x5B993CAd70b3Cd0856Ef71cAE270eec88A51FFA4",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 0,
              "totalComments": 4,
              "totalMirrors": 0,
              "totalPublications": 4,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x0e76-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-23T02:39:40.200Z",
          "profile": {
            "id": "0x0e76",
            "name": "straitchain",
            "bio": "about straitchain information",
            "attributes": [
              {
                "displayType": null,
                "traitType": "string",
                "key": "website",
                "value": "https://www.straitchain.com/"
              },
              {
                "displayType": null,
                "traitType": "string",
                "key": "app",
                "value": "lenstube"
              }
            ],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": "https://lens.infura-ipfs.io/ipfs/QmRPbuM8LDEDKQR8DExnjTav7pUcgjF5TkTNM4naZQZdvc",
            "isDefault": false,
            "handle": "harry.test",
            "picture": {
              "original": {
                "url": "https://avatars.dicebear.com/api/bottts/harry.svg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": {
              "original": {
                "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "ownedBy": "0x99b4c88ff35D2C62529C7D91B6eaC89E2df0357A",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 1,
              "totalComments": 3,
              "totalMirrors": 0,
              "totalPublications": 4,
              "totalCollects": 0
            },
            "followModule": null
          }
        },
        {
          "reactionId": "UPVOTE-0x3265-0x01-0x01",
          "reaction": "UPVOTE",
          "reactionAt": "2022-06-22T18:28:55.298Z",
          "profile": {
            "id": "0x3265",
            "name": null,
            "bio": null,
            "attributes": [],
            "isFollowedByMe": false,
            "isFollowing": false,
            "followNftAddress": null,
            "metadata": null,
            "isDefault": false,
            "handle": "lrmmdc.test",
            "picture": {
              "original": {
                "url": "https://avatar.tobi.sh/lrmmdc.png",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            },
            "coverPicture": null,
            "ownedBy": "0xcF80D9106dc6d1079588A7d1fD477C58804b145B",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 0,
              "totalFollowing": 1,
              "totalPosts": 1,
              "totalComments": 1,
              "totalMirrors": 0,
              "totalPublications": 2,
              "totalCollects": 0
            },
            "followModule": null
          }
        }
      ],
      "pageInfo": {
        "prev": "{\"entityIdentifier\":\"UPVOTE-0x45da-0x01-0x01\",\"timestamp\":1663024289,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"entityIdentifier\":\"UPVOTE-0x3265-0x01-0x01\",\"timestamp\":1655922535,\"cursorDirection\":\"AFTER\"}",
        "totalCount": 161
      }
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.reactions.toPublication({
  publicationId: '0x05-0x04',
});
```