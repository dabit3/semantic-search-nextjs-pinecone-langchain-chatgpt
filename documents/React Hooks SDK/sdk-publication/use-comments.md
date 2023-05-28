---
title: "useComments"
slug: "use-comments"
hidden: false
createdAt: "2022-12-23T16:45:44.413Z"
updatedAt: "2023-03-20T06:54:45.618Z"
---
`useComments` is a React Hook that lets you query the comments for a given publication.

```typescript
const { data, loading, hasMore, next } = useComments(args)
```



## Usage

```typescript TypeScript
import { useComments } from '@lens-protocol/react-web';

function Comments() {
const {
    data: comments,
    loading,
    hasMore,
    next,
  } = useComments({
    commentsOf: '0x77-0x0149',
    limit: 10,
  });
}
```



## Reference

### `useComments(args)`

### Parameters

`commentsOf: string` (required)

- The id of the publication to retrieve the comments for

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: CommentFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more comments after the current batch
  next(): () => void, // fetches the next comments and appends to the data
}
```