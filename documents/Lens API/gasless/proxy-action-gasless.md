---
title: "Proxy action"
slug: "proxy-action-gasless"
hidden: false
createdAt: "2022-09-23T12:34:31.525Z"
updatedAt: "2023-05-24T15:07:35.465Z"
---
> 🚧 Please note you can use broadcast freely on mumbai but if you want to use it on polygon you need to be whitelisted.

While the dispatcher will allow you to do actions like `post`, `comment`, and `mirror` without signing any approval modals, this endpoint allows you to do actions like `follow` and `collect` without having to sign any approval modals.

_This only works if the modules assigned to those actions are free and have no cost to them, ie. FreeCollectModule and SimpleCollectModule._

> 🚧 This request is protected by authentication
> 
> hint: this means it requires an x-access-token header put in the request with your authentication token.

> 📘 Full code example
> 
> Free collect - <https://github.com/lens-protocol/api-examples/blob/master/src/proxy-action/proxy-action-free-collect.ts>
> 
> Free follow - <https://github.com/lens-protocol/api-examples/blob/master/src/proxy-action/proxy-action-free-follow.ts>

> 👍 SimpleCollectModule support
> 
> You can use Proxy actions to collect posts made with the new SimpleCollectModule. Keep in mind, posts still need to be free of charge and not require the collector to follow the post creator. 
> 
> In these cases, the [request](proxy-action-gasless#free-collect) to the API remains the same as with FreeCollectModule.

# API Design

## Free follow

```javascript Example operation
mutation ProxyAction {
  proxyAction(request: {
    follow: {
      freeFollow: {
        profileId: "0x01"
      }
    }
  })
}
```
```javascript Example response
{
  "data": {
    "proxyAction": "7624f076-446d-4f38-8277-326b269fe8d8"
  }
}
```

## Free collect

```javascript Example operation
mutation ProxyAction {
  proxyAction(request: {
    collect: {
      freeCollect: {
        publicationId: "0x01-0x01"
      }
    }
  })
}
```
```javascript Example response
{
  "data": {
    "proxyAction": "7624f076-446d-4f38-8277-326b269fe8d8"
  }
}
```

## Response

This returns a `proxyActionId` which is a new id linked to that event, this is important to keep as you need it to track the status of the action. You should track this behind the scenes so the user does not need to be blocked, requesting it every 1-2 minutes is enough. To them, it should look like it's done.

The API uses optimistic updates so when you click that button on the user it is complete and they inherit all the stuff instantly. You do not need to worry about optimistic UI caching on your end even though of course it's best practice. 

## Tracking the proxy action status

Once you got the proxy action id you should track its status to make sure it goes all the way through. 

```Text Example operation
query ProxyActionStatus {
  proxyActionStatus(proxyActionId: "7624f076-446d-4f38-8277-326b269fe8d8") {
    ... on ProxyActionStatusResult {
      txHash
      txId
      status
    }
    ... on ProxyActionError {
      reason
      lastKnownTxId
    }
    ... on ProxyActionQueued {
      queuedAt
    }
  }
}
```

### Response

These are all the points a proxy action can go through:

- queued = it is waiting to be picked up by the cron
- minting = the process has started (bare in mind it may need to do > 1 tx to complete the action)
- complete = it's all done
- failed = something went wrong with the process (you should alert the user that the follow failed).

```Text when queued
{
  "data": {
    "result": {
      "queuedAt": "2022-09-23T12:45:58.790Z",
      "__typename": "ProxyActionQueued"
    }
  }
}
```
```Text when minting
{
  "data": {
    "result": {
      "txHash": "0xf73a981bda4fef5dda24cf62225a3cc0807ff4d8ecbe0e0fbdf8f8470d17a751",
      "txId": "0d7f6211-a72c-4c17-a856-a1211d7bb060",
      "status": "MINTING",
      "__typename": "ProxyActionStatusResult"
    }
  }
}
```
```Text when complete
{
  "data": {
    "result": {
      "txHash": "0x0ef4bd411258518da45a84ed3484bbaaac48afcc20ad1d5acf6ee025df86cb6b",
      "txId": "76bb7b84-0a66-45a9-a834-a21e1a8a07c6",
      "status": "COMPLETE",
      "__typename": "ProxyActionStatusResult"
    }
  }
}
```
```Text when fails
{
  "data": {
    "result": {
      "reason": "bad things happened",
      "lastKnownTxId": "0x0ef4bd411258518da45a84ed3484bbaaac48afcc20ad1d5acf6ee025df86cb6b"
      "__typename": "ProxyActionError"
    }
  }
}
```
```Text when transferring
{
  "data": {
    "result": {
      "txHash": "0x0ef4bd411258518da45a84ed3484bbaaac48afcc20ad1d5acf6ee025df86cb6b",
      "txId": "76bb7b84-0a66-45a9-a834-a21e1a8a07c6",
      "status": "TRANSFERRING",
      "__typename": "ProxyActionStatusResult"
    }
  }
}
```



## Using LensClient SDK

You can use LensClient SDK to trigger proxy actions. See the examples below.

```typescript
// lensClient is an authenticated instance of LensClient

// follow
const followResult = await lensClient.proxyAction.freeFollow(profileId);

// collect
const collectResult = await lensClient.proxyAction.freeCollect(publicationId);

// check status of a proxy action
const actionId = collectResult.unwrap();
const checkStatusResult = await lensClient.proxyAction.checkStatus(actionId);
```