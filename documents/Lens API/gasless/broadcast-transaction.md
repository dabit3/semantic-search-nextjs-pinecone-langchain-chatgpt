---
title: "Broadcast transaction"
slug: "broadcast-transaction"
hidden: false
createdAt: "2022-09-23T12:04:57.484Z"
updatedAt: "2023-05-24T15:06:57.118Z"
---
> 🚧 Please note you can use broadcast freely on mumbai but if you want to use it on polygon you need to be whitelisted.

> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/broadcast/broadcast-follow-example.ts>

Using `broadcast`, you can enable gasless transactions in your Lens application.

You should only call `broadcast` if you are using the typed data logic. If you are using the [dispatcher](https://docs.lens.xyz/docs/dispatcher) you don't need to broadcast it. If the user does not have a dispatcher on this is the way you can relay the transaction allowing the user not to pay gas.

If you look at the schema you will see a broadcast mutation:

```graphql request
mutation Broadcast($request: BroadcastRequest!) {
  broadcast(request: $request) {
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

## Request

### id - `broadcastId` - required

This is the ID that is given back to you when you call any of the typed data calls example:

<https://docs.lens.xyz/docs/create-post-typed-data>

![](https://files.readme.io/0b9a30c-image.png)

please note you will be given an `expiresAt` date if you try to send the broadcast after that has expired it will be rejected. It is worth checking that for edge cases if someone takes a long time accepting the approval modal.

### signature - `Signature` - required

This is the signature without it being split so after your call `ethers _signTypedData` as you must do now if using the typed data methods instead of calling ethers `utils.splitSignature` you just pass in the full hex string of the signature.

The response will either give you back a RelayerResult which holds the `txHash` and a `txId` (this is explained more below) or a RelayError which will give you a reason:

```typescript
export enum RelayErrorReasons {
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  WRONG_WALLET_SIGNED = 'WRONG_WALLET_SIGNED',
  NOT_ALLOWED = 'NOT_ALLOWED',
}
```

If you see a rejection it is worth allowing them to pay for it themselves so if the error happens use the normal `withSig` methods so you can handle gasless and if gasless is ever turned off without your code-breaking. `REJECTED` can mean they have used the max allowance in the hour.

## Querying when it has been indexed

You need to use <https://docs.lens.xyz/docs/has-transaction-been-indexed> endpoint to know when it's been indexed. This should be your source of truth and the only thing you call to watch for it to be successful. The main difference between what you should do with this call when using the relay and what you should call when not using the relay is instead of passing in the `txHash` into the `hasTxHashBeenIndexed` pass in the `txId` returned in `RelayerResult` this is because our relay will speed up gas on the transactions if the gas prices move or if it's taking too long to be picked up, this, of course, generates a new `txHash` and the old one would be dropped. So this is to make sure your client is never stuck in a loop forever. Also because we have to do an extra HTTP call here to find out the status from the transaction id when using txId it will be longer response times than using `txHash` so we recommend only calling it once every 1 second.

## Using LensClient SDK

You can use the `Transaction` module of LensClient SDK to broadcast typed data that were signed by your wallet. See the example below.

```typescript
import { isRelayerResult } from "@lens-protocol/client";

// lensClient is an authenticated instance of LensClient

// we need some typedData to sign and broadcast so let's set the dispatcher as an example
const typedDataResult = await lensClient.profile.createSetDispatcherTypedData({
  profileId: activeProfile.id,
});

// typedDataResult is a Result object
const data = typedDataResult.unwrap();

// sign with the wallet
const signedTypedData = await wallet._signTypedData(
  data.typedData.domain,
  data.typedData.types,
  data.typedData.value
);

// broadcast
const broadcastResult = await lensClient.transaction.broadcast({
  id: data.id,
  signature: signedTypedData,
});

// broadcastResult is a Result object
const broadcastResultValue = broadcastResult.unwrap();

if (!isRelayerResult(broadcastResultValue)) {
  console.log(`Something went wrong`, broadcastResultValue);
  return;
}

console.log(
  `Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}`
);

```

You can also check the status of the transaction with

```typescript
// result is a Result object
const result = await lensClient.transaction.wasIndexed(txId);

// or wait till transaction is indexed
await lensClient.transaction.waitForIsIndexed(txId);
```

Read here about the returned [Result type](doc:client-sdk-types).

##