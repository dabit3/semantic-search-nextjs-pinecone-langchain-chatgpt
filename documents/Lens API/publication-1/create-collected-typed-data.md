---
title: "Collect"
slug: "create-collected-typed-data"
hidden: false
createdAt: "2022-02-18T11:27:17.848Z"
updatedAt: "2023-03-16T15:17:59.041Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/module/collect.ts>

> 📘 This action can be gasless
> 
> <https://docs.lens.xyz/docs/broadcast-transaction>) You can use the broadcast logic to send this gasless. Please note this is fully unlocked on mumbai but on polygon it is only whitelisted apps who can use it.

This API call allows you to get the typed data to then call the `withSig` method to collect a publication on Lens.

Please note each [Enabled modules currencies](doc:enabled-modules-currencies) need to have a [Approved allowance of modules](doc:approved-allowance-of-modules) greater than the amount the collect module is. If it is not then an API request will throw an error as the module will not be able to move funds on your behalf. 

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions. 

# API Design

```javascript Example operation
mutation CreateCollectTypedData {
  createCollectTypedData(request: {
    publicationId: "0x1d-0x01"
  }) {
    id
    expiresAt
    typedData {
      types {
        CollectWithSig {
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
        profileId
        pubId
        data
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createCollectTypedData": {
      "id": "32d94413-90e2-40a2-aa73-0a55c30a9839",
      "expiresAt": "2022-02-24T11:34:59.000Z",
      "typedData": {
        "types": {
          "CollectWithSig": [
            {
              "name": "collector",
              "type": "address"
            },
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "pubId",
              "type": "uint256"
            },
            {
              "name": "data",
              "type": "bytes"
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
          "deadline": 1645702499,
          "profileId": "0x1d",
          "pubId": "0x01",
          "data": "0x"
        }
      }
    }
  }
}
```
```javascript Query interface
type Mutation {
  createCollectTypedData(
    request: CreateCollectRequest!
  ): CreateCollectBroadcastItemResult!
}
```
```javascript Request
input CreateCollectRequest {
  publicationId: InternalPublicationId!
}
```
```javascript Response
# The broadcast item
type CreateCollectBroadcastItemResult {
  # This broadcast item ID
  id: BroadcastId!

  # The date the broadcast item expiries
  expiresAt: DateTime!

  # The typed data
  typedData: CreateCollectEIP712TypedData!
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
  
# The eip 712 typed data field
type EIP712TypedDataField {
  # The name of the typed data field
  name: String!

  # The type of the typed data field
  type: String!
}

# The collect eip 712 typed data
type CreateCollectEIP712TypedData {
  # The types
  types: CreateCollectEIP712TypedDataTypes!

  # The typed data domain
  domain: EIP712TypedDataDomain!

  # The values
  value: CreateCollectEIP712TypedDataValue!
}

# The collect eip 712 typed data types
type CreateCollectEIP712TypedDataTypes {
  CollectWithSig: [EIP712TypedDataField!]!
}

# The collect eip 712 typed data value
type CreateCollectEIP712TypedDataValue {
  nonce: Nonce!
  deadline: UnixTimestamp!
  profileId: ProfileId!
  pubId: PublicationId!
  data: BlockchainData!
}
  
# Nonce custom scalar type
scalar Nonce
  
# Blockchain data scalar type
scalar BlockchainData
  
# Broadcast scalar id type
scalar BroadcastId
  
# Contract address custom scalar type
scalar ContractAddress

# ProfileId custom scalar type
scalar ProfileId

# UnixTimestamp custom scalar type
scalar UnixTimestamp

# Publication id custom scalar type
scalar PublicationId
```



# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.



# 

# Using LensClient SDK

```typescript
// collect with typedData that require signature and broadcasting
const typedDataResult = await lensClient.publication.createCollectTypedData({
  publicationId: "",
});

// sign and broadcast
```