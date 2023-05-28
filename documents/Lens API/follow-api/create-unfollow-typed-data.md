---
title: "unfollow"
slug: "create-unfollow-typed-data"
hidden: false
createdAt: "2022-02-18T11:27:51.832Z"
updatedAt: "2023-03-14T10:23:03.545Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/unfollow.ts>

> 📘 This action can be gasless
> 
> <https://docs.lens.xyz/docs/broadcast-transaction>) You can use the broadcast logic to send this gasless. Please note this is fully unlocked on mumbai but on polygon it is only whitelisted apps who can use it.

This API call allows you to get the typed data to then call the `withSig` method to unfollow someone on lens.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions. 

# API Design

If you are not following this profile it will throw a validation error and not generate the types.

```graphql Example operation
mutation CreateUnfollowTypedData {
  createUnfollowTypedData(request:{
    profile: "0x1d"
  }) {
    id
    expiresAt
    typedData {
      types {
        BurnWithSig {
          name
          type
        }
      }
      domain {
        version
        chainId
        name
        verifyingContract
      }
      value {
        nonce
        deadline
        tokenId
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createUnfollowTypedData": {
      "id": "db0c9892-f7c8-45d0-acd1-b9bdb005646c",
      "expiresAt": "2022-02-18T14:29:40.000Z",
      "typedData": {
        "types": {
          "BurnWithSig": [
            {
              "name": "tokenId",
              "type": "uint256"
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
          "version": "1",
          "chainId": 80001,
          "name": "devjosh-Follower",
          "verifyingContract": "0x1091303A2a13d8f171355920693C6D17aaF81a9B"
        },
        "value": {
          "nonce": 0,
          "deadline": 1645195096,
          "tokenId": "0x01"
        }
      }
    }
  }
}
```



# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.

## 

## 

# Using LensClient SDK

You can use LensClient SDK to unfollow a profile.

```typescript
// lensClient is an authenticated instance of LensClient

// to unfollow you need to request unfollow typed data, sign and broadcast
// but also make sure that you follow that profile first
const unfollowTypedDataResult = await lensClient.profile.createUnfollowTypedData({
  profile: profileId,
});

const data = unfollowTypedDataResult.unwrap();

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