---
title: "Following"
slug: "following"
hidden: false
createdAt: "2022-02-18T11:28:52.724Z"
updatedAt: "2023-03-14T10:32:40.835Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/following.ts>

This query returns all the profiles an Ethereum address is following

# API Design

```javascript Example operation
query Following {
  following(request: { 
                address: "0xD020E01C0c90Ab005A01482d34B808874345FD82",
              limit: 10
             }) {
    items {
      profile {
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
              width
              height
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
            small {
              url
              width
              height
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
              width
              height
              mimeType
            }
            small {
              width
              url
              height
              mimeType
            }
            medium {
              url
              width
              height
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
      totalAmountOfTimesFollowing
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
    "following": {
      "items": [
        {
          "profile": {
            "id": "0x09",
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
          	"isDefault": false,
            "handle": "keyboard",
            "picture": null,
            "coverPicture": null,
            "ownedBy": "0xFC88582d42a377cc0055660f86f6FEFe333cCC89",
            "dispatcher": null,
            "stats": {
              "totalFollowers": 10,
              "totalFollowing": 0,
              "totalPosts": 0,
              "totalComments": 0,
              "totalMirrors": 0,
              "totalPublications": 0,
              "totalCollects": 0
            },
            "followModule": null
          },
          "totalAmountOfTimesFollowing": 2
        },
        {
          "profile": {
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
          	"metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          	"isDefault": false,
            "handle": "foobar222",
            "picture": null,
            "coverPicture": null,
            "ownedBy": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
            "dispatcher": {
              "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
              "canUseRelay": false
            },
            "stats": {
              "totalFollowers": 6,
              "totalFollowing": 3,
              "totalPosts": 9,
              "totalComments": 0,
              "totalMirrors": 1,
              "totalPublications": 10,
              "totalCollects": 3
            },
            "followModule": null
          },
          "totalAmountOfTimesFollowing": 1
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":2}",
        "totalCount": 2
      }
    }
  }
}
```
```javascript Query interface
type Query {
  following(request: FollowingRequest!): PaginatedFollowingResult!
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property.





# 

# Using LensClient SDK

```typescript
const result = await lensClient.profile.allFollowing({
  address: "",
});

```