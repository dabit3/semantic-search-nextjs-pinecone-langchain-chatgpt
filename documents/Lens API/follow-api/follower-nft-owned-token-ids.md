---
title: "Follower NFT owned token ids"
slug: "follower-nft-owned-token-ids"
hidden: false
createdAt: "2022-03-04T21:39:07.383Z"
updatedAt: "2023-03-14T10:34:37.732Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/follower-nft-owned-token-ids.ts>

This query returns the follower NFT for a profile token ids that the wallet address owns. Remember a wallet can follow a profile as many times as they wish. 

# API Design

```javascript Example operation
query FollowerNftOwnedTokenIds {
  followerNftOwnedTokenIds(request: { 
             	address: "0xD020E01C0c90Ab005A01482d34B808874345FD82",
              profileId: "0x01"
             }) {
     followerNftAddress
     tokensIds
  }
}
```
```javascript Example response
{
  "data": {
    "followerNftOwnedTokenIds": {
      "followerNftAddress": "0x3471422cf7340ff2cC3608BCbc4B247F41F144d5",
      "tokensIds": [
        "0x01",
        "0x02",
        "0x03",
        "0x04",
        "0x05",
        "0x06",
        "0x07"
      ]
    }
  }
}
```
```javascript Query interface
type Query {
  followerNftOwnedTokenIds(request: FollowerNftOwnedTokenIdsRequest!): FollowerNftOwnedTokenIds!
}
```
```javascript Request
input FollowerNftOwnedTokenIdsRequest {
  address: EthereumAddress!
  profileId: ProfileId!
}
  
# Ethereum address custom scalar type
scalar EthereumAddress
  
# ProfileId custom scalar type
scalar ProfileId
```
```javascript Response
type FollowerNftOwnedTokenIds {
  followerNftAddress: ContractAddress!
  tokensIds: [Int!]!
}

# Contract address custom scalar type
scalar ContractAddress
```





# 

# Using LensClient SDK

```typescript
const result = await lensClient.profile.followerNftOwnedTokenIds({
  address: "",
  profileId: "",
});

```