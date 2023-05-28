---
title: "Enabled modules"
slug: "enabled-modules"
hidden: false
createdAt: "2022-02-18T11:36:27.090Z"
updatedAt: "2023-03-14T12:42:21.693Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/module/enabled-modules.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

This query returns to you all the modules that the server knows about and information about those modules.

# API Design

```javascript Example operation
query CollectModules {
  enabledModules {
    collectModules {
      moduleName
      contractAddress
      inputParams {
        name
        type
      }
      redeemParams {
        name
        type
      }
      returnDataParms {
        name
        type
      }
    }
    followModules {
      moduleName
      contractAddress
      inputParams {
        name
        type
      }
      redeemParams {
        name
        type
      }
      returnDataParms {
        name
        type
      }
    }
    referenceModules {
      moduleName
      contractAddress
      inputParams {
        name
        type
      }
      redeemParams {
        name
        type
      }
      returnDataParms {
        name
        type
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "enabledModules": {
      "collectModules": [
        {
          "moduleName": "FeeCollectModule",
          "contractAddress": "0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82",
          "inputParams": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ],
          "redeemParams": [
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "returnDataParms": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ]
        },
        {
          "moduleName": "LimitedFeeCollectModule",
          "contractAddress": "0xFCDA2801a31ba70dfe542793020a934F880D54aB",
          "inputParams": [
            {
              "name": "collectLimit",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ],
          "redeemParams": [
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "returnDataParms": [
            {
              "name": "collectLimit",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ]
        },
        {
          "moduleName": "LimitedTimedFeeCollectModule",
          "contractAddress": "0xDa76E44775C441eF53B9c769d175fB2948F15e1C",
          "inputParams": [
            {
              "name": "collectLimit",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ],
          "redeemParams": [
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "returnDataParms": [
            {
              "name": "collectLimit",
              "type": "uint256"
            },
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            },
            {
              "name": "endTimestamp",
              "type": "uint40"
            }
          ]
        },
        {
          "moduleName": "RevertCollectModule",
          "contractAddress": "0x5E70fFD2C6D04d65C3abeBa64E93082cfA348dF8",
          "inputParams": [],
          "redeemParams": [],
          "returnDataParms": []
        },
        {
          "moduleName": "TimedFeeCollectModule",
          "contractAddress": "0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db",
          "inputParams": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ],
          "redeemParams": [
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "returnDataParms": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            },
            {
              "name": "referralFee",
              "type": "uint16"
            },
            {
              "name": "followerOnly",
              "type": "bool"
            },
            {
              "name": "endTimestamp",
              "type": "uint40"
            }
          ]
        },
        {
          "moduleName": "FreeCollectModule",
          "contractAddress": "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c",
          "inputParams": [
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ],
          "redeemParams": [],
          "returnDataParms": [
            {
              "name": "followerOnly",
              "type": "bool"
            }
          ]
        }
      ],
      "followModules": [
        {
          "moduleName": "FeeFollowModule",
          "contractAddress": "0xe7AB9BA11b97EAC820DbCc861869092b52B65C06",
          "inputParams": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            }
          ],
          "redeemParams": [
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "amount",
              "type": "uint256"
            }
          ],
          "returnDataParms": [
            {
              "name": "amount",
              "type": "uint256"
            },
            {
              "name": "currency",
              "type": "address"
            },
            {
              "name": "recipient",
              "type": "address"
            }
          ]
        },
        {
          "moduleName": "RevertFollowModule",
          "contractAddress": "0x8c822Fc029EBdE62Da1Ed1072534c5e112dAE48c",
          "inputParams": [],
          "redeemParams": [],
          "returnDataParms": []
        },
        {
          "moduleName": "ProfileFollowModule",
          "contractAddress": "0x8c32203df6b1A04E25145346e2DaAD0B4712C20D",
          "inputParams": [],
          "redeemParams": [
            {
              "name": "followerProfileId",
              "type": "uint256"
            }
          ],
          "returnDataParms": []
        }
      ],
      "referenceModules": [
        {
          "moduleName": "FollowerOnlyReferenceModule",
          "contractAddress": "0x7Ea109eC988a0200A1F79Ae9b78590F92D357a16",
          "inputParams": [],
          "redeemParams": [],
          "returnDataParms": []
        }
      ]
    }
  }
}
```
```javascript Query interface
type Query {
  enabledModules: EnabledModules!
}
```
```javascript Response
type EnabledModules {
  collectModules: [EnabledModule!]!
  followModules: [EnabledModule!]!
  referenceModules: [EnabledModule!]!
}

type EnabledModule {
  moduleName: String!
  contractAddress: ContractAddress!
  inputParams: [ModuleInfo!]!
  redeemParams: [ModuleInfo!]!
  returnDataParms: [ModuleInfo!]!
}

type ModuleInfo {
  name: String!
  type: String!
}
  
# Contract address custom scalar type
scalar ContractAddress
```



# 

# Using LensClient SDK

```typescript
const result = await lensClient.modules.fetchEnabled()

```