---
title: "Post"
slug: "create-post-typed-data"
hidden: false
createdAt: "2022-02-18T11:30:30.783Z"
updatedAt: "2023-05-12T21:12:08.168Z"
---
> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API, the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.

# API Design

> 📘 Hot tip
> 
> It's super easy to enable modules within your publication using this typed data approach as the server lifts all the encoding and decoding of the modules for you. This allows you to just supply it as you would if you were using a web2 API.

```javascript Example request
mutation CreatePostTypedData {
  createPostTypedData(request: {
    profileId: "0x03",
    contentURI: "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    collectModule: {
      revertCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
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
    "createPostTypedData": {
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

## Request

Let's touch on this request so its super clear.

### profileId - required

You have to pass in a `profileId` that is mandatory.

### contentURI - required

The metadata holds the main context of a publication, your content, as well as the media items attached to it, and is the metadata that people get when they collect. [Metadata standards](doc:metadata-standards) are defined here if you want to read what standard we have set. The link passed to use must be able to be called from our server and hold the standards we set out or we will not index the publication.

#### collectModule - required

See collect module options [here](https://docs.lens.xyz/docs/create-post-typed-data#collect-modules).

## Putting it together

<https://github.com/lens-protocol/api-examples/blob/master/src/publications/post.ts> shows you a live running example of how you would generate the signed typed data from the API and send it through the `withSig` methods. 

# Gasless

> 🚧 If you are on mumbai anyone can use gasless but if your on polygon only whitelisted apps can currently use this

You have 2 options when doing gasless you have `broadcast` and also the `dispatcher`. The dispatcher supports a subset of methods that allows you to do actions without signing, these actions are protocol calls that can not drain funds from any wallet making them classed as safe actions, not all methods are supported by the dispatcher. Posting is one of those allowed dispatcher methods. You can set up a dispatcher for the user using <https://docs.lens.xyz/docs/create-set-dispatcher-typed-data> and then broadcast that transaction which is described in that document. 

> 📘 Full code example of gasless
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/publications/post-gasless.ts>

## Broadcast

This doc <https://docs.lens.xyz/docs/broadcast-transaction> explains how you would broadcast a transaction with the demo example in there. You basically use all of the examples in the GitHub code snippet but instead of calling the `withSig` methods on the hub directly, you pass the signature into the broadcast call. This is all shown in the full code GitHub example above.

## Using dispatcher

This takes in the same request as the `withSig` method so nothing needs to change in that regard. You then can track the `txId` to see what it is indexed. Look at the code examples for more low level detail.

```javascript Example operation
mutation CreatePostViaDispatcher {
  createPostViaDispatcher(
    request: {
      profileId: "0x01"
      contentURI: "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl"
      collectModule: { freeCollectModule: { followerOnly: true } }
      referenceModule: { followerOnlyReferenceModule: false }
    }
  ) {
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

# Using LensClient SDK

```typescript
const metadata = {
  // valid metadata
};

// upload metadata to ipfs or arweave - upload is your custom function that returns contentURI
const contentURI = await upload(metadata);

// create a post via dispatcher, you need to have the dispatcher enabled for the profile
const viaDispatcherResult = await lensClient.publication.createPostViaDispatcher({
  profileId,
  contentURI,
  collectModule: {
    revertCollectModule: true, // collect disabled
  },
  referenceModule: {
    followerOnlyReferenceModule: false, // anybody can comment or mirror
  },
});

// or with typedData that require signature and broadcasting
const typedDataResult = await lensClient.publication.createPostTypedData({
  profileId,
  contentURI,
  collectModule: {
    revertCollectModule: true, // collect disabled
  },
  referenceModule: {
    followerOnlyReferenceModule: false, // anybody can comment or mirror
  },
});

// sign and broadcast

```

The `contentURI` can be either an IPFS or Arweave hash formatted in the following way:

```javascript
// IPFS
contentURI: ipfs://your-ipfs-hash

// Arweave
contentURI: https://arweave.net/your-arweave-hash
// or
contentURI: ar://your-arweave-hash

// when uploading to Arweave, be sure to set the "Content-Type" to "application/json"
```

### Collect Modules

Modules are quite complex, each module needs to be encoded in the correct way for the contracts not to throw. We tried to abstract any complex stuff out for you here and allow you to just pass in the params in web2 style. 

```js
input CollectModuleParams {
  # The collect free collect module
  freeCollectModule: Boolean

  # The collect revert collect module
  revertCollectModule: Boolean

  # The collect fee collect module
  feeCollectModule: FeeCollectModuleParams

  # The collect limited fee collect module
  limitedFeeCollectModule: LimitedFeeCollectModuleParams

  # The collect limited timed fee collect module
  limitedTimedFeeCollectModule: LimitedTimedFeeCollectModuleParams

  # The collect timed fee collect module
  timedFeeCollectModule: TimedFeeCollectModuleParams
  
  # The new simple collect module that covers most usecases
  simpleCollectModule: SimpleCollectModuleParams

  # The multirecipient fee collect module
  multirecipientFeeCollectModule: MultirecipientFeeCollectModuleParams
  
  # The erc4626 vault fee collect module
  erc4626FeeCollectModule: Erc4626FeeCollectModuleParams
  
  # The aave fee collect module
  aaveFeeCollectModule: AaveFeeCollectModuleParams
  
  # unknown collect module only use if you know what your doing
  unknownCollectModule: UnknownCollectModuleParams
}
```

Please note you can only supply one of these if you supply more than one the API will throw. We have to do it this way with optional parameters as GraphQL does not support unions on request yet.

##### simpleCollectModule

This is the latest collect module that supports most use cases, including paid collects, limited and timed free collects and more!

> 📘 Hot tip
> 
> We highly recommend you to migrate to this collect module as it provides the most straightforward integration!

Some examples:

###### Post collectible up to 100 times for free

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "simpleCollectModule":  {
            "collectLimit": "100",
            "followerOnly": false,
        }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

###### Now same as above but only for your followers

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "simpleCollectModule":  {
            "collectLimit": "100",
            "followerOnly": true,
         }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

###### Plain old free collect for your followers

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "simpleCollectModule":  {
            "followerOnly": true,
         }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

###### Post collectible for 1 MATIC until 1/1/2024 by everyone with no limit, includes 10% referral fee

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "simpleCollectModule": {
        	"fee": {
        		"amount": {
               		"currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               		"value": "1"
        		},
        		"referralFee": 10,
        		"recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
        	},
        	"endTimestamp": "2024-01-01T00:00:00",
                "followerOnly": false
         }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

###### Post collectible for 1 MATIC 100 times until 1/1/2024 by your followers, no referral fee

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "simpleCollectModule": {
            "fee": {
                "amount": {
               	    "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               	    "value": "1"
                },
                "referralFee": 0,
                "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
            },
            "collectLimit": "100",
            "endTimestamp": "2024-01-01T00:00:00",
            "followerOnly": true
         }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

##### freeCollectModule

This module works by allowing anyone to collect with no fee or no limit or no time. It just allows anyone to collect your publication.

> 📘 freeCollectModule object constraints
> 
> - followerOnly allow or disable the ability to collect by all profiles or only the followers.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "freeCollectModule":  {
            "followerOnly": true
         }
    },
    referenceModule: {
        "followerOnlyReferenceModule": false
    }
 }
```

##### revertCollectModule

This module works by disallowing all collects. If set if someone tried to collect from the contract level it would throw and revert.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "revertCollectModule": true
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### feeCollectModule

This collect module has no time limit, followers only unlimited mints, and an optional referral fee. 

> 📘 feeCollectModule object constraints
> 
> - unlimited collects can be done
> - currency must be a whitelisted module currency or it will throw
> - value which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value
> - recipient is where do you want the funds to go to 
> - referralFee is forced here for a clear interface, if you do not want any referral fee put 0. The referral fee is a percent out of 100 so a number is fine but it only supports 2 decimal places aka 10.45 is fine but 10.234 is not. The max amount is 100 you can enter
> - followerOnly allow or disable the ability to collect by all profiles or only the followers.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "feeCollectModule": {
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               "value": "0.01"
             },
             "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
             "referralFee": 10.5,
             "followerOnly": false 
         }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### limitedFeeCollectModule

This collect module has no time limit, follower only limited mints, and an optional referral fee.

> 📘 limitedFeeCollectModule object constraints
> 
> - collect limit is how many you want the max amount to be collected, this is a string number because it can overflow in javascript. 
> - currency must be a whitelisted module currency or it will throw
> - value which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value.
> - recipient is where do you want the funds to go to 
> - referralFee is forced here for a clear interface, if you do not want any referral fee put 0. The referral fee is a percent out of 100 so a number is fine but it only supports 2 decimal places aka 10.45 is fine but 10.234 is not. The max amount is 100 you can enter.
> - followerOnly allow or disable the ability to collect by all profiles or only the followers.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "limitedFeeCollectModule": {
            "collectLimit": "100000",
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               "value": "0.01"
             },
             "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
             "referralFee": 10.5,
            "followerOnly": false 
         }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### limitedTimedFeeCollectModule

This collect module has 24 hours with a fee and optional referral fee, follower only limited mints

> 📘 limitedTimedFeeCollectModule object constraints
> 
> - time is hardcoded in the contract as 24 hours you can not edit this time
> - collect limit is how many you want the max amount to be collected, this is a string number because it can overflow in javascript
> - currency must be a whitelisted module currency or it will throw
> - value which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value
> - recipient is where do you want the funds to go to 
> - referralFee is forced here for a clear interface, if you do not want any referral fee put 0. The referral fee is a percent out of 100 so a number is fine but it only supports 2 decimal places aka 10.45 is fine but 10.234 is not. The max amount is 100 you can enter
> - followerOnly allow or disable the ability to collect by all profiles or only the followers.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "limitedTimedFeeCollectModule": {
            "collectLimit": "100000",
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               "value": "0.01"
             },
             "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
             "referralFee": 10.5,
            "followerOnly": false 
         }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### timedFeeCollectModule

This collect module has 24 hours with a fee and optional referral fee, follower only unlimited mints

> 📘 timedFeeCollectModule object constraints
> 
> - time is hardcoded in the contract as 24 hours you can not edit this time
> - unlimited collects can be done within the time period
> - currency must be a whitelisted module currency or it will throw
> - value which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value.
> - recipient is where do you want the funds to go to 
> - referralFee is forced here for a clear interface, if you do not want any referral fee put 0. The referral fee is a percent out of 100 so a number is fine but it only supports 2 decimal places aka 10.45 is fine but 10.234 is not. The max amount is 100 you can enter.
> - followerOnly allow or disable the ability to collect by all profiles or only the followers.

Usage:

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "timedFeeCollectModule": {
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               "value": "0.01"
             },
             "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
             "referralFee": 10.5,
            "followerOnly": false 
         }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### multirecipientFeeCollectModule

This module supports splitting the collect fees between multiple recipients. It also supports timed _and_ limited fee collects optionally, so you can use it to support almost every use case.

> 📘 multirecipientFeeCollectModule object constraints
> 
> - You **must** set at least 1 recipient and a positive collect fee. 
> - You can split the amount between up to 5 recipients.
> - Every recipient splits the amount based on the `split` property, which takes values from 1-100 and the total **must** add up to 100.
> - Limited collects are _optional_ and apply only if you set a value to property `collectLimit`. Otherwise leave unset.
> - Timed collects are also _optional_ and apply only when you set `endTimestamp` property.
> - The remaining options perform the same way as in all other modules.

```json JSON
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "multirecipientFeeCollectModule": {
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
               "value": "0.01"
             },
             "recipients": [
               {
                 "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
                 "split": 50
               }, 
               { 
                 "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaB",
                 "split": 50
               }
             ],
             "referralFee": 10,
             "followerOnly": false,
						 // "collectLimit": 5 -- if set, will end up in a limited collect
             // "endTimestamp": "2024-01-01T00:00:00" -- if set will set a timestamp after which, attempted collects will revert
         }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### erc4626FeeCollectModule

This module can be used when you want to set the fees to an ERC4626-compatible vault contract, generates receipt shares and forwards these to a given recipient, also supports optional timed and limited collects, exactly the same way as Multirecipient Fee Collect Module does.

> 📘 erc4626FeeCollectModule object constraints
> 
> - `vault` and `recipient`properties are required. `vault` must be a valid erc4626 contract address, while recipient must be a wallet address belonging to the user who will receive the generated shares after depositing to the vault.
> - `amount` is also required
> - All other properties apply as in the remaining

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "erc4626FeeCollectModule": {
           "amount": {
              "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
              "value": "0.01"
           },
           "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
         	 "vault" "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF", // must be a valid erc4626 vault
            "referralFee": 10,
            "followerOnly": false,
	    			// collectLimit: 5 -- if set, will end up in a limited collect
            // endTimestamp: "2024-01-01T00:00:00" -- if set will set a timestamp after which, attempted collects will revert
        }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

##### aaveFeeCollectModule

This collect module receives the fees and instantly deposits them on Aave v3 on Polygon. Also optionally supports timed and limited collects.

> 📘 aaveFeeCollectModule
> 
> - You don't need to know the contract address for the pool you want to deposit too. You just need to supply the address of the whitelisted currency in the `amount` property and the API will try to find the contract and error out if the pool does not exist.
> - You also need to supply a `recipient` who will receive the aTokens after depositing to Aave v3.

```json
{
    "profileId": "0x03",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "aaveFeeCollectModule": {
            "amount": {
               "currency": "0xD40282e050723Ae26Aeb0F77022dB14470f4e011", // must be supported by polygon aave v3
               "value": "0.01"
             },
             "recipient": "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF",
             "referralFee": 10,
             "followerOnly": false,
						 // collectLimit: 5 -- if set, will end up in a limited collect
             // endTimestamp: "2024-01-01T00:00:00" -- if set will set a timestamp after which, attempted collects will revert
        }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
}
```

##### unknownCollectModule

This collect module is unknown and not type supported in the API. This means if you use this you have to encode and supply the data yourself to the API, the API will still allow you to use an unknown collect module but it won't validate it. Only use unknown collect modules if you can trust the collect module and know what you're doing. 

```json
{
    "profileId": "0x03",
    "publicationId": "0x01-0x01",
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
       "unknownCollectModule": {
         "contractAddress": "0x1F68931Bc4C77b2D394Bf23cb1A45842501da10e",
         "data": "0x01"
      }
    },
    "referenceModule": {
        "followerOnlyReferenceModule": false
    }
 }
```

#### referenceModule - required

Modules are quite complex, each module needs to be encoded in the correct way for the contracts not to throw. We tried to abstract any complex stuff out for you here and allow you to just pass in the params in web2 style.

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
    "contentURI": "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
    "collectModule": {
        "freeCollectModule": { "followerOnly": false }
    },
    referenceModule: {
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