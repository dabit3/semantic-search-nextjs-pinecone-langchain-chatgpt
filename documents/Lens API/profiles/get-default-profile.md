---
title: "Get default profile"
slug: "get-default-profile"
hidden: false
createdAt: "2022-04-21T11:23:51.427Z"
updatedAt: "2023-03-15T17:48:03.772Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/get-default-profile.ts>

This query returns to you the default profile for the wallet. A wallet can own many profiles but can set a default similar to how ens works with its resolvers. 

# API Design

```javascript Example operation
query DefaultProfile {
  defaultProfile(request: { ethereumAddress: "0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3"}) {
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
```
```javascript Example response
{
  "data": {
    "defaultProfile": {
      "id": "0x0f",
      "name": null,
      "bio": null,
      "isDefault": true,
      "attributes": [],
      "followNftAddress": null,
      "metadata": null,
      "handle": "yoooo1",
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
}
```
```javascript Query interface
type Query {
  defaultProfile(request: DefaultProfileRequest!): Profile!
}
```



# 

# Using LensClient SDK

Despite that we offer the `defaultProfile` query, we recommend using `profiles` query with `ownedBy`argument. Using LensClient SDK you can achieve it easily as in the example below.

```typescript
const address = "0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2";
const allOwnedProfiles = await lensClient.profile.fetchAll({
  ownedBy: [address],
  limit: 1,
});

// defaultProfile is a ProfileFragment
const defaultProfile = allOwnedProfiles.items[0];
```