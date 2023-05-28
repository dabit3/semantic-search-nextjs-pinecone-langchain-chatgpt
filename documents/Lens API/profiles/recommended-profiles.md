---
title: "Recommended profiles"
slug: "recommended-profiles"
hidden: false
createdAt: "2022-02-17T11:38:34.974Z"
updatedAt: "2023-03-15T17:53:50.709Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/recommended-profiles.ts>

The API uses ML to populate people who we think you would like to follow. You can disable ML by using the `disableML` parameter if you wish to use basic curated profiles. It does not support a paging list as of yet. We continue to push these recommendations. By using this API, you inherit all improvements without changing the code.

# API details

```javascript Example operation
query RecommendedProfiles {
  recommendedProfiles {
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
    "recommendedProfiles": [
      {
        "id": "0x11",
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
        "picture": null,
        "handle": "hh",
        "coverPicture": null,
        "ownedBy": "0x5905232b8ea73f1F2FCBE4297573733bf41b666d",
        "dispatcher": null,
        "stats": {
          "totalFollowers": 2,
          "totalFollowing": 0,
          "totalPosts": 4,
          "totalComments": 0,
          "totalMirrors": 0,
          "totalPublications": 4,
          "totalCollects": 0
        },
        "followModule": null
      },
      {
        "id": "0x14",
        "name": null,
        "bio": null,
        "location": null,
        "website": null,
        "twitter": null,
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
        "handle": "lucasaave",
        "coverPicture": null,
        "ownedBy": "0x7953FE8b8cC7c6391683353aE016B9D90f072767",
        "depatcher": null,
        "stats": {
          "totalFollowers": 2,
          "totalFollowing": 0,
          "totalPosts": 0,
          "totalComments": 5,
          "totalMirrors": 0,
          "totalPublications": 5,
          "totalCollects": 0
        },
        "followModule": null
      },
      {
        "id": "0x06",
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
        "picture": null,
        "handle": "lucas",
        "coverPicture": null,
        "ownedBy": "0x6ea7c12CbB8480236716d1EEB0B31C2950166F3B",
        "dispatcher": null,
        "stats": {
          "totalFollowers": 2,
          "totalFollowing": 0,
          "totalPosts": 2,
          "totalComments": 1,
          "totalMirrors": 1,
          "totalPublications": 4,
          "totalCollects": 0
        },
        "followModule": null
      },
      {
        "id": "0x13",
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
        "picture": null,
        "handle": "pawelprofile",
        "coverPicture": null,
        "ownedBy": "0xb19C2890cf947AD3f0b7d7E5A9ffBce36d3f9bd2",
        "dispatcher": null,
        "stats": {
          "totalFollowers": 2,
          "totalFollowing": 8,
          "totalPosts": 3,
          "totalComments": 1,
          "totalMirrors": 0,
          "totalPublications": 4,
          "totalCollects": 0
        },
        "followModule": null
      },
      {
        "id": "0x01",
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
        "picture": null,
        "handle": "hey",
        "coverPicture": null,
        "ownedBy": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
        "dispatcher": null,
        "stats": {
          "totalFollowers": 2,
          "totalFollowing": 1,
          "totalPosts": 1,
          "totalComments": 0,
          "totalMirrors": 0,
          "totalPublications": 1,
          "totalCollects": 0
        },
        "followModule": null
      }
    ]
  }
}
```
```javascript Query interface
type Query { 
	recommendedProfiles: [Profile!]!
}
```



## Dismiss profile recommendations

You can use the following mutation to permanently dismiss one or more profile follow recommendations. Only authenticated users can call this, and any profileId provided will be permanently omitted from 'who to follow' recommendations.

```graphql Mutation
mutation DismissRecommendedProfiles {
  dismissRecommendedProfiles(request: {profileIds: ["0x01", "0x02"]})
}
```
```Text Example response
// returns null so no response
```





# 

# Using LensClient SDK

You can use LensClient SDK to fetch recommended profiles and dismiss them.

```typescript
// fetch recommendations
const recommendedProfiles = await lensClient.profile.allRecommended();

console.log(
  `Recommended profiles: `,
  recommendedProfiles.map((i) => ({ id: i.id, handle: i.handle }))
);

// dismiss
await lensClient.profile.dismissRecommended({ profileIds: [recommendedProfiles[0].id] });


```