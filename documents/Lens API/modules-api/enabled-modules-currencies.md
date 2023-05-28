---
title: "Enabled modules currencies"
slug: "enabled-modules-currencies"
hidden: false
createdAt: "2022-02-18T11:26:39.765Z"
updatedAt: "2023-03-14T10:36:58.058Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/module/enabled-modules-currencies.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Modules currencies are whitelisted tokens that can be used as the currency for charged modules. All module currencies must be whitelisted by the governance, if you try to use a none whitelisted currency when setting the module it will throw an error. 

 This query returns to you all the enabled module currencies

# API Design

```javascript Example operation
query EnabledModuleCurrencies {
  enabledModuleCurrencies {
    name
    symbol
    decimals
    address
  }
}
```
```javascript Example response
{
  "data": {
    "enabledModuleCurrencies": [
      {
        "name": "Currency",
        "symbol": "CRNC",
        "decimals": 18,
        "address": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011"
      }
    ]
  }
}
```
```javascript Query interface
type Query {
  enabledModuleCurrencies: [Erc20!]!
}
```
```javascript Response
# The erc20 type
type Erc20 {
  # Name of the symbol
  name: String!

  # Symbol for the token
  symbol: String!

  # Decimal places for the token
  decimals: Int!

  # The erc20 address
  address: ContractAddress!
}
  
# Contract address custom scalar type
scalar ContractAddress
```



> 👍 You can check current list [here](https://github.com/lens-protocol/token-list/blob/main/testnet-token-list.json)
> 
> WMATIC -> 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889





# 

# Using LensClient SDK

```typescript
const result = await lensClient.modules.fetchEnabledCurrencies()

```