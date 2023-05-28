---
title: "Has transaction been indexed"
slug: "has-transaction-been-indexed"
hidden: false
createdAt: "2022-02-18T08:42:28.223Z"
updatedAt: "2023-03-14T10:21:56.884Z"
---
> 📘 Full code example
> 
> <https://github.com/lens-protocol/api-examples/blob/master/src/indexer/has-transaction-been-indexed.ts>

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

Normally when you broadcast transactions to the blockchain you wait for the receipt to know the transaction has been completed fully. The transaction is in a pending state until you have a receipt. If you use `ethers.js` you normally use their method to wait to get the receipt. 

```js
await tx.wait();
```



As this is slightly different your source of truth is actually the API's indexer and database. So this method allows you to swap out the wait method from `ethers.js` and use this API query as a source of truth for when it is complete. 

The indexer tracks all transaction hashes to allow you to easily query to work out if the indexer has now broadcasted it. Please note there is a 2 stage process when you do a publication:

1. The indexer indexes it and this will be field `indexed`
2. The server then validates the metadata conforms to standards and processes it to internal storage. This is description in `metadataStatus`. This contains the `status` of the processing and also the `reason` if it fails. This field can be ignored if you are not waiting on a publication to be indexed.

# API details

> 📘 If your using gasless
> 
> When using gasless you must use the `txId` over the `txHash` as the gasless would bump up the transaction if the gas prices move meaning a new `txHash` will be generated.

```javascript Example operation
query HasTxHashBeenIndexed {
  hasTxHashBeenIndexed(request: { txHash: "0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3" }) {
    ... on TransactionIndexedResult {
      indexed
      txReceipt {
        to
        from
        contractAddress
        transactionIndex
        root
        gasUsed
        logsBloom
        blockHash
        transactionHash
        blockNumber
        confirmations
        cumulativeGasUsed
        effectiveGasPrice
        byzantium
        type
        status
        logs {
          blockNumber
          blockHash
          transactionIndex
          removed
          address
          data
          topics
          transactionHash
          logIndex
        }
      }
      metadataStatus {
        status
        reason
      }
    }
    ... on TransactionError {
      reason
      txReceipt {
        to
        from
        contractAddress
        transactionIndex
        root
        gasUsed
        logsBloom
        blockHash
        transactionHash
        blockNumber
        confirmations
        cumulativeGasUsed
        effectiveGasPrice
        byzantium
        type
        status
        logs {
          blockNumber
          blockHash
          transactionIndex
          removed
          address
          data
          topics
          transactionHash
          logIndex
        }
      }
    },
    __typename
  }
}
```
```javascript Example response success
{
  "data": {
    "hasTxHashBeenIndexed": {
      "indexed": true,
      "txReceipt": {
        "to": "0xF6BF84E5df229029C9D36dC7ABaCDBE9c0bd7b4F",
        "from": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F",
        "contractAddress": null,
        "transactionIndex": 1,
        "root": null,
        "gasUsed": "0x028545",
        "logsBloom": "0x04000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000800000000000000000000100000000004000000000000010000008000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200004000000000000000100000000100000000000000200000000000000004000000000000100000001000000000000000000000010000000100040000000000000000000000100000000000000000000000000008000000040000000100001",
        "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
        "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
        "blockNumber": 25427445,
        "confirmations": 88,
        "cumulativeGasUsed": "0x03d110",
        "effectiveGasPrice": "0x06fc23ac00",
        "byzantium": true,
        "type": 0,
        "status": 1,
        "logs": [
          {
            "blockNumber": 25427445,
            "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
            "transactionIndex": 1,
            "removed": false,
            "address": "0xF6BF84E5df229029C9D36dC7ABaCDBE9c0bd7b4F",
            "data": "0x00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000edeb556d916d9e6e154a083ac18da52cc5ed8b1c0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000062271ad4000000000000000000000000000000000000000000000000000000000000003a697066733a2f2f516d646e3566674b7750516b684b78446f35514643584559767178737965445050435644367a727975775631526f2e6a736f6e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "topics": [
              "0xc672c38b4d26c3c978228e99164105280410b144af24dd3ed8e4f9d211d96a50",
              "0x0000000000000000000000000000000000000000000000000000000000032f1a",
              "0x0000000000000000000000000000000000000000000000000000000000000002"
            ],
            "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
            "logIndex": 2
          },
          {
            "blockNumber": 25427445,
            "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
            "transactionIndex": 1,
            "removed": false,
            "address": "0x0000000000000000000000000000000000001010",
            "data": "0x000000000000000000000000000000000000000000000000000f4c2f5f77af5500000000000000000000000000000000000000000000000035d05225576c9b000000000000000000000000000000000000000000000008fce4cf8ae2602de1b800000000000000000000000000000000000000000000000035c105f5f7f4ebab0000000000000000000000000000000000000000000008fce4ded711bfa5910d",
            "topics": [
              "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
              "0x0000000000000000000000000000000000000000000000000000000000001010",
              "0x0000000000000000000000006c1e1bc39b13f9e0af9424d76de899203f47755f",
              "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
            ],
            "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
            "logIndex": 3
          }
        ]
      },
      "metadataStatus": {
        "status": "SUCCESS",
        "reason": null
      }
    }
  }
}
```
```javascript Example response revert
{
  "data": {
    "hasTxHashBeenIndexed": {
      "reason": "REVERTED"
      "txReceipt": {
        "to": "0xF6BF84E5df229029C9D36dC7ABaCDBE9c0bd7b4F",
        "from": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F",
        "contractAddress": null,
        "transactionIndex": 1,
        "root": null,
        "gasUsed": "0x028545",
        "logsBloom": "0x04000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000800000000000000000000100000000004000000000000010000008000000000000000000000000000080000000000000000000000000000000000000000000000000000000000080000000000000000000200004000000000000000100000000100000000000000200000000000000004000000000000100000001000000000000000000000010000000100040000000000000000000000100000000000000000000000000008000000040000000100001",
        "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
        "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
        "blockNumber": 25427445,
        "confirmations": 88,
        "cumulativeGasUsed": "0x03d110",
        "effectiveGasPrice": "0x06fc23ac00",
        "byzantium": true,
        "type": 0,
        "status": 0,
        "logs": [
          {
            "blockNumber": 25427445,
            "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
            "transactionIndex": 1,
            "removed": false,
            "address": "0xF6BF84E5df229029C9D36dC7ABaCDBE9c0bd7b4F",
            "data": "0x00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000edeb556d916d9e6e154a083ac18da52cc5ed8b1c0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000062271ad4000000000000000000000000000000000000000000000000000000000000003a697066733a2f2f516d646e3566674b7750516b684b78446f35514643584559767178737965445050435644367a727975775631526f2e6a736f6e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "topics": [
              "0xc672c38b4d26c3c978228e99164105280410b144af24dd3ed8e4f9d211d96a50",
              "0x0000000000000000000000000000000000000000000000000000000000032f1a",
              "0x0000000000000000000000000000000000000000000000000000000000000002"
            ],
            "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
            "logIndex": 2
          },
          {
            "blockNumber": 25427445,
            "blockHash": "0x4da3491fe338c2a5b4c7ee6d0388be4f07481f69fd7a6d78f8d9f11e36697bae",
            "transactionIndex": 1,
            "removed": false,
            "address": "0x0000000000000000000000000000000000001010",
            "data": "0x000000000000000000000000000000000000000000000000000f4c2f5f77af5500000000000000000000000000000000000000000000000035d05225576c9b000000000000000000000000000000000000000000000008fce4cf8ae2602de1b800000000000000000000000000000000000000000000000035c105f5f7f4ebab0000000000000000000000000000000000000000000008fce4ded711bfa5910d",
            "topics": [
              "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
              "0x0000000000000000000000000000000000000000000000000000000000001010",
              "0x0000000000000000000000006c1e1bc39b13f9e0af9424d76de899203f47755f",
              "0x000000000000000000000000be188d6641e8b680743a4815dfa0f6208038960f"
            ],
            "transactionHash": "0xc896c44a3d39ad07922f6d7e915b555b2f327b651b636c197a987b3f921e987d",
            "logIndex": 3
          }
        ]
      }
    }
  }
}
```



## Request

you may see that the request takes in a nullable `txHash` or a nullable `txId` if you are not using the server relay `txHash` you should always use the `txHash` when doing this query. Please note if the user upgrades the gas price the `txHash` changes so your client should handle that on those edge cases to avoid being stuck in a loop until that `txHash` is dropped (sometimes can take a long time).





## 

## 

## Using LensClient SDK

Check the status of a transaction. Read here about the returned [Result type](doc:client-sdk-types).

```typescript
// result is a Result object
const result = await lensClient.transaction.wasIndexed(txId);

// or wait till transaction is indexed
await lensClient.transaction.waitForIsIndexed(txId);
```