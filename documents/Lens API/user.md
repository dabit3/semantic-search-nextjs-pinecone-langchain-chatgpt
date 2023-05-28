---
title: "Nonce management typed data"
slug: "user"
hidden: false
createdAt: "2022-06-20T11:23:06.457Z"
updatedAt: "2023-03-14T13:02:12.370Z"
---
> 🚧 This is quite low level
> 
> This section is a bit more advanced low-level feature to make the clients faster with nonce management handled on the client itself.

> 📘 full code repo <https://github.com/lens-protocol/lens-api-examples>

When using typed data signatures to send the transactions within the typed data you may have seen a `nonce`. This is used for security reasons to avoid anyone replaying signatures and a lot of other reasons which we will not dig into here, basically, this makes it secure. 

Each contract aka `lensHub` and `periphery` and all followers NFT contracts manage their own nonces so nonce 1 on `lensHub` has no relation to the nonce on `periphery` and so on. Now the main issue is that because `evm` state will only change when the transaction has been mined you have to wait for transaction 1 to be fully mined before you allow the user to send their next action (as it will get gas estimate issues as Ethereum source of truth is the current state and doesn't take into consideration the pending transactions). 

What does this mean:

1. I on wallet x follow profile y using follow with sig using nonce 1
2. I then straight away try to follow someone else using follow with sig
3. If the tx on step 1 is not been mined yet step 2 will throw an estimate gas issue before you try to pass in the nonce 
4. this means you have slow UX waiting for things to finish before you can do another action

you may be asking yeah ok but how do I get around that well in theory your client "knows" when someone has done a transaction so if the client managed the nonce itself it could allow. This leads me to talk about how you can get the information from the server to manage this yourself and avoid it when creating typed data. 

# userSigNonces

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

You can call this query to get the current nonces of the `lensHub` and the `periphery`.

- periphery includes profile metadata and approval follow
- lens hub includes everything else minus `unfollow` which is a nonce on the `followNftAddress` contract but probably an edge case, for now, you can leave as not many people will unfollow then unfollow again, and so on. 

```javascript Example operation
query UserSigNonces {
  userSigNonces {
    lensHubOnChainSigNonce
    peripheryOnChainSigNonce
  }
}
```
```javascript Example response
{
  "data": {
    "userSigNonces":
      {
        "lensHubOnChainSigNonce": "1",
        "peripheryOnChainSigNonce": "6"
      }
  }
}
```



This will allow you to query the states on page load and then hold these states in memory. If the user then does an action let's say post and sends the transaction you can +1 onto the `lensHubOnChainSigNonce` once you got the `txHash`, if rejected you do not need to do anything. Please note you will have some cases with MM where if the user acts very strange and clicks many actions and never approves or rejects the transactions they will have many approval modals to approve or reject with the same nonce meaning after the first approval the rest would fail. It is down to the client to handle that edge case if that means you do not allow them to do anything until that action has been approved or rejected or whatever UX you think is best. 

Also because users may be using other clients it's worth calling this query to compare states every now and again with your in-memory nonce to make sure they have not done something on another UI. We do have in the backlog ability to broadcast this through the client via WebSockets but it is currently not done. 

Once you got your nonce management for different actions mapped you can override the nonce on every typed data request using the `options` which is a type of `TypedDataOptions` that can be supplied when generating the typed data. Below is an example of me generating the typed data with an override nonce as my client is managing nonces to make the UX quick and fast. 

```js
mutation CreateSetDefaultProfileTypedData {
  createSetDefaultProfileTypedData(request: { profileId: "0x01" }, options: { overrideSigNonce: 1 }) {
    id
    expiresAt
    typedData {
      types {
        SetDefaultProfileWithSig {
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
        wallet
        profileId
      }
    }
  }
}
```



Ok, you got the client managing nonces and +1 on them when actions happen you also passed in the custom nonce on typed data calls the last part is understanding overriding the gas limits to avoid estimating gas. Within ethers when you do a contract call the parameter are the inputs then you have an option at the end that you can supply a `gasLimit` which means it won't check `estimateGas` and allows you to send it. 

```javascript
 const tx = await lensHub.commentWithSig(
    {
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      profileIdPointed: typedData.value.profileIdPointed,
      pubIdPointed: typedData.value.pubIdPointed,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      referenceModuleData: typedData.value.referenceModuleData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    },
    { gasLimit: 500000 }
  );
```



# 

# Using LensClient SDK

```typescript
// lensClient is authenticated

const result = await lensClient.nonces.fetch();
```