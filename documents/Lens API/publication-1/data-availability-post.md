---
title: "Data Availability (DA) Post"
slug: "data-availability-post"
excerpt: "Data Availability = DA"
hidden: false
createdAt: "2023-04-25T23:08:58.618Z"
updatedAt: "2023-05-11T20:09:42.318Z"
---
> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

DA transactions allow lens to scale to higher load at cheap costs. It is a great use case for non-financial web3 social transactions like posts, comments, and shares.

Two types of DA publications are available through the API, one for use with the dispatcher if you have trusted the dispatcher to do stuff on your behalf and one if you wish to use the typed data approach.

For DA v1, publications can not be collectable or have reference modules.

The content should be readable right away, so if, for example, you pinned it to IPFS, you can not trigger this call until other nodes have seen it, or it will reject. We suggest using Bundlr for any decentralised storage.

# API Design - with dispatcher

```javascript Example request
mutation CreateDataAvailabilityPostViaDispatcher {
  createDataAvailabilityPostViaDispatcher(request: {
    profileId: "0x03",
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

# API Design - without dispatcher

Any time you do any typed data signing for DA, you need to use the`broadcastDataAvailability` , which will broadcast the transaction for you. See an example [here](https://github.com/lens-protocol/api-examples/blob/c9b433186a7c1fb521fc16152122d37db8382dcb/src/publications/post-data-availability.ts#L73) and [here](https://github.com/lens-protocol/api-examples/blob/feature/DA/src/broadcast/broadcast-data-availability.ts).

```javascript Example request
mutation CreateDataAvailabilityPostTypedData {
  createDataAvailabilityPostTypedData(request: {
    profileId: "0x03",
    contentURI: "ar://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
  }) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
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
        contentURI
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
    "createDataAvailabilityPostTypedData": {
      "id": "18ad653a-af18-4be5-9246-06be8dcaf3f9",
      "expiresAt": "2022-02-21T13:00:37.000Z",
      "typedData": {
        "types": {
          "PostWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "contentURI",
              "type": "string"
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
          "deadline": 1645448437,
          "profileId": "0x03",
          "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl.json",
          "collectModule": "0x45B7907d5c5d2aF9157898601B7B3e18670891c3",
          "collectModuleInitData": "0x",
          "referenceModule": "0x0000000000000000000000000000000000000000",
          "referenceModuleInitData": "0x"
        }
      }
    }
  }
}
```