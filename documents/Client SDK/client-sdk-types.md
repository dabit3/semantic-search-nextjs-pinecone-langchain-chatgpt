---
title: "TypeScript Types"
slug: "client-sdk-types"
hidden: false
createdAt: "2023-03-03T14:26:13.060Z"
updatedAt: "2023-03-14T12:13:37.573Z"
---
# TypeScript Types

This page explains a few important concepts used by the Client SDK that you need to understand to correctly use the features offered by the package.

## `PromiseResult` and `Result` return types

All methods that require authentication return `PromiseResult` object. Actually, that is a `Result` type wrapped in a `Promise` so if you `await` the method call, you will get a `Result` object. Check the example:

```typescript
const promiseResult = lensClient.transaction.broadcast();

const result = await lensClient.transaction.broadcast(); // or await promiseResult;

// now what can we do with the Result object

// check if success or failure
result.isSuccess();
result.isFailure();

// access the value if success
if(result.isSuccess()) {
  const value = result.value;
}

// access the error if failure
if(result.isFailure()) {
  throw result.error;
}

// unwrap to see what is inside
// it returns value if success and throws error if failure
result.unwrap();
```



## `PaginatedResult` return type

The result of a type of `PaginatedResult` offers you the utility of requesting more results for the same query. Check the example below.

```typescript
const paginatedResult = await lensClient.explore.profiles({
	limit: 10
});

// now what can we do with the PaginatedResult object

const firstTenItems = [...paginatedResult.items]; // clone as items will be overwritten when calling .next()

// fetch next batch of items
await paginatedResult.next()

const nextTenItems = [...paginatedResult.items];

// you can also request previous batch
await paginatedResult.prev()

```