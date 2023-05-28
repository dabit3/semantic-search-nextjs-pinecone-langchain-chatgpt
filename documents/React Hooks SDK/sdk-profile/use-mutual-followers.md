---
title: "useMutualFollowers"
slug: "use-mutual-followers"
hidden: false
createdAt: "2022-12-23T16:25:43.921Z"
updatedAt: "2023-03-20T07:04:33.236Z"
---
`useMutualFollowers` is a React Hook that lets you query the followers in common between two profiles.

```typescript
const { data, loading, hasMore, next } = useMutualFollowers(args)
```



## Usage

```typescript TypeScript
import { useMutualFollowers } from '@lens-protocol/react-web';

function MutualFollowers() {
const { data, loading } = useMutualFollowers({
    observerId: '0x02',
    viewingProfileId: '0x03',
  });
}
```



## Reference

### `useMutualFollowers(args)`

### Parameters

`observerId: string` (required)

- The id of the profile who is running the query, usually the logged in/active profile

`viewingProfileId: string` (optional)

- The id of the profile to compare the followers with

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: ProfileFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more mutual followers after the current batch
  next(): () => void, // fetches the next mutual followers and appends to the data
}
```