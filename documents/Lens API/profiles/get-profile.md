---
title: "Get profile"
slug: "get-profile"
hidden: false
createdAt: "2022-06-20T10:43:22.328Z"
updatedAt: "2023-03-15T17:50:01.376Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/get-profile.ts>

Get a single profile by `id` or `handle`

# API details

> 📘 Hot tip
> 
> If you do not know GraphQL that well remember things can be nullable if defined. In the schema how GraphQL knows it's nullable is without the `!` at the end here is an example:
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

```javascript Example response
{
  "data": {
    "profile": {
      "id": "0x01",
      "name": "LensProtocol.eth 🌿",
      "bio": "A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.",
      "attributes": [
        {
          "displayType": null,
          "traitType": "string",
          "key": "location",
          "value": "Developer Garden"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "website",
          "value": "https://lens.dev/"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "twitter",
          "value": "lensprotocol"
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
      "followNftAddress": "0x5832bE646A8a7A1A7a7843efD6B8165aC06e360D",
      "metadata": "ipfs://QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      "isDefault": false,
      "picture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "handle": "lensprotocol.test",
      "coverPicture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "ownedBy": "0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5",
      "dispatcher": null,
      "stats": {
        "totalFollowers": 2103,
        "totalFollowing": 0,
        "totalPosts": 2,
        "totalComments": 0,
        "totalMirrors": 0,
        "totalPublications": 2,
        "totalCollects": 1354
      },
      "followModule": null
    }
  }
}
```
```javascript Query interface
type Query { 
  profile(request: SingleProfileQueryRequest!): Profile!
}
```



## Get by profile id

```javascript Example operation
query Profile {
  profile(request: { profileId: "0x01" }) {
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
      __typename
    }
    handle
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
      __typename
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
            symbol
            name
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
    "profile": {
      "id": "0x01",
      "name": "LensProtocol.eth 🌿",
      "bio": "A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.",
      "attributes": [
        {
          "displayType": null,
          "traitType": "string",
          "key": "location",
          "value": "Developer Garden"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "website",
          "value": "https://lens.dev/"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "twitter",
          "value": "lensprotocol"
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
      "followNftAddress": "0x5832bE646A8a7A1A7a7843efD6B8165aC06e360D",
      "metadata": "ipfs://QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      "isDefault": false,
      "picture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "handle": "lensprotocol.test",
      "coverPicture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "ownedBy": "0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5",
      "dispatcher": null,
      "stats": {
        "totalFollowers": 2103,
        "totalFollowing": 0,
        "totalPosts": 2,
        "totalComments": 0,
        "totalMirrors": 0,
        "totalPublications": 2,
        "totalCollects": 1354
      },
      "followModule": null
    }
  }
}
```



## Get by handle

```javascript Example operation
query Profile {
  profile(request: { handle: "lensprotocol.test" }) {
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
      __typename
    }
    handle
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
      __typename
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
            symbol
            name
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
    "profile": {
      "id": "0x01",
      "name": "LensProtocol.eth 🌿",
      "bio": "A permissionless, composable, & decentralized social graph that makes building a Web3 social platform easy.",
      "attributes": [
        {
          "displayType": null,
          "traitType": "string",
          "key": "location",
          "value": "Developer Garden"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "website",
          "value": "https://lens.dev/"
        },
        {
          "displayType": null,
          "traitType": "string",
          "key": "twitter",
          "value": "lensprotocol"
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
      "followNftAddress": "0x5832bE646A8a7A1A7a7843efD6B8165aC06e360D",
      "metadata": "ipfs://QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
      "isDefault": false,
      "picture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "handle": "lensprotocol.test",
      "coverPicture": {
        "original": {
          "url": "https://ipfs.infura.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS",
          "mimeType": null
        },
        "__typename": "MediaSet"
      },
      "ownedBy": "0x6C77a5a88C0AE712BAeABE12FeA81532060dcBf5",
      "dispatcher": null,
      "stats": {
        "totalFollowers": 2103,
        "totalFollowing": 0,
        "totalPosts": 2,
        "totalComments": 0,
        "totalMirrors": 0,
        "totalPublications": 2,
        "totalCollects": 1354
      },
      "followModule": null
    }
  }
}
```



# 

# Using LensClient SDK

```typescript
const profileById = await lensClient.profile.fetch({
  profileId: '0x0635'
})

const profileByHandle = await lensClient.profile.fetch({
  handle: 'handle.test'
})
```