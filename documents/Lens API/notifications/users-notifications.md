---
title: "Users notifications"
slug: "users-notifications"
hidden: false
createdAt: "2022-02-18T11:29:40.844Z"
updatedAt: "2023-04-11T17:54:17.809Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/notifications/users-notifications.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Get notifications of actions occurring on Lens Protocol.

The notifications bring back:

- mirrored posts on your publication (post/comments)
- mirrored comments on your publication (post/comments)
- comments on your publication (post/comments)
- collects on your publications (post/comments)
- new followers
- mentions on publications (post/comment/mirrors)
- reactions on publications (post/comment/mirrors)

# API details

Notifications can be spammy if you do not have control of them. For this sake, we default the filter, which is called `highSignalFilter` on which will only bring back likes, mirrors, collects, follows, and comments if you follow these users or they are on the curated list. Mentions will always come back. You can turn this off by passing in false on the`highSignalFilter` notification object.

You can also filter by the exact notification type this can be passed into`notificationTypes` request object to only bring back the notifications you care about. If you do not supply it, it brings them all back for you.

```typescript notification type filters
export enum NotificationTypes {
  MIRRORED_POST = 'MIRRORED_POST',
  MIRRORED_COMMENT = 'MIRRORED_COMMENT',
  MENTION_POST = 'MENTION_POST',
  MENTION_COMMENT = 'MENTION_COMMENT',
  COMMENTED_COMMENT = 'COMMENTED_COMMENT',
  COMMENTED_POST = 'COMMENTED_POST',
  COLLECTED_POST = 'COLLECTED_POST',
  COLLECTED_COMMENT = 'COLLECTED_COMMENT',
  FOLLOWED = 'FOLLOWED',
  REACTION_POST = 'REACTION_POST',
  REACTION_COMMENT = 'REACTION_COMMENT',
}

```



```javascript Example operation
query Notifications {
  result: notifications(request: { profileId: "0x0f", limit: 10 }) {
    items {
      ... on NewFollowerNotification {
        notificationId
        ...NewFollowerNotificationFields
      }

      ... on NewMirrorNotification {
        notificationId
        ...NewMirrorNotificationFields
      }

      ... on NewCollectNotification {
        notificationId
        ...NewCollectNotificationFields
      }

      ... on NewCommentNotification {
        notificationId
        ...NewCommentNotificationFields
      }
      
      ... on NewMentionNotification {
        notificationId
        ...NewMentionNotificationFields
      }
      ... on NewReactionNotification {
        notificationId
        ...NewReactionNotificationFields
      }
    }
    pageInfo {
      ...CommonPaginatedResultInfo
    }
  }
}

fragment CommentWithCommentedPublicationFields on Comment {
  ...CompactComment
  commentOn {
    ... on Post {
      ...CompactPost
    }
    ... on Mirror {
      ...CompactMirror
    }
    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewFollowerNotificationFields on NewFollowerNotification {
  __typename
  createdAt
  isFollowedByMe
  wallet {
    ...Wallet
  }
}

fragment NewCollectNotificationFields on NewCollectNotification {
  __typename
  createdAt
  wallet {
    ...Wallet
  }
  collectedPublication {
    __typename
    ... on Post {
      ...CompactPost
    }

    ... on Mirror {
      ...CompactMirror
    }

    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewMirrorNotificationFields on NewMirrorNotification {
  __typename
  createdAt
  profile {
    ...CompactProfile
  }
  publication {
    ... on Post {
      ...CompactPost
    }
    ... on Comment {
      ...CompactComment
    }
  }
}

fragment NewCommentNotificationFields on NewCommentNotification {
  __typename
  createdAt
  profile {
    ...CompactProfile
  }
  comment {
    ...CommentWithCommentedPublicationFields
  }
}

fragment NewMentionNotificationFields on NewMentionNotification {
  __typename
  mentionPublication {
    ... on Post {
      ...CompactPost
    }
    ... on Comment {
      ...CompactComment
    }
  }
  createdAt
}

fragment NewReactionNotificationFields on NewReactionNotification {
  __typename
  createdAt
  profile {
    ...CompactProfile
  }
  reaction
  publication {
    ... on Post {
      ...CompactPost
    }
    ... on Mirror {
      ...CompactMirror
    }
    ... on Comment {
      ...CompactComment
    }
  }
}

fragment CompactPublicationStats on PublicationStats {
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}

fragment CompactMetadata on MetadataOutput {
  name
  description
  content
  media {
    ...ProfileMediaFields
  }
}

fragment CompactPost on Post {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  collectedBy {
    ...Wallet
  }
  createdAt
}

fragment CompactMirror on Mirror {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  createdAt
}

fragment CompactComment on Comment {
  id
  stats {
    ...CompactPublicationStats
  }
  metadata {
    ...CompactMetadata
  }
  profile {
    ...CompactProfile
  }
  collectedBy {
    ...Wallet
  }
  createdAt
}

fragment CommonPaginatedResultInfo on PaginatedResultInfo {
  prev
  next
  totalCount
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}

fragment ProfileMediaFields on ProfileMedia {
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

fragment Wallet on Wallet {
  address
  defaultProfile {
    ...CompactProfile
  }
}

fragment CompactProfile on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
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
```
```javascript Example response
{
  "data": {
    "result": {
      "items": [
        {
          "__typename": "NewCommentNotification",
          "createdAt": "2022-04-20T21:33:08.000Z",
          "profile": {
            "id": "0x02aa",
            "name": null,
            "handle": "fommes",
            "picture": {
              "original": {
                "url": "https://ik.imagekit.io/lensterimg/https://ipfs.infura.io/ipfs/QmVrUurkhodoPexGzQT1bayx2Fz9mxsKJyqVNsXwcBMzdY",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            }
          },
          "comment": {
            "id": "0x02aa-0x0d",
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 1
            },
            "metadata": {
              "name": "Comment by @fommes",
              "description": "upvote is missing! oh yeah and downvote would be cool, no social has that afaik",
              "content": "upvote is missing! oh yeah and downvote would be cool, no social has that afaik",
              "media": []
            },
            "profile": {
              "id": "0x02aa",
              "name": null,
              "handle": "fommes",
              "picture": {
                "original": {
                  "url": "https://ik.imagekit.io/lensterimg/https://ipfs.infura.io/ipfs/QmVrUurkhodoPexGzQT1bayx2Fz9mxsKJyqVNsXwcBMzdY",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": null,
            "createdAt": "2022-04-20T21:33:08.000Z",
            "commentOn": {
              "id": "0x0f-0xa2",
              "stats": {
                "totalAmountOfMirrors": 0,
                "totalAmountOfCollects": 0,
                "totalAmountOfComments": 2
              },
              "metadata": {
                "name": "Comment by @yoginth",
                "description": "how about #lensterdev and #lenster-fam",
                "content": "how about #lensterdev and #lenster-fam",
                "media": []
              },
              "profile": {
                "id": "0x0f",
                "name": null,
                "handle": "yoginth",
                "picture": {
                  "original": {
                    "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                    "width": null,
                    "height": null,
                    "mimeType": null
                  },
                  "small": null,
                  "medium": null
                }
              },
              "collectedBy": null,
              "createdAt": "2022-04-20T07:20:47.000Z"
            }
          }
        },
        {
          "__typename": "NewCollectNotification",
          "createdAt": "2022-04-20T17:17:26.000Z",
          "wallet": {
            "address": "0x067F2Bef6A1f929544253B9fb95F99BaE77B2518",
            "defaultProfile": null
          },
          "collectedPublication": {
            "__typename": "Post",
            "id": "0x0f-0x97",
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 3,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "Post by @yoginth",
              "description": "gm lens 🌿 and lenster 🌸",
              "content": "gm lens 🌿 and lenster 🌸",
              "media": []
            },
            "profile": {
              "id": "0x0f",
              "name": null,
              "handle": "yoginth",
              "picture": {
                "original": {
                  "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": {
              "address": "0x067F2Bef6A1f929544253B9fb95F99BaE77B2518",
              "defaultProfile": null
            },
            "createdAt": "2022-04-18T03:35:01.000Z"
          }
        },
        {
          "__typename": "NewCollectNotification",
          "createdAt": "2022-04-20T17:17:06.000Z",
          "wallet": {
            "address": "0x067F2Bef6A1f929544253B9fb95F99BaE77B2518",
            "defaultProfile": null
          },
          "collectedPublication": {
            "__typename": "Post",
            "id": "0x0f-0x97",
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 3,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "Post by @yoginth",
              "description": "gm lens 🌿 and lenster 🌸",
              "content": "gm lens 🌿 and lenster 🌸",
              "media": []
            },
            "profile": {
              "id": "0x0f",
              "name": null,
              "handle": "yoginth",
              "picture": {
                "original": {
                  "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": {
              "address": "0x067F2Bef6A1f929544253B9fb95F99BaE77B2518",
              "defaultProfile": null
            },
            "createdAt": "2022-04-18T03:35:01.000Z"
          }
        },
        {
          "__typename": "NewFollowerNotification",
          "createdAt": "2022-04-20T17:16:11.000Z",
          "isFollowedByMe": false,
          "wallet": {
            "address": "0x067F2Bef6A1f929544253B9fb95F99BaE77B2518",
            "defaultProfile": null
          }
        },
        {
          "__typename": "NewCommentNotification",
          "createdAt": "2022-04-20T16:52:13.000Z",
          "profile": {
            "id": "0x050f",
            "name": null,
            "handle": "khatia",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmNjaGcxcxVvHV78NANLqgaHKtEgKD8my9He9MoEFuBNbo",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            }
          },
          "comment": {
            "id": "0x050f-0x02",
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "Comment by @khatia",
              "description": "gm",
              "content": "gm",
              "media": []
            },
            "profile": {
              "id": "0x050f",
              "name": null,
              "handle": "khatia",
              "picture": {
                "original": {
                  "url": "https://ipfs.infura.io/ipfs/QmNjaGcxcxVvHV78NANLqgaHKtEgKD8my9He9MoEFuBNbo",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": null,
            "createdAt": "2022-04-20T16:52:13.000Z",
            "commentOn": {
              "id": "0x0f-0xa2",
              "stats": {
                "totalAmountOfMirrors": 0,
                "totalAmountOfCollects": 0,
                "totalAmountOfComments": 2
              },
              "metadata": {
                "name": "Comment by @yoginth",
                "description": "how about #lensterdev and #lenster-fam",
                "content": "how about #lensterdev and #lenster-fam",
                "media": []
              },
              "profile": {
                "id": "0x0f",
                "name": null,
                "handle": "yoginth",
                "picture": {
                  "original": {
                    "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                    "width": null,
                    "height": null,
                    "mimeType": null
                  },
                  "small": null,
                  "medium": null
                }
              },
              "collectedBy": null,
              "createdAt": "2022-04-20T07:20:47.000Z"
            }
          }
        },
        {
          "__typename": "NewFollowerNotification",
          "createdAt": "2022-04-20T16:37:41.000Z",
          "isFollowedByMe": false,
          "wallet": {
            "address": "0xA1F36EB2f8bAAA3d700bB0708E6c2B0741bED6fA",
            "defaultProfile": null
          }
        },
        {
          "__typename": "NewCommentNotification",
          "createdAt": "2022-04-20T12:34:00.000Z",
          "profile": {
            "id": "0x73",
            "name": null,
            "handle": "jensei",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmWwgPpqtGE9VEHba26ahNqaY9wi8KxQfce1E78zLufuHX",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            }
          },
          "comment": {
            "id": "0x73-0x08",
            "stats": {
              "totalAmountOfMirrors": 0,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 0
            },
            "metadata": {
              "name": "Comment by @jensei",
              "description": "!gm",
              "content": "!gm",
              "media": []
            },
            "profile": {
              "id": "0x73",
              "name": null,
              "handle": "jensei",
              "picture": {
                "original": {
                  "url": "https://ipfs.infura.io/ipfs/QmWwgPpqtGE9VEHba26ahNqaY9wi8KxQfce1E78zLufuHX",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": null,
            "createdAt": "2022-04-20T12:34:00.000Z",
            "commentOn": {
              "id": "0x0f-0x9c",
              "stats": {
                "totalAmountOfMirrors": 2,
                "totalAmountOfCollects": 0,
                "totalAmountOfComments": 6
              },
              "metadata": {
                "name": "Post by @yoginth",
                "description": "#gm #gm lens fam 🌿",
                "content": "#gm #gm lens fam 🌿",
                "media": []
              },
              "profile": {
                "id": "0x0f",
                "name": null,
                "handle": "yoginth",
                "picture": {
                  "original": {
                    "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                    "width": null,
                    "height": null,
                    "mimeType": null
                  },
                  "small": null,
                  "medium": null
                }
              },
              "collectedBy": null,
              "createdAt": "2022-04-18T07:45:57.000Z"
            }
          }
        },
        {
          "__typename": "NewMirrorNotification",
          "createdAt": "2022-04-20T06:26:56.000Z",
          "profile": {
            "id": "0x056e",
            "name": null,
            "handle": "handl3",
            "picture": {
              "original": {
                "url": "https://ipfs.infura.io/ipfs/QmYfsQjEfR7JGqbCRgZ1SkEANTY8wcUcccTTQt6jxm5q23",
                "width": null,
                "height": null,
                "mimeType": null
              },
              "small": null,
              "medium": null
            }
          },
          "publication": {
            "id": "0x0f-0xa0",
            "stats": {
              "totalAmountOfMirrors": 1,
              "totalAmountOfCollects": 0,
              "totalAmountOfComments": 6
            },
            "metadata": {
              "name": "Post by @yoginth",
              "description": "Testing hashflags\n\n#lenster #Lenster #LENSTER #lens #ethereum #Bitcoin",
              "content": "Testing hashflags\n\n#lenster #Lenster #LENSTER #lens #ethereum #Bitcoin",
              "media": []
            },
            "profile": {
              "id": "0x0f",
              "name": null,
              "handle": "yoginth",
              "picture": {
                "original": {
                  "url": "https://ipfs.infura.io/ipfs/Qma8mXoeorvPqodDazf7xqARoFD394s1njkze7q1X4CK8U",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            },
            "collectedBy": null,
            "createdAt": "2022-04-20T06:26:56.000Z"
          }
        },
        {
          "__typename": "NewFollowerNotification",
          "createdAt": "2022-04-19T17:58:35.000Z",
          "isFollowedByMe": false,
          "wallet": {
            "address": "0x6ea7c12CbB8480236716d1EEB0B31C2950166F3B",
            "defaultProfile": null
          }
        },
        {
          "__typename": "NewFollowerNotification",
          "createdAt": "2022-04-19T17:55:05.000Z",
          "isFollowedByMe": false,
          "wallet": {
            "address": "0x0bCcE7961ecd2a667fEc4DE78a6b7407b28eFc1e",
            "defaultProfile": {
              "id": "0x0166",
              "name": null,
              "handle": "elonmux",
              "picture": {
                "original": {
                  "url": "https://avatar.tobi.sh/elonmux.png",
                  "width": null,
                  "height": null,
                  "mimeType": null
                },
                "small": null,
                "medium": null
              }
            }
          }
        }
      ],
      "pageInfo": {
        "prev": "{\"timestamp\":1650490388,\"cursorDirection\":\"BEFORE\"}",
        "next": "{\"timestamp\":1650390905,\"cursorDirection\":\"AFTER\"}",
        "totalCount": 456
      }
    }
  }
}
```



You will see the paging result behavior repeated a lot in the API.  This is to allow you to fetch a certain amount and then page it for the most optimal request speed. Every time something is wrapped in a paging result you will always get returned a `pageInfo` which holds the cursors for the previous and next alongside the total count which exists in the database. These cursors are just pointers for the server to get to the next result and do not need to be understood by your client or server. If you ever want to then page to the next result you can pass the previous and next cursor in the request cursor property.

# 

# Using LensClient SDK

```typescript
const result = await lensClient.notifications.fetch({
  profileId: '0x0185',
  limit: 10,
});
```