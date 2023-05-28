---
title: "Does follow"
slug: "does-follow"
hidden: false
createdAt: "2022-02-18T11:28:40.226Z"
updatedAt: "2023-03-14T10:31:39.444Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/does-follow.ts>

This query returns to you if the Ethereum address follows a profile. It allows you to do a bulk request.

We highly advise using [Is followed by me](doc:is-followed-by-me) and [Is following](doc:is-following) as it solves most of the cases when you want to use this. 

# API Design

```javascript Example operation
query DoesFollow {
  doesFollow(request: { 
             	followInfos: [
                  {
                    followerAddress: "0xD020E01C0c90Ab005A01482d34B808874345FD82",
                    profileId: "0x01"
                  },
                  {
                    followerAddress: "0x248ba21F6ff51cf0CD4765C3Bc9fAD2030a591d5",
                    profileId: "0x01"
                  }
                ] 
             }) {
    followerAddress
    profileId
    follows
  }
}
```
```javascript Example response
{
  "data": {
    "doesFollow": [
      {
        "followerAddress": "0xD020E01C0c90Ab005A01482d34B808874345FD82",
        "profileId": "0x01",
        "follows": true
      },
      {
        "followerAddress": "0x248ba21F6ff51cf0CD4765C3Bc9fAD2030a591d5",
        "profileId": "0x01",
        "follows": false
      }
    ]
  }
}
```
```javascript Query interface
type Query {
  doesFollow(request: DoesFollowRequest!): [DoesFollowResponse!]!
}
```
```javascript Request
input DoesFollowRequest {
  # The follower infos
  followInfos: [DoesFollow!]!
}

input DoesFollow {
  # The follower address remember wallets follow profiles
  followerAddress: EthereumAddress!

  # The profile id
  profileId: ProfileId!
}
  
# ProfileId custom scalar type
scalar ProfileId
  
# Ethereum address custom scalar type
scalar EthereumAddress
```
```javascript Response
# hint: it returns an array of this type
# The does follow response
type DoesFollowResponse {
  # The follower address remember wallets follow profiles
  followerAddress: EthereumAddress!

  # The profile id
  profileId: ProfileId!

  # If the user does follow
  follows: Boolean!
}
  
# ProfileId custom scalar type
scalar ProfileId
  
# Ethereum address custom scalar type
scalar EthereumAddress
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.profile.doesFollow({
  followInfos: [
    {
      followerAddress: "",
      profileId,
    },
  ],
});

```