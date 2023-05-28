---
title: "NFT ownership challenge"
slug: "nft-ownership-challenge"
hidden: false
createdAt: "2022-02-18T11:26:13.921Z"
updatedAt: "2023-03-14T12:44:14.500Z"
---
> 📘 Full code example
> 
> This is an example of it hooked into the profile image
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/set-profile-image-uri-nft.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

This endpoint allows you to sign some text to prove you own an NFT. This is then used in setting your profile picture to an NFT image which then gets brought back on the `Profile` entity.

This endpoint goes hand in hand with [Set profile image URI](doc:set-profile-image-uri).

# API details

Note: the challenge will last 20 minutes if it expires you will need to generate a new challenge.

> 🚧 Note when using this for Set profile image URI..
> 
> As this is a generic API challenge for NFTs to make sure people do not get confused if you are using this to set a user's profile picture to the NFT then you must only pass in one NFT in the array. If you pass in more than one when you come to calling `createSetProfileImageURITypedData` it will throw.

```javascript Example operation
query NftOwnershipChallenge {
  nftOwnershipChallenge(request: {
    ethereumAddress: "0xdfd7D26fd33473F475b57556118F8251464a24eb",
    nfts: [
      {
        contractAddress: "0x54439D4908A3E19356F876aa6022D67d0b3B12d6",
        tokenId: "5742",
        chainId: 1
      }
    ]
  }) {
    id
    text
  }
}
```
```javascript Example response
{
  "data": {
    "nftOwnershipChallenge": {
      "id": "46393b78-4bfa-4830-8f5f-badca8b06e42",
      "text": "I approve i own these nfts. Nft ownership request id - 46393b78-4bfa-4830-8f5f-badca8b06e42"
    }
  }
}
```
```javascript Query interface
type Query {
  nftOwnershipChallenge(
    request: NftOwnershipChallengeRequest!
  ): NftOwnershipChallengeResult!
}
```
```javascript Request
input NftOwnershipChallengeRequest {
  # ContractAddress for nft
  ethereumAddress: EthereumAddress!
  nfts: [NftOwnershipChallenge!]!
}

input NftOwnershipChallenge {
  # ContractAddress for nft
  contractAddress: ContractAddress!

  # Token id for NFT
  tokenId: String!

  # Chain Id
  chainId: ChainId!
}
  
# Ethereum address custom scalar type
scalar EthereumAddress

# Contract address custom scalar type
scalar ContractAddress

# ChainId custom scalar type
scalar ChainId
```
```javascript Response
# NFT ownership challenge result
type NftOwnershipChallengeResult {
  # Id of the nft ownership challenge
  id: NftOwnershipId!
  text: String!
}

# Nft ownership id type
scalar NftOwnershipId
```



## Request

let's dig into the request a little more so its clear what is going on here

### ethereumAddress - required

The wallet address which owns the NFTs. 

Even though this is an authenticated endpoint you could own this NFT on a different wallet and want to sign it through your ledger etc. 

### nfts - required

You can pass in an array of NFTs to verify ownership, but for now, the API does not allow you to just prove generic ownership to flex. The API only support setting your profile picture with your NFTs. A generic way of just proving ownership to flex NFT will be coming to the API soon. So for now most people will only be passing in 1 item here but the request was written to handle the other cases without a schema change. This endpoint was written to be used in a few places once we extend.

#### contractAddress - required

The contract address of the NFT you want to prove ownership of.

#### tokenId - required

The tokenId you own of this NFT.

#### chainId - required

The chain id it is on.

- If you are using testnet this endpoint will only allow you to pass in chainId `ethereum kovan (chainId: 42)` or `polygon Mumbai (chainId: 80001)`
- If you are using mainnet this endpoint will only allow you to pass in `ethereum mainnet (chainId: 1)` or `polygon mainnet (chainId: 137)`



# 

# Using LensClient SDK

Example use.

```typescript
const result = await lensClient.nfts.ownershipChallenge({
  ethereumAddress: '0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6',
  nfts: [
    {
      tokenId: '411',
      contractAddress: '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5',
      chainId: 80001,
    },
  ],
});

```