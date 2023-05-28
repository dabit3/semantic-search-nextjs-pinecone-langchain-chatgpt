---
title: "Set profile image"
slug: "create-set-profile-image-uri-typed-data"
hidden: false
createdAt: "2022-02-17T11:39:58.683Z"
updatedAt: "2023-03-15T18:12:35.115Z"
---
This API call allows you to get the typed data to then call the `withSig` method to set your profile picture for your profile on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API, the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always-failing transaction, the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.

# API Design

You can attach a normal link in the `uri`, this can be any image location you wish, our example shows the IPFS link. You can also attach the NFT data to link your profile NFT and prove ownership which you would have done using these docs [NFT ownership challenge](doc:nft-ownership-challenge).

```javascript Example operation
mutation CreateSetProfileImageURITypedData {
  createSetProfileImageURITypedData(request: {
    profileId: "0x03",
    url: "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP"
  }) {
    id
    expiresAt
    typedData {
      types {
        SetProfileImageURIWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        imageURI
        profileId
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createSetProfileImageURITypedData": {
      "id": "745d18ea-73fa-432e-aa1f-72e143ea3c10",
      "expiresAt": "2022-02-22T16:48:52.000Z",
      "typedData": {
        "types": {
          "SetProfileImageURIWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "imageURI",
              "type": "string"
            },
            {
              "name": "nonce",
              "type": "uint256"
            },
            {
              "name": "deadline",
              "type": "uint256"
            }
          ]
        },
        "domain": {
          "name": "Lens Protocol Profile",
          "chainId": 80001,
          "version": "1",
          "verifyingContract": "0x23C1ce2b0865406955Da08F1D31c13fcc3f72A3a"
        },
        "value": {
          "nonce": 0,
          "deadline": 1645548532,
          "imageURI": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          "profileId": "0x03"
        }
      }
    }
  }
}
```
```javascript Query interface
type Mutation {
   createSetProfileImageURITypedData(
    request: UpdateProfileImageRequest!
  ): CreateSetProfileImageUriBroadcastItemResult!
}
```
```javascript Request
input UpdateProfileImageRequest {
  profileId: ProfileId!

  # The url to the image if offline
  url: Url

  # The nft data
  NFTData: NFTData
}

input NFTData {
  # Id of the nft ownership challenge
  id: NftOwnershipId!

  # Address owner
  address: EthereumAddress!

  # The signature
  signature: Signature!

  # The chain id
  chainId: ChainId!

  # The contract address
  contract: ContractAddress!

  # The token id
  tokenId: String!
}
  
# Contract address custom scalar type
scalar ContractAddress

# Ethereum address custom scalar type
scalar EthereumAddress

# ChainId custom scalar type
scalar ChainId

scalar Signature

# Nft ownership id type
scalar NftOwnershipId

# Url scalar type
scalar Url

# ProfileId custom scalar type
scalar ProfileId
```
```javascript Response
The broadcast item
type CreateSetProfileImageUriBroadcastItemResult {
  # This broadcast item ID
  id: BroadcastId!

  # The date the broadcast item expiries
  expiresAt: DateTime!

  # The typed data
  typedData: CreateSetProfileImageUriEIP712TypedData!
}
  
# The eip 712 typed data field
type EIP712TypedDataField {
  # The name of the typed data field
  name: String!

  # The type of the typed data field
  type: String!
}
  
# The eip 712 typed data domain
type EIP712TypedDataDomain {
  # The name of the typed data domain
  name: String!

  # The chainId
  chainId: ChainId!

  # The version
  version: String!

  # The verifying contract
  verifyingContract: ContractAddress!
}

# The set profile uri eip 712 typed data
type CreateSetProfileImageUriEIP712TypedData {
  # The types
  types: CreateSetProfileImageUriEIP712TypedDataTypes!

  # The typed data domain
  domain: EIP712TypedDataDomain!

  # The values
  value: CreateSetProfileImageUriEIP712TypedDataValue!
}

# The set profile image uri eip 712 typed data types
type CreateSetProfileImageUriEIP712TypedDataTypes {
  SetProfileImageURIWithSig: [EIP712TypedDataField!]!
}

# The set profile uri eip 712 typed data value
type CreateSetProfileImageUriEIP712TypedDataValue {
  nonce: Nonce!
  deadline: UnixTimestamp!
  profileId: ProfileId!
  imageURI: Url!
}
```



## Request

Let's touch on this request so it's super clear. 

### profiled - required

This is mandatory.

### url - optional if not supplied you need to supply `nftData`

This can be any image link you wish.

### nftData- optional if not supplied you need to supply the `url`

- `id` - The id given back to you from [NFT ownership challenge](doc:nft-ownership-challenge) 
- `signature` - The signature result after signing the text returned from [NFT ownership challenge](doc:nft-ownership-challenge)

Example using `nftData` to set the profile picture:

```javascript Example operation
mutation CreateSetProfileImageURITypedData {
  createSetProfileImageURITypedData(request: {
    profileId: "0x03",
    nftData: {
       id: "46393b78-4bfa-4830-8f5f-badca8b06e42",
       signature: "0x8f82e1a2c2cc35a2963c60eeb0a76aecc100686c4ffcb98fd522a90cba2f0b2642067c79cd6d0c9d239ed28a6882818f77bf546e774410236c730988bd14de5d1c"
    }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetProfileImageURIWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        imageURI
        profileId
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createSetProfileImageURITypedData": {
      "id": "745d18ea-73fa-432e-aa1f-72e143ea3c10",
      "expiresAt": "2022-02-22T16:48:52.000Z",
      "typedData": {
        "types": {
          "SetProfileImageURIWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "imageURI",
              "type": "string"
            },
            {
              "name": "nonce",
              "type": "uint256"
            },
            {
              "name": "deadline",
              "type": "uint256"
            }
          ]
        },
        "domain": {
          "name": "Lens Protocol Profile",
          "chainId": 80001,
          "version": "1",
          "verifyingContract": "0x23C1ce2b0865406955Da08F1D31c13fcc3f72A3a"
        },
        "value": {
          "nonce": 0,
          "deadline": 1645548532,
          "imageURI": "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP",
          "profileId": "0x03"
        }
      }
    }
  }
}
```



## Putting it together

<https://github.com/lens-protocol/api-examples/blob/master/src/profile/set-profile-image-uri.ts> shows you a live running example of how you would generate the signed typed data from the API and send it through the `withSig` methods. 

# Gasless

> 🚧 If you are on mumbai anyone can use gasless but if your on polygon only whitelisted apps can currently use this

You have 2 options when doing gasless you have `broadcast` and also the `dispatcher`. The dispatcher supports a subset of methods that allows you to do actions without signing, these actions are protocol calls that can not drain funds from any wallet making them classed as safe actions, not all methods are supported by the dispatcher. Posting is one of those allowed dispatcher methods. You can set up a dispatcher for the user using <https://docs.lens.xyz/docs/create-set-dispatcher-typed-data> and then broadcast that transaction which is described in that document. 

> 📘 Full code example of gasless
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/set-profile-image-uri-gasless.ts>

## Broadcast

This doc <https://docs.lens.xyz/docs/broadcast-transaction> explains how you would broadcast a transaction with the demo example in there. You basically use all of the examples in the GitHub code snippet but instead of calling the `withSig` methods on the hub directly, you pass the signature into the broadcast call. This is all shown in the full code GitHub example above.

## Using dispatcher

This takes in the same request as the `withSig` method so nothing needs to change in that regard. You then can track the `txId` to see what it is indexed. Look at the code examples for more low-level detail.

```javascript Example operation
mutation CreateSetProfileImageURIViaDispatcher {
  createSetProfileImageURIViaDispatcher(request: {
    profileId: "0x03",
    url: "ipfs://QmSfyMcnh1wnJHrAWCBjZHapTS859oNSsuDFiAPPdAHgHP"
  }) {
    ... on RelayerResult {
      txHash
      txId
    }
    ... on RelayError {
      reason
    }
  }
}
```
```javascript Example result
{
  "data": {
    "createPostViaDispatcher": {
      "txHash": "0xc37eed339fb06320906fdb0a0078ae8e5e7d6f1496e01084489180cd3cb3abe6",
      "txId": "83ae3af8-220c-4e9d-be7c-6cdf3b50fa44"
    }
  }
}
```



# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.

# 

# Using LensClient SDK

```typescript
const typedDataResult = await lensClient.profile.createSetProfileImageURITypedData({
  url: "https://arweave.net/dOKOqiZVvSs14n54GIRH9nkSlLKArzK7-SPc2sBVmAM",
  profileId: "0x0635",
});

// or 

const relayerResult = await lensClient.profile.createSetProfileImageURIViaDispatcher({
  url: "https://arweave.net/dOKOqiZVvSs14n54GIRH9nkSlLKArzK7-SPc2sBVmAM",
  profileId: "0x0635",
});
```