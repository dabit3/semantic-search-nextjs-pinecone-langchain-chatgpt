---
title: "Set follow NFT URI"
slug: "create-set-follow-nft-uri"
hidden: false
createdAt: "2022-02-24T11:07:47.300Z"
updatedAt: "2023-03-14T10:27:19.328Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/follow/set-follow-nft.ts>

> 📘 This action can be gasless
> 
> <https://docs.lens.xyz/docs/broadcast-transaction>) You can use the broadcast logic to send this gasless. Please note this is fully unlocked on mumbai but on polygon it is only whitelisted apps who can use it.

This API call allows you to get the typed data to then call the `withSig` method to set your follow NFT for your profile on lens. This is what your users will mint and see on secondary marketplaces and in their wallets as the follower NFT.

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Typed data is a way to try to show the users what they are signing in a more readable format. You can read more about it [here](https://eips.ethereum.org/EIPS/eip-712).

Constructing that type of data is normally difficult. On the type data, you also need to get the nonce, deadline, contract version, contract address, chain id, and the name of the contract for the signature to be able to be signed and verified. 

When using this API the server checks every detail before it generates the typed data. For example: if you try to create typed data on an always failing transaction the server will throw an error in a human-readable form. This is great for debugging but also saves issues with users sending always failing transactions or a mismatch of a bad request.

We will show you the typed data approach using ethers and the API side by side. Keep in mind that with the typed data approach you use the `withSig` methods which can be called by you with your signature or with that signature any relay could call it for you on your behalf allowing gasless transactions. 

# API Design

```graphql Example operation
mutation CreateSetFollowNFTUriTypedData {
  createSetFollowNFTUriTypedData(request: {
    profileId: "0x02",
    followNFTURI: "ipfs://LmTqN4LZ2G4QRrsS2y2QFMUH5K7dT2ix6P6TuL3pq9CShx"
  }) {
    id
    expiresAt
    typedData {
      types {
        SetFollowNFTURIWithSig {
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
        profileId
        deadline
        followNFTURI
      }
    }
  }
}
```
```javascript Example response
{
  "data": {
    "createSetFollowNFTUriTypedData": {
      "id": "5ee5c6d5-4e54-4a32-b044-34b16bef3001",
      "expiresAt": "2022-03-03T09:45:32.000Z",
      "typedData": {
        "types": {
          "SetFollowNFTURIWithSig": [
            {
              "name": "profileId",
              "type": "uint256"
            },
            {
              "name": "followNFTURI",
              "type": "string"
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
          "nonce": 11,
          "profileId": "0x02",
          "deadline": 1646300732,
          "followNFTURI": "ipfs://QmTqN4LZ2G4QRrsS2y2QFMUH5K7dT2ix6P6TuL3pq9CShx"
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

### followNFTURI

The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customize it for their followers.

We do not enforce our standards on this metadata as it is purely to be showed on secondary marketplaces. We advise you follow opensea metadata spec for this <https://docs.opensea.io/docs/metadata-standards>

# Hooking in without using the type data

You may not want to go down the typed data with the signature route and just send the transaction directly from the client to the blockchain without any API call to map the data for you. You will need to do the encoding and validation yourself if you go down that approach. This is out of scope for the API documentation as would have been explained and showed how to do it in the contract docs. This tries to advise the same practice as what `seaport` on OpenSea are doing alongside a lot of other projects which tries to improve the visibility of what the user is signing.



# 

# Using LensClient SDK

```typescript
// lensClient is an authenticated instance of LensClient

const typedDataResult = await lensClient.profile.createSetFollowNFTUriTypedData({
  followNFTURI?: InputMaybe<Scalars['Url']>;
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