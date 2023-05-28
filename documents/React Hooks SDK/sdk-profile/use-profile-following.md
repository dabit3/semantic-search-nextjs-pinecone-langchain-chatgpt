---
title: "useProfileFollowing"
slug: "use-profile-following"
hidden: false
createdAt: "2022-12-23T17:14:00.803Z"
updatedAt: "2023-03-20T07:04:24.495Z"
---
`useProfileFollowing` is a React Hook that lets you query the profiles that a wallet is following.

```typescript
const { data, loading, hasMore, next } = useProfileFollowing(args)
```



## Usage

```typescript TypeScript
import { useProfileFollowing } from '@lens-protocol/react-web';

function Followers() {
const {
    data: following,
    loading,
    hasMore,
    next,
  } = useProfileFollowing({
    walletAddress: '0xD28E808647D596F33Dcc3436E193A9566fc7aC07',
    limit: 10,
  });
}
```



## Reference

### `useProfileFollowing(args)`

```typescript

const {
    data: following,
    loading,
    hasMore,
    next,
  } = useProfileFollowing({
    walletAddress,
    limit,
    observerId
 });
```



### Parameters

`walletAddress: string` (required)

- The wallet address for which we want to know the followed profiles

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: FollowingFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more profiles after the current batch
  next(): () => void, // fetches the next profiles and appends to the data
}
```