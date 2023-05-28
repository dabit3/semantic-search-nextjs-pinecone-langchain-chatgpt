---
title: "Data Availability (DA) Comment"
slug: "data-availability-comment"
hidden: false
createdAt: "2023-04-26T02:55:15.566Z"
updatedAt: "2023-04-26T16:28:50.003Z"
---
> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

DA transactions allow lens to scale to higher load at cheap costs. It is a great use case for non-financial web3 social transactions like posts, comments, and shares.

Two types of DA publications are available through the API, one for use with the dispatcher if you have trusted the dispatcher to do stuff on your behalf and one if you wish to use the typed data approach.

For DA v1, publications can not be collectable or have reference modules.

The content should be readable right away, so if, for example, you pinned it to IPFS, you can not trigger this call until other nodes have seen it, or it will reject. We suggest using Bundlr for any decentralised storage.

**DA comments can only be made on another DA publication.**

# API Design - with the dispatcher

```javascript Example operation
mutation CreateDataAvailabilityCommentViaDispatcher {
  createDataAvailabilityCommentViaDispatcher(request: {
    from: "0x03",
    commentOn: "0x01-0x01",
    contentURI: "ar://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl"
  }) {
    ... on CreateDataAvailabilityPublicationResult {
      id
      proofs
      dataAvailabilityId
    }
    ... on RelayError {
      reason
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createCommentTypedData": {
      "id": "b03ab4b8-580c-4c99-84d0-036480f7f0c4",
      "expiresAt": "2022-02-21T14:52:09.000Z",
      "typedData": {
        "types": {
          "CommentWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "contentURI",
              "type": "string"
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
              "name": "collectModule",
              "type": "address"
            },
            {
              "name": "collectModuleInitData",
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
          "deadline": 1645455129,
          "profileId": "0x03",
          "profileIdPointed": "0x01",
          "pubIdPointed": "0x01",
          "referenceModuleData": "0x",
          "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl.json",
          "collectModule": "0x2732FfD7f7352c9492089C40A0C3368220a438D4",
          "collectModuleInitData": "0x",
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
  createCommentTypedData(
    request: CreatePublicCommentRequest!
  ): CreateCommentBroadcastItemResult!
}
```



# API Design - without dispatcher

Any time you do any typed data signing for DA, you need to use the`broadcastDataAvailability`, which will broadcast the transaction for you. 

```javascript Example operation
mutation CreateDataAvailabilityCommentTypedData {
  createDataAvailabilityCommentTypedData(request: {
    from: "0x03",
    commentOn: "0x01-0x01",
    contentURI: "ar://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl"
  }) {
    id
    expiresAt
    typedData {
      types {
        CommentWithSig {
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
        contentURI
        referenceModuleData
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createCommentTypedData": {
      "id": "b03ab4b8-580c-4c99-84d0-036480f7f0c4",
      "expiresAt": "2022-02-21T14:52:09.000Z",
      "typedData": {
        "types": {
          "CommentWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "contentURI",
              "type": "string"
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
              "name": "collectModule",
              "type": "address"
            },
            {
              "name": "collectModuleInitData",
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
          "deadline": 1645455129,
          "profileId": "0x03",
          "profileIdPointed": "0x01",
          "pubIdPointed": "0x01",
          "referenceModuleData": "0x",
          "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl.json",
          "collectModule": "0x2732FfD7f7352c9492089C40A0C3368220a438D4",
          "collectModuleInitData": "0x",
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
  createCommentTypedData(
    request: CreatePublicCommentRequest!
  ): CreateCommentBroadcastItemResult!
}
```