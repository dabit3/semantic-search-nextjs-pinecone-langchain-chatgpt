---
title: "Get publication"
slug: "get-publication"
hidden: false
createdAt: "2022-02-18T11:30:10.353Z"
updatedAt: "2023-03-25T13:08:54.907Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/get-publication.ts>

This query returns to you the publication information. Remember posts, comments and mirrors are all publications. 

# API Design

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is you have a schema that should explain how the schema should look at what properties exist in that. In these docs we explore code examples and explain key concepts but we will not explain each property that exists in the response for example, as the schema already does that!

```javascript Example operation
query Publication {
  publication(request: {
    publicationId: "0x01-0x01"
  }) {
   __typename 
    ... on Post {
      ...PostFields
    }
    ... on Comment {
      ...CommentFields
    }
    ... on Mirror {
      ...MirrorFields
    }
  }
}

fragment MediaFields on Media {
  url
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

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
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

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}

```
```javascript Example response
{
  "data": {
    "publication": {
      "__typename": "Post",
      "id": "0x01-0x01",
      "profile": {
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
        "isFollowedByMe": false,
				"isFollowing": false,
        "followNftAddress": null,
        "metadata": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
        "isDefault": false,
        "handle": "hey",
        "picture": null,
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
      },
      "stats": {
        "totalAmountOfMirrors": 0,
        "totalAmountOfCollects": 0,
        "totalAmountOfComments": 0
      },
      "metadata": {
        "name": "",
        "description": "",
        "content": "Hello",
        "media": null,
        "attributes": []
      },
      "createdAt": "2022-02-10T09:50:46.000Z",
      "collectModule": {
        "__typename": "FreeCollectModuleSettings",
        "type": "FreeCollectModule"
      },
      "referenceModule": null,
      "appId": null,
      "hidden": false,
      "reaction": null,
      "mirrors": [],
			"hasCollectedByMe": false
    }
  }
}
```



> 📘 Hot tip
> 
> If you do not know GraphQL that well remember things can be nullable if defined as so in the schema how GraphQL knows its nullable is without the `!` at the end here is an example:
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

## Request

Let's look into the request a little more:

### publicationId

You can query the publication using the `internalPublicationId` and return information about the publication.

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

### txHash

There is a case where your user does a new post or comment or mirror and you send the transaction. At this point, you do not know the publication id without having to do some extra logic. This is the perfect time where you may want to query the publication by the `txHash` to get the publication and update your internal UI cache or something else. 

Please note you can only supply one of these if you supply more than one the API will throw. We have to do it this way with optional parameters as GraphQL does not support unions on request yet.

# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.fetch(request: PublicationQueryRequest);

type PublicationQueryRequest = {
  /** The publication id */
  publicationId?: InputMaybe<Scalars['InternalPublicationId']>;
  /** The tx hash */
  txHash?: InputMaybe<Scalars['TxHash']>;
};
```