---
title: "Create profile"
slug: "create-profile"
hidden: false
createdAt: "2022-02-17T11:38:47.107Z"
updatedAt: "2023-05-13T05:44:54.092Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/create-profile.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Creating a profile on `MAINNET` is only allowed by trusted whitelisted addresses for now. This endpoint can be used on `TESTNET` to allow you to create profiles easily through your UI without worrying about the gas. This will only be exposed on the `TESTNET` public API. This is great for when you building some cool stuff against the `TESTNET` contracts. 

# API Design

```javascript Example operation
mutation CreateProfile {
  createProfile(request: { 
    handle: "devjoshstevens",
    profilePictureUri: null,
    followNFTURI: null,
    followModule: null
  }) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
```
```javascript Example response
{
  "data": {
    "txHash": "0xd771b9b8fd558eda20598e8a464cc9cc9e28f4bd75e823d30ee276dd590cd67e"
  }
}
```
```javascript Query interface
type Mutation {
  createProfile(request: CreateProfileRequest!): RelayResult!
}
```
```javascript Request
input CreateProfileRequest {
  handle: Handle!

  # The profile picture uri
  profilePictureUri: Url

  # The follow module
  followModule: FollowModuleParams
  
  # The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers
  followNFTURI: Url
}

input FollowModuleParams {
  # The follower fee follower module
  feeFollowModule: FeeFollowModuleParams

  # The empty follow module
  emptyFollowModule: Boolean
}

input FeeFollowModuleParams {
  # The follow module amount info
  amount: ModuleFeeAmountParams!

  # The follow module recipient address
  recipient: EthereumAddress!
}
```
```javascript Response
union RelayResult = RelayerResult | RelayError

# The relayer result
type RelayerResult {
  # The tx hash
  txHash: TxHash!
}

type RelayError {
  reason: RelayErrorReasons!
}
  
# Relay error reason
enum RelayErrorReasons {
  REJECTED
  HANDLE_TAKEN
  EXPIRED
  WRONG_WALLET_SIGNED
}
```



## Request

Let's touch on this request so it's super clear. 

### Handle - required

You must define the handle you wish to have for the profile which will be created. This is mandatory. 

### profilePictureUri

You can pass in a `profilePictureUri` which is a link to any kind of storage that points to an image. You can leave this out the request if you do not want to supply a default image for the profile. 

### followNFTURI

The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will default to a dynamic NFT which will show the last publication of your profile as the NFT image.

We do not enforce our standards on this metadata as it is purely to be showed on secondary marketplaces. We advise you follow opensea metadata spec for this <https://docs.opensea.io/docs/metadata-standards>

### followModule

Defining the follow module is very easy with the schema we have created:

#### Free follow module

As the example above shows, you can leave this as null or not pass it in; if you do that it will point to the free follow module which basically means no modules are fired when someone follows you (free). We promote not passing it in the request if you do not want to set a follow module.

This can also be defined explicitly in the request by doing:

```js
mutation CreateProfile {
  createProfile(request:{ 
                handle: "devjoshstevens",
                profilePictureUri: null,   
                followModule: {
                     freeFollowModule: true
                  }
                }) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
```



#### Revert follow module

You do not want anyone to follow you; to set this up you can do:

```js
mutation CreateProfile {
  createProfile(request:{ 
                handle: "devjoshstevens",
                profilePictureUri: null,   
                followModule: {
                     revertFollowModule: true
                  }
                }) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
```



#### Fee follow module

You can charge a fee when someone follows you, to set this up when you create a profile you can do:

```js
mutation CreateProfile {
  createProfile(request:{ 
                handle: "devjoshstevens",
                profilePictureUri: null,   
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
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
    __typename
  }
}
```



As you see above we have mapped the `currency` we want to be paid in alongside the `value` which should be passed in as the normal amount not shifted to the decimal places as our server does this for you. So if you want 1 WETH you would enter 1 as a value. The final property defined is the `recipient` you want the funds to go to. 

You can update the follow module for your profile at any time, the resolver endpoints to generate the typed data for them are explained on the [Create set follow module typed data](doc:create-set-follow-module-typed-data) 

> 📘 The API will support more modules which get whitelisted as they get approved.
> 
> as they do this doc will be updated alongside it.

When calling the `createProfile()` function, the contract will add the `.test` or `.lens` extension to your handle. The best way to check all the profiles you have created is to send a `getProfiles()` request filtered with `ownedBy` and your account address as the value.

 

# 

# Using LensClient SDK

You can use LensClient SDK to create a new profile.

```typescript
import { isRelayerResult } from "@lens-protocol/client";

// lensClient is an authenticated instance of LensClient

const profileCreateResult = await lensClient.profile.create({ 
  handle: 'profilehandle',
 	// other request args 
});

// profileCreateResult is a Result object
const profileCreateResultValue = profileCreateResult.unwrap();

if (!isRelayerResult(profileCreateResultValue)) {
  console.log(`Something went wrong`, profileCreateResultValue);
  return;
}

console.log(
  `Transaction was successfuly broadcasted with txId ${profileCreateResultValue.txId}`
);
```