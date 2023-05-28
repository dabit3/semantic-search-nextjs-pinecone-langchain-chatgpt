---
title: "Set follow module"
slug: "create-set-follow-module-typed-data"
hidden: false
createdAt: "2022-02-18T11:28:05.923Z"
updatedAt: "2023-03-14T10:26:25.443Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/set-follow-module.ts>

> 📘 This action can be gasless
> 
> <https://docs.lens.xyz/docs/broadcast-transaction>) You can use the broadcast logic to send this gasless. Please note this is fully unlocked on mumbai but on polygon it is only whitelisted apps who can use it.

This API call allows you to get the typed data to then call the `withSig` method to set your follow module for your profile on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.  

# API Design

```graphql Example operation
mutation CreateSetFollowModuleTypedData {
  createSetFollowModuleTypedData(request:{
    profileId: "0x03",
    followModule: {
        feeFollowModule: {
            amount: {
               currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               value: "0.01"
            },
            recipient: "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
        }
     }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModuleWithSig {
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
        followModule
        followModuleInitData
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createSetFollowModuleTypedData": {
      "id": "27313933-5a6d-4b9a-b5a7-64a77506c988",
      "expiresAt": "2022-02-18T15:08:11.000Z",
      "typedData": {
        "types": {
          "SetFollowModuleWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "followModule",
              "type": "address"
            },
            {
              "name": "followModuleInitData",
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
          "deadline": 1645196891,
          "profileId": "0x03",
          "followModule": "0x2268063b81e7BDf4Bc681ef6d054Bbd1513aaE4A",
          "followModuleInitData": "0x000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000d40282e050723ae26aeb0f77022db14470f4e011000000000000000000000000eea0c1f5ab0159dba749dc0baee462e5e293daaf"
        }
      }
    }
  }
}
```



## Request

Let's touch on this request so it's super clear. 

### ProfileId - required

This is mandatory 

### FollowModule

Defining the follow module is very easy with the schema we have created:

#### Free follow module

You can unset your follow module back to nothing by using the `freeFollowModule`

```graphql
mutation CreateSetFollowModuleTypedData {
  createSetFollowModuleTypedData(request:{
    profileId: "0x03",
    followModule: {
        freeFollowModule: true
     }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModuleWithSig {
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
        followModule
        followModuleInitData
      }
    }
  }
}
```



#### Fee follow module

You can charge to have someone follow you; to set this up you can do:

```js
mutation CreateSetFollowModuleTypedData {
  createSetFollowModuleTypedData(request:{
    profileId: "0x03",
    followModule: {
        feeFollowModule: {
            amount: {
               currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               value: "0.01"
            },
            recipient: "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
        }
     }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModuleWithSig {
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
        followModule
        followModuleInitData
      }
    }
  }
}
```



As you see above we have mapped the `currency` we want to be paid in alongside the `value` which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value. The final property defined is the `recipient` you want the funds to go to. 

#### Revert follow module

You do not want anyone to follow you; to set this up you can do:

```js
mutation CreateSetFollowModuleTypedData {
  createSetFollowModuleTypedData(request:{
    profileId: "0x03",
    followModule: {
        revertFollowModule: true
     }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModuleWithSig {
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
        followModule
        followModuleInitData
      }
    }
  }
}
```



#### Profile follow module

You only want people with profiles to be able to follow you and only once on that profile (avoiding spam); to set this up you can do:

```js
mutation CreateSetFollowModuleTypedData {
  createSetFollowModuleTypedData(request:{
    profileId: "0x03",
    followModule: {
        profileFollowModule: true
     }
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowModuleWithSig {
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
        followModule
        followModuleInitData
      }
    }
  }
}
```



> 📘 The API will support more modules which get whitelisted as they get approved.
> 
> as they do this doc will be updated alongside it.

# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.

# 

# Using LensClient SDK

```typescript
// lensClient is an authenticated instance of LensClient

const typedDataResult = await lensClient.profile.createSetFollowModuleTypedData({
  followModule: FollowModuleParams;
  profileId: Scalars['ProfileId'];
});

const data = typedDataResult.unwrap();

const signedTypedData = await wallet._signTypedData(
  data.typedData.domain,
  data.typedData.types,
  data.typedData.value
);

const broadcastResult = await lensClient.transaction.broadcast({
  id: data.id,
  signature: signedTypedData,
});
```