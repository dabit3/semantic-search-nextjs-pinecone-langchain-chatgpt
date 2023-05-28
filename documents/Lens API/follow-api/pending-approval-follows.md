---
title: "Pending approval follows"
slug: "pending-approval-follows"
hidden: false
createdAt: "2022-02-18T11:28:31.800Z"
updatedAt: "2023-03-14T10:29:40.830Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/pending-approval-follows.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

To get around the issues with people being able to spam other people will a follower NFT we have brought in approval follows. Look at this situation:

- @josh follows @dodgy.profile
- @josh gets a follower NFT for @dodgy.profile
- @josh sends the follower NFT to @coolshoes wallet owner
- @coolshoes wallet owner now looks like they follow @dodgy.profile

You can see from the above how this could be a huge issue and with spam already a major thing on cheap transaction chains we do see this being a problem from day 1. 

To solve this we have a contract call called toggleFollow allowing you to move these from pending approvals to approved follows. 

- @josh follows @dodgy.profile
- @josh gets a follower NFT for @dodgy.profile
- @josh sends the follower NFT to @coolshoes
- The server removes that @josh follows @dodgy.profile from the indexer
- The server moves @coolshoes follows @dodgy.profile in an approval list 
- This now means @coolshoes needs to approve that they approve to follow this profile

This query returns all the pending approval follow NFT you have been sent and a way to show the user these so they can approve them.

# API Design

```javascript Example operation
query Followers {
  pendingApprovalFollows(request: { 
              limit: 10
             }) {
    items {
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
            mimeType
            height
            width
            url
          }
          small {
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
            width
            url
            height
            mimeType
          }
          small {
            height
            width
            url
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
    "pendingApprovalFollows": {
      "items": [
       {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
          "location": "UK",
          "website": "https://mumbai.polygonscan.com/",
          "twitter": "devjoshstevens",
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
          "picture": null,
          "handle": "josh.dev",
          "coverPicture": null,
          "ownedBy": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
          "depatcher": {
            "address": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
          },
          "stats": {
            "totalFollowers": 2,
            "totalFollowing": 1,
            "totalPosts": 1,
            "totalComments": 0,
            "totalMirrors": 0,
            "totalPublications": 1,
            "totalCollects": 6
          },
          "followModule": null
        }
      ],
      "pageInfo": {
        "prev": "{\"offset\":0}",
        "next": "{\"offset\":0}",
        "totalCount": 1
      }
    }
  }
}
```
```javascript Query interface
type Query {
   pendingApprovalFollows(
    request: PendingApprovalFollowsRequest!
  ): PendingApproveFollowsResult!
}
```



You will see the paging result behavior repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property.

# 

# Using LensClient SDK

```typescript
// lensClient is an authenticated instance of LensClient

// paginatedResult is a Result type
const paginatedResult = await lensClient.profile.pendingApprovalFollows();

```