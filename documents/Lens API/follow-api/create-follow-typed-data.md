---
title: "follow"
slug: "create-follow-typed-data"
hidden: false
createdAt: "2022-02-18T11:27:38.984Z"
updatedAt: "2023-03-09T13:03:16.201Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/follow.ts>

> 📘 This action can be gasless
> 
> <https://docs.lens.xyz/docs/broadcast-transaction>) You can use the broadcast logic to send this gasless. Please note this is fully unlocked on mumbai but on polygon it is only whitelisted apps who can use it.

This API call allows you to get the typed data to then call the `withSig` method to follow profiles on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions. 

# API Design

You can follow many people in a single contract call so the API interface is designed around that as well.

```graphql Example operation
mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      {
        profile: "0x01",
        followModule: null
      }
    ]
  }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createFollowTypedData": {
      "id": "5211ef22-fc0a-4662-aebf-2b04ab3fa8c2",
      "expiresAt": "2022-02-18T13:10:14.000Z",
      "typedData": {
        "domain": {
          "name": "Lens Protocol Profile",
          "chainId": 80001,
          "version": "1",
          "verifyingContract": "0x23C1ce2b0865406955Da08F1D31c13fcc3f72A3a"
        },
        "types": {
          "FollowWithSig": [
            {
              "name": "profileIds",
              "type": "uint256[]"
            },
            {
              "name": "datas",
              "type": "bytes[]"
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
        "value": {
          "nonce": 0,
          "deadline": 1645189814,
          "profileIds": [
            "0x01"
          ],
          "datas": [
            "0x"
          ]
        }
      }
    }
  }
}
```



## Request

Let's touch on this request so it's super clear. 

### Profile - required

You have to pass in a `profile` that is mandatory (this is the `profileId`).

### FollowModule

If you are following someone who has a follow module defined you must pass in the properties to redeem it. We make you pass in the properties from the client-side because if we read it from the server each time someone could front-run the request and make you sign something which your client was not seeing at the time of generating the signature. Follow modules can be changed at any time by the profile. If no follow module is setup for this profile you do not need to pass anything in.

Defining the follow module to be redeemed is very easy with the schema we have created:

#### No follow module setup

If the person has no follow module setup you do not need to pass anything into the follow module

```graphql
mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      {
        profile: "0x01"
      }
    ]
  }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}
```



#### Profile follow module

The person you want to follow requires you to have a profile to follow him. You have to pass your `profileId` into the request. That profile can only follow them once which stops spam.

```graphql
mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      {
        profile: "0x01",
        followModule: {
            profileFollowModule: {
                 profileId: "0x02"
           }  
        }
      }
    ]
  }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}
```



#### Fee follow module

The person your following has a fee follow module setup

```graphql
mutation CreateFollowTypedData {
  createFollowTypedData(request:{
    follow: [
      {
        profile: "0x01",
        followModule: {
            feeFollowModule: {
                 amount: {
                    currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
                    value: "0.01"
                 }
            }  
         }
      }
    ]
  }) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        FollowWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        profileIds
        datas
      }
    }
  }
}
```



As you see above we have mapped the `currency` the profile wants to be paid in alongside the `value` which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if the profile cost to follow is 1 WETH you would enter 1 as a value.

You know all this information about a profile as the follow module is attached to the `Profile` schema itself [Get profiles](doc:get-profiles). 

> 📘 The API will support more modules which get whitelisted as they get approved.
> 
> as they do this doc will be updated alongside it.

# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.



# 

# Using LensClient SDK

You can use LensClient SDK to follow a profile.

```typescript
// lensClient is an authenticated instance of LensClient

// get recommended profiles to follow
const recommendedProfiles = await lensClient.profile.allRecommended();

// request follow typed data
const followTypedDataResult = await lensClient.profile.createFollowTypedData({
  follow: [
    {
      profile: recommendedProfiles[0].id,
    },
  ],
});

// sign and broadcast the typed data
const data = followTypedDataResult.unwrap();

// sign with the wallet
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