---
title: "Get profiles"
slug: "get-profiles"
hidden: false
createdAt: "2022-02-17T11:38:16.384Z"
updatedAt: "2023-03-15T17:42:45.547Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/get-profiles.ts>

The profile query has a few different ways you can query the profiles. Using the power of GraphQL is super flexible and allows the same endpoint to be used in many different cases.

# API details

Below is the overview of the entire interface but we dig into specific queries below.

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
    "profiles": {
      "items": [
        {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
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
          "dispatcher": {
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
        "next": "{\"offset\":1}",
        "totalCount": 1
      }
    }
  }
}
```
```javascript Query interface
type Query { 
  profiles(request: ProfileQueryRequest!): PaginatedProfileResult!
}
```
```javascript Request
input ProfileQueryRequest {
  limit: Int
  cursor: Cursor

  # The profile ids
  profileIds: [ProfileId!]

  # The ethereum addresses
  ownedBy: [EthereumAddress!]

  # The handles for the profile
  handles: [Handle!]

  # The mirrored publication id
  whoMirroredPublicationId: InternalPublicationId
}
```



You will see the paging result behavior repeated a lot in the API; this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass these previous and next cursor in the request cursor property. 

Now you see the base query let's look at how we can use different request parameters to request profiles. 

## Get by profile ids

You can get the profiles by passing in an array of `profileIds` please note if you try to pass in the `ownedBy` or `handles or `whoMirroredPublicationId`alongside this you will get a`ValidationError\` thrown. The same will happen if you pass in an empty array.

```javascript Example operation
query Profiles {
  profiles(request: { profileIds: ["0x01"], limit: 10 }) {
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
    "profiles": {
      "items": [
        {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
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
          "dispatcher": {
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
        "next": "{\"offset\":1}",
        "totalCount": 1
      }
    }
  }
}
```



## Get by owned by

You can get the profiles by passing in an array of `ownedBy` which is an array of ethereum addresses, please note if you try to pass in the `profileIds` or `handles or `whoMirroredPublicationId`alongside this you will get a`ValidationError\` thrown. The same will happen if you pass in an empty array.

```javascript Example operation
query Profiles {
  profiles(request: { ownedBy: ["0xD020E01C0c90Ab005A01482d34B808874345FD82"], limit: 10 }) {
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
    "profiles": {
      "items": [
        {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
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
          "handle": "josh.test",
          "coverPicture": null,
          "ownedBy": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
          "dispatcher": {
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
        "next": "{\"offset\":1}",
        "totalCount": 1
      }
    }
  }
}
```



## Get by handles

You can get the profiles by passing in an array of `handles`, please note if you try to pass in the `profileIds` or `ownedByor `whoMirroredPublicationId`alongside this you will get a`ValidationError\` thrown. The same will happen if you pass in an empty array.

```javascript Example operation
query Profiles {
  profiles(request: { handles: ["josh.test"], limit: 1 }) {
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
    "profiles": {
      "items": [
        {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
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
          "handle": "josh.test",
          "coverPicture": null,
          "ownedBy": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
          "dispatcher": {
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
        "next": "{\"offset\":1}",
        "totalCount": 1
      }
    }
  }
}
```



## Get by who has mirrored a publication

You can get the profiles of who mirrored a publication using the `whoMirroredPublicationId`, please note if you try to pass in the `profileIds` or `ownedBy or `handles`alongside this you will get a`ValidationError\` thrown. 

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. The backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all responses and also used in any request you which to do.

```javascript Example operation
query Profiles {
  profiles(request: { whoMirroredPublicationId: "0x09-0x01", limit: 10 }) {
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
        __typename
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
    "profiles": {
      "items": [
        {
          "id": "0x01",
          "name": "Josh",
          "bio": "Amazing docs",
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
          "dispatcher": {
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
        "next": "{\"offset\":1}",
        "totalCount": 1
      }
    }
  }
}
```





# 

# Using LensClient SDK

```typescript
// by profileIds
const profilesById = await lensClient.profile.fetchAll({
  profileIds: ["0x0635"],
});

console.log(
  `Profiles fetched by ids: `,
  profilesById.items.map((i) => ({ id: i.id, handle: i.handle }))
);

// by ownedBy
const address = "0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2";
const allOwnedProfiles = await lensClient.profile.fetchAll({
  ownedBy: [address],
});

console.log(
  `Profiles owned by ${address}: `,
  allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle }))
);

// by handles
const profilesByHandle = await lensClient.profile.fetchAll({
  handles: ["pukkynext.test"],
});

console.log(
  `Profiles fetched by handles: `,
  profilesByHandle.items.map((i) => ({ id: i.id, handle: i.handle }))
);

// by whoMirroredPublicationId
const profilesWhoMirroredPublicationId = await lensClient.profile.fetchAll({
  whoMirroredPublicationId: "0x0635-0x0f",
});

console.log(
  `Profiles who mirrored publication: `,
  profilesWhoMirroredPublicationId.items.map((i) => ({ id: i.id, handle: i.handle }))
);

```