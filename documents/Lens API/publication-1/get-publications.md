---
title: "Get publications"
slug: "get-publications"
hidden: false
createdAt: "2022-02-18T11:30:00.617Z"
updatedAt: "2023-03-16T15:22:53.990Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/get-publications.ts>

> 🚧 If the user is logged in pass in the auth token as it fix some UX issues with comment ordering

This query returns a list of publications based on your request query. Remember, posts, comments and mirrors are all publications. 

# API Design

We have ML ranking on the comments to allow the more relevant comments to appear at the top. By default, this is on, but you can decide to go to normal descending ordering by passing in `commentsOfOrdering`as `DESC`. We will continue improving this ML code to make it better and better. If your app uses this it just inherits this ML work. 

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract. It is a counter per each profile. So if @josh posts a publication, that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

> 📘 Use the GraphQL schema...
> 
> One of the huge advantages of GraphQL is that you have a schema that should explain how the schema should look at what properties exist in that. In these docs, we explore code examples and explain key concepts, but we will not explain each property that exists in the response for example, as the schema already does that!

```javascript Example operation
query Publications {
  publications(request: {
    profileId: "0x01",
    publicationTypes: [POST, COMMENT, MIRROR],
    limit: 10
  }) {
    items {
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
    pageInfo {
      prev
      next
      totalCount
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
  totalDownvotes
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
    "publications": {
      "items": [
        {
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
      ],
      "pageInfo": {
        "prev": "{\"entityIdentifier\":\"0x01-0x01\",\"timestamp\":1644486646,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"entityIdentifier\":\"0x01-0x01\",\"timestamp\":1644486646,\"cursorDirection\":\"AFTER\"}",
        "totalCount": 1
      }
    }
  }
}
```
```javascript Query interface
type Query {
	publications(request: PublicationsQueryRequest!): PaginatedPublicationResult!
}
```



You will see the paging result behaviour repeated a lot in the API, this is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result, you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result, you can pass this previous and next cursor in the request cursor property. 

## Request

Let's look at the query options we can use here to get a lot of data for different things. 

```json Get comments of a publication
// This returns you the publication comments for publication 0x01-0x01
{
    "commentsOf": "0x01-0x01",
    "commentsOfOrdering": "RANKING",
    // we highly suggest on the comment section you show the "relevant" first and
    // the "none-relevant" are hidden away and can be showed with a "more" or a tab section UX
    // this allows the most relevant comments to be seen
    // the spam comments being a bit more out of sight
    "commentsRankingFilter: "RELEVANT"
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
 }
```
```json Get publications by profile id
// This returns you the publications for 0x01 profile filtered by the
// the publication types you requested - super cool query!
{
    "profileId": "0x01",
     // you can filter the publication types along side it
    "publicationTypes": ["POST", "COMMENT", "MIRROR"]
    // also dont forget you can filter these queries on sources (appId) as well
    // "sources": ["lost-place-dapp"]
 }
```
```json Get publications by collected by wallet address
// This returns you the publications that the `collectedBy` ethereum address 
// has collected.
{
    "collectedBy": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
    // you can filter the publication types along side it
    "publicationTypes": ["POST", "COMMENT"],
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
 }
```
```json Get publications by publication id
// This returns you the publications for given publication ids.
{
    // if you query a internal publication id which does not exist
    // then it just will not be returned in the response
    "publicationIds": ["0x12-0x02", "0x12-0x03"],
    // also dont forget you can filter these queries on sources as well
    // "sources": ["lost-place-dapp"]
 }
```



Please note you can only supply one of these if you supply more than one the API will throw. We have to do it this way with optional parameters as GraphQL does not support unions on request yet.





# 

# Using LensClient SDK

```typescript
const result = await lensClient.publication.fetchAll(request: PublicationsQueryRequest);

type PublicationsQueryRequest = {
  /** The ethereum address */
  collectedBy?: InputMaybe<Scalars['EthereumAddress']>;
  /** The publication id you wish to get comments for */
  commentsOf?: InputMaybe<Scalars['InternalPublicationId']>;
  /** The comment ordering type - only used when you use commentsOf */
  commentsOfOrdering?: InputMaybe<CommentOrderingTypes>;
  /** The comment ranking filter, you can use  - only used when you use commentsOf + commentsOfOrdering=ranking */
  commentsRankingFilter?: InputMaybe<CommentRankingFilter>;
  cursor?: InputMaybe<Scalars['Cursor']>;
  customFilters?: InputMaybe<Array<CustomFiltersTypes>>;
  limit?: InputMaybe<Scalars['LimitScalar']>;
  metadata?: InputMaybe<PublicationMetadataFilters>;
  /** Profile id */
  profileId?: InputMaybe<Scalars['ProfileId']>;
  /** Profile ids */
  profileIds?: InputMaybe<Array<Scalars['ProfileId']>>;
  /** The publication id */
  publicationIds?: InputMaybe<Array<Scalars['InternalPublicationId']>>;
  /** The publication types you want to query */
  publicationTypes?: InputMaybe<Array<PublicationTypes>>;
  /** The App Id */
  sources?: InputMaybe<Array<Scalars['Sources']>>;
};
```