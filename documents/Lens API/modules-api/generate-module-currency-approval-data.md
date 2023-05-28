---
title: "Module currency approval data"
slug: "generate-module-currency-approval-data"
hidden: false
createdAt: "2022-02-24T15:16:55.820Z"
updatedAt: "2023-03-14T12:38:55.132Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/module/approve-module.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

This query encodes the `allowance` ERC-20 data for you for the module. This allows you to just call this without any context of the modules contracts or how to construct the approval and it will return you the partial transaction you just need to give it a gas price, estimate the gas and send it. 

# API Design

```javascript Example operation
query GenerateModuleCurrencyApprovalData {
  generateModuleCurrencyApprovalData(request: {
    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
    value: "10",
    collectModule: LimitedFeeCollectModule
  }) {
    to
    from
    data
  }
}
```
```javascript Example response
{
  "data": {
    "generateModuleCurrencyApprovalData": {
      "to": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
      "from": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
      "data": "0x095ea7b300000000000000000000000025dc6498a9d6bb8ede2a4fd96276aeb9256a60b70000000000000000000000000000000000000000000000008ac7230489e80000"
    }
  }
}
```
```javascript Query interface
type Query {
  generateModuleCurrencyApprovalData(
    request: GenerateModuleCurrencyApprovalDataRequest!
  ): GenerateModuleCurrencyApproval!
}
```
```javascript Request
input GenerateModuleCurrencyApprovalDataRequest {
  currency: ContractAddress!

  # Floating point number as string (e.g. 42.009837). The server will move its decimal places for you
  value: String!
  collectModule: CollectModules
  followModule: FollowModules
  referenceModule: ReferenceModules
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
type GenerateModuleCurrencyApproval {
  to: ContractAddress!
  from: EthereumAddress!
  data: BlockchainData!
}
  
# Contract address custom scalar type
scalar ContractAddress

# Ethereum address custom scalar type
scalar EthereumAddress

# Blockchain data scalar type
scalar BlockchainData
```



## Request

Let's dig in the request to make sure its super clear

#### currency - required

This is the module currency you wish to approve for the user

#### value - required

This is the value you want the user to approve this module with. It can be a high amount if you do not want them to keep approving it, but that tends to be up to the user to pick. It should be supplied in the normal formatted UI amount so if you want to approve 10 ETH you pass in "10" not the wei equivalent. It is a string number because of the overflows a JS number can have. 

#### collectModule - you must give a collect module or a followModule or a referenceModule

This is the collect module you wish to approve. You can just pass in the enum value and the server will map the rest for you. This can not be used alongside the other modules it should only be supplied by itself. 

```js
query GenerateModuleCurrencyApprovalData {
  generateModuleCurrencyApprovalData(request: {
    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
    value: "10",
    collectModule: LimitedFeeCollectModule
  }) {
    to
    from
    data
  }
}
```



#### followModule - you must give a collect module or a collectModule or a referenceModule

This is the follow module you wish to approve. You can just pass in the enum value and the server will map the rest for you. This can not be used alongside the other modules it should only be supplied by itself. 

```js
query GenerateModuleCurrencyApprovalData {
  generateModuleCurrencyApprovalData(request: {
    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
    value: "10",
    followModule: FeeFollowModule
  }) {
    to
    from
    data
  }
}
```



#### referenceModule - you must give a collect module or a collectModule or a followModule

This is the reference module you wish to approve. You can just pass in the enum value and the server will map the rest for you. This can not be used alongside the other modules it should only be supplied by itself. 

```js
query GenerateModuleCurrencyApprovalData {
  generateModuleCurrencyApprovalData(request: {
    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
    value: "10",
    referenceModule: FollowerOnlyReferenceModule
  }) {
    to
    from
    data
  }
}
```



# 

# Using LensClient SDK

Example use.

```typescript
import { CollectModules } from "@lens-protocol/client";

const result = await lensClient.modules.generateCurrencyApprovalData({
  currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
  value: '10',
  collectModule: CollectModules.LimitedFeeCollectModule,
});

```