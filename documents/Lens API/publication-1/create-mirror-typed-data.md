---
title: "Mirror"
slug: "create-mirror-typed-data"
hidden: false
createdAt: "2022-02-18T11:31:14.976Z"
updatedAt: "2023-03-16T15:16:47.024Z"
---
This API call allows you to get the typed data to then call the `withSig` method to mirror a publication from a profile on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.

# API Design

> 📘 Hot tip
> 
> It's super easy to enable modules within your publication using this typed data approach as the server lifts all the encoding and decoding of the modules for you. This allows you to just supply it as you would if you were using a web2 API.

```javascript Example operation
mutation CreateMirrorTypedData {
  createMirrorTypedData(request: {
    profileId: "0x03",
    publicationId: "0x01-0x01",
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
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
        profileIdPointed
        pubIdPointed
        referenceModule
        referenceModuleData
        referenceModuleInitData
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createMirrorTypedData": {
      "id": "34c2e30f-658b-4fc1-a985-d4a5f795d47d",
      "expiresAt": "2022-02-21T16:29:20.000Z",
      "typedData": {
        "types": {
          "MirrorWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "profileIdPointed",
              "type": "uint256"
            },
            {
              "name": "pubIdPointed",
              "type": "uint256"
            },
            {
              "name": "referenceModuleData",
              "type": "bytes"
            },
            {
              "name": "referenceModule",
              "type": "address"
            },
            {
              "name": "referenceModuleInitData",
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
          "deadline": 1645460960,
          "profileId": "0x03",
          "profileIdPointed": "0x01",
          "pubIdPointed": "0x01",
          "referenceModuleInitData": "0x"
          "referenceModule": "0x0000000000000000000000000000000000000000",
          "referenceModuleInitData": "0x"
        }
      }
    }
  }
}
```
```javascript Query interface
type Mutation {
  createMirrorTypedData(
    request: CreateMirrorRequest!
  ): CreateMirrorBroadcastItemResult!
}
```
```javascript Request
input CreateMirrorRequest {
  # Profile id
  profileId: ProfileId!

  # Publication id of what you want to mirror on remember if this is a comment it will be that as the id
  publicationId: InternalPublicationId!

  # The reference module info
  referenceModule: ReferenceModuleParams
}
  
# ProfileId custom scalar type
scalar ProfileId

# Internal publication id custom scalar type
scalar InternalPublicationId
  
input ReferenceModuleParams {
  # The follower only reference module
  followerOnlyReferenceModule: Boolean
}
```
```javascript Response
# The broadcast item
type CreateMirrorBroadcastItemResult {
  # This broadcast item ID
  id: BroadcastId!

  # The date the broadcast item expiries
  expiresAt: DateTime!

  # The typed data
  typedData: CreateMirrorEIP712TypedData!
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

# The mirror eip 712 typed data
type CreateMirrorEIP712TypedData {
  # The types
  types: CreateMirrorEIP712TypedDataTypes!

  # The typed data domain
  domain: EIP712TypedDataDomain!

  # The values
  value: CreateMirrorEIP712TypedDataValue!
}

# The mirror eip 712 typed data types
type CreateMirrorEIP712TypedDataTypes {
  MirrorWithSig: [EIP712TypedDataField!]!
}

# The mirror eip 712 typed data value
type CreateMirrorEIP712TypedDataValue {
  nonce: Nonce!
  deadline: UnixTimestamp!
  profileId: ProfileId!
  profileIdPointed: ProfileId!
  pubIdPointed: PublicationId!
  referenceModule: ContractAddress!
  referenceModuleData: ReferenceModuleData!
}
  
# reference module data scalar type
scalar ReferenceModuleData
  
# Broadcast scalar id type
scalar BroadcastId

# Contract address custom scalar type
scalar ContractAddress

# ProfileId custom scalar type
scalar ProfileId

# UnixTimestamp custom scalar type
scalar UnixTimestamp
```



## Request

Let's touch on this request so it's super clear.

### profiled - required

You have to pass in a `profileId` that is mandatory.

### publicationId - required

You have to pass in a `publicationId ` that is mandatory.

> 📘 Did you know...
> 
> The publication id is not unique in the smart contract its a counter per each profile. So if @josh posts a publication that will be publication 1 for his profile and then if @josh2 posts a publication that will be publication 1 for his profile. Our backend generates what we call an `InternalPublicationId` which is built up from `{profileId}-{publicationId}` creating a unique ID that can be queried against our database. You will see that `InternalPublicationId` is used on all our responses and also used in any request you which to do.

#### referenceModule - required

Modules are quite complex, each module needs to be encoded in the correct way for the contracts not to throw. We tried to abstract any complex stuff out for you here and allow you to just pass in the params in web2 style. Mirrors can have their own reference modules as well separate from the mirrored publication. Please note to mirror from a profile it must pass the reference module check which is defined in `canMirror`.

```js
input ReferenceModuleParams {
 # The follower only reference module
 followerOnlyReferenceModule: Boolean
 
 # The degree of seperation for who can comment and mirror your stuff
 degreesOfSeparationReferenceModule: DegreesOfSeparationReferenceModuleParams
 
 # unknown reference module
 unknownReferenceModule: UnknownReferenceModuleParams
}
```



##### followerOnlyReferenceModule

A simple reference module that validates that comments or mirrors originate from a profile owned by a follower.

This is super easy to toggle just pass in the boolean in the `followerOnlyReferenceModule` property and it turns it on and off for that publication. 

Usage:

```json
{
    "profileId": "0x03",
    "publicationId": "0x01-0x01",
    "referenceModule": {
        "followerOnlyReferenceModule": true
    }
 }
```



##### degreesOfSeparationReferenceModule

This reference module allows you to set the degrees of separation in who can comment or mirror. If you do not know what degrees of separation you may have heard of the rule that with up to 6 links you can connect people together. With the protocol being open bots and spam is a things we want to handle and this tackles this. 

settings:

`commentsRestricted` -  Boolean - if it's set to true the degree of separation is applied if false it is not which means anyone can comment.

`mirrorsRestricted` -  Boolean - if it's set to true the degree of separation is applied if false it is not which means anyone can mirror.

`degreesOfSeparation` - Int - Max 4 degrees

- 0 degrees = nobody can comment or mirror including the poster
- 1 degree = only the profile who published it profiles it follows can comment and mirror
- 2 degree = only the profile who published it profiles it follows and the profiles they follow can comment and mirror it.
- 3 degree = only the profile who published it profiles it follows and the profiles they follow and the profiles they follow can comment and mirror it.
- 4 degree = only the profile who published it profiles it follows and the profiles they follow and the profiles they follow and the profiles they follow can comment and mirror it.

```json
{
    "profileId": "0x03",
    "publicationId": "0x01-0x01",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
       "emptyCollectModule": true
    },
    "referenceModule": {
       "degreesOfSeparationReferenceModule": {
         "commentsRestricted": true,
         "mirrorsRestricted": true,
         "degreesOfSeparation": 2
      }
    }
 }
```



##### unknownReferenceModule

This reference module is unknown and not type supported in the API. This means if you use this you have to encode and supply the data yourself to the API, the API will still allow you to use the unknown reference module but it won't validate it. Only use unknown reference modules if you can trust the reference module and know what you're doing. 

```json
{
    "profileId": "0x03",
    "publicationId": "0x01-0x01",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
       "emptyCollectModule": true
    },
    "referenceModule": {
       "unknownReferenceModule": {
         "contractAddress": "0x1F68931Bc4C77b2D394Bf23cb1A45842501da10e",
         "data": "0x01"
      }
    }
 }
```



> 📘 The API will support more modules which get whitelisted as they get approved.
> 
> as they do this doc will be updated alongside it.

## Putting it together

 <https://github.com/lens-protocol/api-examples/blob/master/src/publications/mirror.ts> shows you a live running example of how you would generate the signed typed data from the API and send it through the `withSig` methods. 

# Gasless

> 🚧 If you are on mumbai anyone can use gasless but if your on polygon only whitelisted apps can currently use this

You have 2 options when doing gasless you have `broadcast` and also the `dispatcher`. The dispatcher supports a subset of methods that allows you to do actions without signing, these actions are protocol calls that can not drain funds from any wallet making them classed as safe actions, not all methods are supported by the dispatcher. Posting is one of those allowed dispatcher methods. You can set up a dispatcher for the user using <https://docs.lens.xyz/docs/create-set-dispatcher-typed-data> and then broadcast that transaction which is described in that document. 

> 📘 Full code example of gasless
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/mirror-gasless.ts>

## Broadcast

This doc <https://docs.lens.xyz/docs/broadcast-transaction> explains how you would broadcast a transaction with the demo example in there. You basically use all of the examples in the GitHub code snippet but instead of calling the `withSig` methods on the hub directly, you pass the signature into the broadcast call. This is all shown in the full code GitHub example above.

## Using dispatcher

This takes in the same request as the `withSig` method so nothing needs to change in that regard. You then can track the `txId` to see what it is indexed. Look at the code examples for more low-level detail.

```javascript Example operation
mutation CreateMirrorViaDispatcher {
  createMirrorViaDispatcher(request: {
    profileId: "0x03",
    publicationId: "0x01-0x01",
    referenceModule: {
      followerOnlyReferenceModule: false
    }
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
// create a mirror via dispatcher, you need to have the dispatcher enabled for the profile
const viaDispatcherResult = await lensClient.publication.createMirrorViaDispatcher({
  profileId,
  publicationId: "",
  referenceModule: {
    followerOnlyReferenceModule: false, // anybody can comment or mirror
  },
});

// or with typedData that require signature and broadcasting
const typedDataResult = await lensClient.publication.createMirrorTypedData({
  profileId,
  publicationId: "",
  referenceModule: {
    followerOnlyReferenceModule: false, // anybody can comment or mirror
  },
});

// sign and broadcast
```