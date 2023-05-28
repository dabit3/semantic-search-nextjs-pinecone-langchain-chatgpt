---
title: "useProfileFollowers"
slug: "use-profile-followers"
hidden: false
createdAt: "2022-12-23T16:46:20.708Z"
updatedAt: "2023-03-20T07:04:17.354Z"
---
`useProfileFollowers` is a React Hook that lets you query the followers of a profile.

```typescript
const { data, loading, hasMore, next } = useProfileFollowers(args)
```



## Usage

```typescript TypeScript
import { useProfileFollowers } from '@lens-protocol/react-web';

function Followers() {
const {
    data: followers,
    loading,
    hasMore,
    next,
  } = useProfileFollowers({
    profileId: '0x77-0x0149',
    limit: 10,
  });
}
```



## Reference

### `useProfileFollowers(args)`

### Parameters

`profileId: string` (required)

- The id of the profile that we want to fetch the followers

`observerId: string` (optional)

- The id of the profile who is running the query, usually the logged in/active profile

`limit: number` (optional)

- The amount of items to return

### Returns

```typescript
{
  data: FollowersFragment[],
  loading: boolean,
  hasMore: boolean, // whether there are more followers after the current batch
  next(): () => void, // fetches the next followers and appends to the data
}
```