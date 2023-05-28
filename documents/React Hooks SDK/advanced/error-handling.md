---
title: "Error handling"
slug: "error-handling"
excerpt: "The Lens SDK minimizes the possibility of incurring an error scenario when using the Lens Protocol. Said that, there are some circumstances that could lead to errors that might require external intervention, either by you or the end-user. This page gives you an overview of these scenarios."
hidden: false
createdAt: "2023-01-19T17:41:35.097Z"
updatedAt: "2023-04-03T15:53:57.576Z"
---
## Async errors

In the vast majority of the operations, the Lens SDK makes use of optimistic update strategies to return control to the user in a timely fashion. Several of these operations might involve long-lasting tasks that due to their nature might require from a handful of seconds up to minutes to settle.

When configuring the `<LensProvider>` wrapper you can specify an `errorHandler` function.

```html JSX
<LensProvider config={lensConfig} onError={errorHandler}>
  <YourAppCode />
</LensProvider>
```



If one of these long-lasting tasks fails the Lens SDK will invoke the `errorHandler` function to notify you of the failure.

The `errorHandler` function has the following signature:

```typescript
function errorHandler(
  error:
    | FailedTransactionError
): void;
```



where:

- `FailedTransactionError` - a user-initiated operation involving a blockchain transaction failed.  
  It has 2 properties:

  - `data: TransactionData<Request>` - the transaction data associated with the given transaction request. The transaction data contains a `request: SupportedRequestModel` with all the details  
    Depending on the stage at which the transaction has failed the `TransactionData<T>` can be:
    - `PendingTransactionData<Request>` - the transaction failed at a very early stage of creation even before receiving a TX hash.
    - `BroadcastedTransactionData<Request>` - the transaction failed after has been broadcasted to the network. At this stage, the transaction has an associated TX hash.
  - `reason: TransactionError` - the error object that contains the `reason` of the failure. Currently, the reason could be one of these:
    ````typescript
    ```typescript
    enum TransactionErrorReason {
      /**
       * The tx failed to be broadcasted.
       */
      CANNOT_EXECUTE = 'CANNOT_EXECUTE',
      
      /**
       * The tx was broadcasted but it was not indexed by the Lens API
       * within the expected timeout.
       */
      INDEXING_TIMEOUT = 'INDEXING_TIMEOUT',

      /**
       * Tthe tx was broadcasted but it was not mined within the
       * expected timeout
       */
      MINING_TIMEOUT = 'MINING_TIMEOUT',
      
      /**
       * The gas-less broadcasting of the tx was rejected.
       * This is probably due to reaching the wallet's time quota limit.
       */
      REJECTED = 'REJECTED',
      
      /**
       * The tx was reverted.
       */
      REVERTED = 'REVERTED',

      /**
       * A not recognized failure.
       */
      UNKNOWN = 'UNKNOWN',
    }
    ```
    ````


> 🚧 Errors, errors everywhere...
> 
> The `LensProvider` `onError` handler would evolve over time with more errors being added so make sure you get notified by your tooling (.e.g typescript compiler) that new errors are not handled after updating the `@lens-protocol/react` version.

## Generic local errors

A lot of hooks that modify state report the `error` as a part of the hook return value (e.g. `useWalletLogin`).

```
  const { execute, error, isPending } = useWalletLogin();
```



Sometimes the errors are specific to the operation being involved (e.g. `FailedUploadError` when creating publication) but a lot of hooks share some common errors related to handling transaction errors.

Below is the list of errors that are likely to happen when modifying the state which may involve creating a transaction:

- `PendingSigningRequestError` - during a signing operation the Lens SDK detected that a previous signing request is still pending. This is done to prevent Lens signing requests from piling up in the user's wallet interface and becoming a source of confusion on what is the user required to do at any given time.
- `UserRejectedError` - the user canceled the operation. This is the typical case of user canceling the signing operation from their Wallet but its use can be extended to future use cases.
- `WalletConnectionError` - there was an issue while connecting to the user's wallet. The `reason` property gives more details on what happened:

```typescript
export enum WalletConnectionErrorReason {
  /**
   * The operation required the wallet to be on a specific network
   * and it was not possible to switch network.
   */
  
  INCORRECT_CHAIN = 'INCORRECT_CHAIN',
  /**
   * The operation required signing from a specific address,
   * instead the connected wallet is associated with another address.
   */
  
  WRONG_ACCOUNT = 'WRONG_ACCOUNT',
  
  /**
   * There is a pending connection request that 
   * was not yet cancelled or approved.
   */
  STALE_CONNECTION_REQUEST = 'STALE_CONNECTION_REQUEST',
}
```