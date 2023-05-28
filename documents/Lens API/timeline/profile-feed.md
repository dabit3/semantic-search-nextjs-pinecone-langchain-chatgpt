---
title: "Profile feed"
slug: "profile-feed"
hidden: false
createdAt: "2022-10-11T16:40:24.511Z"
updatedAt: "2023-03-31T14:18:50.940Z"
---
> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Feed is one of the most fundamental elements that a successful social media site needs. It can be used to show the user what is happening on the social feeds of people they follow and what they like. The feed queries will get smarter, eventually bringing in AI and data profiling. We will continue to improve what data is returned by the API. The beauty of this is if you use the API you just inherit this functionality without having to update anything. This also is fully open so if you wish to see someone else's feed just supply their profile id in!

# What the feed brings back

## Post

If one of the profiles you follow posts it will appear on your timeline.

## Comment

If one of the profiles you follow comments on a publication it will appear on your timeline.

## Mirror

If one of the profiles you follow mirrors a publication it will appear in your timeline. Remember people can mirror a post or a comment. 

## Collected

If one of the profiles you follow collects a post or a comment it will appear on your timeline.

# API Design

Below is an example of a request to get a feed for a profile. Feeds are fully open so anyone can see what another profile's feed looks like. This is also aggregated per page so you do not see repeated data, you will of course always get some loop over but that is the same on big social media sites. The main aim is for you to see all the information nicely. We talk about the response in more detail below. Please note the limit is the number of EVENTS you get back it is not the total count of aggregate lines. For example, if you asked for 5 and that all have been aggregated into one feed item you only get 1 back, we advise you to use a limit of 50 for this which should give plenty of information for the user to see and page nicely.

```javascript Example operation
query Feed {
  feed(request: { profileId: "0x1b", limit: 50 }) {
    items {
      root {
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
      }
      electedMirror {
        mirrorId
        profile {
          id
          handle
        }
        timestamp
      }
      mirrors {
        profile {
          id
          handle
        }
        timestamp
      }
      collects {
        profile {
          id
          handle
        }
        timestamp
      }
      reactions {
        profile {
          id
          handle
        }
        reaction
        timestamp
      }
      comments {
        ...CommentFields
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

  collectedBy {

    ...WalletFields

  }

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

  collectedBy {

    ...WalletFields

  }

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

fragment WalletFields on Wallet {

   address,

   defaultProfile {

    ...ProfileFields

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
```json Example response
{
  "data": {
    "feed": {
      "items": [
        {
          "root": {
            "id": "0x06-0x02",
            "profile": {
              "id": "0x06",
              "name": null,
              "bio": null,
              "attributes": [],
              "isFollowedByMe": true,
              "isFollowing": false,
              "followNftAddress": "0x4950D4cC58055341Ed88A106563C447D1Ee0dE56",
              "metadata": null,
              "isDefault": true,
              "handle": "davidev.test",
              "picture": null,
              "coverPicture": null,
              "ownedBy": "0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4",
              "dispatcher": {
                "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
              },
              "stats": {
                "totalFollowers": 43,
                "totalFollowing": 0,
                "totalPosts": 4,
                "totalComments": 1,
                "totalMirrors": 1,
                "totalPublications": 6,
                "totalCollects": 5
              },
              "followModule": null
            },
            "stats": {
              "totalAmountOfMirrors": 2,
              "totalAmountOfCollects": 2,
              "totalAmountOfComments": 2
            },
            "metadata": {
              "name": "Post by @davidev.test",
              "description": "test",
              "content": "test",
              "media": [],
              "attributes": [
                {
                  "displayType": null,
                  "traitType": "string",
                  "value": "post"
                }
              ]
            },
            "createdAt": "2022-09-27T16:51:38.000Z",
            "collectModule": {
              "__typename": "FreeCollectModuleSettings",
              "type": "FreeCollectModule",
              "followerOnly": false,
              "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
            },
            "referenceModule": null,
            "appId": "lenster",
            "collectedBy": null,
            "hidden": false,
            "reaction": null,
            "mirrors": [],
            "hasCollectedByMe": false
          },
          "electedMirror": {
            "mirrorId": "0x06-0x05",
            "profile": {
              "id": "0x06",
              "handle": "davidev.test"
            },
            "timestamp": "2022-10-10T16:28:05.000Z"
          },
          "mirrors": [
            {
              "profile": {
                "id": "0x06",
                "handle": "davidev.test"
              },
              "timestamp": "2022-10-10T16:28:05.000Z"
            }
          ],
          "collects": [],
          "reactions": [],
          "comments": [
            {
              "id": "0x06-0x06",
              "profile": {
                "id": "0x06",
                "name": null,
                "bio": null,
                "attributes": [],
                "isFollowedByMe": true,
                "isFollowing": false,
                "followNftAddress": "0x4950D4cC58055341Ed88A106563C447D1Ee0dE56",
                "metadata": null,
                "isDefault": true,
                "handle": "davidev.test",
                "picture": null,
                "coverPicture": null,
                "ownedBy": "0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4",
                "dispatcher": {
                  "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
                },
                "stats": {
                  "totalFollowers": 43,
                  "totalFollowing": 0,
                  "totalPosts": 4,
                  "totalComments": 1,
                  "totalMirrors": 1,
                  "totalPublications": 6,
                  "totalCollects": 5
                },
                "followModule": null
              },
              "stats": {
                "totalAmountOfMirrors": 0,
                "totalAmountOfCollects": 0,
                "totalAmountOfComments": 1
              },
              "metadata": {
                "name": "Comment by @davidev.test",
                "description": "josh asked nicely, so i am commenting.\n\nthanks josh",
                "content": "josh asked nicely, so i am commenting.\n\nthanks josh",
                "media": [],
                "attributes": []
              },
              "createdAt": "2022-10-10T16:33:36.000Z",
              "collectModule": {
                "__typename": "FreeCollectModuleSettings",
                "type": "FreeCollectModule",
                "followerOnly": false,
                "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
              },
              "referenceModule": null,
              "appId": "lenster",
              "collectedBy": null,
              "hidden": false,
              "reaction": null,
              "mirrors": [],
              "hasCollectedByMe": false,
              "mainPost": {
                "id": "0x06-0x02",
                "profile": {
                  "id": "0x06",
                  "name": null,
                  "bio": null,
                  "attributes": [],
                  "isFollowedByMe": true,
                  "isFollowing": false,
                  "followNftAddress": "0x4950D4cC58055341Ed88A106563C447D1Ee0dE56",
                  "metadata": null,
                  "isDefault": true,
                  "handle": "davidev.test",
                  "picture": null,
                  "coverPicture": null,
                  "ownedBy": "0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4",
                  "dispatcher": {
                    "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
                  },
                  "stats": {
                    "totalFollowers": 43,
                    "totalFollowing": 0,
                    "totalPosts": 4,
                    "totalComments": 1,
                    "totalMirrors": 1,
                    "totalPublications": 6,
                    "totalCollects": 5
                  },
                  "followModule": null
                },
                "stats": {
                  "totalAmountOfMirrors": 2,
                  "totalAmountOfCollects": 2,
                  "totalAmountOfComments": 2
                },
                "metadata": {
                  "name": "Post by @davidev.test",
                  "description": "test",
                  "content": "test",
                  "media": [],
                  "attributes": [
                    {
                      "displayType": null,
                      "traitType": "string",
                      "value": "post"
                    }
                  ]
                },
                "createdAt": "2022-09-27T16:51:38.000Z",
                "collectModule": {
                  "__typename": "FreeCollectModuleSettings",
                  "type": "FreeCollectModule",
                  "followerOnly": false,
                  "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
                },
                "referenceModule": null,
                "appId": "lenster",
                "collectedBy": null,
                "hidden": false,
                "reaction": null,
                "mirrors": [],
                "hasCollectedByMe": false
              }
            }
          ]
        },
        {
          "root": {
            "id": "0x2f-0x01f4",
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
                  "traitType": "location",
                  "key": "location",
                  "value": "India"
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
              "isFollowedByMe": true,
              "isFollowing": false,
              "followNftAddress": "0x892f2077f1fAc7044FaA236A9530F38CF53206f6",
              "metadata": "https://arweave.net/yN7RHvK1ln3xW_nhCmBuh-d34-ROu73uBhKmh660bQA",
              "isDefault": true,
              "handle": "sasicodes.test",
              "picture": {
                "original": {
                  "url": "ipfs://bafkreidippdvp2ukyzzjtp5ykggvrr5ujrivf47f5p3bec6fyzkdfins7u",
                  "mimeType": null
                }
              },
              "coverPicture": {
                "original": {
                  "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                  "mimeType": null
                }
              },
              "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
              "dispatcher": {
                "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
              },
              "stats": {
                "totalFollowers": 54,
                "totalFollowing": 14,
                "totalPosts": 266,
                "totalComments": 141,
                "totalMirrors": 69,
                "totalPublications": 476,
                "totalCollects": 200
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
            },
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "teststst",
              "description": "",
              "content": "teststst",
              "media": [
                {
                  "original": {
                    "url": "https://arweave.net/p232ty-xtV2WlVocCfrakKi5lCPtVv3iR9ULnhyT_bY",
                    "mimeType": "video/mp4"
                  }
                }
              ],
              "attributes": [
                {
                  "displayType": "string",
                  "traitType": "publication",
                  "value": "video"
                },
                {
                  "displayType": "string",
                  "traitType": "handle",
                  "value": "sasicodes.test"
                },
                {
                  "displayType": "string",
                  "traitType": "app",
                  "value": "lenstube"
                },
                {
                  "displayType": "string",
                  "traitType": "durationInSeconds",
                  "value": "27.89"
                }
              ]
            },
            "createdAt": "2022-10-09T08:12:46.000Z",
            "collectModule": {
              "__typename": "FreeCollectModuleSettings",
              "type": "FreeCollectModule",
              "followerOnly": false,
              "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
            },
            "referenceModule": null,
            "appId": "lenstube",
            "collectedBy": null,
            "hidden": false,
            "reaction": null,
            "mirrors": [],
            "hasCollectedByMe": false
          },
          "electedMirror": null,
          "mirrors": [],
          "collects": [],
          "reactions": [],
          "comments": []
        },
        {
          "root": {
            "id": "0x2f-0x01f3",
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
                  "traitType": "location",
                  "key": "location",
                  "value": "India"
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
              "isFollowedByMe": true,
              "isFollowing": false,
              "followNftAddress": "0x892f2077f1fAc7044FaA236A9530F38CF53206f6",
              "metadata": "https://arweave.net/yN7RHvK1ln3xW_nhCmBuh-d34-ROu73uBhKmh660bQA",
              "isDefault": true,
              "handle": "sasicodes.test",
              "picture": {
                "original": {
                  "url": "ipfs://bafkreidippdvp2ukyzzjtp5ykggvrr5ujrivf47f5p3bec6fyzkdfins7u",
                  "mimeType": null
                }
              },
              "coverPicture": {
                "original": {
                  "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                  "mimeType": null
                }
              },
              "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
              "dispatcher": {
                "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
              },
              "stats": {
                "totalFollowers": 54,
                "totalFollowing": 14,
                "totalPosts": 266,
                "totalComments": 141,
                "totalMirrors": 69,
                "totalPublications": 476,
                "totalCollects": 200
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
            },
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "dasdads",
              "description": "",
              "content": "dasdads",
              "media": [
                {
                  "original": {
                    "url": "https://arweave.net/cwFS6M_jx6BxU-CRBTIZ3fCVW7wZBQG3Zupo8mZeoQo",
                    "mimeType": "video/mp4"
                  }
                }
              ],
              "attributes": [
                {
                  "displayType": "string",
                  "traitType": "publication",
                  "value": "video"
                },
                {
                  "displayType": "string",
                  "traitType": "handle",
                  "value": "sasicodes.test"
                },
                {
                  "displayType": "string",
                  "traitType": "app",
                  "value": "lenstube"
                },
                {
                  "displayType": "string",
                  "traitType": "durationInSeconds",
                  "value": "44.50"
                }
              ]
            },
            "createdAt": "2022-10-09T08:08:30.000Z",
            "collectModule": {
              "__typename": "FreeCollectModuleSettings",
              "type": "FreeCollectModule",
              "followerOnly": false,
              "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
            },
            "referenceModule": null,
            "appId": "lenstube",
            "collectedBy": null,
            "hidden": false,
            "reaction": null,
            "mirrors": [],
            "hasCollectedByMe": false
          },
          "electedMirror": null,
          "mirrors": [],
          "collects": [],
          "reactions": [],
          "comments": []
        },
        {
          "root": {
            "id": "0x2f-0x01f2",
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
                  "traitType": "location",
                  "key": "location",
                  "value": "India"
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
              "isFollowedByMe": true,
              "isFollowing": false,
              "followNftAddress": "0x892f2077f1fAc7044FaA236A9530F38CF53206f6",
              "metadata": "https://arweave.net/yN7RHvK1ln3xW_nhCmBuh-d34-ROu73uBhKmh660bQA",
              "isDefault": true,
              "handle": "sasicodes.test",
              "picture": {
                "original": {
                  "url": "ipfs://bafkreidippdvp2ukyzzjtp5ykggvrr5ujrivf47f5p3bec6fyzkdfins7u",
                  "mimeType": null
                }
              },
              "coverPicture": {
                "original": {
                  "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                  "mimeType": null
                }
              },
              "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
              "dispatcher": {
                "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
              },
              "stats": {
                "totalFollowers": 54,
                "totalFollowing": 14,
                "totalPosts": 266,
                "totalComments": 141,
                "totalMirrors": 69,
                "totalPublications": 476,
                "totalCollects": 200
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
            },
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "teststt",
              "description": "",
              "content": "teststt",
              "media": [
                {
                  "original": {
                    "url": "https://arweave.net/Ix-BIWBILptT3UMRC_srj4WlI_vbyuY6pGpwB8B4taI",
                    "mimeType": "video/mp4"
                  }
                }
              ],
              "attributes": [
                {
                  "displayType": "string",
                  "traitType": "publication",
                  "value": "video"
                },
                {
                  "displayType": "string",
                  "traitType": "handle",
                  "value": "sasicodes.test"
                },
                {
                  "displayType": "string",
                  "traitType": "app",
                  "value": "lenstube"
                },
                {
                  "displayType": "string",
                  "traitType": "durationInSeconds",
                  "value": "44.50"
                }
              ]
            },
            "createdAt": "2022-10-09T08:06:40.000Z",
            "collectModule": {
              "__typename": "FreeCollectModuleSettings",
              "type": "FreeCollectModule",
              "followerOnly": false,
              "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
            },
            "referenceModule": null,
            "appId": "lenstube",
            "collectedBy": null,
            "hidden": false,
            "reaction": null,
            "mirrors": [],
            "hasCollectedByMe": false
          },
          "electedMirror": null,
          "mirrors": [],
          "collects": [],
          "reactions": [],
          "comments": []
        },
        {
          "root": {
            "id": "0x2f-0x01f1",
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
                  "traitType": "location",
                  "key": "location",
                  "value": "India"
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
              "isFollowedByMe": true,
              "isFollowing": false,
              "followNftAddress": "0x892f2077f1fAc7044FaA236A9530F38CF53206f6",
              "metadata": "https://arweave.net/yN7RHvK1ln3xW_nhCmBuh-d34-ROu73uBhKmh660bQA",
              "isDefault": true,
              "handle": "sasicodes.test",
              "picture": {
                "original": {
                  "url": "ipfs://bafkreidippdvp2ukyzzjtp5ykggvrr5ujrivf47f5p3bec6fyzkdfins7u",
                  "mimeType": null
                }
              },
              "coverPicture": {
                "original": {
                  "url": "https://assets.lenstube.xyz/images/coverGradient.jpeg",
                  "mimeType": null
                }
              },
              "ownedBy": "0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464",
              "dispatcher": {
                "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F"
              },
              "stats": {
                "totalFollowers": 54,
                "totalFollowing": 14,
                "totalPosts": 266,
                "totalComments": 141,
                "totalMirrors": 69,
                "totalPublications": 476,
                "totalCollects": 200
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
            },
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "sdasdasd",
              "description": "",
              "content": "sdasdasd",
              "media": [
                {
                  "original": {
                    "url": "https://arweave.net/2R2V770PHbmOgyvYyvk4NQxudR-cNYTgyhKWwvQtJQU",
                    "mimeType": "video/mp4"
                  }
                }
              ],
              "attributes": [
                {
                  "displayType": "string",
                  "traitType": "publication",
                  "value": "video"
                },
                {
                  "displayType": "string",
                  "traitType": "handle",
                  "value": "sasicodes.test"
                },
                {
                  "displayType": "string",
                  "traitType": "app",
                  "value": "lenstube"
                },
                {
                  "displayType": "string",
                  "traitType": "durationInSeconds",
                  "value": "44.50"
                }
              ]
            },
            "createdAt": "2022-10-09T07:55:58.000Z",
            "collectModule": {
              "__typename": "FreeCollectModuleSettings",
              "type": "FreeCollectModule",
              "followerOnly": false,
              "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c"
            },
            "referenceModule": null,
            "appId": "lenstube",
            "collectedBy": null,
            "hidden": false,
            "reaction": null,
            "mirrors": [],
            "hasCollectedByMe": false
          },
          "electedMirror": null,
          "mirrors": [],
          "collects": [],
          "reactions": [],
          "comments": []
        }
      ],
      "pageInfo": {
        "prev": "{\"entityIdentifier\":\"\",\"timestamp\":1665419616,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"entityIdentifier\":\"\",\"timestamp\":1665302158,\"cursorDirection\":\"AFTER\"}",
        "totalCount": null
      }
    }
  }
}
```



## Response

The response is aggregated for you to allow you to build really nice feeds. 

### root

This contains the feed item root which is a POST or a COMMENT, this is the main context around your feed item.

### electedMirror

When a user collects it should collect the elected mirror id so that the user can get some profits for the collect if referral fees are set. This is sharing the elected mirror what this means is the first person in that aggregation who mirrored is elected. 

**mirrorId** - the publication mirror id

**profile** - the profile who has got elected for this

**timestamp** - when that was mirrored

### mirrors

The profiles which have mirrored this publication in the aggregation. The first 1 in the array is the most recent profile to mirror. 

**profile** - the profile that mirrored 

**timestamp** - when that was mirrored

### collects

The profiles which have collected this publication in the aggregation. The first 1 in the array is the most recent profile that collected. 

**profile** - the profile collected

**timestamp** - when that profile collected

### comments

The comments were published to the publication in the aggregation. The first 1 in the array is the most recent comment.

# 

# Using LensClient SDK

```typescript
// lensClient is authenticated

const result = await lensClient.feed.fetch({
  profileId: '0x123'
});
     
// or
const result = await lensClient.feed.fetchHighlights({
  profileId: '0x123'
}),
```