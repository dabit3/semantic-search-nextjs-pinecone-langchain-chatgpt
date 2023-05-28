---
title: "Approved allowance of modules"
slug: "approved-allowance-of-modules"
hidden: false
createdAt: "2022-02-24T12:32:51.716Z"
updatedAt: "2023-03-14T12:42:33.952Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/module/approved-allowance-of-modules.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Each [Enabled modules currencies](doc:enabled-modules-currencies) needs to have approval greater than the amount of the collect module. If it is not then an API request will throw an error as the module will not be able to move funds on your behalf. 

This query returns you the amount approved that the modules can move on your behalf for the array of currencies you supply.

# API Design

```javascript Example operation
query ApprovedModuleAllowanceAmount {
  approvedModuleAllowanceAmount(request: {
    currencies: ["0x3C68CE8504087f89c640D02d133646d98e64ddd9"],
    collectModules: [LimitedFeeCollectModule, FeeCollectModule, LimitedTimedFeeCollectModule, TimedFeeCollectModule, FreeCollectModule, RevertCollectModule],
    followModules: [FeeFollowModule, RevertFollowModule, ProfileFollowModule],
    referenceModules: [FollowerOnlyReferenceModule]
  }) {
    currency
    module
    contractAddress
    allowance
  }
}
```
```javascript Example response
{
  "data": {
    "approvedModuleAllowanceAmount": [
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "LimitedFeeCollectModule",
        "contractAddress": "0x25DC6498A9d6Bb8eDE2A4Fd96276aEb9256a60b7",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "FeeCollectModule",
        "contractAddress": "0x171c49f4e5Ef41e9c5731a35ed42487d168CF8Db",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "TimedFeeCollectModule",
        "contractAddress": "0x1c8E432C93276370fBfceD16d842670eEEc06B67",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "EmptyCollectModule",
        "contractAddress": "0x2732FfD7f7352c9492089C40A0C3368220a438D4",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "RevertCollectModule",
        "contractAddress": "0x45B7907d5c5d2aF9157898601B7B3e18670891c3",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "FeeFollowModule",
        "contractAddress": "0x2268063b81e7BDf4Bc681ef6d054Bbd1513aaE4A",
        "allowance": "0x00"
      },
      {
        "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
        "module": "FollowerOnlyReferenceModule",
        "contractAddress": "0x1F5a47fE69e09397D5386FfdA9134afDF6555498",
        "allowance": "0x00"
      }
    ]
  }
}
```
```javascript Query interface
type Query {
  approvedModuleAllowanceAmount(
    request: ApprovedModuleAllowanceAmountRequest!
  ): [ApprovedAllowanceAmount!]!
}
```
```javascript Request
input ApprovedModuleAllowanceAmountRequest {
  # The contract addresses for the module approved currencies you want to find information on about the user
  currencies: [ContractAddress!]!
  collectModules: [CollectModules!]!
  followModules: [FollowModules!]!
  referenceModules: [ReferenceModules!]!
}
  
# The collect module types
enum CollectModules {
  LimitedFeeCollectModule
  FeeCollectModule
  LimitedTimedFeeCollectModule
  TimedFeeCollectModule
  RevertCollectModule
  EmptyCollectModule
}
   
# The follow module types
enum FollowModules {
  FeeFollowModule
}
   
# The reference module types
enum ReferenceModules {
  FollowerOnlyReferenceModule
}
   
# Contract address custom scalar type
scalar ContractAddress
```
```javascript Response
# remember it returns an array of this
type ApprovedAllowanceAmount {
  currency: ContractAddress!
  module: String!
  contractAddress: ContractAddress!
  allowance: String!
}
  
# Contract address custom scalar type
scalar ContractAddress
```



# 

# Using LensClient SDK

Example use.

```typescript
import { CollectModules, FollowModules, ReferenceModules } from "@lens-protocol/client";

const result = await lensClient.modules.approvedAllowanceAmount({
  currencies: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
  collectModules: [CollectModules.LimitedFeeCollectModule],
  followModules: [FollowModules.FeeFollowModule],
  referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
});

```