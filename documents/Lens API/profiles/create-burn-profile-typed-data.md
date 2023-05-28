---
title: "Delete profile"
slug: "create-burn-profile-typed-data"
excerpt: "This please you are burning your profile, all your content still lives on."
hidden: false
createdAt: "2022-04-21T13:47:30.230Z"
updatedAt: "2023-03-15T18:13:55.413Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/profile/burn-profile.ts>

This API call allows you to get the typed data to then call the `withSig` method to burn your lens profile. This please you are burning your profile, all your content still lives on.This request is protected by authentication

> 🚧 hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API, the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always-failing transaction, the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions.

# API Design

```javascript Example operation
mutation CreateBurnProfileTypedData {
  createBurnProfileTypedData(request: { profileId: "0x01"}) {
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
          BurnWithSig {
            name
            type
          }
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
    "createBurnProfileTypedData": {
      "id": "ced2635e-2d5f-43b6-bb90-a45289be763d",
      "expiresAt": "2022-04-21T14:05:16.000Z",
      "typedData": {
        "domain": {
          "name": "Lens Protocol Profiles",
          "chainId": 80001,
          "version": "1",
          "verifyingContract": "0x4BF0c7AD32Fd2d32089790a54485e23f5C7736C0"
        },
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
        "value": {
          "nonce": 26,
          "deadline": 1650549916,
          "tokenId": "0x01"
        }
      }
    }
  }
}
```
```javascript Query interface
type Mutation {
  createBurnProfileTypedData(
    options: TypedDataOptions
    request: BurnProfileRequest!
  ): CreateBurnProfileBroadcastItemResult!
}
```



# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.



# 

# Using LensClient SDK

```typescript
const burnProfileTypedDataResult = await lensClient.profile.createBurnProfileTypedData({
  profileId,
});
```