---
title: "Data Availability (DA) Mirror"
slug: "data-availability-mirror"
hidden: false
createdAt: "2023-04-26T03:13:24.283Z"
updatedAt: "2023-04-26T16:31:14.408Z"
---
> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

DA transactions allow lens to scale to higher load at cheap costs. It is a great use case for non-financial web3 social transactions like posts, comments, and shares.

Two types of DA publications are available through the API, one for use with the dispatcher if you have trusted the dispatcher to do stuff on your behalf and one if you wish to use the typed data approach.

For DA v1, publications can not be collectable or have reference modules.

The content should be readable right away, so if, for example, you pinned it to IPFS, you can not trigger this call until other nodes have seen it, or it will reject. We suggest using Bundlr for any decentralised storage.

Also, DA mirrors can only be done on another DA publication.

# API Design - with dispatcher

```javascript Example operation
mutation CreateDataAvailabilityMirrorViaDispatcher {
  createDataAvailabilityMirrorViaDispatcher(request: {
    from: "0x03",
    mirror: "0x01-0x01"
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
    "createDataAvailabilityMirrorViaDispatcher": {
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
  createDataAvailabilityMirrorViaDispatcher(
    request: CreateDataAvailabilityMirrorRequest!
  ): CreateDataAvailabilityPublicationResult!
}
```



# API Design - without dispatcher

Any time you do any typed data signing for DA, you need to use the`broadcastDataAvailability`, which will broadcast the transaction for you. 

```javascript Example operation
mutation CreateDataAvailabilityMirrorTypedData {
  createDataAvailabilityMirrorTypedData(request: {
    from: "0x03",
    mirror: "0x01-0x01"
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
    "createDataAvailabilityMirrorViaDispatcher": {
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
  createDataAvailabilityMirrorViaDispatcher(
    request: CreateDataAvailabilityMirrorRequest!
  ): CreateDataAvailabilityPublicationResult!
}
```